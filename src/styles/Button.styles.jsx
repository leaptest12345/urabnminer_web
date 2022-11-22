import styled from "styled-components";

export const StyledButton = styled.button`
  border-radius: 4px;
  background-color: black;
  border: none;
  color: #ffffff;
  text-align: center;
  font-size: 15px;
  height: 45px;
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
