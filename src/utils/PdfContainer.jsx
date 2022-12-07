import React, { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import ReportTemplate from "./ReportTemplate";
import { useLocation } from "react-router-dom";
import { Wrapper } from "./GlobalStyles";
import { uploadPdf } from "./firebase/firebaseStorage";
import ReportTemplate1 from "./ReportTemplate1";
import { setData } from "./firebase/firebaseApi";
import { toastAlert } from "./toastAlert";
import LoaderSpinner from "../components/Loader";

export default function PdfContainer() {
  const [loading,setLoading]=useState(false)
  const [url,setUrl]=useState('')
  const { state } = useLocation();
  const {  userID,
    customerID,
    invoiceID}=state.details
  const reportTemplateRef = useRef(null);

  useEffect(()=>{
    handleGeneratePdf('sent')
  },[])
  const handleGeneratePdf = (type) => {
    setLoading(true)
    const doc = new jsPDF({
      format: "a1",
      unit: "px",
    });
    doc.html(reportTemplateRef.current, {
      async callback(doc) {
        try{
         if(type=='sent')
         {
           const result=await uploadPdf(doc.output("blob"),userID,customerID,invoiceID, 'UrbanMiner.pdf')
        await setData(`/PDF/user:${userID}/customer:${customerID}/invoiceid:${invoiceID}/1`,{
          url: result[0],
          photoName: 'UrbanMiner.pdf',
        })
         toastAlert(1,"Pdf Successfully Generated!")
         setUrl(result[0])
         }
         else{
          doc.save('UrbanMiner.pdf')
         }
         setLoading(false)
        }
        catch(error)
        {
setLoading(false)
        }
        
      },
    });
    setLoading(false)
  };
  const divStyle={
    display:'flex',
    alignItems:'center',
    justifyContent:'space-between',
    flexDirection:'row',
    width:"90%",
    alignSelf:'center'
  }
  return (
    <Wrapper>
      <div>
      <LoaderSpinner isCenter={true} visible={loading}/>

        <a href={`mailto:${'sutharbipinn25899@gmail.com'}?subject=${'dsf'}&body=${url}`}>
          Click to Send an Email
        </a>
      <div style={divStyle}>
      <button className="button" onClick={()=>handleGeneratePdf('download')}>
         Download PDF
        </button>
      <button className="button" onClick={()=>handleGeneratePdf('sent')}>
          SendInvoice
        </button>
       
      </div>
        <div ref={reportTemplateRef} id="toPdf">
          <ReportTemplate data={state?.data} />
        </div>
      </div>
    </Wrapper>
  );
}

