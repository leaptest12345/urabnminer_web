import React, { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import {
  Wrapper,
  InputText,
  InputContainer,
  SignUpContainer,
  SignUpWrapper,
} from "../styles/SignUp.styles";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import { Link } from "react-router-dom";
import PhotoCapture from "../components/PhotoCapture";
import { RowView } from "../styles/Invoice.styles";
import ImageModal from "../components/ImageModal";

export default function SignUp() {
  const [photo, setPhoto] = useState("");
  return (
    <Wrapper>
      <SignUpWrapper>
        <RowView>
          <PhotoCapture
            handleChange={(e) =>
              setPhoto(URL.createObjectURL(e.target.files[0]))
            }
          />
          <ImageModal url={photo} />
        </RowView>
        <SignUpContainer>
          <Input label="FirstName" />
          <Input label="LastName" />
          <Input label="Email" />
          <Input label="PhoneNumber" />
          <Input label="Password" />
          <Input label="ConfirmPassword" />
        </SignUpContainer>
        <Button title="Register" width="50%" />
      </SignUpWrapper>
    </Wrapper>
  );
}
