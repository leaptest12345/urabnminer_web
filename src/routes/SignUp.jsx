import React from "react";
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

export default function SignUp() {
  const hiddenFileInput = React.useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
  };
  return (
    <Wrapper>
      <SignUpWrapper>
        <Button title="Photo" width="20%" onClick={handleClick} />
        <SignUpContainer>
          <Input label="FirstName" />
          <Input label="LastName" />
          <Input label="Email" />
          <Input label="PhoneNumber" />
          <Input label="Password" />
          <Input label="ConfirmPassword" />
        </SignUpContainer>
        <input
          type="file"
          ref={hiddenFileInput}
          onChange={handleChange}
          style={{ display: "none" }}
        />
        {/* <FaApple color="black" style={{ width: "50px", height: "50px" }} />
        <FaFacebook color="blue" style={{ width: "50px", height: "50px" }} />
        <FaGoogle color="green" style={{ width: "50px", height: "50px" }} /> */}

        <Button title="Register" width="50%" />
      </SignUpWrapper>
    </Wrapper>
  );
}
