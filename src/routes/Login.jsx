import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";
import { Bold_1, Row, Text, Text_bold, Title } from "../utils/GlobalStyles";
const BackImg =
  "https://c4.wallpaperflare.com/wallpaper/665/162/516/tunnel-tracks-light-trees-wallpaper-preview.jpg";
import APPROVAL from "../assets/approval.png";
import CORRECT from "../assets/correct.png";
import ImageModal from "../components/ImageModal";
export default function Login() {
  const LoginContainer = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    margin: 0;
    align-items: center;
    justify-content: center;
    padding: 0;
    overflow-y: scroll;
    background-color: #dcdee1;
    transition: all 0.3s ease-in-out;
  `;
  const LoginBox = styled.div`
    display: grid;
    border-radius: 10px;
    background-color: whitesmoke;
    grid-template-columns: repeat(2, 50%);
    height: 90%;
    box-shadow: 3px 0 5px -2px #888;
    width: 80%;
    overflow: visible;
    @media (max-width: 900px) {
      grid-template-columns: 100%;
      grid-template-rows: 100%;
      /* height: auto; */
    }
  `;
  const LoginBoxLeft = styled.div`
    /* background-color: lightblue; */
    padding: 12%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    @media (max-width: 900px) {
      padding: 7%;
    }
  `;
  const LoginBoxRight = styled.div`
    /* background-color: lightgreen; */
    background-image: url(${BackImg});
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    padding: 10%;
    display: flex;
    border-image: stretch;
    flex-direction: column;
    justify-content: space-around;
    @media (max-width: 900px) {
      display: none;
    }
  `;
  const ForgotLink = styled(Link)`
    align-self: flex-end;
    color: black;
  `;
  return (
    <LoginContainer>
      <LoginBox>
        <LoginBoxLeft>
          <Row>
            <Title>UrbanMiner</Title>
            <ImageModal
              disable={true}
              url={APPROVAL}
              style={{
                width: "90px",
                height: "90px",
                alignSelf: "center",
              }}
            />
          </Row>
          <Text>Welcome Back,Please Enter Your Details</Text>
          <Input label="Email" />
          <Input type="password" label="Password" />
          <ForgotLink>Forgot Password?</ForgotLink>
          <Button title="LogIn" width="100%" />
          <Text style={{ alignSelf: "center" }}>
            Don't have an account? <ForgotLink to="/signup">SignUp</ForgotLink>
          </Text>
        </LoginBoxLeft>
        <LoginBoxRight>
          <Title style={{ color: "white" }}>Approval</Title>
          <Bold_1 color="white">We're Evaluating Your Profile</Bold_1>
          <ImageModal
            disable={true}
            url={CORRECT}
            style={{
              width: "90px",
              height: "90px",
              alignSelf: "center",
            }}
          />
          <Text_bold color="white">
            In order to make sure our community holds up a standard,we don't
            allow any profiles to get in.
          </Text_bold>
        </LoginBoxRight>
      </LoginBox>
    </LoginContainer>
  );
}
