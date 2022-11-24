import React from "react";
import styled from "styled-components";
import { Bold_1, MediumBold, Text } from "../utils/GlobalStyles";
import IMG from "../assets/file.png";
import ImageModal from "./ImageModal";
export default function ProductCard({ title, desc, url }) {
  const Container = styled.div`
    background-color: whitesmoke;
    border-radius: 6px;
    padding: 20px;
    /* height: 40vh; */
    display: flex;
    flex-direction: column;
    box-shadow: 3px 0 5px -2px #888;
  `;

  const ProductDesc = styled.span`
    font-size: 1rem;
    color: black;
    /* height: 10vh; */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
  `;
  return (
    <Container>
      <MediumBold>{title}</MediumBold>
      <ImageModal url={url} imgWidth="100%" />
      <Text>
        <Bold_1>Sub_Product:</Bold_1>1
      </Text>
      <ProductDesc>{desc}</ProductDesc>
    </Container>
  );
}
