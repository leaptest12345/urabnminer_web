import React from "react";
import "./App.css";
import SideBar from "./components/SideBar";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
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
function App() {
  const MainContainer = styled.div`
    display: flex;
    overflow-y: scroll;
    background-color: #dcdee1;
    margin: 0;
    padding: 0;
  `;
  return (
    <MainContainer>
      <Router>
        <SideBar />
        <Routes>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<SignUp />}></Route>
          <Route exact path="/" element={<SignUp />}></Route>
          <Route exact path="/product" element={<Product />}></Route>
          <Route exact path="/profile" element={<Profile />}></Route>
          <Route exact path="/customer" element={<Customer />}></Route>
          <Route exact path="/privacy" element={<ResetPassword />}></Route>
          <Route exact path="/feedback" element={<Feedback />}></Route>
          <Route exact path="/invoice" element={<Invoice />}></Route>
          <Route exact path="/draft" element={<Invoice_Draft_Sent />}></Route>
        </Routes>
      </Router>
    </MainContainer>
  );
}

export default App;
{
}
