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
  RowView,
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
import { getData, setData, updateData } from "../utils/firebase/firebaseApi";
import { ArrayConverter } from "../utils/ArrayConverter";
import { toastAlert } from "../utils/toastAlert";
import { convertIntoDoller } from "../utils/ConvertIntoDoller";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { uniqueId } from "../utils/uniqueId";
import { uploadInvoiceImages } from "../utils/firebase/firebaseStorage";
import { useLocation, useNavigate } from "react-router-dom";
import {
  onGrossChange,
  onTareChange,
  onUnitChange,
  onUnitPriceChange,
  onWeightPriceChange,
  setDefaultValue,
} from "./InvoiceController";
import { Input } from "@mui/material";
export default function Invoice() {
  const userID = localStorage.getItem("userID");
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [paymentList, setPaymentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [InvoiceItems, setInvoiceItems] = useState([]);
  const [render, setRender] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [paymentType, setPaymentType] = useState("");
  const [amount, setAmount] = useState(0);
  const [customerDetail, setCustomerDetail] = useState(null);
  const [note, setNote] = useState("");
  const [IMG, setIMG] = useState([]);
  const [date, setDate] = useState(new Date().toString().substring(0, 15));
  const [user,setUser]=useState(null)
  const customerID =
    state?.invoiceDetail?.customerId ||
    state?.customerDetail?.ID ||
    customerDetail?.ID;
  const invoiceID = state?.invoiceDetail?.ID || uniqueId;
  const isEditable = state?.invoiceDetail?.ID ? true : false;
  const customer = state?.customerDetail || customerDetail;
  useEffect(() => {
    if (state?.invoiceDetail?.ID) {
      getAllData();
    }
    getCustomerList();
    getPaymentList();
    getUserDetail()
  }, []);
  useEffect(() => {
    setTotal();
  }, [render]);

  const getUserDetail=async()=>{
    try{
        const userDetail=await getData(`USERS/${userID}`)
        setUser(userDetail)
    }catch(error)
    {
      console.log(error)
    }
  }
  const email = {
    invoiceID,
    date,
    customer,
    InvoiceItems,
    amount,
    paymentType,
  };
  const getCustomerList = async () => {
    try {
      const customerDetail = await getData(`USER_CUSTOMER/${userID}/CUSTOMER`);
      let arr = [];
      ArrayConverter(customerDetail).map((item) => {
        arr.push({
          ...item,
          label:
            item.UserFirstName +
            " " +
            item.UserLastName +
            `(${item.BusinessName})`,
        });
      });
      setCustomerList(arr);
    } catch (error) {
      console.log(error);
    }
  };
  const addCustomerDetails = (value) => {
    if (value == null) {
      setCustomerDetail(null);
    } else {
      console.log("customerdaetails", value);
      setCustomerDetail(value);
    }
  };
  const getAllData = async () => {
    try {
      setLoading(true);
      const invoiceImages = await getData(
        `/INVOICE_IMAGES/User:${userID}/customer:${customerID}/invoice:${invoiceID}`
      );
      const invoiceListData = await getData(`/INVOICE_LIST/${invoiceID}`);
      setAmount(invoiceListData.Amount);
      setPaymentType(invoiceListData.paymentType.toString());
      setNote(invoiceListData.note);
      setDate(invoiceListData.invoiceDate.toString().substring(0, 15));
      const invoiceData = await getData(`/INVOICE/${invoiceID}`);
      let arr = [];
      ArrayConverter(invoiceData).map((item, index) => {
        console.log(item.WeightType);
        arr.push({
          id: item.ID,
          IMG: invoiceImages
            ? invoiceImages[`item:${index + 1}`]
              ? invoiceImages[`item:${index + 1}`]
              : []
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
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const onItemDelete =async (item, index) => {
    console.log("before filter", InvoiceItems);
    setLoading(true)
    setInvoiceItems([]);
    if (InvoiceItems.length == 1) {
      setInvoiceItems([]);
      await setData(`/INVOICE_IMAGES/User:${userID}/customer:${customerID}/invoice:${invoiceID}`,null)
      await setData(`INVOICE_LIST/${invoiceID}`, null);
      await setData(`INVOICE/${invoiceID}`, null);
      toastAlert(0,'Invoice has been deleted!')
    } else {
      const arr = InvoiceItems.filter((item1) => item1.id != index + 1);
      console.log("after filter", arr);
     setTimeout(() => {
      setInvoiceItems(arr);
     }, 1000);
    }
    setLoading(false)
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
          details: {
            GrossWeight: 0,
            NetWeight: 0,
            TareWeight: 0,
            Total: 0,
            Unit: 0,
            UnitPrice: 0,
            WeightPrice: 0,
          },
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
  const sendInvoice = async () => {};
  const invoiceImageUpload = async () => {
    await  setData(`/INVOICE_IMAGES/User:${userID}/customer:${customerID}/invoice:${invoiceID}`,null)
    InvoiceItems.map((item, index) => {
      if (item.IMG) {
        ArrayConverter(item.IMG).map(async (imageDetail, imageIndex) => {
          if (!imageDetail.url.toString().includes("http")) {
            const uploadUrl = await uploadInvoiceImages(
              imageDetail.url,
              userID,
              customerID,
              invoiceID,
              imageIndex + 1
            );
            console.log("imagedetails", imageDetail.url, uploadUrl[0]);
            setData(
              `/INVOICE_IMAGES/User:${userID}/customer:${customerID}/invoice:${invoiceID}/item:${
                index + 1
              }/${imageIndex + 1}`,
              {
                photoName: (uploadUrl[0] + "").split("token=")[1],
                url: uploadUrl[0],
              }
            );
          }
          else
          {
            setData(
              `/INVOICE_IMAGES/User:${userID}/customer:${customerID}/invoice:${invoiceID}/item:${
                index + 1
              }/${imageIndex + 1}`,
              {
                photoName: (imageDetail.url + "").split("token=")[1],
                url: imageDetail.url,
              }
            );
          }
        });
      }
    });
  };
  const createInvoiceList = async (type) => {
    await setData(`INVOICE_LIST/${invoiceID}`, null);
    const setInvoiceList = isEditable ? updateData : setData;
    await setInvoiceList(`INVOICE_LIST/${invoiceID}`, {
      ID: invoiceID,
      userId: userID,
      customerId: customerID,
      totalItems: InvoiceItems.length,
      UserName: "urbanminer",
      invoiceDate: date.toString(),
      type: type,
      paymentType: paymentType,
      Amount: amount,
      note: note,
    });
  };
  const createInvoice = async () => {
    await setData(`INVOICE/${invoiceID}`, null);
    const setInvoiceDetail = isEditable ? updateData : setData;
    InvoiceItems.map(async (item, index) => {
      console.log(item);
      await setInvoiceDetail(`/INVOICE/${invoiceID}/${index + 1}`, {
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
        userId: userID,
        customerID: customerID,
        Total: item.details.Total,
        WeightType: item.WeightType,
      });
    });
    toastAlert(
      1,
      isEditable
        ? "Invoice successfully Edit!"
        : "Invoice Successfully Created!"
    );
  };
  const createData = async (type) => {
    if (customerID) {
      if (InvoiceItems.length != 0) {
        if (isItemDetailValid()) {
          if (!paymentType || !amount) {
            toastAlert(0, "Please Fill the payment Info filed!");
          } else {
            try {
              setLoading(true);
              await invoiceImageUpload();
              await createInvoiceList(type);
              await createInvoice();
              setLoading(false);
              navigate("/draft");
            } catch (error) {
              setLoading(false);
            }
          }
        }
      } else {
        toastAlert(0, "Please Add Atleast One Item!");
      }
    } else {
      toastAlert(0, "Please Select Customer!");
    }
  };
  const re = /^-?\d*\.?\d*$/;
  return (
    <Wrapper>
      <LoaderSpinner visible={loading} isCenter={true} />
      <Title>New Invoice</Title>
      <View_6>
        <Text_reg>Choose Customer:</Text_reg>
        <SearchAutoComplete
          searchOptions={customerList}
          onChange={(e, value) => addCustomerDetails(value)}
        />
      </View_6>
      <InvoiceContainer>
        <InvoiceView1>
          <BoxView>
            <SenderBox>
              <MediumBold color="white">From</MediumBold>
              <SenderSubbox>
                <TextSmall color="white">
                  <SmallBold color="white">Email: </SmallBold>
                  {user?.email}
                </TextSmall>
                <TextSmall color="white">
                  <SmallBold color="white">Name: </SmallBold>{user?.firstName}
                </TextSmall>
                <TextSmall color="white">
                  <SmallBold color="white">Address: </SmallBold>katra(samal)
                </TextSmall>
              </SenderSubbox>
            </SenderBox>
            <SenderBox background="white">
              <MediumBold>Bill To</MediumBold>
              <SenderSubbox>
                <TextSmall>
                  <SmallBold>Email: </SmallBold>
                  {customer?.BusinessEmail}
                </TextSmall>
                <TextSmall>
                  <SmallBold>Name: </SmallBold>
                  {customer?.BusinessName}
                </TextSmall>
                <TextSmall>
                  <SmallBold>Address: </SmallBold>
                  {customer?.BusinessAddress}
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

        {/* 
        <DatePicker
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          defaultValue={new Date()}
          minDate={new Date()}
          headerBackgroundColor="black"
        /> */}
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
              <DateView > 
              <DatePicker
              closeOnScroll={true}
                selected={new Date(date)}
                disabled={false}
                onChange={(date) =>
                   setDate(date.toString().substring(0, 15))
                }
                customInput={<Input />}
                renderCustomHeader={({
                  decreaseMonth,
                  increaseMonth,
                }) => (
                 <Row style={{
                  paddingInline:"10px",
                 }}>
                    <Button color="black" background="transparent"  width="15%"  onClick={decreaseMonth} title="<"/>
                   <Button  color="black" width="15%" background="transparent"  onClick={increaseMonth} title=">"/>
                   </Row>
                )}
              />
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
              <Button
                title="Downlaod"
                background="lightblue"
                width="48%"
                onClick={() => navigate("/email1", { state: { data: email } })}
              />
            </Row>
          </InvoiceClient>
        </InvoiceView2>
      </InvoiceContainer>
    </Wrapper>
  );
}
