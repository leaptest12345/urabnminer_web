import React from "react";
import { Link } from "react-router-dom";
import { ButtonText, StyledButton } from "../styles/Button.styles";

export default function Button({
  title,
  onClick,
  width,
  background,
  color,
  to,
  height,
}) {
  return (
    <StyledButton
      to={to}
      background={background}
      color={color}
      onClick={onClick}
      width={width}
      height={height}
    >
      <ButtonText>{title}</ButtonText>
    </StyledButton>
  );
}
