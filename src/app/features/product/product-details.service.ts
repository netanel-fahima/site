import {Observable} from 'rxjs/internal/Observable';
import * as productActions from '../../core/store/actions';
import {EntityType} from '../../core/store/actions';
import {EventEmitter, Injectable, OnDestroy, Output} from '@angular/core';
import {EntityService} from '../../core/store/entity.service';
import {Store} from '@ngrx/store';
import {Cloudinary} from '@cloudinary/angular-5.x';
import {switchMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';
import {Init} from '../../../assets/js/init';

@Injectable({
  providedIn: 'root'
})
export class ProductDetails implements OnDestroy {

  @Output() emitter = new EventEmitter();

  public mainProduct: Observable<any>;
  public product: Observable<any>;
  public options: any = [];
  public quantity: any = 1;

  constructor(public data: EntityService, public store: Store, private cloudinary: Cloudinary) {
    this.emitter.subscribe(_ => {
      this.product = this.mainProduct = null;
    });
  }

  getImage(img: any, conf: object = {height: 900, width: 600, crop: 'fill'}): string {
    try {
      const src = this.cloudinary.url(img, conf);
      console.log(src);
      return src;
    }
    catch (e) {
      return '';
    }
  }

  getImagesLength(async: any): any {
    return this.getImages(async).length > 1 ? this.getImages(async) : [];
  }

  getImages(product): any[] {
    const images = (product.image ? [product.image] : product.images);
    return images;
  }

  public setVariations(): void {
    this.product.subscribe(product => {
      this.store.dispatch(new productActions.Read(EntityType.ProductsVariations, product));
    });
  }

  setOption(name: string, option: any): void {

    this.options = this.options.filter(o => o.key !== name);
    this.options.push({key: name, value: option});

    this.product = this.data.productsVariations$.pipe(
      withLatestFrom(this.mainProduct),
      switchMap(([variations, product]) => {
        const variation = variations.find(v => !!this.options.find(o => o.value === v.attributes?.[0].option));
        if (variation) {
          return of({...product, ...variation});
        }
        return of(product);
      })
    );
  }

  addToCart($event: MouseEvent): void {
    $event.preventDefault();
    this.mainProduct
      .pipe(withLatestFrom(this.data.productsVariations$))
      .subscribe(([product, variations]) => {
        const attributes = [...product.attributes];
        if (attributes.length !== this.options?.length) {
          alert(` נא לבחור  ${attributes.map(a => a.name).join(' ,')}`);
          return;
        }
        this.store.dispatch(new productActions.AddVisual(EntityType.Carts, {
          product,
          quantity: this.quantity,
          options: this.options
        }));
        Init.offcanvasOpen();
      });
  }

  addToWithList(): void {
    this.product.subscribe(product => {
      this.store.dispatch(new productActions.AddVisualWishList(EntityType.WishList, {product, quantity: 1}));
      Init.offcanvasOpenWishlist();
    });

  }

  withQuntity(product): boolean {
    const asQuntity = !(
      product.attributes.find(attribute => attribute.name === 'מבצע') &&
      product.attributes.length === 1
    );
    if (!asQuntity) {
      this.quantity = 1;
    }
    return asQuntity;
  }

  ngOnDestroy(): void {
    this.options = [];
  }

}
