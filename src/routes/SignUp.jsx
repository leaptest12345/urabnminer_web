import React, { useContext, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import {
  Wrapper,
  InputText,
  InputContainer,
  SignUpContainer,
  SignUpWrapper,
  ImageProfileView,
  View49,
  BackImageView,
} from "../styles/SignUp.styles";
import { Link, useNavigate } from "react-router-dom";
import PhotoCapture from "../components/PhotoCapture";
import { RowView } from "../styles/Invoice.styles";
import ImageModal from "../components/ImageModal";
import { defautlUrl, emailReg, phoneReg } from "../utils/constants/commonConst";
import LoaderSpinner from "../components/Loader";
import { uniqueId } from "../utils/uniqueId";
import { setData, SignUpAuth } from "../utils/firebase/firebaseApi";
import { uploadProfileImage } from "../utils/firebase/firebaseStorage";
import { toastAlert } from "../utils/toastAlert";
import { AuthContext } from "../utils/AuthContext";
import { ForgotLink, LoginBoxRight } from "../styles/Login.styles";
import { Bold_1, Row, Text_bold, Text_reg, Title } from "../utils/GlobalStyles";
import { toDataURL } from "../utils/toDataURL";

export default function SignUp() {
  const [photo, setPhoto] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext);
  const userId = uniqueId;
  const data = {
    ID: userId,
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phone,
    email: email,
    countryCode: countryCode,
    googleId: "",
    facebookId: "",
    isApproved: false,
    token: "",
  };
  const validateDetail = () => {
    if (pass == confirmPass) {
      if (emailReg.test(email)) {
        if (phoneReg.test(phone)) {
          if (
            firstName == "" ||
            lastName == "" ||
            pass == "" ||
            confirmPass == "" ||
            email == "" ||
            phone == ""
          )
            toastAlert(0, "Please Enter Valid Details!");
          else createUser();
        } else toastAlert(0, "Please Enter Valid Phone Number!");
      } else toastAlert(0, "Please Enter Valid Email Address!");
    } else {
      toastAlert(0, "Password Missmatch!");
    }
  };
  const createUser = async () => {
    try {
      setLoading(true);
      if (photo != "") {
        const photoUrl = await uploadProfileImage(photo.url);
        await setData(`USERS/${userId}`, {
          photo: photoUrl[0],
          photoName: photoUrl[1],
          ...data,
        });
      } else {
        await SignUpAuth(email, pass);
        await setData(`USERS/${userId}`, data);
      }
      toastAlert(
        1,
        "We're Evaluating Your Profile,Once you'r Profile Approve From The Admin Then You Will Get Access Of The App"
      );
      // signIn(userId + "");
      navigate("/");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toastAlert(0, error);
    }
  };
  const photoCapture = (e) => {
    if (e.target.files.length !== 0) {
      toDataURL(URL.createObjectURL(e.target.files[0]), function (value) {
        setPhoto({
          url: e.target.files[0],
          base64: value,
        });
      });
    }
  };
  return (
    <Wrapper>
      <LoaderSpinner isCenter={true} visible={loading} />
      <SignUpWrapper>
        <SignUpContainer>
          <Row>
            <ImageProfileView>
              <ImageModal
                url={photo?.base64 ? photo.base64 : photo.url || defautlUrl}
                disable={true}
                style={{
                  height: "130px",
                  width: "130px",
                }}
              />
            </ImageProfileView>
            <PhotoCapture handleChange={(e) => photoCapture(e)} />
          </Row>
          <Row>
            <View49>
              <Input
                label="FirstName"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </View49>
            <View49>
              <Input
                label="LastName"
                onChange={(e) => setLastName(e.target.value)}
              />
            </View49>
          </Row>
          <Input
            label="Email"
            error={email ? !emailReg.test(email) : false}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="PhoneNumber"
            error={phone ? !phoneReg.test(phone) : false}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Row>
            <View49>
              <Input
                label="Password"
                type="password"
                onChange={(e) => setPass(e.target.value)}
              />
            </View49>
            <View49>
              <Input
                type="password"
                label="ConfirmPassword"
                onChange={(e) => setConfirmPass(e.target.value)}
              />
            </View49>
          </Row>

          <Text_reg>
            Already Have Account? <ForgotLink to="/login">Login</ForgotLink>
          </Text_reg>
          <Button
            title="Register"
            width="30%"
            onClick={() => validateDetail()}
          />
        </SignUpContainer>
        <LoginBoxRight>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Title style={{ color: "white" }}>Approval</Title>
            <Bold_1 color="white">We're Evaluating Your Profile</Bold_1>
          </div>
          <Text_bold color="white">
            In order to make sure our community holds up a standard,we don't
            allow any profiles to get in.
          </Text_bold>
        </LoginBoxRight>
      </SignUpWrapper>
    </Wrapper>
  );
}
