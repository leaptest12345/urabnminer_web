import styled from "styled-components";

export const ItemCardText = styled.span`
  position: absolute;
  color: black;
  top: 25%;
  left: ${({ totalItemsLength }) => (totalItemsLength > 1 ? "1vw" : "1.1vw")};
  font-size: 0.8rem;
  font-weight: 600;
  @media (max-width: 600px) {
    left: ${({ totalItemsLength }) => (totalItemsLength > 1 ? "3vw" : "4vw")};
  }
  @media (max-width: 800px) {
    left: ${({ totalItemsLength }) => (totalItemsLength > 1 ? "1.7vw" : "2.7vw")};
  }
`;
