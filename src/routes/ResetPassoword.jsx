import React, { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { Bold_1, Text_reg, Title, Wrapper } from "../utils/GlobalStyles";
import LOCK from "../assets/lock.gif";
import { toastAlert } from "../utils/toastAlert";
import { sendEmail } from "../utils/firebase/firebaseApi";
import {
  ForgotPasswordContainer,
  ForgotTitle,
  LockImg,
} from "../styles/ResetPass.styles";
export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const onResetPass = async () => {
    try {
      if (!email) toastAlert(0, "Please Enter Valid Email Address!");
      else {
        await sendEmail(email);
        toastAlert(1, "Please Check Your Email!");
        setEmail("");
      }
    } catch (error) {
      console.log("email", error);
      toastAlert(0, error);
    }
  };
  return (
    <Wrapper>
      <Title>Reset Password</Title>
      <ForgotPasswordContainer>
        <LockImg src={LOCK} />
        <ForgotTitle>
          <Bold_1>Forgot Password?</Bold_1>
          <Text_reg>No Worries,We'll Send You Instructions</Text_reg>
        </ForgotTitle>
        <Input
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          title="Reset Password"
          width="100%"
          onClick={() => onResetPass()}
        />
      </ForgotPasswordContainer>
    </Wrapper>
  );
}
