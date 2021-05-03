import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {Init} from '../../../../assets/js/init';
import {ActivatedRoute} from '@angular/router';
import {EntityService} from '../../../core/store/entity.service';
import {filter, map} from 'rxjs/operators';
import {getImages} from '../utils/productUtil';
import * as productActions from '../../../core/store/actions';
import {EntityType} from '../../../core/store/actions';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',

  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit, AfterViewChecked {

  public product: any = null;
  private options: any = [];

  constructor(private route: ActivatedRoute, public data: EntityService, private store: Store) {

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
    Init.productZoom(getImages(this.product.description));
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
    this.store.dispatch(new productActions.AddVisual(EntityType.Carts, {product, quantity: 1, options: this.options}));
    Init.offcanvasOpen();
  }

  addToWithList(product: any): void {
    this.store.dispatch(new productActions.AddVisualWishList(EntityType.WishList, {product, quantity: 1}));
    Init.offcanvasOpenWishlist();
  }

  ngAfterViewChecked(): void {
    console.log('id', this.route.snapshot.queryParams.id);
  }

  setOption(name: string, option: any): void {
    this.options = this.options.filter(o => o.key !== name);
    this.options.push({key: name, value: option});
  }
}
