import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import * as productActions from './actions';
import {EntityType} from './actions';
import * as fromProduct from './';
import {select, Store} from '@ngrx/store';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';
import {getUser} from '../../features/login/slice/actions';


@Injectable()
export class EntityService {

  public users$: Observable<any>;
  public error$: Observable<any>;

  public cart$: Observable<any[]>;
  public wishlist$: Observable<any[]>;
  public products$: Observable<any[]>;
  public categories$: Observable<any[]>;

  constructor(private store: Store) {
    this.store.dispatch(new productActions.Load(EntityType.Customers));
    this.store.dispatch(new productActions.Load(EntityType.Categories));
    this.store.dispatch(new productActions.Load(EntityType.Products));
    this.store.dispatch(new productActions.Load(EntityType.Customers));
    this.categories$ = this.store.pipe(select(fromProduct.getEntities, {cmd: EntityType.Categories}));
    this.products$ = this.store.pipe(select(fromProduct.getEntities, {cmd: EntityType.Products}));
    this.cart$ = this.store.pipe(select(fromProduct.getEntities, {cmd: EntityType.Carts}));
    this.wishlist$ = this.store.pipe(select(fromProduct.getEntities, {cmd: EntityType.Orders}));
    this.users$ = this.store.select(getUser);
    this.error$ = this.store.pipe(select(fromProduct.getError));
  }

  public totalCart(): Observable<any> {
    return this.cart$.pipe(
      switchMap(cart => {
        const total = cart.reduce((previousValue, currentValue) => {
          return previousValue += Number(currentValue.product.price);
        }, 0);
        console.log('total', total);
        return of(total);
      }));
  }

  public getUser() {
    return 'GUEST';
  }
}

