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
  background-color: #11111d;
  animation: width 200ms ease-in-out;
  transition: all 0.3s ease;
  @media (max-width: 900px) {
    position: absolute;
    height: ${({ isOpen }) => (isOpen ? "100vh" : "10vh")};
    width: ${({ isOpen }) => (isOpen ? "45vw" : "100vw")};
    z-index: 1;
    overflow-y: hidden;
    overflow-x: scroll;
    display: flex;
    padding: ${({ isOpen }) => (isOpen ? "20px" : "")};
    align-items: ${({ isOpen }) => (isOpen ? "flex-start" : "center")};
    justify-content: space-between;
    flex-direction: ${({ isOpen }) => (isOpen ? "column" : "row")};
  }
`;

export const SideBarHeader = styled.div`
  height: 15vh;
  display: flex;
  /* padding: 25px; */
  flex-direction:column;
  align-items:center;
  justify-content:space-around;
  border-bottom: 1px solid grey;
`;

export const SideBarContent = styled.div`
  height: 7vh;
  margin-bottom: 10px;
  display: flex;
  border-radius: 6px;
  color: ${({ background }) => (background ? "black" : "white")};
  background-color: ${({ background }) => (background ? "white" : "")};
  padding-inline: ${({ isOpen }) => (isOpen ? "10px" : "0px")};
  font-size: 1em;
  align-items: center;
  justify-content: ${({ isOpen }) => (isOpen ? "" : "center")};
  :hover {
    background-color: #ffffff;
    color: black;
    /* ::after {
      content: "name";
      position: absolute;
      background-color: lightblue;
      padding-inline: 10px;
      padding: 5px;
      z-index: 1;
      overflow-x: visible;
      border-radius: 6px;
      bottom: 0%;
      color: black;
    } */
  }

  @media (max-width: 900px) {
    height: auto;
    width: ${({ isOpen }) => (isOpen ? "200px" : "")};
    margin-bottom: ${({ isOpen }) => (isOpen ? "10px" : "0px")};
    padding: ${({ isOpen }) => (isOpen ? "10px" : "15px")};
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
export const SideBarTitle = styled.span`
  display: ${({ isOpen }) => (isOpen ? "" : "none")};
  margin-left: ${({ isOpen }) => (isOpen ? "25px" : "none")};
  animation: ${fadeInUp} 0.8s ease-in-out 0s;
  font-weight: 600;
  font-size: 15px;
`;

// #1d1b31 lightblue
export const SideBarContentView1 = styled.div`
  height: 65%;
  overflow: visible;
  @media (max-width: 900px) {
    height: 100%;
    margin-top: 10px;
  }
`;
export const SideBarContentView2 = styled.div`
  height: 65%;
  overflow: visible;
  @media (max-width: 900px) {
    display: flex;
    height: 75%;
    width: 65%;
    justify-content: space-between;
  }
`;
export const SideBarFooter1 = styled.div`
  border-top: 1px solid grey;
  overflow: visible;
  margin-top: 25px;
`;
export const SideBarFooter2 = styled.div`
margin-top: 25px;
  border-top: 1px solid grey;
  @media (max-width: 900px) {
    display: flex;
    border: 0;
    justify-content: space-between;
  }
`;
