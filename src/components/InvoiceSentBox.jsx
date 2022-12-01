import React from "react";
import {
  InvoiceDraftSentBox,
  InvoiceSubBox,
  ItemCard,
} from "../styles/Invoice_Draft_Sent";
import { Img35, Img40, TextSmall, Text_bold } from "../utils/GlobalStyles";
import IMG from "../assets/receipt.png";
import FILE from "../assets/file.png";
import { ItemCardText } from "../styles/InvoiceSentBox.styles";
export default function InvoiceSentBox({ userName, date, totalItems,onClick }) {
  return (
    <InvoiceDraftSentBox onClick={onClick}>
      <Img35 src={IMG} />
      <InvoiceSubBox>
        <TextSmall>
          <Text_bold color="black">Name:</Text_bold>
          {userName}
        </TextSmall>
        <TextSmall>
          <Text_bold color="black">Date:</Text_bold>
          {date}
        </TextSmall>
      </InvoiceSubBox>
      <ItemCard>
        <Img40 src={FILE} />
        <ItemCardText totalItemsLength={totalItems.toString().length}>
          {totalItems}
        </ItemCardText>
      </ItemCard>
    </InvoiceDraftSentBox>
  );
}
