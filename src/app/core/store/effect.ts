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


@Injectable()
export class ProductEffect {


  constructor(private service: WooApi, private action$: Actions, private store: Store<any>) {
  }


  @Effect()
  loadProduct$: Observable<Action> = this.action$.pipe(
    ofType(actions.ActionTypes.Load),
    mergeMap(({cmd}) => {

      console.log('LOADING DATA', cmd);
      return this.store.pipe(select(fromProduct.getLoaded, {cmd})).pipe(
        switchMap(loaded => {
          if (loaded) {
            return empty();
          }
          return this.service.getEntity(cmd).pipe(
            map((products) => {
              return new actions.LoadSuccess(cmd, products);
            }),
            catchError(err => of(new actions.LoadFail(cmd, err)))
          );
        })
      );
    })
  );

  @Effect()
  addProduct$: Observable<any> = this.action$.pipe(
    ofType(actions.ActionTypes.Add),
    mergeMap(({payload, cmd}) => {
      return fromPromise(
        this.service.addEntity(cmd, payload)
          .then(value => {
            if (value?.message) {
              return new actions.LoadFail(cmd, value?.message);
            }
            return value;
          }))
        .pipe(
          map(value => new actions.Added(cmd, payload)),
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
