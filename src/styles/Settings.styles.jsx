import styled from "styled-components";

export const SettingContainer = styled.div`
  display: grid;
  grid-template-columns: 25% 75%;
  grid-gap: 2%;
  overflow: visible;
  @media (max-width: 600px) {
    grid-template-columns: 100%;
    height: auto;
  }
`;
export const Container1 = styled.div`
  /* background-color: lightblue; */
`;
export const Container2 = styled.div`
  /* background-color: lightblue; */
`;
export const SelectableView = styled.div`
  display: flex;
  height: 7vh;
  background-color: ${({ background }) => background || "whitesmoke"};
  margin-top: 3%;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  :hover {
    background-color: lightgray;
    cursor: pointer;
  }
  span {
    color: ${({ background }) => (background ? "white" : "black")};
    :hover {
      color: white;
    }
  }
  @media (max-width: 600px) {
    width: 55%;
  }
`;
