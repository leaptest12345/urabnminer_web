import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import ImageModal from "../components/ImageModal";
import Input from "../components/Input";
import LoaderSpinner from "../components/Loader";
import PhotoCapture from "../components/PhotoCapture";
import SearchAutoComplete from "../components/SearchAutoComplete";
import { StyledInput } from "../styles/Input.styles";
import {
  ImageView,
  ProfileContainer,
  ProfileImg,
  ProfileImgView,
  ProfileInput,
} from "../styles/Profile.styles";
import { defautlUrl, emailReg, phoneReg } from "../utils/constants/commonConst";
import {
  changeEmail,
  getData,
  updateData,
} from "../utils/firebase/firebaseApi";
import {
  deleteProfileImage,
  uploadProfileImage,
} from "../utils/firebase/firebaseStorage";
import {
  Title,
  Wrapper,
  Row,
  InputText,
  Text_reg,
} from "../utils/GlobalStyles";
import { toastAlert } from "../utils/toastAlert";
export default function Profile({}) {
  const [photo, setPhoto] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [photoName, setPhotoName] = useState(null);
  const id = localStorage.getItem("userID");
  const [changePhoto, setChangePhoto] = useState(null);
  const [countryCode, setCountryCode] = useState("");
  const [countryName, setCountryName] = useState("");
  const getUserDetail = async () => {
    try {
      const id = localStorage.getItem("userID");
      const userDetail = await getData(`USERS/${id}`);
      console.log(userDetail);
      setFirstName(userDetail?.firstName);
      setLastName(userDetail?.lastName);
      setEmail(userDetail?.email);
      setPhoto(userDetail?.photo);
      setPhotoName(userDetail?.photoName);
      setPhoneNumber(userDetail?.phoneNumber);
      setCountryName(userDetail?.countryName);
    } catch (error) {
      console.log(error);
    }
  };
  const updateProfile = async () => {
    setLoading(true);
    try {
      if (emailReg.test(email)) {
        if (phoneReg.test(phoneNumber)) {
          if (changePhoto) {
            console.log("inside changephotot");
            if (photoName) {
              console.log("inside 123");
              const value = await deleteProfileImage(photoName);
              console.log(value);
            }
            const uploadProfile = await uploadProfileImage(changePhoto);
            await updateData(`USERS/${id}`, {
              photo: uploadProfile[0],
              photoName: uploadProfile[1],
              firstName: firstName,
              lastName: lastName,
              phoneNumber: phoneNumber,
              email: email,
              countryCode: countryCode,
              countryName: countryName,
            });
          } else {
            await updateData(`USERS/${id}`, {
              firstName: firstName,
              lastName: lastName,
              phoneNumber: phoneNumber,
              email: email,
              countryCode: countryCode,
              countryName: countryName,
            });
          }
          const result = await changeEmail(email);
          console.log(result);
          toastAlert(1, "Profile has been updated!");
          setLoading(false);
        } else {
          toastAlert(0, "Please Enter Valid Phone Number!");
          setLoading(false);
        }
      } else {
        toastAlert(0, "Please Enter Valid Email Address!");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserDetail();
  }, []);
  const handlePhoto = (e) => {
    setPhoto(e.target.files[0]);
    setChangePhoto(e.target.files[0]);
  };
  const onSearchChange = (e, value) => {
    console.log(value.label);
    setCountryCode(value.phone);
    setCountryName(value.label);
  };
  return (
    <Wrapper>
      <LoaderSpinner visible={loading} isCenter={true} />
      <Title>Profile</Title>
      <ProfileContainer>
        <Text_reg>your profile photo</Text_reg>
        <ProfileImgView>
          <ImageView>
            <ImageModal circle={true} url={photo || defautlUrl} />
          </ImageView>
          <PhotoCapture handleChange={handlePhoto} />
        </ProfileImgView>
        <ProfileInput>
          <InputText>PhoneNumber:</InputText>
          <Row>
            <SearchAutoComplete
              defaultValue={countryName + ""}
              width="30%"
              onChange={onSearchChange}
            />
            <StyledInput
              width="67%"
              value={phoneNumber}
              error={phoneNumber ? !phoneReg.test(phoneNumber) : false}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Row>
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
            value={email}
            label="Email"
            error={email ? !emailReg.test(email) : false}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button title="Save" onClick={() => updateProfile()} />
        </ProfileInput>
      </ProfileContainer>
    </Wrapper>
  );
}
