import {AfterViewInit, Component, OnInit} from '@angular/core';
import {EntityService} from '../../../../core/store/entity.service';
import {Store} from '@ngrx/store';
import * as productActions from '../../../../core/store/actions';
import {EntityType} from '../../../../core/store/actions';
import {getImageName} from '../../../../features/product/utils/productUtil';
import {Cloudinary} from '@cloudinary/angular-5.x';
import {Init} from '../../../../../assets/js/init';

@Component({
  selector: 'app-offcanvas-cart',
  templateUrl: './offcanvas-cart.component.html',
  styleUrls: ['./offcanvas-cart.component.css']
})

export class OffcanvasCartComponent implements OnInit, AfterViewInit {


  constructor(public data: EntityService, private store: Store, private cloudinary: Cloudinary) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
  }

  removeCart(cart): void {
    this.store.dispatch(new productActions.RemoveVisualCart(EntityType.Carts, {id: cart.product.id, options: cart.options}));
  }


  getImages(product: any): string {
    const image = product?.image ? product?.image : product?.images?.length ? product.images[0] : null;
    try {
      const src = image ? this.cloudinary.url(image.name,
        {height: 100, width: 75, crop: 'fill'}) : 'assets/images/product/cart-product-1.jpg';
      return src;
    }
    catch (e) {
      return 'assets/images/product/cart-product-1.jpg';
    }
  }

  closeCart(): void {
    Init.offcanvasClose();
  }
}
