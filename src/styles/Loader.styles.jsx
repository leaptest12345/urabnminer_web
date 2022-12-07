export const LoaderContainer = styled.div`
  position: fixed;
  top: ${({ isCenter }) => (isCenter ? "50%" : "")};
  left: ${({ isCenter }) => (isCenter ? "45%" : "")};
  z-index: 1;
`;
