import React from "react";
import { FileInput, PasswordInput, StyledInput } from "../styles/Input.styles";
import { InputContainer, InputText } from "../utils/GlobalStyles";

export default function Input({ placeholder, onChange, type, ref, label }) {
  const CustomInput =
    type == "password"
      ? PasswordInput
      : type == "file"
      ? FileInput
      : StyledInput;
  return (
    <InputContainer>
      <InputText>{label}:</InputText>
      <CustomInput ref={ref} placeholder={placeholder} onChange={onChange} />
    </InputContainer>
  );
}
