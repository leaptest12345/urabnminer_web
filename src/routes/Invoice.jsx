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
import {
  uploadInvoiceImages,
  uploadPdf,
} from "../utils/firebase/firebaseStorage";
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
import { ContactUs } from "../utils/sendMail";
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
  const [user, setUser] = useState(null);
  const [emailItems, setEmailItems] = useState([]);
  const [invoiceItem1, setInvoiceItem1] = useState([]);
  const [invoiceType, setInvoiceType] = useState("");
  const customerID =
    state?.invoiceDetail?.customerId ||
    state?.customerDetail?.ID ||
    customerDetail?.ID;
  const invoiceID = state?.invoiceDetail?.ID || uniqueId;
  const isEditable = state?.invoiceDetail?.ID ? true : false;
  const customer = state?.customerDetail || customerDetail;
  const paymentTypeConst = paymentType;
  useEffect(() => {
    if (isEditable) {
      getAllData();
    }
    console.log("invoicedtyep", invoiceType);
    setTimeout(() => {
      CalculateSameItems();
    }, 10000);
    getCustomerList();
    getPaymentList();
    getUserDetail();
  }, []);
  useEffect(() => {
    setTotal();
  }, [render]);

  const getUserDetail = async () => {
    try {
      const userDetail = await getData(`USERS/${userID}`);
      setUser(userDetail);
    } catch (error) {
      console.log(error);
    }
  };
  const email = {
    invoiceID,
    date,
    customer,
    InvoiceItems,
    amount,
    paymentType,
  };
  const email1 = {
    invoiceID,
    date,
    customer,
    emailItems,
    amount,
    paymentType,
  };
  const getCustomerList = async () => {
    try {
      const customerDetail = await getData(`USER_CUSTOMER/${userID}/CUSTOMER`);
      let arr = [];
      ArrayConverter(customerDetail).map((item) => {
        if (item.ID == customerID) {
          setCustomerDetail(item);
        }
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
      console.log(
        "payemntname",
        invoiceListData.paymentType,
        typeof invoiceListData.paymentType
      );
      setPaymentType(invoiceListData.paymentType);
      setNote(invoiceListData.note);
      setInvoiceType(invoiceListData.type);
      setDate(invoiceListData.invoiceDate.toString().substring(0, 15));
      const invoiceData = await getData(`/INVOICE/${invoiceID}`);
      let arr = [];
      ArrayConverter(invoiceData).map((item, index) => {
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
      CalculateSameItems(arr);
      setInvoiceItems(arr);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const onItemDelete = async (item, index) => {
    setLoading(true);
    setInvoiceItems([]);
    if (InvoiceItems.length == 1) {
      setInvoiceItems([]);
      if (isEditable) {
        await setData(
          `/INVOICE_IMAGES/User:${userID}/customer:${customerID}/invoice:${invoiceID}`,
          null
        );
        await setData(`INVOICE_LIST/${invoiceID}`, null);
        await setData(`INVOICE/${invoiceID}`, null);
        toastAlert(0, "Invoice has been deleted!");
      }
    } else {
      const arr = InvoiceItems.filter((item1) => item1.id != index + 1);
      setTimeout(() => {
        setInvoiceItems(arr);
      }, 1000);
    }
    setTotal();
    setLoading(false);
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
      setTotal();
    }
  };
  function toDataURL(url, callback) {
    let xhRequest = new XMLHttpRequest();
    xhRequest.onload = function () {
      let reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
        console.log(reader.result);
      };
      reader.readAsDataURL(xhRequest.response);
    };
    xhRequest.open("GET", url);
    xhRequest.responseType = "blob";
    xhRequest.send();
  }
  const onImagePic = (e, item) => {
    if (e.target.files.length !== 0) {
      toDataURL(URL.createObjectURL(e.target.files[0]), function (value) {
        item.IMG.push({
          id: item.IMG.length + 1,
          url: e.target.files[0],
          base64: value,
        });
        setRender(!render);
      });
    }
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
    await setData(
      `/INVOICE_IMAGES/User:${userID}/customer:${customerID}/invoice:${invoiceID}`,
      null
    );
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
            await setData(
              `/INVOICE_IMAGES/User:${userID}/customer:${customerID}/invoice:${invoiceID}/item:${
                index + 1
              }/${imageIndex + 1}`,
              {
                photoName: (uploadUrl[0] + "").split("token=")[1],
                url: uploadUrl[0],
                base64: imageDetail.base64,
              }
            );
          } else {
            setData(
              `/INVOICE_IMAGES/User:${userID}/customer:${customerID}/invoice:${invoiceID}/item:${
                index + 1
              }/${imageIndex + 1}`,
              {
                photoName: (imageDetail.url + "").split("token=")[1],
                url: imageDetail.url,
                base64: imageDetail.base64,
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
              if (type == "sent") {
                sendInvoiceClick();
              } else {
                setTimeout(() => {
                  navigate("/draft");
                }, 2000);
              }
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
  const CalculateSameItems = (arr) => {
    console.log("inside", arr);
    setEmailItems([]);
    const alredyExist = (itemname, WeightType) => {
      let temp = false;
      emailItems.map((item) => {
        if (item.ItemName == itemname && item.WeightType == WeightType) {
          temp = true;
        }
      });
      return temp;
    };
    console.log(InvoiceItems);
    arr.map((item) => {
      if (alredyExist(item.ItemName, item.WeightType)) {
        const index = emailItems.findIndex(
          (value) =>
            value.ItemName == item.ItemName &&
            value.WeightType == item.WeightType
        );
        if (emailItems[index].WeightType == "Unit") {
          const itemUnit = item.details.Unit;
          const itemTotal = item.details.Total;
          const emailUnit = emailItems[index].details.Unit;
          const emailTotal = emailItems[index].details.Total;
          const unit = parseFloat(emailUnit) + parseFloat(itemUnit);
          const total = parseFloat(emailTotal) + parseFloat(itemTotal);
          emailItems[index].details.Unit = unit;
          emailItems[index].details.Total = total;
          invoiceItem1.push({
            index: index,
            Unit: emailUnit,
            Total: emailTotal,
            NetWeight: 0,
          });
        } else {
          const itemNetWeight = item.details.NetWeight;
          const itemTotal1 = item.details.Total;
          const emailNetWeight = emailItems[index].details.NetWeight;
          const emailTotal1 = emailItems[index].details.Total;
          const netWeight =
            parseFloat(itemNetWeight) + parseFloat(emailNetWeight);
          const total1 = parseFloat(itemTotal1) + parseFloat(emailTotal1);
          emailItems[index].details.NetWeight = netWeight;
          emailItems[index].details.Total = total1;
          invoiceItem1.push({
            index: index,
            Unit: 0,
            Total: emailTotal1,
            NetWeight: emailNetWeight,
          });
        }
      } else {
        emailItems.push({
          ItemName: item.ItemName,
          WeightType: item.WeightType,
          details: item.details,
        });
      }
    });
    console.log("emailItems", emailItems);
  };
  const sendInvoiceClick = () => {
    navigate("/container", {
      state: {
        data: email,
        data1: email1,
        details: {
          userID,
          customerID,
          invoiceID,
        },
      },
    });
  };
  const body = `<strong>Invoice Pdf1</strong><br/><p>invoice 1 url</p><br/><br/>
  <strong>Invoice Pdf2</strong><br/><p>invoice2 url</p>`;
  const subject = "UrbanMiner";
  return (
    <Wrapper>
      <LoaderSpinner visible={loading} isCenter={true} />
      <Title>New Invoice</Title>
      {invoiceType == "sent" ? null : (
        <View_6>
          <Text_reg>Choose Customer:</Text_reg>
          <SearchAutoComplete
            searchOptions={customerList}
            onChange={(e, value) => addCustomerDetails(value)}
          />
        </View_6>
      )}
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
                  <SmallBold color="white">Name: </SmallBold>
                  {user?.firstName}
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
            return (
              <InvoiceItem
                disabled={invoiceType == "sent" ? true : false}
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
          {invoiceType != "sent" ? (
            <div style={{ marginBottom: "20px" }}>
              <Button title="Add" width="20%" onClick={() => onAddItem()} />
            </div>
          ) : null}
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
            <TextArea
              value={note}
              disabled={InvoiceItems == "sent" ? true : false}
              contentEditable={InvoiceItems == "sent" ? true : false}
              onChange={(e) =>
                InvoiceItems == "sent" ? null : setNote(e.target.value)
              }
            />
          </InvoiceClient>
          <InvoiceClient>
            <Bold_1>PaymentType:</Bold_1>
            <SearchAutoComplete
              disabled={invoiceType == "sent" ? true : false}
              searchOptions={paymentList}
              defaultValue={paymentTypeConst}
              onChange={(e, value) => setPaymentType(value.label)}
            />
            <InfoView>
              <Bold_1>Date:</Bold_1>
              <DateView>
                <DatePicker
                  closeOnScroll={true}
                  selected={new Date(date)}
                  disabled={invoiceType == "sent" ? true : false}
                  onChange={(date) => setDate(date.toString().substring(0, 15))}
                  customInput={<Input />}
                  renderCustomHeader={({ decreaseMonth, increaseMonth }) => (
                    <Row
                      style={{
                        paddingInline: "10px",
                      }}
                    >
                      <Button
                        color="black"
                        background="transparent"
                        width="15%"
                        onClick={decreaseMonth}
                        title="<"
                      />
                      <Button
                        color="black"
                        width="15%"
                        background="transparent"
                        onClick={increaseMonth}
                        title=">"
                      />
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
            {invoiceType != "sent" ? (
              <Row>
                <Button
                  title={"Save"}
                  background="lightgreen"
                  color="black"
                  width="48%"
                  onClick={() =>
                    CalculateSameItems(InvoiceItems) + createData("draft")
                  }
                />
              </Row>
            ) : null}
            <Button
              title="Send|Download Invoice"
              width="100%"
              onClick={() => {
                CalculateSameItems(InvoiceItems);
                invoiceType == "sent" ? sendInvoiceClick() : createData("sent");
              }}
            />
          </InvoiceClient>
        </InvoiceView2>
      </InvoiceContainer>
    </Wrapper>
  );
}
