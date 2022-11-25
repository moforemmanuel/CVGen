import axios from "axios";
import Cookies from "js-cookie";
import Router from "next/router";
import { toast } from "react-toastify";
import CV from "../interfaces/cv";
import getError from "../utils/error";

const submitCVHandler = async (input: CV) => {
  console.log(input);
  const user = JSON.parse(Cookies.get("user") as string);
  // console.log(user);
  try {
    const {data} = await axios.post(`/api/postCV`, {
      ...input,
      userID: user._id
    })

    // console.log(data);
    Cookies.set("user", JSON.stringify({...user, cvID: data}));

    toast.success('CV data stored');
    Router.push(Router.query.redirect as string || '/cv')
  } catch (err) {
    toast.error(getError(err))
  }

  return;
}

export default submitCVHandler;