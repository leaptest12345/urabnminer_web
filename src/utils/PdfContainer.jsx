import React, { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import ReportTemplate from "./ReportTemplate";
import { useLocation, useNavigate } from "react-router-dom";
import { Title, Wrapper } from "./GlobalStyles";
import { uploadPdf } from "./firebase/firebaseStorage";
import ReportTemplate1 from "./ReportTemplate1";
import { setData } from "./firebase/firebaseApi";
import LoaderSpinner from "../components/Loader";
import Button from "../components/Button";

const spacerView = {
  marginTop: "40px",
};
const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: "row",
  maringLeft: "15",
  paddingInline: "10%",
};
const btnStyle = {
  backgroundColor: "black",
  padding: "10px",
  borderRadius: "6px",
  color: "white",
};

export default function PdfContainer() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [url1, setUrl1] = useState("");
  const { state } = useLocation();
  const { customer } = state.data;
  const { userID, customerID, invoiceID } = state.details;
  const reportTemplateRef = useRef("");
  const reportTemplateRef1 = useRef("");

  useEffect(() => {
    handleGeneratePdf("sent", false);
  }, []);
  var formattedBody = `Invoice PDF1 \n\n${url} \n\n\n Invoice PDF2\n\n${url1} \n `;

  const handleGeneratePdf = (type, open) => {
    setLoading(true);
    const doc = new jsPDF({
      format: "a1",
      unit: "px",
    });
    doc.html(reportTemplateRef1.current, {
      async callback(doc) {
        try {
          if (type == "sent") {
            const result = await uploadPdf(
              doc.output("blob"),
              userID,
              customerID,
              invoiceID,
              "UrbanMiner1.pdf"
            );
            await setData(
              `/PDF/user:${userID}/customer:${customerID}/invoiceid:${invoiceID}/2`,
              {
                url: result[0],
                photoName: "UrbanMiner1.pdf",
              }
            );
            setUrl1(result[0]);
          } else {
            doc.save("UrbanMiner1.pdf");
          }
          // setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      },
    });
    doc.html(reportTemplateRef.current, {
      async callback(doc) {
        try {
          if (type == "sent") {
            const result = await uploadPdf(
              doc.output("blob"),
              userID,
              customerID,
              invoiceID,
              "UrbanMiner.pdf"
            );
            await setData(
              `/PDF/user:${userID}/customer:${customerID}/invoiceid:${invoiceID}/1`,
              {
                url: result[0],
                photoName: "UrbanMiner.pdf",
              }
            );
            // toastAlert(1, "Pdf Successfully Generated!");
            setUrl(result[0]);
            console.log(result[0]);
            if (open) {
              window.open(
                `mailto:${
                  customer.BusinessEmail
                }?subject=${"UrbanMiner"}&body=${encodeURIComponent(
                  formattedBody,
                  "_blank",
                  "noopener,noreferrer"
                )}`
              );
            }
          } else {
            doc.save("UrbanMiner.pdf");
          }
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      },
    });
  };

  return (
    <Wrapper>
      <LoaderSpinner visible={loading} isCenter={true} />
      <div>
        <div style={divStyle}>
          <button
            className="button"
            onClick={() => {
              handleGeneratePdf("download", false) + console.log(url, url1);
            }}
          >
            Download PDF
          </button>
          <button
            className="button"
            onClick={() => {
              handleGeneratePdf("sent", true);
            }}
          >
            Mail Invoive
          </button>
        </div>
        <div ref={reportTemplateRef} style={spacerView}>
          <ReportTemplate data={state?.data} />
        </div>
        <div ref={reportTemplateRef1} style={spacerView}>
          <ReportTemplate1 data={state?.data1} />
        </div>
      </div>
    </Wrapper>
  );
}
