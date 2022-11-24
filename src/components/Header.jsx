import React from "react";
import styled from "styled-components";
import { Title } from "../utils/GlobalStyles";

export default function Header() {
  const HeaderContainer = styled.div`
    height: 10vh;
    background-color: red;
  `;
  return <HeaderContainer></HeaderContainer>;
}
