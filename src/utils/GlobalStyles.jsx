import styled from "styled-components";

export const Wrapper = styled.div`
  margin: 0;
  padding: 2%;
  height: 100vh;
  width: 100vw;
  background-color: #dcdee1;
  overflow-y: scroll;
  position: relative;
  transition: all 0.3s ease-in-out;
  @media (max-width: 900px) {
    margin-top: 10vh;
  }
`;

export const Title = styled.span`
  font-size: 1.7rem;
  color: black;
  font-weight: 600;
  line-height: 50px;
`;
export const ItemTitle = styled.span`
  font-size: 1.5rem;
  color: black;
  font-weight: 600;
  line-height: 50px;
`;
export const MediumText = styled.span`
  font-size: 1.5rem;
  color: ${({ color }) => color || "black"};
  font-weight: 400;
`;

export const Text_reg = styled.span`
  font-size: 1rem;
  color: ${({ color }) => color || "black"};
`;
export const Text_bold = styled.span`
  font-size: 1rem;
  color: ${({ color }) => color || "white"};
  font-weight: 600;
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
  font-size: 0.85rem;
  color: ${({ color }) => color || "black"};
  font-weight: 400;
`;
export const SmallBold = styled.span`
  font-size: 0.85rem;
  color: ${({ color }) => color || "black"};
  font-weight: 600;
`;
export const InputText = styled.span`
  font-size: 1em;
  color: black;
  font-weight: 600;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 11vh;
  margin-top: 5px;
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
export const View_6_Row = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
export const Img40 = styled.img`
  height: 40px;
  width: 40px;
`;
export const Img35 = styled.img`
  height: 35px;
  width: 35px;
`;
export const DeleteView = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 30%;
  justify-content: space-between;
`;
