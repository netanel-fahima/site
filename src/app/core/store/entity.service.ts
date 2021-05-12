import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import * as productActions from './actions';
import {EntityType} from './actions';
import * as fromProduct from './';
import {select, Store} from '@ngrx/store';
import {filter, switchMap, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs/internal/observable/of';
import {getUser} from '../../features/login/slice/actions';
import {Init} from '../../../assets/js/init';


@Injectable()
export class EntityService {

  public users$: Observable<any>;
  public error$: Observable<any>;

  public cart$: Observable<any[]>;
  public wishlist$: Observable<any[]>;
  public products$: Observable<any[]>;
  public categories$: Observable<any[]>;
  public orders$: Observable<any[]>;
  public delivery$: Observable<any[]>;

  constructor(private store: Store) {
    this.store.dispatch(new productActions.Load(EntityType.Customers));
    this.store.dispatch(new productActions.Load(EntityType.Categories));
    this.store.dispatch(new productActions.Load(EntityType.Products));
    this.store.dispatch(new productActions.Load(EntityType.Customers));
    this.categories$ = this.store.pipe(select(fromProduct.getEntities, {cmd: EntityType.Categories}));
    this.products$ = this.store.pipe(select(fromProduct.getEntities, {cmd: EntityType.Products}));
    this.cart$ = this.store.pipe(select(fromProduct.getEntities, {cmd: EntityType.Carts}));
    this.wishlist$ = this.store.pipe(select(fromProduct.getEntities, {cmd: EntityType.WishList}));
    this.orders$ = this.store.pipe(select(fromProduct.getEntities, {cmd: EntityType.Orders}));
    this.users$ = this.store.select(getUser);
    this.error$ = this.store.pipe(select(fromProduct.getError));
    this.delivery$ = this.store.pipe(select(fromProduct.getEntities, {cmd: EntityType.Delivery}));
  }

  public totalCart(): Observable<any> {
    return this.cart$.pipe(
      withLatestFrom(this.delivery$),
      switchMap(([cart, delivery]) => {
        const total = cart.reduce((previousValue, currentValue) => {
          return previousValue += Number(currentValue.product.price) * currentValue.quantity;
        }, 0);
        console.log('total', total);
        // @ts-ignore
        return of(total + (+delivery?.settings?.cost?.value || 0));
      }));
  }

  addToCart(product: any): void {
    this.store.dispatch(new productActions.AddVisual(EntityType.Carts, {product, quantity: 1}));
    const sub = this.cart$.subscribe(() => {
      sub.unsubscribe();
      Init.offcanvasOpen();
    });
  }
}

