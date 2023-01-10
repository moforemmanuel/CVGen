import axios from "axios";
import Cookies from "js-cookie";
import Router from "next/router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import CV from "../interfaces/cv";
import getError from "../utils/error";

function formatDate(date: Date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

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
      jobStartDate: formatDate(input.jobStartDate),
      jobEndDate: formatDate(input.jobEndDate),
      collegeStartDate: formatDate(input.collegeStartDate),
      collegeEndDate: formatDate(input.collegeEndDate),
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