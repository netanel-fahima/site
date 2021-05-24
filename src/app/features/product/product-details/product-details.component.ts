import {Component, OnInit} from '@angular/core';
import {Init} from '../../../../assets/js/init';
import {ActivatedRoute} from '@angular/router';
import {EntityService} from '../../../core/store/entity.service';
import {filter, switchMap, withLatestFrom} from 'rxjs/operators';
import {getImageName} from '../utils/productUtil';
import * as productActions from '../../../core/store/actions';
import {EntityType} from '../../../core/store/actions';
import {Store} from '@ngrx/store';
import {Cloudinary} from '@cloudinary/angular-5.x';
import {of} from 'rxjs/internal/observable/of';
import {Observable} from 'rxjs/internal/Observable';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit {

  public mainProduct: Observable<any>;
  public product: Observable<any>;
  private options: any = [];
  public quantity: any = 1;

  constructor(private route: ActivatedRoute, public data: EntityService, private store: Store, private cloudinary: Cloudinary) {
  }

  ngOnInit(): void {
    this.mainProduct = this.product = this.route.queryParams.pipe(
      switchMap(params => {
        const p = {
          id: params.id || ''
        };
        const local = localStorage.getItem('product');
        if (p.id !== local) {
          localStorage.setItem('product', p.id);
          if (local) {
            window.location.reload();
            return of(null);
          }
        }
        return this.data.products$.pipe(
          filter(value => !!value),
          switchMap((products) =>
            of(products.find((product) => product.id === +p.id)))
        );
      }));
    this.product.subscribe(product => {
      this.store.dispatch(new productActions.Read(EntityType.ProductsVariations, product));
    });
  }

  loads(product): void {
    console.log('LOOOOOOOOOOOOOOOOOOOO');
    Init.first();
    Init.qtyBtn();
    this.setImges(this.getImages(product));
    Init.productZoom(this.getImages(product).map(img => {
      return {src: this.getImage(img.src, {height: 1100, width: 700, crop: 'fill'})};
    }));

    if (this.getImages(product).length > 1) {
      Init.productGallerySlider();
    }
  }

  getImages(product): any[] {
    const images = (product.image ? [product.image] : product.images);
    return images;
  }

  setImges(images): void {
    const imgs = images.map(img => {
      return {src: this.getImage(img.src, {height: 1100, width: 700, crop: 'fill'}), h: 1100, w: 700};
    });
    Init.galleryPopup(imgs);
  }

  addToCart($event: MouseEvent): void {
    $event.preventDefault();
    this.product
      .pipe(withLatestFrom(this.mainProduct))
      .subscribe(([product, mainProduct]) => {
        if (product.attributes.length && !this.options.length) {
          alert(` נא לבחור  ${product.attributes.map(a => a.name).join(' ,')}`);
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


  getImage(img: any, conf: object = {height: 900, width: 600, crop: 'fill'}): string {
    try {
      const src = this.cloudinary.url(getImageName(img), conf);
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
}
