import styled from "styled-components";

export const ItemCardText = styled.span`
  margin-left: ${({ totalItemsLength }) =>
    totalItemsLength > 1 ? "-30px" : "-25px"};
  z-index: 1;
  margin-top: 7px;
  color: black;
  font-weight: 600;
`;
