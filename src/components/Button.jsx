import React from "react";
import { ButtonText, StyledButton } from "../styles/Button.styles";

export default function Button({ title, onClick, width }) {
  return (
    <StyledButton onClick={onClick} width={width}>
      <ButtonText>{title}</ButtonText>
    </StyledButton>
  );
}
