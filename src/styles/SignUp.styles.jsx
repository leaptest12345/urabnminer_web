import styled, { keyframes } from "styled-components";
const BackImg =
  "https://c4.wallpaperflare.com/wallpaper/665/162/516/tunnel-tracks-light-trees-wallpaper-preview.jpg";

import BackImage from "../assets/urbanminer.png";
export const InputText = styled.span`
  font-size: 0.9rem;
  color: black;
  font-weight: bold;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* height: 5vh; */
  margin: 5px;
  margin-inline: 10px;
`;
export const Wrapper = styled.div`
  /* background-image: url(${BackImage}); */
  background-size: 100vw 100vh;
  display: flex;
  height: 100vh;
  width: 100vw;
  padding: 0;
  margin: 0;
  background-color: white;
  align-items: center;
  justify-content: center;
  transition: all 100ms ease;
  @media (max-width: 800px) {
    height: auto;
  }
`;

export const SignUpWrapper = styled.div`
  display: grid;
  flex-wrap: wrap;
  width: 88%;
  height: 88vh;
  background-color: #e8e8e8;
  border-radius: 10px;
  grid-template-columns: 50% 50%;

  box-shadow: 3px 0 5px -2px #888;
  @media (max-width: 800px) {
    grid-template-columns: 100%;
    width: 100%;
    height: 100vh;
    border-radius: 0px;
  }
`;
export const SignUpContainer = styled.div`
  /* width: 35vw; */
  /* grid-column-gap: 2%; */
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ImageProfileView = styled.div`
  background-color: white;
  border-radius: 100%;
  display: flex;
  width: 130px;
  height: 130px;
  align-items: center;
  justify-content: center;
`;

export const View49 = styled.div`
  width: 49%;
`;

export const BackImageView = styled.div`
  background-image: url(${BackImg});
  /* background-repeat: no-repeat; */
  /* background-size: 100% 80vh; */
  width: 100%;
  height: 100%;
  @media (max-width: 800px) {
    display: none;
  }
`;
