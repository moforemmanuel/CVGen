import axios from "axios"
import Cookies from "js-cookie"
import Router from "next/router"
import React from "react"
import { toast } from "react-toastify"
import { Context } from "../context/Context"
import loginFormValues from "../interfaces/loginForm"
import getError from "../utils/error"

// const {dispatch} = React.useContext(Context);


const loginHandler = async (input: loginFormValues, dispatch: any) => {
  // console.log(input)
  try {
    const {data} = await axios.post('/api/auth/login', {
      email: input['email'],
      password: input['password']
    })
    // console.log(data)
    // store data in cookies
    Cookies.set("user", JSON.stringify(data));
    dispatch({type: 'USER_LOGIN', payload: data})

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