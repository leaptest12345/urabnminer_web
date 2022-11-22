import React from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import {
  ProfileContainer,
  ProfileImg,
  ProfileImgView,
  ProfileInput,
  SecondaryText,
} from "../styles/Profile.styles";
import {
  InputText,
  MediumText,
  Title,
  Wrapper,
  InputContainer,
} from "../utils/GlobalStyles";

export default function Profile({}) {
  return (
    <Wrapper>
      <ProfileContainer>
        <Title>Profile</Title>
        <SecondaryText>your profile photo</SecondaryText>
        <ProfileImgView>
          <ProfileImg
            src="https://cdn.dribbble.com/users/439063/avatars/normal/4f4177a2f6c0cc8e75dde4ff6b3705ae.png?1634834389"
            alt="noPhoto"
          />
          <Button title="Your Photo" width="30%" />
        </ProfileImgView>
        <ProfileInput>
          <Input label="FirstName" />
          <Input label="LastName" />
          <Input label="Email" />
          <Input label="PhoneNumber" />
        </ProfileInput>
        <div style={{ marginTop: "20px", marginLeft: "10px" }}>
          <Button title="Save" width="30%" />
        </div>
      </ProfileContainer>
    </Wrapper>
  );
}
