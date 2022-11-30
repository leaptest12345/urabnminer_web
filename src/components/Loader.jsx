import React from "react";
import Loader from "react-js-loader";
import { LoaderContainer } from "../styles/Loader.styles";

export default function LoaderSpinner({ visible, size, isCenter }) {
  return visible ? (
    <LoaderContainer isCenter={isCenter}>
      <Loader type="bubble-loop" bgColor={"#1e3e4d"} size={size || 100} />
    </LoaderContainer>
  ) : null;
}
