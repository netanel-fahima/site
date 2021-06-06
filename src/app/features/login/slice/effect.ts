import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {map, switchMap} from 'rxjs/operators';
import {Action} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import * as actions from './actions';
import {WooApi} from '../../../core/rest/woo';
import {fromPromise} from 'rxjs/internal-compatibility';
import {addLocalUser, getLocalUser, removeLocalUser} from '../../../core/localStore/loadStorage';
import {EntityType} from '../../../core/store/actions';


@Injectable()
export class LoginEffect {

  constructor(private service: WooApi, private action$: Actions) {
  }

  @Effect()
  loginUser$: Observable<Action> = this.action$.pipe(
    ofType(actions.UserAction.Login),
    switchMap(({payload: {username}}) => {
      removeLocalUser();
      return this.service.getEntity(EntityType.Customers, {}).pipe(
        map((users) => {
          users.forEach(user => {
            if (user.username === username) {
              addLocalUser(user);
            }
          });
          if (!getLocalUser()) {
            return new actions.Err({l: 'שם משתמש או סיסמה אינם נכונים', r: ''});
          }
          return new actions.Load(getLocalUser());
        })
      );
    })
  );

  @Effect()
  addProduct$: Observable<any> = this.action$.pipe(
    ofType(actions.UserAction.Register),
    switchMap(({payload}) => {
      return fromPromise(
        this.service.addEntity(EntityType.Customers, payload))
        .pipe(
          map(value => {
            if (value?.message) {
              return new actions.Err({l: '', r: value?.message});
            }
            return new actions.Login(payload);
          })
        );
    })
  );
}
