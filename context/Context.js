import React, { createContext } from 'react';
import Cookies from 'js-cookie';

export const Context = createContext();

const initialState = {
  cart: {
    cartItems: Cookies.get('cartItems') ? Cookies.get('cartItems') : [],
    shippingAddress: Cookies.get('shippingAddress')
      ? Cookies.get('shippingAddress')
      : {},
    paymentMethod: Cookies.get('paymentMethod')
      ? Cookies.get('paymentMethod')
      : '',
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM': {
      const newItem = action.payload;
      const existingItem = state.cart.cartItems.find(
        (item) => item.name === newItem.name
      );
      const cartItems = existingItem
        ? state.cart.cartItems.map((item) =>
            // use new item with updated quantity if exist
            // else use old item
            item.name === existingItem.name ? newItem : item
          )
        : // append new item
          [...state.cart.cartItems, newItem];

      // store cartItems to cookies
      Cookies.set('cartItems', JSON.stringify(cartItems));

      // update cartItems in state
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.name !== action.payload.name
      );
      Cookies.set('cartItems', JSON.stringify(cartItems)); // save
      return { ...state, cart: { ...state.cart, cartItems } }; //update only cart Items
    }

    case 'CART_CLEAR': {
      Cookies.set('cartItems', JSON.stringify([])); // save
      return {
        ...state,
        cart: { ...state.cart, cartItems: [] },
      };
    }

    case 'SAVE_SHIPPING_ADDRESS': {
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload,
        },
      };
    }

    case 'SAVE_PAYMENT_METHOD': {
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: action.payload,
        },
      };
    }

    default:
      return state;
  }
}

export function ContextProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
