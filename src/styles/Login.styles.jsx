import { Link } from "react-router-dom";
import styled from "styled-components";
const BackImg =
  "https://c4.wallpaperflare.com/wallpaper/665/162/516/tunnel-tracks-light-trees-wallpaper-preview.jpg";
import BackImage from "../assets/urbanminer.png";

export const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  margin: 0;
  align-items: center;
  justify-content: center;
  padding: 0;
  overflow-y: scroll;
  background-color: white;
  transition: all 0.3s ease-in-out;
`;
export const LoginBox = styled.div`
  display: grid;
  border-radius: 10px;
  background-color: #e8e8e8;
  grid-template-columns: repeat(2, 50%);
  /* height: 90%; */
  box-shadow: 3px 0 5px -2px #888;
  width: 85%;
  height: 85%;
  overflow: visible;
  @media (max-width: 900px) {
    grid-template-columns: 100%;
    grid-template-rows: 100%;
    width: 100%;
    height: 100vh;
  }
`;
export const LoginBoxLeft = styled.div`
  padding: 10%;
  display: flex;
  height: 80vh;
  flex-direction: column;
  justify-content: space-around;
  @media (max-width: 900px) {
    padding: 7%;
  }
`;
export const LoginBoxRight = styled.div`
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
export const ForgotLink = styled(Link)`
  align-self: flex-end;
  color: black;
`;
export const imageStyle = {
  width: "90px",
  height: "90px",
  alignSelf: "center",
};
