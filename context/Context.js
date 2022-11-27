import React, { createContext } from 'react';
import Cookies from 'js-cookie';

export const Context = createContext();

const initialState = {
  user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {},
};

function reducer(state, action) {
  switch (action.type) {
    case 'USER_LOGIN': {
      Cookies.set('user', JSON.stringify(action.payload));
      return { ...state, user: action.payload };
    }

    case 'SAVE_CV': {
      let user = JSON.parse(Cookies.get('user'));
      user = { ...user, cvID: action.payload };
      Cookies.set('user', JSON.stringify(user));
      return { ...state, user };
    }

    case 'USER_LOGOUT': {
      Cookies.remove('user');
      return { ...state, user: undefined };
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
