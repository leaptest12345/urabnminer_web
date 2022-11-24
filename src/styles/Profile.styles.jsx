import styled from "styled-components";
import { MediumText } from "../utils/GlobalStyles";
import { StyledButton } from "./Button.styles";

export const ProfileContainer = styled.div`
  padding-left: 5%;
  display: grid;
  position: relative;
  @media (max-width: 800px) {
    padding-left: 1%;
  }
`;

export const ProfileImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

export const ProfileImgView = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 40%;
  height: 28vh;
  @media (max-width: 1000px) {
    width: 60%;
  }
  @media (max-width: 800px) {
    flex-direction: column;
    width: 100%;
  }
`;

export const ProfileInput = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 52vh;
  @media (max-width: 800px) {
    width: 100%;
  }
`;
