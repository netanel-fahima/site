import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {Init} from '../../../../assets/js/init';
import {ActivatedRoute} from '@angular/router';
import {EntityService} from '../../../core/store/entity.service';
import {filter, map} from 'rxjs/operators';
import {getImageName, getImages} from '../utils/productUtil';
import * as productActions from '../../../core/store/actions';
import {EntityType} from '../../../core/store/actions';
import {Store} from '@ngrx/store';
import {Cloudinary} from '@cloudinary/angular-5.x';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',

  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit, AfterViewChecked {

  public product: any = null;
  private options: any = [];
  public quantity: any = 1;

  constructor(private route: ActivatedRoute, public data: EntityService, private store: Store, private cloudinary: Cloudinary) {

  }

  ngOnInit(): void {
    console.log('id', this.route.snapshot.queryParams.id);
    this.setImges('');
    this.data.products$.pipe(
      filter(value => !!value),
      map((pp) =>
        pp.filter((p, index) => p.id === +this.route.snapshot.queryParams.id)
      )
    ).subscribe(products => {
      this.product = products[0];
    });
  }

  loads(): void {
    Init.first();
    Init.qtyBtn();

    this.setImges(this.product.description);
    Init.productZoom(this.product.images);
    Init.productGallerySlider();
  }

  getImages(str): any[] {
    return getImages(str);
  }

  setImges(str): void {
    const imgs = getImages(str).map(value => {
      return {src: value, w: 700, h: 1100};
    });
    Init.galleryPopup(imgs);
  }

  addToCart(product: any): void {
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
  }

  addToWithList(product: any): void {
    this.store.dispatch(new productActions.AddVisualWishList(EntityType.WishList, {product, quantity: 1}));
    Init.offcanvasOpenWishlist();
  }

  ngAfterViewChecked(): void {

  }

  setOption(name: string, option: any): void {
    this.options = this.options.filter(o => o.key !== name);
    this.options.push({key: name, value: option});
  }


  getImage(img: any): string {
    try {
      const src = this.cloudinary.url(getImageName(img), {height: 900, width: 600, crop: 'fill'});
      console.log(src);
      return src;
    }
    catch (e) {
      return '';
    }
  }
}
