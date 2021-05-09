import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {Init} from '../../../../assets/js/init';
import {ActivatedRoute} from '@angular/router';
import {EntityService} from '../../../core/store/entity.service';
import {filter, map, switchMap} from 'rxjs/operators';
import {getImageName, getImages} from '../utils/productUtil';
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

export class ProductDetailsComponent implements OnInit, AfterViewChecked {

  public product: Observable<any>;
  private options: any = [];
  public quantity: any = 1;

  constructor(private route: ActivatedRoute, public data: EntityService, private store: Store, private cloudinary: Cloudinary) {

  }

  ngOnInit(): void {
    this.setImges([]);
    this.product = this.route.queryParams.pipe(
      switchMap(params => {
        const p = {
          id: params.id || ''
        };
        if (p.id !== localStorage.getItem('product')) {
          localStorage.setItem('product', p.id);
          window.location.reload();
        }
        return this.data.products$.pipe(
          filter(value => !!value),
          switchMap((products) =>
            of(products.find((product) => product.id === +p.id)))
        );
      }));
  }

  loads(product): void {
    Init.first();
    Init.qtyBtn();
    this.setImges(product.images);
    Init.productZoom(product.images.map(img => {
      return {src: this.getImage(img.src, {height: 1100, width: 700, crop: 'fill'})};
    }));
    Init.productGallerySlider();
  }

  getImages(str): any[] {
    return getImages(str);
  }

  setImges(images): void {
    const imgs = images.map(img => {
      return {src: this.getImage(img.src, {height: 1100, width: 700, crop: 'fill'}), h: 1100, w: 700};
    });
    Init.galleryPopup(imgs);
  }

  addToCart(): void {
    this.product.subscribe(product => {
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

  ngAfterViewChecked(): void {

  }

  setOption(name: string, option: any): void {
    this.options = this.options.filter(o => o.key !== name);
    this.options.push({key: name, value: option});
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
}
