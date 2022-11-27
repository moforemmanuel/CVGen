import Cookies from "js-cookie"
import Router from "next/router";
import React from "react";
import { toast } from "react-toastify";
import { Context } from "../context/Context";

// const {state, dispatch} = React.useContext(Context);

const logoutHandler = () => {
  Cookies.remove("user");
  // dispatch({type:'USER_LOGOUT'});
  toast.success('Logout Successful');
  Router.push(`/auth/login?redirect=${Router.pathname}`)
}

export default logoutHandler