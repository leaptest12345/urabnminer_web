import React from "react";
import {
  InvoiceDraftSentBox,
  InvoiceSubBox,
  ItemCard,
  ItemCardText,
} from "../styles/Invoice_Draft_Sent";
import {
  Bold_1,
  Img35,
  Img40,
  Text,
  TextSmall,
  Text_bold,
} from "../utils/GlobalStyles";
import IMG from "../assets/receipt.png";
import FILE from "../assets/file.png";
import EYE from "../assets/eye.png";
export default function InvoiceSentBox({ onClick }) {
  return (
    <InvoiceDraftSentBox to="/invoice">
      <Img35 src={IMG} />
      <InvoiceSubBox>
        <TextSmall>Name:Leslie Alexander</TextSmall>
        <TextSmall>Date:10-9-2012</TextSmall>
      </InvoiceSubBox>
      <ItemCard>
        <Img40 src={FILE} />
        <ItemCardText>12</ItemCardText>
      </ItemCard>
    </InvoiceDraftSentBox>
  );
}
