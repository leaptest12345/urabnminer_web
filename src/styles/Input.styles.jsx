import styled from "styled-components";
export const StyledInput = styled.input`
  background-color: white;
  height: 40px;
  color: black;
  border-radius: 4px;
  padding-inline: 10px;
  font-size: 1em;
  width: ${({ width }) => width || ""};
  border: 2px solid white;
  :hover {
    border: 2px solid lightblue;
  }
`;
export const PasswordInput = styled(StyledInput).attrs({
  type: "password",
  minlength: 8,
})``;
export const NumberInput = styled(StyledInput).attrs({
  type: "number",
  minlength: 10,
});

export const FileInput = styled.input.attrs({
  type: "file",
})`
  display: none;
`;
