import styled from "styled-components";

export const ItemCardText = styled.span`
  position: absolute;
  color: black;
  top: 25%;
  left: ${({ totalItemsLength }) => (totalItemsLength > 1 ? "25%" : "30%")};
  font-size: 0.8rem;
  font-weight: 600;
  @media (max-width: 600px) {
    left: ${({ totalItemsLength }) => (totalItemsLength > 1 ? "20%" : "25%")};
  }
`;
