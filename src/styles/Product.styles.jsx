import styled from "styled-components";
export const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 23%);
  grid-template-rows: repeat(auto, 1fr);
  grid-gap: 20px;
  justify-content: center;
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 30%);
  }
  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 46%);
  }
  @media (max-width: 700px) {
    grid-template-columns: 90%;
  }
  @media (max-width: 500px) {
    grid-template-columns: 100%;
  }
`;
