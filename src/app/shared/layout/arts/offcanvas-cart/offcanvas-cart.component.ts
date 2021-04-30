import {AfterViewInit, Component, NgZone, OnInit} from '@angular/core';
import {EntityService} from '../../../../core/store/entity.service';
import {Store} from '@ngrx/store';
import * as productActions from '../../../../core/store/actions';
import {EntityType} from '../../../../core/store/actions';

@Component({
  selector: 'app-offcanvas-cart',
  templateUrl: './offcanvas-cart.component.html',
  styleUrls: ['./offcanvas-cart.component.css']
})

export class OffcanvasCartComponent implements OnInit, AfterViewInit {


  constructor(public data: EntityService, private store: Store) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
  }

  removeCart(cart): void {
    this.store.dispatch(new productActions.RemoveVisualCart(EntityType.Carts, cart.product.id));
  }


}
