import {ActionReducerMap} from '@ngrx/store';
import {RouterReducerState} from '@ngrx/router-store';
import * as navigation from './navigation';
import * as router from './router';

export interface AppState {
  navigation: navigation.NavigationState;
  router: RouterReducerState<router.RouterStateUrl>;
}

export const reducers: ActionReducerMap<AppState> = {
  navigation: navigation.reducer,
  router: router.reducer
};





