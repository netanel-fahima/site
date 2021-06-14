import {EntityType, ProductActions, ActionTypes} from './actions';


export const removeLocalUser = () => {
  localStorage.removeItem('vizual_user');
};

const removeFromLocalCart = (localCart, productId, options) => {
  return removeProductFromLocal(localCart, productId, options);
};

const removeProductFromWishList = (localCart, productId) => {
  const newCart = localCart.filter((cart) => {
    return cart.product.id !== productId;
  });
  localStorage.setItem('vizual_localWishList', JSON.stringify(newCart));
  return newCart;
};

const removeProductFromLocal = (localCart, productId, options) => {
  const newCart = localCart.filter((cart) => {
    return !(
      (!options.length || options.some(a1 => {
        return cart.options.map(a => a.value)
          .includes(a1.value);
      })) && cart.product.id === productId);
  });
  localStorage.setItem('vizual_localCart', JSON.stringify(newCart));
  return newCart;
};


const updateFromLocalWishList = (localCart, {product, quantity}) => {
  const newCart = [...removeProductFromWishList(localCart, product.id), {product, quantity}];
  localStorage.setItem('vizual_localWishList', JSON.stringify(newCart));
  return newCart;
};

const updateFromLocalCart = (localCart, {product, quantity, options}) => {
  const newCart = [...removeFromLocalCart(localCart, product.id, options), {product, quantity, options}];
  localStorage.setItem('vizual_localCart', JSON.stringify(newCart));
  return newCart;
};


export const getLocalWishList = () => {
  return getLocalProduct('vizual_localWishList');
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


const addToWishList = (localCart, {product, quantity, options}): any[] => {
  return addProductToLocal('vizual_localWishList', localCart, {product, quantity, options});
};

const addToCart = (localCart, {product, quantity, options}): any[] => {
  return addProductToLocal('vizual_localCart', localCart, {product, quantity, options});
};

const addProductToLocal = (type, localCart, {product, quantity, options = []}): any[] => {
  const newCart = {product, quantity, options};
  const checkId = obj => {
    return obj.product.id === product.id
      && (!options.length || options.some(a1 => {
        return obj.options.map(a => a.value)
          .includes(a1.value);
      }));
  };
  if (localCart.some(checkId)) {
    console.log('The item you are trying to add is already in your cart!');
    return updateFromLocalCart(localCart, newCart);
  }
  else {
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
  loaded: Map<string, boolean>;
  error: Map<string, any>;
}

const initialState: EntityState = {
  toggleCheckBox: true,
  entities: new Map<string, any[]>()
    .set(EntityType.Carts, getLocalCart())
    .set(EntityType.WishList, getLocalWishList())
    .set(EntityType.Customers, [])
    .set(EntityType.Orders, [])
    .set(EntityType.Products, [])
    .set(EntityType.Delivery, null)
    .set(EntityType.ProductsVariations, null)
    .set(EntityType.Product, null),
  loaded: new Map<string, boolean>()
    .set(EntityType.Carts, false)
    .set(EntityType.WishList, false)
    .set(EntityType.Customers, false)
    .set(EntityType.Orders, false)
    .set(EntityType.ProductsVariations, false)
    .set(EntityType.Product, false),
  error: new Map<string, any>()
};

function updateEntity(entities: any[], payload: any): any[] {
  entities = entities.filter(entity => entity.id !== payload.id);
  entities.push(payload);
  return entities;
}

export function ProductReducer(state = initialState, action: ProductActions): EntityState {
  switch (action.type) {
    case ActionTypes.LoadSuccess:
      return {
        ...state,
        entities: state.entities.set(action.cmd, [...action.payload]),
        loaded: state.loaded.set(action.cmd, false),
        error: state.error.set(action.cmd, '')
      };
    case ActionTypes.Load: {
      return {
        ...state,
        entities: state.entities,
        loaded: state.loaded.set(action.cmd, true),
        error: state.error.set(action.cmd, '')
      };
    }
    case ActionTypes.NextPage: {
      return {
        ...state,
        entities: state.entities,
        loaded: state.loaded.set(action.cmd, true),
        error: state.error.set(action.cmd, '')
      };
    }
    case ActionTypes.Read: {
      return {
        ...state,
        entities: state.entities,
        loaded: state.loaded.set(action.cmd, true),
        error: state.error.set(action.cmd, '')
      };
    }
    case ActionTypes.Added: {
      return {
        ...state,
        entities: state.entities.set(action.cmd, state.entities.get(action.cmd).concat(action.payload)),
        loaded: state.loaded.set(action.cmd, false),
        error: state.error.set(action.cmd, '')
      };
    }
    case ActionTypes.Update: {
      return {
        ...state,
        entities: state.entities.set(action.cmd, updateEntity(state.entities.get(action.cmd), action.payload)),
        loaded: state.loaded.set(action.cmd, false),
        error: state.error.set(action.cmd, '')
      };
    }
    case ActionTypes.Add: {
      return {
        ...state,
        entities: state.entities,
        loaded: state.loaded.set(action.cmd, true),
        error: state.error.set(action.cmd, '')
      };
    }
    case ActionTypes.AddVisualCart: {
      return {
        ...state,
        entities: state.entities.set(action.cmd, addToCart(getLocalCart(), action.payload)),
        loaded: state.loaded.set(action.cmd, false),
        error: state.error.set(action.cmd, '')
      };
    }
    case ActionTypes.RemoveVisualCart: {
      return {
        ...state,
        entities: state.entities.set(action.cmd, removeFromLocalCart(getLocalCart(), action.payload.id, action.payload.options)),
        loaded: state.loaded.set(action.cmd, false),
        error: state.error.set(action.cmd, '')
      };
    }
    case ActionTypes.UpdateVisualCart: {
      return {
        ...state,
        entities: state.entities.set(action.cmd, updateFromLocalCart(getLocalCart(), action.payload)),
        loaded: state.loaded.set(action.cmd, false),
        error: state.error.set(action.cmd, '')
      };
    }
    case ActionTypes.AddVisualWishList: {
      return {
        ...state,
        entities: state.entities.set(action.cmd, addToWishList(getLocalWishList(), action.payload)),
        loaded: state.loaded.set(action.cmd, false),
        error: state.error.set(action.cmd, '')
      };
    }
    case ActionTypes.AddDeliveryVisual: {
      return {
        ...state,
        entities: state.entities.set(action.cmd, action.payload),
        loaded: state.loaded.set(action.cmd, false),
        error: state.error.set(action.cmd, '')
      };
    }
    case ActionTypes.RemoveVisualWishList: {
      return {
        ...state,
        entities: state.entities.set(action.cmd, removeProductFromWishList(getLocalWishList(), action.payload)),
        loaded: state.loaded.set(action.cmd, false),
        error: state.error.set(action.cmd, '')
      };
    }
    case ActionTypes.UpdateVisualWishList: {
      return {
        ...state,
        entities: state.entities.set(action.cmd, updateFromLocalWishList(getLocalWishList(), action.payload)),
        loaded: state.loaded.set(action.cmd, false),
        error: state.error.set(action.cmd, '')
      };
    }
    case ActionTypes.Remove: {
      return {
        ...state,
        entities: state.entities.set(action.cmd, [...state.entities.get(action.cmd).filter(value => value.id !== action.payload)]),
        loaded: state.loaded.set(action.cmd, false),
        error: state.error.set(action.cmd, '')
      };
    }
    case ActionTypes.LoadFail: {
      return {
        ...state,
        entities: state.entities,
        loaded: state.loaded.set(action.cmd, false),
        error: state.error.set(action.cmd, action.payload)
      };
    }
    default:
      return state;
  }
}


