import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import SideBar from "./components/SideBar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import SignUp from "./routes/SignUp";
import styled from "styled-components";
import Profile from "./routes/Profile";
import { ProfileImg } from "./styles/Profile.styles";
import Customer from "./routes/Customer";
import Invoice_Draft_Sent from "./routes/Invoice_Draft_Sent";
import Invoice from "./routes/Invoice";
import PrivacyPolicy from "./routes/PrivacyPolicy";
import Header from "./components/Header";
import Product from "./routes/Product";
import Login from "./routes/Login";
import Feedback from "./routes/Feedback";
import ResetPassword from "./routes/ResetPassoword";
import { AuthContext } from "./utils/AuthContext";
import { Toaster } from "react-hot-toast";
import Settings from "./routes/Settings";
import TermConditions from "./routes/TermConditions";
import SubProduct from "./routes/subProduct";
import Email1 from "./utils/html/Email1";

const MainContainer = styled.div`
  display: flex;
  overflow-y: scroll;
  background-color: #dcdee1;
  margin: 0;
  padding: 0;
`;
function App() {
  const [user, setUser] = useState(null);

  const authContext = useMemo(() => ({
    signIn: (id) => {
      setTimeout(() => {
        setUser(id);
      }, 1000);
      localStorage.setItem("userID", id + "");
    },
    signOut: () => {
      localStorage.removeItem("userID");
      setUser(null);
    },
  }));
  const getLocalDetail = async () => {
    try {
      const user = localStorage.getItem("userID");
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getLocalDetail();
  }, []);
  return (
    <AuthContext.Provider value={authContext}>
      <MainContainer>
        <Router>
          {user ? <SideBar /> : null}
          <Routes>
            {user ? (
              <>
                <Route exact path="/" element={<Product />} />
                <Route exact path="*" element={<Product />} />
                <Route exact path="/product" element={<Product />} />
                <Route exact path="/profile" element={<Profile />} />
                <Route exact path="/customer" element={<Customer />} />
                <Route exact path="/feedback" element={<Feedback />} />
                <Route exact path="/invoice" element={<Invoice />} />
                <Route exact path="/draft" element={<Invoice_Draft_Sent />} />
                <Route exact path="/settings" element={<Settings />} />
                <Route exact path="/subproduct" element={<SubProduct />} />
                <Route exact path="/email1" element={<Email1 />} />
              </>
            ) : (
              <>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<SignUp />} />
                <Route exact path="*" element={<Login />} />
              </>
            )}

            <Route exact path="/privacy" element={<PrivacyPolicy />} />
            <Route exact path="/resetpassword" element={<ResetPassword />} />
            <Route exact path="/term" element={<TermConditions />} />
          </Routes>
        </Router>
        <Toaster position="top-right" />
      </MainContainer>
    </AuthContext.Provider>
  );
}

export default App;
{
}
