import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import LoaderSpinner from "../components/Loader";
import ProductCard from "../components/ProductCard";
import { ProductContainer } from "../styles/Product.styles";
import { ArrayConverter } from "../utils/ArrayConverter";
import { Title, Wrapper } from "../utils/GlobalStyles";

export default function SubProduct({}) {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();

  console.log(state.productList);

  useEffect(() => {
    setProductList(state.productList);
  }, []);
  return (
    <Wrapper>
      <LoaderSpinner visible={loading} isCenter={true} />
      <Title>Sub Products</Title>
      <ProductContainer>
        {productList.map((item) => {
          return (
            <ProductCard
              key={index + 1 + "!"}
              desc={item.prodductDescription}
              title={item.productName}
              url={item.productImage}
              subProduct={ArrayConverter(item.SUB_PRODUCT).length}
            />
          );
        })}
      </ProductContainer>
    </Wrapper>
  );
}
