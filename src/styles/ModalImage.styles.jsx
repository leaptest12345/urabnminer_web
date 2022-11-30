import styled from "styled-components";

export const ModalImage = styled.img`
  width: ${({ width }) => width || "150px"};
  height: 150px;
  border-radius: 6px;
  margin: ${({ margin }) => (margin ? "15px" : "")};
  margin-top: ${({ marginVertical }) => (marginVertical ? "15px" : "")};
  margin-bottom: ${({ marginVertical }) => (marginVertical ? "15px" : "")}; ;
`;
