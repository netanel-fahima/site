import {AfterContentChecked, AfterViewChecked, Component, Input, OnInit} from '@angular/core';
import {EntityService} from '../../core/store/entity.service';
import {Observable} from 'rxjs/internal/Observable';
import * as productActions from '../../core/store/actions';
import {EntityType} from '../../core/store/actions';
import {select, Store} from '@ngrx/store';
import * as fromProduct from '../../core/store';
import {map} from 'rxjs/operators';
import {removeLocalUser} from '../../core/localStore/loadStorage';
import * as actions from '../login/slice/actions';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, AfterViewChecked {

  orders$: Observable<any>;

  constructor(public data: EntityService, private store: Store) {

    this.data.users$.subscribe(user => {
      this.orders$ = this.data.orders$.pipe(map(orders => orders.filter(order => order.customer_id === user.id)));
    });
  }

  ngOnInit(): void {

  }

  ngAfterViewChecked(): void {

  }

  signOut(): void {
    removeLocalUser();
    this.store.dispatch(new actions.Load(null));
  }

  load(): void {
    this.store.dispatch(new productActions.Load(EntityType.Orders));
  }

}
