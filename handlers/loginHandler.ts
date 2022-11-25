import axios from "axios"
import Cookies from "js-cookie"
import Router from "next/router"
import { toast } from "react-toastify"
import loginFormValues from "../interfaces/loginForm"
import getError from "../utils/error"

const loginHandler = async (input: loginFormValues) => {
  // console.log(input)
  try {
    const {data} = await axios.post('/api/auth/login', {
      matricule: input['matricule'],
      password: input['password']
    })
    // console.log(data)
    // store data in cookies
    Cookies.set("user", JSON.stringify(data));

    // store login
    if (input.rememberMe) {
      Cookies.set("rememberMe", JSON.stringify(input.rememberMe));
      Cookies.set("rememberLoginValues", JSON.stringify(input))
    } else {
      Cookies.get("rememberMe") && Cookies.remove("rememberMe");
      Cookies.get("rememberLoginValues") && Cookies.remove("rememberLoginValues");
    }

    // redirect to redirect query or home
    Router.push(Router.query.redirect as string || '/')
    toast.success(`Welcome ${data.firstName}`)

  } catch (err) {
    toast.error(getError(err))
  }
}

export default loginHandler