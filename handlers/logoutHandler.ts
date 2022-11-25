import Cookies from "js-cookie"
import Router from "next/router";
import { toast } from "react-toastify";

const logoutHandler = () => {
  Cookies.remove("user");
  toast.success('Logout Successful');
  Router.push(`/auth/login?redirect=${Router.pathname}`)
}

export default logoutHandler