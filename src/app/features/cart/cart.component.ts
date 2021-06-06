import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {Init} from '../../../assets/js/init';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {EntityService} from '../../core/store/entity.service';
import * as productActions from '../../core/store/actions';
import {EntityType} from '../../core/store/actions';
import {getImageName} from '../product/utils/productUtil';
import {Cloudinary} from '@cloudinary/angular-5.x';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, AfterViewChecked {

  public cart: any[];

  constructor(public data: EntityService, private store: Store, private cloudinary: Cloudinary) {
    this.data.cart$.subscribe(value => {
      this.cart = value;
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {
    Init.first();
    Init.qtyBtn();
  }

  alert(quantity: any) {
    alert(quantity);
  }

  updateCart() {
    this.cart.forEach(item => {
      if (item.product.stock_quantity && item.product.stock_quantity < item.quantity) {
        alert(` אין מספיק כמות מהמוצר "${item.product.name}" נשארו ${item.product.stock_quantity}`);
        return;
      }
      this.store.dispatch(new productActions.UpdateVisualCart(EntityType.Carts, item));
    });
  }

  removeCart(cart: any) {
    this.store.dispatch(new productActions.RemoveVisualCart(EntityType.Carts, {id: cart.product.id, options: cart.options}));
  }

  getImage(imgs: any): string {
    try {
      const src = imgs?.[0] ? this.cloudinary.url(imgs[0].name,
        {height: 100, width: 75, crop: 'fill'}) : 'assets/images/product/cart-product-1.jpg';
      return src;
    }
    catch (e) {
      return 'assets/images/product/cart-product-1.jpg';
    }
  }
}
