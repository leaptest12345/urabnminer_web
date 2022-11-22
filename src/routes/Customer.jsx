import React from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { CustomerBox, CustomerPhotoView } from "../styles/Customer.styles";
import { StyledSearch } from "../styles/Search.styles";
import { Text, Title, Wrapper } from "../utils/GlobalStyles";

export default function Customer() {
  return (
    <Wrapper>
      <Title>Create Invoice</Title>
      <StyledSearch placeholder="Search Existing Customers" />

      <CustomerBox>
        <Input label="FirstName" />
        <Input label="LastName" />
        <Input label="Business Name" />
        <Input label="Business Address" />
        <CustomerPhotoView>
          <Text>Capture on ID or Business Card for your records</Text>
          <Button title="Photo" />
        </CustomerPhotoView>
        <CustomerPhotoView>
          <Text>Capture on ID or Business Card for your records</Text>
          <Button title="Photo" />
        </CustomerPhotoView>
        <CustomerPhotoView>
          <Text>Capture on ID or Business Card for your records</Text>
          <Button title="Photo" />
        </CustomerPhotoView>
      </CustomerBox>
      <Button title="Start Invoice" />
    </Wrapper>
  );
}
