import React from "react";
import InvoiceSentBox from "../components/InvoiceSentBox";
import { InvoiceView } from "../styles/Invoice_Draft_Sent";
import { Title, Wrapper } from "../utils/GlobalStyles";
export default function Invoice_Draft_Sent() {
  return (
    <Wrapper>
      <Title>Invoice</Title>
      <InvoiceView>
        <InvoiceSentBox />
        <InvoiceSentBox />
        <InvoiceSentBox />
        <InvoiceSentBox />
        <InvoiceSentBox />
        <InvoiceSentBox />
        <InvoiceSentBox />
        <InvoiceSentBox />
        <InvoiceSentBox />
        <InvoiceSentBox />
        <InvoiceSentBox />
        <InvoiceSentBox />
      </InvoiceView>
    </Wrapper>
  );
}
