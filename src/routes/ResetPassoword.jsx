import React from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";
import { Bold_1, Text, Title, Wrapper } from "../utils/GlobalStyles";
import LOCK from "../assets/lock.gif";
export default function ResetPassword() {
  const ForgotPasswordContainer = styled.div`
    padding-inline: 10%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 80vh;
    width: 50vw;
    @media (max-width: 900px) {
      width: 100vw;
    }
  `;
  const ForgotTitle = styled.div`
    display: flex;
    flex-direction: column;
    height: 9vh;
    justify-content: space-between;
  `;
  const LockImg = styled.img`
    width: 200px;
    height: 200px;
  `;
  return (
    <Wrapper>
      <Title>Reset Password</Title>
      <ForgotPasswordContainer>
        <LockImg src={LOCK} />
        <ForgotTitle>
          <Bold_1>Forgot Password?</Bold_1>
          <Text>No Worries,We'll Send You Instructions</Text>
        </ForgotTitle>
        <Input label="Email" />
        <Button title="Reset Password" width="100%" />
      </ForgotPasswordContainer>
    </Wrapper>
  );
}
