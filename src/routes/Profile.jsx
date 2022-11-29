import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import ImageModal from "../components/ImageModal";
import Input from "../components/Input";
import LoaderSpinner from "../components/Loader";
import PhotoCapture from "../components/PhotoCapture";
import SearchAutoComplete from "../components/SearchAutoComplete";
import { StyledInput } from "../styles/Input.styles";
import {
  ProfileContainer,
  ProfileImg,
  ProfileImgView,
  ProfileInput,
} from "../styles/Profile.styles";
import { defautlUrl } from "../utils/constants/commonConst";
import { getData, updateData } from "../utils/firebase/firebaseApi";
import { Title, Wrapper, Text, Row, InputText } from "../utils/GlobalStyles";
import { toastAlert } from "../utils/toastAlert";

export default function Profile({}) {
  const [photo, setPhoto] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const id = localStorage.getItem("userID");
  const data = {
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
    email: email,
  };
  const getUserDetail = async () => {
    try {
      const id = localStorage.getItem("userID");
      const userDetail = await getData(`USERS/${id}`);
      console.log(userDetail);
      setFirstName(userDetail?.firstName);
      setLastName(userDetail?.lastName);
      setEmail(userDetail?.email);
      setPhoto(userDetail?.photo);
      setPhoneNumber(userDetail?.phoneNumber);
    } catch (error) {
      console.log(error);
    }
  };
  const updateProfile = async () => {
    setLoading(true);
    try {
      await updateData(`USERS/${id}`, data);
      toastAlert(1, "Profile has been updated!");
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserDetail();
  }, []);
  return (
    <Wrapper>
      <LoaderSpinner visible={loading} isCenter={true} />
      <Title>Profile</Title>
      <ProfileContainer>
        <Text>your profile photo</Text>
        <ProfileImgView>
          <ImageModal url={photo || defautlUrl} />
          <PhotoCapture
            handleChange={(e) =>
              setPhoto(URL.createObjectURL(e.target.files[0]))
            }
          />
        </ProfileImgView>
        <ProfileInput>
          <InputText>PhoneNumber:</InputText>
          <Row>
            <SearchAutoComplete width="30%" />
            <StyledInput
              width="67%"
              value={phoneNumber}
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
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button title="Save" onClick={() => updateProfile()} />
        </ProfileInput>
      </ProfileContainer>
    </Wrapper>
  );
}
