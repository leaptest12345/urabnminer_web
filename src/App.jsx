import React from "react";
import "./App.css";
import SideBar from "./components/SideBar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  redirect,
} from "react-router-dom";
import SignUp from "./routes/SignUp";
import styled from "styled-components";
import Profile from "./routes/Profile";
import { ProfileImg } from "./styles/Profile.styles";
import Customer from "./routes/Customer";
function App() {
  const Wrapper = styled.section`
    height: 100vh;
    width: 100vw;
    margin: 0;
    background-color: aliceblue;
    display: grid;
    grid-template-rows: 70px minmax(100px, 1fr);
    grid-template-columns: 150px minmax(100px, 1fr);
  `;
  const Header = styled.div`
    background-color: ${({ background }) => background || "blue"};
    grid-column: 1/-1;
  `;
  const SideBarView = styled.div`
    background-color: ${({ background }) => background || "lightgreen"};
    grid-row: 2/-1;
  `;
  const Container = styled.div`
    background-color: ${({ background }) => background || "lightblue"};
  `;
  const MainContainer = styled.div`
    display: flex;
  `;
  return (
    <main>
      <MainContainer>
        <SideBar />
        {/* <Profile /> */}
        {/* <SignUp /> */}
        <Customer />
      </MainContainer>
    </main>
  );
}

export default App;
