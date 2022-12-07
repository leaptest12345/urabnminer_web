import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import ImageModal from "../components/ImageModal";
import Input from "../components/Input";
import PhotoCapture from "../components/PhotoCapture";
import SearchAutoComplete from "../components/SearchAutoComplete";
import {
  CustomerBox,
  CustomerPhotoView,
  TextArea,
  TextAreaView,
} from "../styles/Customer.styles";
import { ArrayConverter } from "../utils/ArrayConverter";
import { getData, setData } from "../utils/firebase/firebaseApi";
import {
  InputText,
  ItemTitle,
  Row,
  Text_reg,
  Title,
  View_6,
  Wrapper,
} from "../utils/GlobalStyles";
import { toastAlert } from "../utils/toastAlert";
import { uniqueId } from "../utils/uniqueId";
import { uploadCustomerImage } from "../utils/firebase/firebaseStorage";
import LoaderSpinner from "../components/Loader";
import { emailReg } from "../utils/constants/commonConst";
import { useLocation, useNavigate } from "react-router-dom";
import { RouteName } from "../utils/constants/routeNavigate";
import { toDataURL } from "../utils/toDataURL";
export default function Customer() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [photo1, setPhoto1] = useState("");
  const [photo2, setPhoto2] = useState("");
  const [customerList, setCustomerList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [custId, setCustId] = useState(null);
  const [customerDetail, setCustomerDetail] = useState(null);
  const id = localStorage.getItem("userID");

  const { state } = useLocation();

  const getCustomerDetail = async (value) => {
    try {
      setCustomerDetail(value);
      if (value == null) {
        clearDetail();
      } else {
        setCustId(value?.ID);
        setFirstName(value?.UserFirstName);
        setLastName(value?.UserLastName);
        setEmail(value?.BusinessEmail);
        setAddress(value?.BusinessAddress);
        setName(value?.BusinessName);
      }
      const imagesDetail = await getData(
        `CUSTOMER_IMG/user:${id}/customer:${value.ID}`
      );
      const images = ArrayConverter(imagesDetail);
      if (images.length != 0) {
        setPhoto({
          url: images[0]?.url,
        });
        setPhoto1({
          url: images[1]?.url,
        });
        setPhoto2({
          url: images[2]?.url,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const clearDetail = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setAddress("");
    setName("");
    setPhoto("");
    setPhoto1("");
    setPhoto2("");
    setCustId(null);
  };
  const getCustomerList = async () => {
    try {
      const customerDetail = await getData(`USER_CUSTOMER/${id}/CUSTOMER`);
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
  const alredyExist = () => {
    let result = false;
    customerList.map((item) => {
      if (item.BusinessEmail == email) result = true;
    });
    return result;
  };
  const createCustomer = async () => {
    try {
      setLoading(true);
      if (!firstName || !lastName || !email || !address || !name)
        toastAlert(0, "All fields are mendatory please fill up!");
      else if (!photo || !photo1 || !photo2)
        toastAlert(0, "Customer photos are required!");
      else {
        const customerID = uniqueId;
        const PhotoUrl = await uploadCustomerImage(photo.url, id, customerID);
        await setData(`CUSTOMER_IMG/user:${id}/customer:${customerID}/1`, {
          photoName: "BUSINESS_CARD",
          url: PhotoUrl,
        });
        const PhotoUrl1 = await uploadCustomerImage(photo1.url, id, customerID);
        await setData(`CUSTOMER_IMG/user:${id}/customer:${customerID}/2`, {
          photoName: "SCRAP_PERMIT",
          url: PhotoUrl1,
        });
        const PhotoUrl2 = await uploadCustomerImage(photo2.url, id, customerID);
        await setData(`CUSTOMER_IMG/user:${id}/customer:${customerID}/3`, {
          photoName: "THUMB_PRINT",
          url: PhotoUrl2,
        });
        await setData(`USER_CUSTOMER/${id}/CUSTOMER/${customerID}`, {
          ID: customerID,
          BusinessName: name,
          BusinessEmail: email,
          BusinessAddress: address,
          UserFirstName: firstName,
          UserLastName: lastName,
          userID: id,
        });
        toastAlert(1, "Customer Successfully Created!");
        // navigate("/product", {
        //   state: {
        //     customerDetail: {
        //       ID: uniqueId,
        //     },
        //   },
        // });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCustomerList();
  }, []);

  const onStartInvoice = () => {
    navigate("/invoice");
  };
  const capturePhoto = (e) => {
    if (e.target.files.length !== 0) {
      toDataURL(URL.createObjectURL(e.target.files[0]), function (value) {
        setPhoto({
          url: e.target.files[0],
          base64: value,
        });
      });
    }
  };
  const capturePhoto1 = (e) => {
    if (e.target.files.length !== 0) {
      toDataURL(URL.createObjectURL(e.target.files[0]), function (value) {
        setPhoto1({
          url: e.target.files[0],
          base64: value,
        });
      });
    }
  };
  const capturePhoto2 = (e) => {
    if (e.target.files.length !== 0) {
      toDataURL(URL.createObjectURL(e.target.files[0]), function (value) {
        setPhoto2({
          url: e.target.files[0],
          base64: value,
        });
      });
    }
  };
  return (
    <Wrapper>
      <LoaderSpinner visible={loading} isCenter={true} />
      <Title>Select Customer</Title>
      <View_6>
        <SearchAutoComplete
          searchOptions={customerList}
          onChange={(e, value) => getCustomerDetail(value)}
        />
      </View_6>
      <ItemTitle
        style={{
          marginTop: "5%",
        }}
      >
        Create New Customer:
      </ItemTitle>

      <CustomerBox>
        <Input
          value={firstName}
          label="FirstName"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          value={lastName}
          label="LastName"
          onChange={(e) => setLastName(e.target.value)}
        />
        <Input
          value={name}
          label="Business Name"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          value={email}
          label="Business Email"
          error={email ? !emailReg.test(email) : false}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextAreaView>
          <InputText>Business Address</InputText>
          <TextArea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </TextAreaView>
        <CustomerPhotoView>
          <Text_reg>Capture on ID or Business Card for your records</Text_reg>
          <Row>
            <PhotoCapture handleChange={(e) => capturePhoto(e)} />
            <ImageModal url={photo?.base64 ? photo.base64 : photo.url} />
          </Row>
        </CustomerPhotoView>
        <CustomerPhotoView>
          <Text_reg>Capture on ID or Business Card for your records</Text_reg>
          <Row>
            <PhotoCapture handleChange={(e) => capturePhoto1(e)} />
            <ImageModal url={photo1?.base64 ? photo1.base64 : photo1.url} />
          </Row>
        </CustomerPhotoView>
        <CustomerPhotoView>
          <Text_reg>Capture on ID or Business Card for your records</Text_reg>
          <Row>
            <PhotoCapture handleChange={(e) => capturePhoto2(e)} />
            <ImageModal url={photo2?.base64 ? photo2.base64 : photo2.url} />
          </Row>
        </CustomerPhotoView>
      </CustomerBox>
      <Button
        title="Start Invoice"
        onClick={() => {
          if (custId != null) {
            navigate("/invoice", {
              state: { customerDetail: customerDetail },
            });
          } else {
            if (!alredyExist()) {
              if (emailReg.test(email)) createCustomer();
              else toastAlert(0, "Please Enter Valid Email Address!");
            } else {
              toastAlert(0, "This Customer Already Exist!");
            }
          }
        }}
      />
    </Wrapper>
  );
}
