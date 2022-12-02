import styled from "styled-components";

export const Container = styled.div`
  background-color: whitesmoke;
  border-radius: 6px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 3px 0 5px -2px #888;
  :hover {
    background-color: ${({ notHover }) => (notHover ? "" : "lightgrey")};
    cursor: pointer;
  }
`;
export const ProductDesc = styled.span`
  font-size: 1rem;
  color: black;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
`;
