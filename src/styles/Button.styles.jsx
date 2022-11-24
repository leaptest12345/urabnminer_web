import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledButton = styled(Link)`
  border-radius: 4px;
  background-color: ${({ background }) => background || "black"};
  border: none;
  color: ${({ color }) => color || "#ffffff"};
  text-align: center;
  font-size: 15px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-inline: 20px;
  margin-top: 10px;
  padding: 5px;
  transition: all 0.5s;
  width: ${({ width }) => width || "30%"};
  cursor: pointer;
  :hover {
    background-color: brown;
  }
  :focus {
    outline: none;
    border: none;
  }
  @media (max-width: 700px) {
    width: 40%;
  }
`;

export const ButtonText = styled.span`
  font-size: 1rem;
  color: white;
`;
