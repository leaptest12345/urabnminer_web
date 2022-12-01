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
  TouchView,
  DateView,
} from "../styles/Invoice.styles";
import {
  Bold_1,
  MediumBold,
  Row,
  SmallBold,
  TextArea,
  TextSmall,
  Text_reg,
  Title,
  View_6,
  Wrapper,
} from "../utils/GlobalStyles";
import Button from "../components/Button";
import SearchAutoComplete from "../components/SearchAutoComplete";
import LoaderSpinner from "../components/Loader";
import { getData, setData } from "../utils/firebase/firebaseApi";
import { ArrayConverter } from "../utils/ArrayConverter";
import { toastAlert } from "../utils/toastAlert";
import { convertIntoDoller } from "../utils/ConvertIntoDoller";
import { DatePicker } from "react-responsive-datepicker";
import "react-responsive-datepicker/dist/index.css";
import { uniqueId } from "../utils/uniqueId";
import { uploadInvoiceImages } from "../utils/firebase/firebaseStorage";
import { useNavigate } from "react-router-dom";
import {
  onGrossChange,
  onTareChange,
  onUnitChange,
  onUnitPriceChange,
  onWeightPriceChange,
  setDefaultValue,
} from "./InvoiceController";
export default function Invoice() {
  const userId = localStorage.getItem("userID");
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [paymentList, setPaymentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [InvoiceItems, setInvoiceItems] = useState([]);
  const [render, setRender] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [paymentType, setPaymentType] = useState("");
  const [amount, setAmount] = useState(0);
  const [note, setNote] = useState("");
  const [IMG, setIMG] = useState([]);
  const [date, setDate] = useState(new Date().toString().substring(0, 15));

  //useEffect for reload page
  useEffect(() => {
    getAllData();
    getPaymentList();
  }, []);
  useEffect(() => {
    setTotal();
  }, [render]);

  const getAllData = async () => {
    setLoading(true);
    const invoiceImages = await getData(
      `/INVOICE_IMAGES/User:${1}/customer:${1}/invoice:${"4a3cb6fc-a8b9-908e-bb97-8c5d46216b66"}`
    );
    const invoiceListData = await getData(
      `/INVOICE_LIST/${"4a3cb6fc-a8b9-908e-bb97-8c5d46216b66"}`
    );
    setAmount(invoiceListData.Amount);
    setPaymentType(invoiceListData.paymentType.toString());
    setNote(invoiceListData.note);
    setDate(invoiceListData.invoiceDate.toString().substring(0, 15));
    const invoiceData = await getData(
      `/INVOICE/${"4a3cb6fc-a8b9-908e-bb97-8c5d46216b66"}`
    );
    let arr = [];
    ArrayConverter(invoiceData).map((item, index) => {
      console.log(item.WeightType);
      arr.push({
        id: item.ID,
        IMG: invoiceImages[`item:${index + 1}`]
          ? invoiceImages[`item:${index + 1}`]
          : [],
        WeightType: item.WeightType == "Unit" ? "Unit" : "Weight",
        ItemName: item.itemName,
        details: {
          GrossWeight: item.grossWeight,
          TareWeight: item.tareWeight,
          NetWeight: item.netWeight,
          Unit: item.unit,
          UnitPrice: item.price,
          WeightPrice: item.price,
          Total: item.Total,
        },
      });
    });
    setInvoiceItems(arr);
    setLoading(false);
  };
  const onItemDelete = (item, index) => {
    console.log("before filter", InvoiceItems);
    if (InvoiceItems.length == 1) {
      setInvoiceItems([]);
    } else {
      const arr = InvoiceItems.filter((item1) => item1.id != index + 1);
      console.log("after filter", arr);
      setInvoiceItems(arr);
    }
    setRender(!render);
  };
  const setTotal = () => {
    if (InvoiceItems.length != 0) {
      let total = 0;
      InvoiceItems.map((item) => {
        total += parseFloat(item.details.Total);
      });
      setAmount(total);
    }
  };
  const isItemDetailValid = () => {
    let temp = true;
    if (InvoiceItems.length != 0) {
      for (let i = 1; i <= InvoiceItems.length; i++) {
        !InvoiceItems[InvoiceItems.length - i] ||
        !InvoiceItems[InvoiceItems.length - i].details ||
        !InvoiceItems[InvoiceItems.length - i].details.Total ||
        Math.sign(
          parseInt(InvoiceItems[InvoiceItems.length - i].details.Total)
        ) == -1
          ? (temp = false) +
            toastAlert(
              0,
              `please fill the above item ${
                InvoiceItems.length - i + 1
              }  correct filed value!`
            )
          : !InvoiceItems[InvoiceItems.length - i].ItemName
          ? (temp = false) +
            toastAlert(
              0,
              `please select the above item ${
                InvoiceItems.length - i + 1
              }  ItemName`
            )
          : null;
      }
    }
    return temp;
  };
  const onAddItem = () => {
    if (isItemDetailValid()) {
      setInvoiceItems([
        ...InvoiceItems,
        {
          id: InvoiceItems.length + 1,
          ItemName: "",
          WeightType: "Weight",
          details: {},
          IMG: [],
        },
      ]);
      console.log(InvoiceItems);
      setTotal();
    }
  };
  const onImagePic = (e, item) => {
    item.IMG.push({
      id: item.IMG.length + 1,
      url: e.target.files[0],
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
  const callbackFunc = () => {
    setRender(!render);
  };
  const onWeightTypeChange = (item) => {
    item.WeightType = item.WeightType == "Unit" ? "Weight" : "Unit";
    setDefaultValue(item, callbackFunc);
  };
  const sendInvoice = async (InvoiceId) => {};
  const invoiceImageUpload = (InvoiceId) => {
    InvoiceItems.map((item, index) => {
      if (item.IMG) {
        ArrayConverter(item.IMG).map(async (imageDetail, imageIndex) => {
          const uploadUrl = await uploadInvoiceImages(
            imageDetail.url,
            userId,
            1,
            InvoiceId,
            imageIndex + 1
          );
          await setData(
            `/INVOICE_IMAGES/User:${userId}/customer:${1}/invoice:${InvoiceId}/item:${
              index + 1
            }/${imageIndex + 1}`,
            {
              photoName: uploadUrl[1],
              url: uploadUrl[0],
            }
          );
        });
      }
    });
  };
  const createInvoiceList = async (InvoiceId) => {
    await setData(`INVOICE_LIST/${InvoiceId}`, {
      ID: InvoiceId,
      userId: userId,
      customerId: 1,
      totalItems: InvoiceItems.length,
      UserName: "urbanminer",
      invoiceDate: date.toString(),
      type: "draft",
      paymentType: paymentType,
      Amount: amount,
      note: note,
    });
  };
  const createInvoice = (InvoiceId) => {
    InvoiceItems.map(async (item, index) => {
      await setData(`/INVOICE/${InvoiceId}/${index + 1}`, {
        ID: index + 1,
        unit: item.details.Unit,
        itemName: item.ItemName,
        grossWeight: item.details.GrossWeight,
        tareWeight: item.details.TareWeight,
        netWeight: item.details.NetWeight,
        price:
          item.WeightType == "Unit"
            ? item.details.UnitPrice
            : item.details.WeightPrice,
        userId: userId,
        customerID: 1,
        Total: item.details.Total,
        WeightType: item.WeightType,
      });
    });
    setLoading(false);
  };
  const createData = (type) => {
    const InvoiceId = uniqueId;
    if (InvoiceItems.length != 0 && isItemDetailValid()) {
      if (!paymentType || !amount) {
        toastAlert(0, "Please Fill the payment Info filed!");
      } else {
        try {
          setLoading(true);
          invoiceImageUpload(InvoiceId);
          createInvoiceList(InvoiceId);
          createInvoice(InvoiceId);
        } catch (error) {
          setLoading(false);
        }
      }
    }
  };

  const re = /^-?\d*\.?\d*$/;
  return (
    <Wrapper>
      <LoaderSpinner visible={loading} isCenter={true} />
      <Title>New Invoice</Title>
      <View_6>
        <Text_reg>Choose Customer:</Text_reg>
        <SearchAutoComplete />
      </View_6>
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
          <Text_reg>Details item with more info</Text_reg>
          {InvoiceItems.map((item, index) => {
            const {
              GrossWeight,
              TareWeight,
              NetWeight,
              Unit,
              UnitPrice,
              WeightPrice,
              Total,
            } = item.details;
            console.log(item.ItemName);
            return (
              <InvoiceItem
                key={index + 1 + ""}
                IMG={item.IMG}
                index={index + 1}
                onDelete={() => onItemDelete(item, index)}
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
                onGrossChange={(e) => onGrossChange(e, item, callbackFunc)}
                onTareChange={(e) => onTareChange(e, item, callbackFunc)}
                onUnitChange={(e) => onUnitChange(e, item, callbackFunc)}
                onWeightPriceChange={(e) =>
                  onWeightPriceChange(e, item, callbackFunc)
                }
                onUnitPriceChange={(e) =>
                  onUnitPriceChange(e, item, callbackFunc)
                }
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
        <DatePicker
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          defaultValue={new Date()}
          minDate={new Date()}
          headerBackgroundColor="black"
          onChange={(date) =>
            setIsOpen(false) + setDate(date.toString().substring(0, 15))
          }
        />
        <InvoiceView2>
          <InvoiceClient>
            <Bold_1>Note:</Bold_1>
            <TextArea onChange={(e) => setNote(e.target.value)} />
          </InvoiceClient>
          <InvoiceClient>
            <Bold_1>PaymentType:</Bold_1>
            <SearchAutoComplete
              searchOptions={paymentList}
              defaultValue={paymentType}
              onChange={(e, value) => setPaymentType(value.label)}
            />
            <InfoView>
              <Bold_1>Date:</Bold_1>
              <DateView onClick={() => setIsOpen(true)}>
                <SmallBold>{date}</SmallBold>
              </DateView>
            </InfoView>
            <InfoView>
              <Bold_1>Amount:</Bold_1>
              <Bold_1>
                {isNaN(parseFloat(amount)) ? "0" : convertIntoDoller(amount)}
              </Bold_1>
            </InfoView>
            <Button title="Send Invoice" width="100%" />
            <Row>
              <Button
                title="Save"
                background="lightgreen"
                color="black"
                width="48%"
                onClick={() => createData("draft")}
              />
              <Button title="Downlaod" background="lightblue" width="48%" />
            </Row>
          </InvoiceClient>
        </InvoiceView2>
      </InvoiceContainer>
    </Wrapper>
  );
}
