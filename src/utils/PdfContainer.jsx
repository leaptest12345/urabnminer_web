import React, { useEffect, useRef } from "react";
import jsPDF from "jspdf";
import ReportTemplate from "./ReportTemplate";
import { useLocation } from "react-router-dom";
import { Wrapper } from "./GlobalStyles";
import { uploadPdf } from "./firebase/firebaseStorage";
import ReportTemplate1 from "./ReportTemplate1";

function PdfContainer({ data }) {
  console.log("pdfcontainer", data);
  const { state } = useLocation();
  const reportTemplateRef = useRef(null);
  const handleGeneratePdf = () => {
    const doc = new jsPDF({
      format: "a1",
      unit: "px",
    });
    doc.html(reportTemplateRef.current, {
      async callback(doc) {
        const result = await doc.output("blob");
        // const resultData = await uploadPdf(result);
        window.open(doc.output("bloburl"));
      },
    });
  };

  const email = "sutharbipinn25899@gmail.com";
  const subject = "UrbanMiner";
  const url =
    "https://firebasestorage.googleapis.com/v0/b/urbanminer-86fa7.appspot.com/o/PDF%2Fuser%3A25%2Fcustomer%3A25%2Finvoice%3A25%2Finvoice.pdf?alt=media&token=94d3f6c3-dbbd-4030-aebb-3c1818479a61";
  return (
    <Wrapper>
      <div>
        {/* <a href={`mailto:${email}?subject=${subject}&body=${url}`}>
          Click to Send an Email
        </a> */}
        <button className="button" onClick={handleGeneratePdf}>
          Download Invoice
        </button>
        <div ref={reportTemplateRef} id="toPdf">
          <ReportTemplate data={data ? data : state?.data} />
        </div>
      </div>
    </Wrapper>
  );
}

export default PdfContainer;
