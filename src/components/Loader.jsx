// box-rotate-x
// box-rotate-y
// box-rotate-z
// box-rectangular
// heart
// bubble-scale
// bubble-top
// bubble-ping
// bubble-spin
// bubble-loop
// spinner-cub
// spinner-circle
// spinner-default
// ekvalayzer
// hourglass
// rectangular-ping
import React from "react";
import Loader from "react-js-loader";
import styled from "styled-components";

export default function LoaderSpinner({ visible, size, isCenter }) {
  const LoaderContainer = styled.div`
    position: absolute;
    justify-content: center;
    align-items: center;
    top: ${({ isCenter }) => (isCenter ? "50%" : "")};
    left: ${({ isCenter }) => (isCenter ? "50%" : "")};
    z-index: 1;
  `;
  return visible ? (
    <LoaderContainer isCenter={isCenter}>
      <Loader type="bubble-loop" bgColor={"#1e3e4d"} size={size || 100} />
    </LoaderContainer>
  ) : null;
}
