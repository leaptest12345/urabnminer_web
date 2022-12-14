import { Delete } from "@mui/icons-material";
import styled from "styled-components";

export const InvoiceContainer = styled.div`
  display: grid;
  grid-template-columns: 65% 30%;
  grid-column-gap: 5%;
  height: 100vh;
  @media (max-width: 800px) {
    grid-template-columns: 100%;
    grid-gap: 2%;
    height: auto;
    margin-bottom: 100px;
  }
  overflow: visible;
`;
export const InvoiceView1 = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 20px;
  overflow: visible;
`;
export const InvoiceView2 = styled.div`
  display: grid;
  /* display: none; */
  position: fixed;
  right: 0;
  top: 7%;
  grid-template-rows: 30vh 55vh;
  grid-row-gap: 2%;
  overflow: visible;
  @media (max-width: 900px) {
    top: 10%;
  }
  @media (max-width: 800px) {
    top: 0;
    display: grid;
    position: relative;
    grid-template-columns: auto;
    grid-template-rows: 30% 80%;
    height: auto;
  }
`;
export const InvoiceClient = styled.div`
  background-color: whitesmoke;
  border-radius: 4px;
  box-shadow: 3px 0 5px -2px #888;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const InvoiceInfo = styled.div`
  background-color: white;
  border-radius: 4px;
  box-shadow: 3px 0 5px -2px #888;
`;
export const SenderBox = styled.div`
  height: 20vh;
  background-color: ${({ background }) => background || "black"};
  border-radius: 6px;
  margin-bottom: 20px;
  padding: 10px;
  padding-inline: 20px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;
export const SenderSubbox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const InvoiceItemView = styled.div`
  margin-top: 10px;
  scrollbar-color: black;
`;
export const BoxView = styled.div`
  display: grid;
  grid-template-columns: 49% 49%;
  grid-column-gap: 2%;
  @media (max-width: 1000px) {
    grid-template-columns: 100%;
    grid-column-gap: 0;
    height: auto;
  }
  @media (max-width: 800px) {
    grid-template-columns: 85%;
    grid-column-gap: 0;
    height: auto;
  }
  @media (max-width: 600px) {
    grid-template-columns: 100%;
    grid-column-gap: 0;
    height: auto;
  }
`;
export const RowView = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  position: ${({ zIndex }) => (zIndex ? null : "relative")};
  width: 70%;
  @media (max-width: 900px) {
    width: 100%;
    height: auto;
  }
`;
export const InfoView = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 1100px) {
    flex-direction: column;
    height: auto;
    align-items: flex-start;
  }
`;
export const InvoiceImage = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`;
export const TouchView = styled.div`
  background-color: ${({ background }) => background || "whitesmoke"};
  box-shadow: ${({ background }) =>
    background ? "3px 0 5px -2px #888" : null};
  width: 35%;
  height: 5vh;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  display: flex;
  :hover {
    background-color: #2a547e;
    cursor: pointer;
  }
  span {
    color: ${({ color }) => color || "black"};
  }
`;

export const boldTextStyle = {
  fontWeight: "600",
  paddingInline: "30px",
};
export const DeleteBtn = styled(Delete)`
  color: black;
  :hover {
    color: red;
    cursor: pointer;
  }
`;

export const DateView = styled.div`
  width: 70%;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  display: flex;
  z-index: 1111;
  /* :hover {
    background-color: #2a547e;
    cursor: pointer;
  }
  span {
    :hover {
      color: white;
    }
  } */
`;
