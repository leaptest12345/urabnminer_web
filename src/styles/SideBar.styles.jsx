import styled, { keyframes } from "styled-components";
export const SideBarContainer = styled.nav`
  position: sticky;
  left: 0;
  top: 0;
  height: 100vh;
  width: ${({ isOpen }) => (isOpen ? "35vh" : "15vh")};
  margin: 0;
  box-shadow: 3px 0 5px -2px #888;
  padding-inline: 15px;
  align-items: flex-start;
  background-color: #11111d;
  animation: width 200ms ease-in-out;
  transition: all 0.3s ease;
`;
export const SideBarFooter = styled.div`
  border-top: 1px solid grey;
`;
export const SideBarHeader = styled.div`
  height: 15vh;
  display: flex;
  border-bottom: 1px solid grey;
`;
export const SideBarContent = styled.div`
  height: 7vh;
  margin-bottom: 10px;
  display: flex;
  border-radius: 6px;
  color: white;
  padding-inline: ${({ isOpen }) => (isOpen ? "25px" : "")};
  font-size: 1em;
  align-items: center;
  justify-content: ${({ isOpen }) => (isOpen ? "" : "center")};
  :hover {
    background-color: #ffffff;
    color: black;
  }
`;
const fadeInUp = keyframes` 
  from { 
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
export const SideBarTitle = styled.text`
  background: none;
  display: ${({ isOpen }) => (isOpen ? "" : "none")};
  margin-left: ${({ isOpen }) => (isOpen ? "25px" : "none")};
  animation: ${fadeInUp} 0.8s ease-in-out 0s;
  font-weight: 600;
  font-size: 15px;
`;

// #1d1b31 lightblue
