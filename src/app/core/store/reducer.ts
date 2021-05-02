import {EntityType, ProductActions, ActionTypes} from './actions';


export const removeLocalUser = () => {
  localStorage.removeItem('vizual_user');
};

const removeFromLocalCart = (localCart, productId) => {
  return removeProductFromLocal(localCart, productId);
};

const removeProductFromLocal = (localCart, productId) => {
  const newCart = localCart.filter((cart) => {
    return cart.product.id !== productId;
  });
  localStorage.setItem('vizual_localCart', JSON.stringify(newCart));
  return newCart;
};

const updateFromLocalCart = (localCart, {product, quantity}) => {
  return [...removeFromLocalCart(localCart, product.id), {product, quantity}];
};


export const getLocalWishList = () => {
  return getLocalProduct('vizual_localCart');
};


export const getLocalCart = () => {
  return getLocalProduct('vizual_localCart');
};

const getLocalProduct = (type) => {
  // grab localCart from localStorage
  const cachedCart = localStorage.getItem(type);
  // if so, use cached
  if (cachedCart && cachedCart.length !== 0) {
    console.log('Cart: Using cached!');
    return JSON.parse(cachedCart);
  }
  else {
    return [];
  }
};


const addToWishList = (localCart, {product, quantity}): any[] => {
  return addProductToLocal('vizual_localCart', localCart, {product, quantity});
};

const addToCart = (localCart, {product, quantity}): any[] => {
  return addProductToLocal('vizual_localCart', localCart, {product, quantity});
};

const addProductToLocal = (type, localCart, {product, quantity}): any[] => {
  const checkId = obj => obj.product.id === product.id;
  if (localCart.some(checkId)) {
    console.log('The item you are trying to add is already in your cart!');
    return localCart;
  }
  else {
    const newCart = {product, quantity};
    localStorage.setItem(
      type,
      JSON.stringify([...localCart, newCart])
    );
    return [...localCart, newCart];
  }
};

export interface EntityState {
  toggleCheckBox: boolean;
  entities: Map<string, any[]>;
  loaded: boolean;
  error: Map<string, any>;
}

const initialState: EntityState = {
  toggleCheckBox: true,
  entities: new Map<string, any[]>()
    .set(EntityType.Carts, getLocalCart())
    .set(EntityType.WishList, getLocalCart())
    .set(EntityType.Customers, [])
    .set(EntityType.Orders, []),
  loaded: false,
  error: new Map<string, any>()
};

export function ProductReducer(state = initialState, action: ProductActions): EntityState {
  switch (action.type) {
    case ActionTypes.LoadSuccess:
      console.log(state.entities);
      return {
        ...state,
        entities: state.entities.set(action.cmd, [...action.payload]),
        loaded: true,
        error: state.error.set(action.cmd, '')
      };
    case ActionTypes.Added: {
      console.log(state.entities);
      return {
        ...state,
        entities: state.entities.set(action.cmd, [...state.entities.get(action.cmd), action.payload]),
        loaded: true,
        error: state.error.set(action.cmd, '')
      };
    }
    case ActionTypes.AddVisualCart: {
      console.log(state.entities);
      return {
        ...state,
        entities: state.entities.set(action.cmd, addToCart(getLocalCart(), action.payload)),
        loaded: true,
        error: state.error.set(action.cmd, '')
      };
    }
    case ActionTypes.RemoveVisualCart: {
      console.log(state.entities);
      return {
        ...state,
        entities: state.entities.set(action.cmd, removeFromLocalCart(getLocalCart(), action.payload)),
        loaded: true,
        error: state.error.set(action.cmd, '')
      };
    }
    case ActionTypes.UpdateVisualCart: {
      console.log(state.entities);
      return {
        ...state,
        entities: state.entities.set(action.cmd, updateFromLocalCart(getLocalCart(), action.payload)),
        loaded: true,
        error: state.error.set(action.cmd, '')
      };
    }
    case ActionTypes.AddVisualWishList: {
      console.log(state.entities);
      return {
        ...state,
        entities: state.entities.set(action.cmd, addToCart(getLocalCart(), action.payload)),
        loaded: true,
        error: state.error.set(action.cmd, '')
      };
    }
    case ActionTypes.RemoveVisualWishList: {
      console.log(state.entities);
      return {
        ...state,
        entities: state.entities.set(action.cmd, removeFromLocalCart(getLocalCart(), action.payload)),
        loaded: true,
        error: state.error.set(action.cmd, '')
      };
    }
    case ActionTypes.UpdateVisualWishList: {
      console.log(state.entities);
      return {
        ...state,
        entities: state.entities.set(action.cmd, updateFromLocalCart(getLocalCart(), action.payload)),
        loaded: true,
        error: state.error.set(action.cmd, '')
      };
    }
    case ActionTypes.Remove: {
      return {
        ...state,
        entities: state.entities.set(action.cmd, [...state.entities.get(action.cmd).filter(value => value.id !== action.payload)]),
        loaded: true,
        error: state.error.set(action.cmd, '')
      };
    }
    case ActionTypes.LoadFail: {
      return {
        ...state,
        entities: state.entities,
        loaded: false,
        error: state.error.set(action.cmd, action.payload)
      };
    }
    default:
      return state;
  }
}


