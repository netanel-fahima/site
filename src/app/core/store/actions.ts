import {Action} from '@ngrx/store';


export enum ActionTypes {
  Load = '[Product] Load',
  LoadSuccess = '[Product] Load Success',
  LoadFail = '[Product] Load Fail',
  Add = '[Product] Add',
  Added = '[Product] Added',
  Remove = '[Product] Remove',
  Update = '[Product] Update',

  AddVisualCart = '[Cart] Add Visual',
  RemoveVisualCart = '[Cart] Remove Visual',
  UpdateVisualCart = '[Cart] Update Visual',
  AddVisualWishList = '[WishList] Add Visual',
  RemoveVisualWishList = '[WishList] Remove Visual',
  UpdateVisualWishList = '[WishList] Update Visual',
  AddDeliveryVisual = '[Delivery] Add Visual Delivery',
}

export enum EntityType {
  OrdersNote = 'orders',
  Orders = 'orders',
  Products = 'products',
  Carts = 'carts',
  WishList = 'wishList',
  Customers = 'customers',
  Categories = 'products/categories',
  ShippingMethods = 'shipping/zones/1/methods',
  Delivery = 'delivery'
}

export abstract class EntityAction implements Action {
  type: string;

  protected constructor(public cmd: string) {
  }
}


export class UpdateVisualWishList extends EntityAction {
  readonly type = ActionTypes.UpdateVisualWishList;

  constructor(public cmd: string, public payload: any) {
    super(cmd);
  }
}

export class RemoveVisualWishList extends EntityAction {
  readonly type = ActionTypes.RemoveVisualWishList;

  constructor(public cmd: string, public payload: number) {
    super(cmd);
  }
}


export class UpdateVisualCart extends EntityAction {
  readonly type = ActionTypes.UpdateVisualCart;

  constructor(public cmd: string, public payload: any) {
    super(cmd);
  }
}

export class RemoveVisualCart extends EntityAction {
  readonly type = ActionTypes.RemoveVisualCart;

  constructor(public cmd: string, public payload: number) {
    super(cmd);
  }
}


export class Update extends EntityAction {
  readonly type = ActionTypes.Update;

  constructor(public cmd: string, public payload: object) {
    super(cmd);
  }
}

export class Remove extends EntityAction {
  readonly type = ActionTypes.Remove;

  constructor(public cmd: string, public payload: number) {
    super(cmd);
  }
}


export class Added extends EntityAction {
  readonly type = ActionTypes.Added;

  constructor(public cmd: string, public payload: any) {
    super(cmd);
  }
}

export class Add extends EntityAction {
  readonly type = ActionTypes.Add;

  constructor(public cmd: string, public payload: any) {
    super(cmd);
  }
}


export class AddVisualWishList extends EntityAction {
  readonly type = ActionTypes.AddVisualWishList;

  constructor(public cmd: string, public payload: any) {
    super(cmd);
  }
}

export class AddDeliveryVisual extends EntityAction {
  readonly type = ActionTypes.AddDeliveryVisual;

  constructor(public cmd: string, public payload: any) {
    super(cmd);
  }
}


export class AddVisual extends EntityAction {
  readonly type = ActionTypes.AddVisualCart;

  constructor(public cmd: string, public payload: any) {
    super(cmd);
  }
}

export class Load extends EntityAction {
  readonly type = ActionTypes.Load;

  constructor(public cmd: string) {
    super(cmd);
  }
}

export class LoadSuccess extends EntityAction {
  readonly type = ActionTypes.LoadSuccess;

  constructor(public cmd: string, public payload: any[]) {
    super(cmd);
  }
}

export class LoadFail extends EntityAction {
  readonly type = ActionTypes.LoadFail;

  constructor(public cmd: string, public payload: string) {
    super(cmd);
  }

}

// Union the valid types
export type ProductActions = Load
  | LoadSuccess
  | LoadFail
  | Add
  | Added
  | Remove
  | Update
  | AddVisual
  | RemoveVisualCart
  | UpdateVisualCart
  | AddVisualWishList
  | AddDeliveryVisual
  | RemoveVisualWishList
  | UpdateVisualWishList;
;


