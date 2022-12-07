import styled from "styled-components";

export const CustomerBox = styled.div`
  display: grid;
  grid-template-columns: 37% 37%;
  grid-column-gap: 2%;
  @media (max-width: 700px) {
    grid-template-columns: 100%;
  }
`;
export const TextAreaView = styled.div`
  height: 25vh;
  margin-top: 1%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const TextArea = styled.textarea`
  background-color: transparent;
  width: 100%;
  border-radius: 6px;
  height: 80%;
  color: black;
  padding: 15px;
  background-color: white;
  font-size: 1rem;
`;
export const CustomerPhotoView = styled.div`
  display: flex;
  flex-direction: column;
  height: 40vh;
  margin-top: 2%;
  justify-content: space-between;
`;
