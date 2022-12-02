import styled from "styled-components";

export const LoaderContainer = styled.div`
  position: absolute;
  justify-content: center;
  align-items: center;
  top: ${({ isCenter }) => (isCenter ? "50%" : "")};
  left: ${({ isCenter }) => (isCenter ? "45%" : "")};
  z-index: 1;
`;
