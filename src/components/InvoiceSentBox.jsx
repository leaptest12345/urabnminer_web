import React from "react";
import {
  InvoiceDraftSentBox,
  InvoiceSubBox,
} from "../styles/Invoice_Draft_Sent";
import { Bold_1, TextSmall } from "../utils/GlobalStyles";
import IMG from "../assets/receipt.png";
import FILE from "../assets/file.png";
import EYE from "../assets/eye.png";
export default function InvoiceSentBox() {
  return (
    <InvoiceDraftSentBox>
      <img
        src={IMG}
        style={{
          width: "35px",
          height: "35px",
        }}
      />
      <InvoiceSubBox>
        <Bold_1>Name:Suthar Bipin</Bold_1>
        <TextSmall>Date:10-9-2012</TextSmall>
      </InvoiceSubBox>
      <div
        style={{
          position: "relative",
          height: "100%",
          width: "15%",
          alignItems: "center",
          display: "flex",
        }}
      >
        <img
          src={FILE}
          style={{
            width: "40px",
            height: "40px",
          }}
        />
        <span
          style={{
            position: "absolute",
            color: "black",
            top: "20%",
            left: "25%",
            fontSize: "0.8rem",
            fontWeight: 600,
          }}
        >
          12
        </span>
      </div>
      <img
        src={EYE}
        style={{
          width: "22px",
          height: "22px",
        }}
      />
    </InvoiceDraftSentBox>
  );
}
