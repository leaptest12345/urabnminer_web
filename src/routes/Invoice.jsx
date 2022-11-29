import React, { useEffect, useState } from "react";
import InvoiceItem from "../components/InvoiceItem";
import {
  InvoiceContainer,
  InvoiceView1,
  InvoiceView2,
  SenderBox,
  BoxView,
  InvoiceClient,
  InfoView,
  SenderSubbox,
} from "../styles/Invoice.styles";
import {
  Bold_1,
  MediumBold,
  Row,
  SmallBold,
  Text,
  TextArea,
  TextSmall,
  Text_bold,
  Title,
  Wrapper,
} from "../utils/GlobalStyles";
import Button from "../components/Button";
import { StyledInput } from "../styles/Input.styles";
import SearchAutoComplete from "../components/SearchAutoComplete";
import ImageModal from "../components/ImageModal";
import { Lightbox } from "react-modal-image";
import LoaderSpinner from "../components/Loader";
import { getData } from "../utils/firebase/firebaseApi";
import { ArrayConverter } from "../utils/ArrayConverter";

export default function Invoice() {
  const [paymentList, setPaymentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [InvoiceItems, setInvoiceItems] = useState([]);
  const [Img, setImg] = useState([]);
  const [render, setRender] = useState(false);

  //useEffect for reload page

  useEffect(() => {}, [render]);
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
  };

  const onImagePic = (e, item) => {
    item.IMG.push({
      id: item.IMG.length + 1,
      url: URL.createObjectURL(e.target.files[0]),
    });
    setRender(!render);
  };

  const getPaymentList = async () => {
    try {
      const list = await getData(`ADMIN/PAYMENTTYPE`);
      let arr = [];
      ArrayConverter(list).map((item) => {
        {
          arr.push({
            id: item.ID,
            label: item.title,
          });
        }
      });
      setPaymentList(arr);
    } catch (error) {
      setLoading(false);
    }
  };

  const onGrossChange = (e, item) => {
    item.details.GrossWeight = e.target.value;
    item.details.NetWeight =
      parseFloat(item.details.GrossWeight) -
      parseFloat(item.details.TareWeight);
    item.details.Total =
      parseFloat(item.details.NetWeight) * parseFloat(item.details.WeightPrice);
    setRender(!render);
  };
  const onTareChange = (e, item) => {
    item.details.TareWeight = e.target.value;
    item.details.NetWeight =
      parseFloat(item.details.GrossWeight) -
      parseFloat(item.details.TareWeight);
    item.details.Total =
      parseFloat(item.details.NetWeight) * parseFloat(item.details.WeightPrice);
    setRender(!render);
  };
  const onWeightPriceChange = (e, item) => {
    item.details.WeightPrice = e.target.value;
    item.details.Total =
      parseFloat(item.details.NetWeight) * parseFloat(item.details.WeightPrice);
    setRender(!render);
  };
  const onUnitChange = (e, item) => {
    item.details.Unit = e.target.value;
    item.details.Total =
      parseFloat(item.details.Unit) * parseFloat(item.details.UnitPrice);
    setRender(!render);
  };
  const onUnitPriceChange = (e, item) => {
    item.details.UnitPrice = e.target.value;
    item.details.Total =
      parseFloat(item.details.Unit) * parseFloat(item.details.UnitPrice);
    setRender(!render);
  };
  const setDefaultValue = (item) => {
    item.details.GrossWeight = 0;
    item.details.TareWeight = 0;
    item.details.NetWeight = 0;
    item.details.Unit = 0;
    item.details.GrossPrice = 0;
    item.details.UnitPrice = 0;
    item.details.WeightPrice = 0;
    item.details.Total = 0;
    setRender(!render);
  };
  const onWeightTypeChange = (item) => {
    item.WeightType = item.WeightType == "Unit" ? "Weight" : "Unit";
    setDefaultValue(item);
  };
  useEffect(() => {
    getPaymentList();
  }, []);

  const re = /^-?\d*\.?\d*$/;
  return (
    <Wrapper>
      <LoaderSpinner visible={loading} isCenter={true} />
      <Title>New Invoice</Title>
      <InvoiceContainer>
        <InvoiceView1>
          <BoxView>
            <SenderBox>
              <MediumBold color="white">From</MediumBold>
              <SenderSubbox>
                <TextSmall color="white">
                  <SmallBold color="white">Email: </SmallBold>
                  sutharbipinn25899@gmail.com
                </TextSmall>
                <TextSmall color="white">
                  <SmallBold color="white">Name: </SmallBold>SutharBipin
                </TextSmall>
                <TextSmall color="white">
                  <SmallBold color="white">Address: </SmallBold>katra(samal)
                  patan gujrat india
                </TextSmall>
              </SenderSubbox>
            </SenderBox>
            <SenderBox background="white">
              <MediumBold>Bill To</MediumBold>
              <SenderSubbox>
                <TextSmall>
                  <SmallBold>Email: </SmallBold>
                </TextSmall>
                <TextSmall>
                  <SmallBold>Name: </SmallBold>
                </TextSmall>
                <TextSmall>
                  <SmallBold>Address: </SmallBold>
                </TextSmall>
              </SenderSubbox>
            </SenderBox>
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
              WeightPrice,
              Total,
            } = item.details;
            console.log(item.WeightType);
            return (
              <InvoiceItem
                IMG={item.IMG}
                index={index + 1}
                item={item}
                WeightType={item.WeightType}
                GrossWeight={GrossWeight}
                TareWeight={TareWeight}
                NetWeight={NetWeight}
                Unit={Unit}
                UnitPrice={UnitPrice}
                WeightPrice={WeightPrice}
                Total={Total}
                onWeightTypeChange={() => onWeightTypeChange(item)}
                onGrossChange={(e) => onGrossChange(e, item)}
                onTareChange={(e) => onTareChange(e, item)}
                onUnitChange={(e) => onUnitChange(e, item)}
                onWeightPriceChange={(e) => onWeightPriceChange(e, item)}
                onUnitPriceChange={(e) => onUnitPriceChange(e, item)}
                onItemChange={(e, value) =>
                  (item.ItemName = value.label) + setRender(!render)
                }
                ItemName={item.ItemName}
                onImagePic={(e) => onImagePic(e, item)}
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
            <SearchAutoComplete searchOptions={paymentList} />
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
