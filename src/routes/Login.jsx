import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { Bold_1, Row, Text_bold, Text_reg, Title } from "../utils/GlobalStyles";
import APPROVAL from "../assets/approval.png";
import CORRECT from "../assets/correct.png";
import ImageModal from "../components/ImageModal";
import {
  ForgotLink,
  imageStyle,
  LoginBox,
  LoginBoxLeft,
  LoginBoxRight,
  LoginContainer,
} from "../styles/Login.styles";
import { getData, LoginAuth } from "../utils/firebase/firebaseApi";
import LoaderSpinner from "../components/Loader";
import { AuthContext } from "../utils/AuthContext";
import { toastAlert } from "../utils/toastAlert";
import { ArrayConverter } from "../utils/ArrayConverter";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [Loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const { signIn } = React.useContext(AuthContext);

  const findUser = async () => {
    try {
      const userList = await getData("/USERS");
      setUsers(ArrayConverter(userList));
    } catch (erro) {
      console.log(error);
    }
  };

  const userInDatabase = () => {
    let result = null;
    users.map((item) => {
      if (item.email == email) result = item.ID;
    });
    return result;
  };

  const onLogin = async () => {
    try {
      setLoading(true);
      const loginResult = await LoginAuth(email, pass);
      if (loginResult) {
        const user = userInDatabase();
        if (user) {
          signIn(user + "");
          console.log(user);
          toastAlert(1, "Login successfully!");
        } else {
          toastAlert(0, "User Doen't Exist!");
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toastAlert(0, error);
    }
  };

  useEffect(() => {
    findUser();
  }, []);
  return (
    <LoginContainer>
      <LoaderSpinner visible={Loading} />
      <LoginBox>
        <LoginBoxLeft style={{}}>
          <Row>
            <Title>UrbanMiner</Title>
            <ImageModal disable={true} url={APPROVAL} style={imageStyle} />
          </Row>
          <Text_reg>Welcome Back,Please Enter Your Details</Text_reg>
          <Input label="Email" onChange={(e) => setEmail(e.target.value)} />
          <Input
            type="password"
            label="Password"
            onChange={(e) => setPass(e.target.value)}
          />
          <ForgotLink to="/resetpassword">Forgot Password?</ForgotLink>
          <Button title="LogIn" width="100%" onClick={() => onLogin()} />
          <Text_reg style={{ alignSelf: "center" }}>
            Don't have an account? <ForgotLink to="/signup">SignUp</ForgotLink>
          </Text_reg>
        </LoginBoxLeft>
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
      </LoginBox>
    </LoginContainer>
  );
}
