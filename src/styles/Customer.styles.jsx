import styled from "styled-components";

export const CustomerBox = styled.div`
  display: grid;
  grid-template-columns: 37% 37%;
  grid-column-gap: 2%;
  margin-top: 5%;
  @media (max-width: 700px) {
    grid-template-columns: 100%;
  }
`;

export const CustomerPhotoView = styled.div`
  display: flex;
  flex-direction: column;
  height: 15vh;
  margin-top: 2%;
  justify-content: space-between;
`;
