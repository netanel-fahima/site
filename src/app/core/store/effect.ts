import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {catchError, debounce, debounceTime, map, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import * as fromProduct from './';
import {Action, select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as actions from './actions';

import {of} from 'rxjs/internal/observable/of';
import {empty} from 'rxjs/internal/observable/empty';
import {WooApi} from '../rest/woo';
import {fromPromise} from 'rxjs/internal-compatibility';
import * as productActions from './actions';
import {EntityType} from './actions';


@Injectable()
export class ProductEffect {


  constructor(private service: WooApi, private action$: Actions, private store: Store<any>) {
  }


  @Effect()
  loadProduct$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.Load),
    mergeMap(({cmd, payload}) => {
      return this.service.getEntity(cmd, payload).pipe(
        map((products) => {
          return new actions.LoadSuccess(cmd, products);
        }),
        catchError(err => of(new actions.LoadFail(cmd, err)))
      );
    })
  );


  @Effect()
  loadCartProduct$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.LoadCart),
    mergeMap(({payload}) => {
      return this.service.getCoCart(payload).pipe(
        map((cart) => {
          return new actions.LoadCartSuccess(cart);
        }),
        catchError(err => of(new actions.LoadFail(EntityType.Carts, err)))
      );
    })
  );

  @Effect()
  loadNextProducts$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.NextPage),
    mergeMap(({cmd, payload}) => {
      return this.service.getEntity(cmd, payload).pipe(
        map((products) => {
          return new actions.Added(cmd, products);
        }),
        catchError(err => of(new actions.LoadFail(cmd, err)))
      );
    })
  );

  @Effect()
  readProduct$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.Read),
    mergeMap(({cmd, payload}) => {
      // @ts-ignore
      return this.service.getEntity(cmd.replace('<id>', payload.id)).pipe(
        map((products) => {
          return new actions.LoadSuccess(cmd, [].concat(products));
        }),
        catchError(err => of(new actions.LoadFail(cmd, err)))
      );
    })
  );

  @Effect()
  updateProduct$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.Updating),
    mergeMap(({cmd, payload}) => {
      return fromPromise(
        // @ts-ignore
        this.service.updateEntity(cmd.replace('<id>', payload.id), payload))
        .pipe(
          map(value => {
            if (value?.message) {
              return new actions.LoadFail(cmd, value?.message);
            }
            return new actions.Added(cmd, value);
          }),
          catchError(err => of(new actions.LoadFail(cmd, err)))
        );
    })
  );


  @Effect()
  addCoupon$: Observable<any> = this.action$.pipe(
    ofType(actions.ActionTypes.AddingCoupon),
    switchMap(({payload, cmd}) => {
      return fromPromise(
        this.service.postCoupon(cmd, payload))
        .pipe(
          map((value: any) => {
            if (value?.message) {
              return new actions.LoadFail(cmd, value?.message);
            }
            return new actions.AddCoupon(cmd, value);
          }),
          catchError(err => of(new actions.LoadFail(cmd, err)))
        );
    })
  );


  @Effect()
  addCartItem$: Observable<any> = this.action$.pipe(
    ofType(actions.ActionTypes.AddingVisualCart),
    switchMap(({payload, cmd}) => {
      return fromPromise(
        this.service.postCoCart(cmd, payload))
        .pipe(
          map((value: any) => {
            if (value?.message) {
              return new actions.LoadFail(cmd, value?.message);
            }
            return new actions.AddVisual(cmd, value);
          }),
          catchError(err => of(new actions.LoadFail(cmd, err)))
        );
    })
  );

  @Effect()
  removeCartItem$: Observable<any> = this.action$.pipe(
    ofType(actions.ActionTypes.RemoveVisualCart),
    switchMap(({payload, cmd}) => {
      return fromPromise(
        this.service.deleteCoCart(payload))
        .pipe(
          map((value: any) => {
            if (value?.message) {
              return new actions.LoadFail(cmd, value?.message);
            }
            return new actions.LoadCartSuccess(value);
          }),
          catchError(err => of(new actions.LoadFail(cmd, err)))
        );
    })
  );


  @Effect()
  addProduct$: Observable<any> = this.action$.pipe(
    ofType(actions.ActionTypes.Add),
    switchMap(({payload, cmd}) => {
      return fromPromise(
        this.service.addEntity(cmd, payload))
        .pipe(
          map(value => {
            if (value?.message) {
              return new actions.LoadFail(cmd, value?.message);
            }
            return new actions.Added(cmd, value);
          }),
          catchError(err => of(new actions.LoadFail(cmd, err)))
        );
    })
  );

  @Effect()
  removeProduct$: Observable<any> = this.action$.pipe(
    ofType(actions.ActionTypes.Remove),
    switchMap(({payload, cmd}, index) => {

      return this.service.deleteEntity(payload, cmd).catch(reason => {
        console.error(reason);
      });
    })
  );

}
