import React, { useState } from "react";
import InvoiceItem from "../components/InvoiceItem";
import {
  InvoiceContainer,
  InvoiceView1,
  InvoiceView2,
  SenderBox,
  BoxView,
  InvoiceClient,
  InfoView,
} from "../styles/Invoice.styles";
import {
  Bold_1,
  Row,
  Text,
  TextArea,
  Title,
  Wrapper,
} from "../utils/GlobalStyles";
import Button from "../components/Button";
import { StyledInput } from "../styles/Input.styles";
import SearchAutoComplete from "../components/SearchAutoComplete";
import ImageModal from "../components/ImageModal";
import { Lightbox } from "react-modal-image";

export default function Invoice() {
  const [InvoiceItems, setInvoiceItems] = useState([]);
  const [Img, setImg] = useState([]);
  const onAddItem = () => {
    setInvoiceItems([
      ...InvoiceItems,
      {
        id: InvoiceItems.length + 1,
        ItemName: "",
        WeightType: "",
        details: {},
        IMG: [],
      },
    ]);
    console.log(InvoiceItems);
  };
  const onGrossChange = (e) => (item.details.GrossWeight = e.target.value);
  const onTareChange = (e) => (item.details.TareWeight = e.target.value);
  const onNetWeightChange = (e) => (item.details.NetWeight = e.target.value);
  const onUnitChange = (e) => (item.details.Unit = e.target.value);
  const onItemChange = (e, value) =>
    console.log(value) + (item.ItemName = value);

  const onImagePic = (e) => {
    console.log(e.target.files[0]);
    setImg([
      ...Img,
      {
        id: 1,
        url: URL.createObjectURL(e.target.files[0]),
      },
    ]);
    console.log(Img);
  };
  return (
    <Wrapper>
      <Title>New Invoice</Title>
      <InvoiceContainer>
        <InvoiceView1>
          <BoxView>
            <SenderBox />
            <SenderBox background="white" />
          </BoxView>
          <Bold_1 style={{ marginTop: "10px" }}>ITEM DETAILS</Bold_1>
          <Text>Details item with more info</Text>
          {InvoiceItems.map((item, index) => {
            const {
              GrossWeight,
              TareWeight,
              NetWeight,
              Unit,
              GrossPrice,
              UnitPrice,
              Total,
            } = item.details;

            return (
              <InvoiceItem
                GrossWeight={GrossWeight}
                TareWeight={TareWeight}
                NetWeight={NetWeight}
                Unit={Unit}
                UnitPrice={UnitPrice}
                WeightPrice={GrossPrice}
                Total={Total}
                onGrossChange={onGrossChange}
                onTareChange={onTareChange}
                onNetWeightChange={onNetWeightChange}
                onUnitChange={onUnitChange}
                onItemChange={onItemChange}
                ItemName={item.ItemName}
                onImagePic={onImagePic}
                IMG={Img}
              />
            );
          })}
          <div style={{ marginBottom: "20px" }}>
            <Button title="Add" width="20%" onClick={() => onAddItem()} />
          </div>
        </InvoiceView1>
        <InvoiceView2>
          <InvoiceClient>
            <Bold_1>Note:</Bold_1>
            <TextArea />
          </InvoiceClient>
          <InvoiceClient>
            <Bold_1>PaymentType:</Bold_1>
            <SearchAutoComplete />
            <InfoView>
              <Bold_1>Date:</Bold_1>
              <StyledInput />
            </InfoView>
            <InfoView>
              <Bold_1>Amount:</Bold_1>
              <StyledInput />
            </InfoView>
            <Button title="Send Invoice" width="100%" />
            <Row>
              <Button
                title="preview"
                background="lightgreen"
                color="black"
                width="48%"
              />
              <Button title="Downlaod" background="lightblue" width="48%" />
            </Row>
          </InvoiceClient>
        </InvoiceView2>
      </InvoiceContainer>
    </Wrapper>
  );
}
