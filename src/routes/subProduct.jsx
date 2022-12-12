import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import ImageModal from "../components/ImageModal";
import LoaderSpinner from "../components/Loader";
import ProductCard from "../components/ProductCard";
import { ProductContainer } from "../styles/Product.styles";
import { ProductDesc } from "../styles/ProductCard.styles";
import { ArrayConverter } from "../utils/ArrayConverter";
import { MediumBold, Title, Wrapper } from "../utils/GlobalStyles";
const ProductDetailContainer=styled.div`
display:flex;
flex-direction:column;

`
export default function SubProduct({}) {
  const [productList, setProductList] = useState([]);
  const [productDetail,setProductDetail]=useState(null)
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();

  console.log(state.productList);

  useEffect(() => {
    setProductList(state.productList);
    setProductDetail(state.ProductDetail)
  }, []);

 
  return (
    <Wrapper>
      <LoaderSpinner visible={loading} isCenter={true} />
      <ProductDetailContainer>
      <Title >{productDetail?.productName}</Title>
      <ImageModal marginVertical={true} url={productDetail?.productImage} style={{height:"350px",width:"70%"}} />
      <ProductDesc>{productDetail?.prodductDescription}</ProductDesc>
      </ProductDetailContainer>
      <Title>Sub Products</Title>
      <ProductContainer>
        {productList.map((item, index) => {
          const length = ArrayConverter(item.SUB_PRODUCT).length;
          return (
            <ProductCard
              notHover={length > 0 ? false : true}
              key={index + 1 + "!"}
              desc={item.prodductDescription}
              title={item.productName}
              url={item.productImage}
              subProduct={length}
              onClick={()=>setProductDetail(item)}
            />
          );
        })}
      </ProductContainer>
    </Wrapper>
  );
}
