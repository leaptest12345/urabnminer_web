import styled, { keyframes } from "styled-components";

export const InputText = styled.text`
  font-size: 1em;
  color: black;
  font-weight: bold;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 10vh;
  margin: 5px;
  margin-inline: 10px;
`;
export const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  padding: 0;
  margin: 0;
  background-color: #dcdee1;
  align-items: center;
  justify-content: center;
  transition: all 100ms ease;
  @media (max-width: 800px) {
    height: auto;
  }
`;

export const SignUpWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 2em;
  width: 80%;
  height: 85vh;
  background-color: whitesmoke;
  border-radius: 10px;
  overflow: "scroll";
  box-shadow: 3px 0 5px -2px #888;
  @media (max-width: 800px) {
    height: auto;
  }
`;
export const SignUpContainer = styled.div`
  display: grid;
  width: 70vw;
  grid-template-columns: 48% 48%;
  grid-column-gap: 2%;
  height: 40vh;
  @media (max-width: 800px) {
    grid-template-columns: auto;
    height: auto;
  }
`;
