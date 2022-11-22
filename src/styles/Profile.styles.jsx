import styled from "styled-components";
import { MediumText } from "../utils/GlobalStyles";
import { StyledButton } from "./Button.styles";

export const ProfileContainer = styled.div`
  padding: 20px;
  padding-left: 10%;
  display: grid;
  /* flex-direction: column; */
  position: relative;
  @media (max-width: 800px) {
    padding-left: 1%;
    /* padding-left: 0; */
    /* align-items: center; */
  }
`;

export const SecondaryText = styled(MediumText)`
  margin-top: 20px;
  margin-left: 10px;
`;
export const ProfileImg = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
`;

export const ProfileImgView = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 40%;
  height: 40vh;
  margin-top: 5%;
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
  @media (max-width: 800px) {
    width: 100%;
  }
`;
