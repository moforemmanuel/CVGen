// @ts-nocheck

import html2canvas from "html2canvas"
import jsPDF from "jspdf";

const handleDownload = () => {
  // @ts-ignore
  const content = document.getElementById("cvContent");
  const parent = document.getElementById("parent");
  html2canvas(document.querySelector("#cvContent")).then((canvas) => {
    let base64image = canvas.toDataURL('image/png');
    // console.log(base64image)

    let pdf = new jsPDF('p', 'px', [1600, 1131]);
    pdf.addImage(base64image, 'PNG', 15, 15, content?.offsetWidth, content?.offsetHeight);
    pdf.save('my-cv.pdf');
  })
}

export default handleDownload