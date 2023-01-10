import Cookies from "js-cookie";
import Router from "next/router";
import React, { Dispatch } from "react";
import { toast } from "react-toastify";
import { Context } from "../context/Context";

// const {dispatch} = React.useContext(Context);

const logoutHandler = (dispatch: any) => {

  Cookies.remove("user");
  dispatch({type:'USER_LOGOUT'});
  Router.push(`/auth/login?redirect=${Router.pathname}`)
  toast.success('Logout Successful');
}

export default logoutHandler;