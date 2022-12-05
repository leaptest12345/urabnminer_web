import React, { useEffect, useRef } from "react";

import jsPDF from "jspdf";
import pdfMake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { Bold_1, Row, SmallBold } from "./GlobalStyles";
import ImageModal from "../components/ImageModal";
import { InvoiceImage } from "../styles/Invoice.styles";
import { convertIntoDoller } from "./ConvertIntoDoller";
import Button from "../components/Button";
import ReportTemplate from "./ReportTemplate";
export default function GeneratePdf() {
  const reportTemplateRef = useRef(null);

  // const getPDF = async () => {
  //   const htmlToPDF = new HTMLToPDF(`
  //     <div>Hello world</div>
  //   `);
  //   try {
  //     const pdf = await htmlToPDF.convert();
  //     console.log("new Pdf", pdf);
  //     // do something with the PDF file buffer
  //   } catch (err) {
  //     // do something on error
  //   }
  // };
  function printDocument() {
    //const input = document.getElementById('divToPrint');
    // const doc = new jsPDF();
    // doc.html(reportTemplateRef.current, {
    //   async callback(doc) {
    //     console.log("new generated pdf", doc);
    //     await doc.save("document.pdf");
    //   },
    // });
    // get table html
    const pdfTable = document.getElementById("divToPrint");
    // //html to pdf format
    var html = htmlToPdfmake(pdfTable.innerHTML);
    const documentDefinition = { content: html };
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    var pdf = pdfMake.createPdf(documentDefinition);
    pdf.open();
  }

  const { state } = useLocation();
  const { invoiceID, date, customer, InvoiceItems, amount, paymentType } =
    state.data;
  console.log(state.data);
  const PdfContainer = styled.div`
    margin: 0;
    background-color: whitesmoke;
    height: 100vh;
    width: 100vw;
    padding: 5%;
  `;
  const ItemContainer = styled.div``;
  const ItemProduct = styled.div`
    width: 80%;
  `;

  return (
    <div id="divToPrint">
      <div ref={reportTemplateRef}>
        <ReportTemplate invoiceItems={InvoiceItems} />
      </div>
      <button onClick={() => printDocument()}>generate Pdf</button>
    </div>
  );
}
