import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {Init} from '../../../assets/js/init';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {EntityService} from '../../core/store/entity.service';
import * as productActions from '../../core/store/actions';
import {EntityType} from '../../core/store/actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, AfterViewChecked {

  public cart: any[];

  constructor(public data: EntityService, private store: Store) {
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
      this.store.dispatch(new productActions.UpdateVisualCart(EntityType.Carts, item));
    });
  }


  removeCart(cart: any) {
    this.store.dispatch(new productActions.RemoveVisualCart(EntityType.Carts, cart.product.id));
  }
}
