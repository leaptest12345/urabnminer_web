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
  font-size: 2rem;
  color: black;
  font-weight: 600;
`;

export const MediumText = styled.span`
  font-size: 1.5rem;
  color: black;
  font-weight: 400;
`;
export const Text = styled.span`
  font-size: 1rem;
  color: black;
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
