import styled from "styled-components";

export const Wrapper = styled.div`
  margin: 0;
  padding: 2%;
  height: 100vh;
  width: 100vw;
  background-color: #dcdee1;
  overflow-y: scroll;
  transition: all 0.3s ease-in-out;
`;

export const Title = styled.span`
  font-size: 1.7rem;
  color: black;
  font-weight: 600;
  line-height: 50px;
`;

export const MediumText = styled.span`
  font-size: 1.5rem;
  color: ${({ color }) => color || "black"};
  font-weight: 400;
`;

export const Text = styled.span`
  font-size: 1rem;
  color: ${({ color }) => color || "black"};
`;
export const Bold_1 = styled.span`
  font-size: 1rem;
  color: ${({ color }) => color || "black"};
  font-weight: 600;
`;
export const MediumBold = styled.span`
  font-size: 1.3rem;
  color: ${({ color }) => color || "black"};
  font-weight: 600;
`;
export const TextSmall = styled.span`
  font-size: 0.8rem;
  color: ${({ color }) => color || "black"};
`;
export const InputText = styled.text`
  font-size: 1em;
  color: black;
  font-weight: 600;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 10vh;
  @media (max-width: 800px) {
  }
`;
export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  overflow: visible;
`;
export const TextArea = styled.textarea`
  background-color: transparent;
  border: 1px solid black;
  width: 100%;
  border-radius: 6px;
  height: 80%;
  color: black;
  padding: 15px;
  background-color: white;
  font-weight: 600;
  font-size: 0.8rem;
`;
export const View_6 = styled.div`
  width: 60%;
`;
