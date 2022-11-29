import React from "react";
import {
  InvoiceDraftSentBox,
  InvoiceSubBox,
  ItemCard,
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
import styled from "styled-components";
export default function InvoiceSentBox({
  onClick,
  userName,
  date,
  totalItems,
}) {
  const ItemCardText = styled.span`
    position: absolute;
    color: black;
    top: 25%;
    left: ${({ totalItemsLength }) => (totalItemsLength > 1 ? "25%" : "30%")};
    font-size: 0.8rem;
    font-weight: 600;
    @media (max-width: 600px) {
      left: ${({ totalItemsLength }) => (totalItemsLength > 1 ? "20%" : "25%")};
    }
  `;
  return (
    <InvoiceDraftSentBox to="/invoice">
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
