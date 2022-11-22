import React from "react";
import { FaBaby } from "react-icons/fa";
import { StyledSearch } from "../styles/Search.styles";

export default function Search({ placeholder }) {
  return (
    <>
      <StyledSearch placeholder={placeholder} />
      <span
        style={{
          color: "black",
          position: "absolute",
          right: 0,
          top: 0,
          left: 0,
          bottom: 0,
        }}
      >
        icon
      </span>
    </>
  );
}
