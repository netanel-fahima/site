import * as fromProduct from './reducer';


import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromUser from '../../features/login/slice/reducer';

export interface State {
  productFeature: fromProduct.EntityState;
  userFeature: fromUser.UserState;
}

export const reducers: ActionReducerMap<State> = {
  productFeature: fromProduct.ProductReducer,
  userFeature: fromUser.LoginReducer
};

const getProductFeatureState = createFeatureSelector<fromProduct.EntityState>('productFeature');

export const getUser = createSelector(
  getProductFeatureState,
  (state, {cmd}) => {
    return state.entities.get(cmd);
  }
);

export const getEntities = createSelector(
  getProductFeatureState,
  (state, {cmd}) => {
    return state.entities.get(cmd);
  }
);

export const getCart = createSelector(
  getProductFeatureState,
  (state) => {
    return state.cart?.items;
  }
);


export const getCartDetails = createSelector(
  getProductFeatureState,
  (state) => {
    return state.cart;
  }
);

export const getLoaded = createSelector(
  getProductFeatureState,
  (state, {cmd}) => {
    return state.loaded.get(cmd);
  }
);

export const getError = createSelector(
  getProductFeatureState,
  (state, {cmd}) => {
    return state.error.get(cmd);
  }
);
