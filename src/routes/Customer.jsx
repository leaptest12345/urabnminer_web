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
  Row,
  Text,
  Title,
  View_6,
  Wrapper,
} from "../utils/GlobalStyles";
import { toastAlert } from "../utils/toastAlert";
import uuid from "react-uuid";
import { uniqueId } from "../utils/uniqueId";
import { uploadCustomerImage } from "../utils/firebase/firebaseStorage";

export default function Customer() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [photo1, setPhoto1] = useState("");
  const [photo2, setPhoto2] = useState("");
  const [customerList, setCustomerList] = useState([]);

  const id = localStorage.getItem("userID");
  const getCustomerDetail = async (value) => {
    try {
      console.log("valie", value);
      if (value == null) {
        clearDetail();
      } else {
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
      console.log(images);
      if (images.length != 0) {
        setPhoto(images[0]?.url);
        setPhoto(images[1]?.url);
        setPhoto(images[2]?.url);
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
  const createCustomer = async () => {
    // if (!firstName || !lastName || !email || !address)
    //   toastAlert(0, "All fields are mendatory please fill up!");
    // else if (!photo || !photo1 || !photo2)
    //   toastAlert(0, "Customer photos are required!");
    if (false) null;
    else {
      const customerID = uniqueId;
      const PhotoUrl = await uploadCustomerImage(photo, id, customerID);
      console.log("photo url::", PhotoUrl);
      // console.log("photo of url", PhotoUrl);
      // const detail = await setData(`USER_CUSTOMER/${id}/CUSTOMER/${customerID}`, {
      //   ID: customerID,
      //   BusinessName: name,
      //   BusinessEmail: email,
      //   BusinessAddress: address,
      //   UserFirstName: firstName,
      //   UserLastName: lastName,
      //   userID: id,
      // });
      // uploadCustomerImage(photo, id, uniqueId);
      toastAlert(1, "Customer Successfully Created!");
    }
  };
  useEffect(() => {
    getCustomerList();
  }, []);
  return (
    <Wrapper>
      <Title>Create Invoice</Title>
      <View_6>
        <SearchAutoComplete
          searchOptions={customerList}
          onChange={(e, value) => console.log(value) + getCustomerDetail(value)}
        />
      </View_6>
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
          <Text>Capture on ID or Business Card for your records</Text>
          <Row>
            <PhotoCapture
              handleChange={(e) =>
                setPhoto(URL.createObjectURL(e.target.files[0]))
              }
            />
            <ImageModal url={photo} />
          </Row>
        </CustomerPhotoView>
        <CustomerPhotoView>
          <Text>Capture on ID or Business Card for your records</Text>
          <Row>
            <PhotoCapture
              title="+"
              handleChange={(e) =>
                setPhoto1(URL.createObjectURL(e.target.files[0]))
              }
            />
            <ImageModal url={photo1} />
          </Row>
        </CustomerPhotoView>
        <CustomerPhotoView>
          <Text>Capture on ID or Business Card for your records</Text>
          <Row>
            <PhotoCapture
              handleChange={(e) =>
                setPhoto2(URL.createObjectURL(e.target.files[0]))
              }
            />
            <ImageModal url={photo2} />
          </Row>
        </CustomerPhotoView>
      </CustomerBox>
      <Button title="Start Invoice" onClick={() => createCustomer()} />
    </Wrapper>
  );
}
