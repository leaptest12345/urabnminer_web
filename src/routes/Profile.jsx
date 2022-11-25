import React, { useState } from "react";
import Button from "../components/Button";
import ImageModal from "../components/ImageModal";
import Input from "../components/Input";
import PhotoCapture from "../components/PhotoCapture";
import {
  ProfileContainer,
  ProfileImg,
  ProfileImgView,
  ProfileInput,
} from "../styles/Profile.styles";
import { defautlUrl } from "../utils/constants/commonConst";
import { Title, Wrapper, Text } from "../utils/GlobalStyles";

export default function Profile({}) {
  const [photo, setPhoto] = useState("");
  return (
    <Wrapper>
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
          <Input label="FirstName" />
          <Input label="LastName" />
          <Input label="Email" />
          <Input label="PhoneNumber" />
          <Button title="Save" />
        </ProfileInput>
      </ProfileContainer>
    </Wrapper>
  );
}
