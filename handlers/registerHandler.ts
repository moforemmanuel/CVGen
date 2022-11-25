import axios from "axios";
import Router from "next/router";
import { toast } from "react-toastify";
import FormValues from "../interfaces/form";
import getError from "../utils/error";


const registerHandler = async (input: FormValues) => {
  if (input.confirmPassword != input.password) {
    toast.error("Passwords Do Not Match");
    return;
  }

  try {
    const {data} = await axios.post('/api/auth/signup', 
      input
    );

    toast.success(`Account Created`);
    Router.push('/auth/login');
  } catch (err) {
    toast.error(getError(err));
  }
}

export default registerHandler