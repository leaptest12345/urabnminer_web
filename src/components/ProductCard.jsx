import React from "react";
import { Container, ProductDesc } from "../routes/ProductCard.styles";
import { Bold_1, MediumBold, Text } from "../utils/GlobalStyles";
import ImageModal from "./ImageModal";
export default function ProductCard({ title, desc, url, subProduct, onClick }) {
  return (
    <Container onClick={onClick}>
      <MediumBold>{title}</MediumBold>
      <ImageModal marginVertical={true} url={url || ""} imgWidth="100%" />
      <Text>
        <Bold_1>Sub_Product:</Bold_1>
        {subProduct}
      </Text>
      <ProductDesc>{desc}</ProductDesc>
    </Container>
  );
}
