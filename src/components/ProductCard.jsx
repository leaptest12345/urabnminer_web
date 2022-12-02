import React from "react";
import { Container, ProductDesc } from "../styles/ProductCard.styles";
import { Bold_1, MediumBold, Text_reg } from "../utils/GlobalStyles";
import ImageModal from "./ImageModal";
export default function ProductCard({
  title,
  desc,
  url,
  subProduct,
  onClick,
  notHover,
}) {
  return (
    <Container notHover={notHover} onClick={onClick}>
      <MediumBold>{title}</MediumBold>
      <ImageModal marginVertical={true} url={url || ""} imgWidth="100%" />
      <Text_reg>
        <Bold_1>Sub_Product:</Bold_1>
        {subProduct}
      </Text_reg>
      <ProductDesc>{desc}</ProductDesc>
    </Container>
  );
}
