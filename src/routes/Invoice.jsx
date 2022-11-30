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

// const getAllData = async () => {
//   setLoading(true);
//   database()
//     .ref(`/INVOICE/${invoiceID}`)
//     .once('value', snapshot => {
//       setItemDetail(snapshot.val());
//     });
//   database()
//     .ref(
//       `/INVOICE_IMAGES/User:${userId}/customer:${customerId}/invoice:${invoiceID}`,
//     )
//     .once('value', snapshot => {
//       snapshot.val() == null
//         ? setImageUploaded(false)
//         : setIMG(snapshot.val());
//     });
//   getImages();
//   database()
//     .ref(`/INVOICE_LIST/${invoiceID}`)
//     .once('value', snapshot => {
//       setAmount(snapshot.val().Amount);
//       setPaymentType(snapshot.val().paymentType);
//       setNote(snapshot.val().note);
//       setDate(new Date(snapshot.val().invoiceDate));
//     });
// };
export default function Invoice() {
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
  const [date, setDate] = useState(new Date().toString().substring(0, 15));
  //useEffect for reload page
  useEffect(() => {
    setTotal();
  }, [render]);

  const userId = localStorage.getItem("userID");
  const onItemDelete = (item, index) => {
    setInvoiceItems([]);
    const arr = InvoiceItems.filter((item) => item.id != index + 1);
    setInvoiceItems(arr);
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
  const onGrossChange = (e, item) => {
    item.details.GrossWeight = e.target.value;
    item.details.NetWeight =
      parseFloat(item.details.GrossWeight) -
      parseFloat(item.details.TareWeight);
    item.details.Total =
      parseFloat(item.details.NetWeight) * parseFloat(item.details.WeightPrice);
    setRender(!render);
    setTotal();
  };
  const onTareChange = (e, item) => {
    item.details.TareWeight = e.target.value;
    item.details.NetWeight =
      parseFloat(item.details.GrossWeight) -
      parseFloat(item.details.TareWeight);
    item.details.Total =
      parseFloat(item.details.NetWeight) * parseFloat(item.details.WeightPrice);
    setRender(!render);
    setTotal();
  };
  const onWeightPriceChange = (e, item) => {
    item.details.WeightPrice = e.target.value;
    item.details.Total =
      parseFloat(item.details.NetWeight) * parseFloat(item.details.WeightPrice);
    setRender(!render);
    setTotal();
  };
  const onUnitChange = (e, item) => {
    item.details.Unit = e.target.value;
    item.details.Total =
      parseFloat(item.details.Unit) * parseFloat(item.details.UnitPrice);
    setRender(!render);
    setTotal();
  };
  const onUnitPriceChange = (e, item) => {
    item.details.UnitPrice = e.target.value;
    item.details.Total =
      parseFloat(item.details.Unit) * parseFloat(item.details.UnitPrice);
    setRender(!render);
    setTotal();
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
    setTotal();
  };
  const onWeightTypeChange = (item) => {
    item.WeightType = item.WeightType == "Unit" ? "Weight" : "Unit";
    setDefaultValue(item);
    setTotal();
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
  useEffect(() => {
    getPaymentList();
  }, []);

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
            console.log(item.WeightType);
            return (
              <InvoiceItem
                key={index + 1 + "#"}
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
        <DatePicker
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          defaultValue={new Date()}
          minDate={new Date()}
          headerBackgroundColor="black"
          onChange={(date) =>
            console.log(date.toString().substring(0, 15)) +
            setIsOpen(false) +
            setDate(date.toString().substring(0, 15))
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
                // onClick={() => navigate("/subproduct")}
              />
              <Button title="Downlaod" background="lightblue" width="48%" />
            </Row>
          </InvoiceClient>
        </InvoiceView2>
      </InvoiceContainer>
    </Wrapper>
  );
}
