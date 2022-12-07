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
import { toDataURL } from "../utils/toDataURL";
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
      setFirstName(userDetail?.firstName);
      setLastName(userDetail?.lastName);
      setEmail(userDetail?.email);
      setPhoto({
        url: userDetail?.photo,
      });
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
            const uploadProfile = await uploadProfileImage(changePhoto.url);
            await updateData(`USERS/${id}`, {
              photo: uploadProfile[0],
              photoName: uploadProfile[1],
              firstName: firstName,
              lastName: lastName,
              phoneNumber: phoneNumber,
              email: email,
              countryCode: countryCode,
            });
          } else {
            await updateData(`USERS/${id}`, {
              firstName: firstName,
              lastName: lastName,
              phoneNumber: phoneNumber,
              email: email,
              countryCode: countryCode,
            });
          }
          toastAlert(1, "Profile has been updated!");
          setLoading(false);
          if (photoName) {
            const value = await deleteProfileImage(photoName);
          }
        } else {
          toastAlert(0, "Please Enter Valid Phone Number!");
          setLoading(false);
        }
      } else {
        toastAlert(0, "Please Enter Valid Email Address!");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserDetail();
  }, []);
  const handlePhoto = (e) => {
    if (e.target.files.length !== 0) {
      toDataURL(URL.createObjectURL(e.target.files[0]), function (value) {
        setPhoto({ url: e.target.files[0], base64: value });
        setChangePhoto({ url: e.target.files[0], base64: value });
      });
    }
  };
  const onSearchChange = (e, value) => {
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
            <ImageModal
              circle={true}
              url={photo?.base64 ? photo.base64 : photo.url || defautlUrl}
            />
          </ImageView>
          <PhotoCapture handleChange={handlePhoto} />
        </ProfileImgView>
        <ProfileInput>
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
          <InputText>PhoneNumber:</InputText>
          {/* <Row> */}
          {/* <SearchAutoComplete
              defaultValue={countryName + ""}
              width="30%"
              onChange={onSearchChange}
            /> */}
          <StyledInput
            // width="67%"
            value={phoneNumber}
            error={phoneNumber ? !phoneReg.test(phoneNumber) : false}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {/* </Row> */}

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
