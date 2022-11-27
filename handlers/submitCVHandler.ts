import axios from "axios";
import Cookies from "js-cookie";
import Router from "next/router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import CV from "../interfaces/cv";
import getError from "../utils/error";

const submitCVHandler = async (input: CV) => {
  console.log(input);
  const user = JSON.parse(Cookies.get("user") as string);
  // console.log(user);
  Swal.fire('Please wait ...')
  Swal.showLoading()
  try {
    // Swal.fire()
    const {data} = await axios.post(`/api/postCV`, {
      ...input,
      userID: user._id
    })
    Swal.close()
    // console.log(data);
    Cookies.set("user", JSON.stringify({...user, cvID: data}));

    toast.success('CV data stored');
    Router.push(`${data}/${user._id}/cv`)
  } catch (err) {
    Swal.close()

    toast.error(getError(err))
  }

  return;
}

export default submitCVHandler;