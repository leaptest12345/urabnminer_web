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
function App() {
  const MainContainer = styled.div`
    display: flex;
    overflow-y: scroll;
  `;
  return (
    <main>
      <MainContainer>
        <Router>
          <SideBar />
          <Routes>
            <Route exact path="/" element={<SignUp />}></Route>
            <Route exact path="/product" element={<Product />}></Route>
            <Route exact path="/profile" element={<Profile />}></Route>
            <Route exact path="/customer" element={<Customer />}></Route>
            <Route exact path="/privacy" element={<PrivacyPolicy />}></Route>
            <Route exact path="/invoice" element={<Invoice />}></Route>
          </Routes>
        </Router>
      </MainContainer>
    </main>
  );
}

export default App;
