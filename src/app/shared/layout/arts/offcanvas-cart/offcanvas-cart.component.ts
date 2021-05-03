import {AfterViewInit, Component, OnInit} from '@angular/core';
import {EntityService} from '../../../../core/store/entity.service';
import {Store} from '@ngrx/store';
import * as productActions from '../../../../core/store/actions';
import {EntityType} from '../../../../core/store/actions';
import {getImageName} from '../../../../features/product/utils/productUtil';
import {Cloudinary} from '@cloudinary/angular-5.x';

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
    this.store.dispatch(new productActions.RemoveVisualCart(EntityType.Carts, cart.product.id));
  }


  getImages(product: any): string {
    try {
      const src = product.images?.[0].src ? this.cloudinary.url(getImageName(product.images?.[0].src),
        {height: 100, width: 75, crop: 'fill'}) : 'assets/images/product/cart-product-1.jpg';
      console.log(src);
      return src;
    }
    catch (e) {
      return 'assets/images/product/cart-product-1.jpg';
    }
  }

}
