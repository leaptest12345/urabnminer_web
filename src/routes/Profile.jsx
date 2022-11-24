import React from "react";
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
import { Title, Wrapper, Text } from "../utils/GlobalStyles";

const defautlUrl =
  "https://cdn.dribbble.com/users/439063/avatars/normal/4f4177a2f6c0cc8e75dde4ff6b3705ae.png?1634834389";
export default function Profile({}) {
  return (
    <Wrapper>
      <Title>Profile</Title>
      <ProfileContainer>
        <Text>your profile photo</Text>
        <ProfileImgView>
          <ImageModal url={defautlUrl} />
          <PhotoCapture />
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
