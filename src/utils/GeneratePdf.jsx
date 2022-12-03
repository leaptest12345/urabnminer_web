import React, { useEffect } from "react";

import jsPDF from "jspdf";
import pdfMake from "pdfmake";
import htmlToPdfmake from "html-to-pdfmake";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { Bold_1, Row, SmallBold } from "./GlobalStyles";
import ImageModal from "../components/ImageModal";
import { InvoiceImage } from "../styles/Invoice.styles";
import { convertIntoDoller } from "./ConvertIntoDoller";

export default function GeneratePdf() {
  function printDocument() {
    //const input = document.getElementById('divToPrint');
    const doc = new jsPDF();
    //get table html
    const pdfTable = document.getElementById("divToPrint");
    //html to pdf format
    var html = htmlToPdfmake(pdfTable.innerHTML);

    const documentDefinition = { content: html };
    const result = pdfMake.createPdf(documentDefinition).open();
  }
  const { state } = useLocation();
  const { invoiceID, date, customer, InvoiceItems, amount, paymentType } =
    state.data;
  console.log(state.data);
  const PdfContainer = styled.div`
    margin: 0;
    background-color: rebeccapurple;
    height: 100vh;
    width: 100vw;
    padding: 5%;
  `;
  const ItemContainer = styled.div`
    background-color: blue;
  `;
  const ItemProduct = styled.div`
    background-color: lightsteelblue;
  `;

  useEffect(() => {
    // printDocument();
  }, []);
  return (
    <PdfContainer id="divToPrint">
      <ItemContainer>
        {InvoiceItems.map((item, index) => {
          return (
            <>
              <ItemProduct>
                <Row>
                  <Bold_1>Item</Bold_1>
                  <SmallBold>{item.ItemName}</SmallBold>
                </Row>
                {item.WeightType == "Unit" ? (
                  <>
                    <Row>
                      <Bold_1>Unit</Bold_1>
                      <SmallBold>{item.details.Unit}</SmallBold>
                    </Row>
                    <Row>
                      <Bold_1>Price</Bold_1>
                      <SmallBold>{item.details.UnitPrice}</SmallBold>
                    </Row>
                  </>
                ) : (
                  <>
                    <Row>
                      <Bold_1>GrossWeight</Bold_1>
                      <SmallBold>{item.details.GrossWeight}</SmallBold>
                    </Row>
                    <Row>
                      <Bold_1>TareWeight</Bold_1>
                      <SmallBold>{item.details.TareWeight}</SmallBold>
                    </Row>
                    <Row>
                      <Bold_1>NetWeight</Bold_1>
                      <SmallBold>{item.details.NetWeight}</SmallBold>
                    </Row>
                    <Row>
                      <Bold_1>Price</Bold_1>
                      <SmallBold>{item.details.WeightPrice}</SmallBold>
                    </Row>
                  </>
                )}
                <Row>
                  <Bold_1>Total</Bold_1>
                  <SmallBold>{convertIntoDoller(item.details.Total)}</SmallBold>
                </Row>
                <InvoiceImage>
                  {item.IMG &&
                    item.IMG.map((item, index) => {
                      return (
                        <>
                          <ImageModal
                            url={item.url}
                            margin={true}
                            key={index + 1 + "?"}
                          />
                        </>
                      );
                    })}
                </InvoiceImage>
              </ItemProduct>
            </>
          );
        })}
      </ItemContainer>
    </PdfContainer>
  );
}
