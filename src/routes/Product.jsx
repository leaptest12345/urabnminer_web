import React, { useEffect, useState } from "react";
import LoaderSpinner from "../components/Loader";
import ProductCard from "../components/ProductCard";
import { ProductContainer } from "../styles/Product.styles";
import { ArrayConverter } from "../utils/ArrayConverter";
import { getData } from "../utils/firebase/firebaseApi";
import { Title, Wrapper } from "../utils/GlobalStyles";
import { useLocation, useNavigate } from "react-router";
export default function Product() {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  // const navigate=
  const {state}=useLocation()
  console.log(state)
  const navigate = useNavigate();
  const getProductList = async () => {
    try {
      const list = await getData(`ADMIN/PRODUCT`);
      setProductList(ArrayConverter(list));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const setSubProduct = (arr) => {
    setProductList(arr);
  };

  useEffect(() => {
    setLoading(true);
    getProductList();
  }, []);

  return (
    <Wrapper>
      <LoaderSpinner visible={loading} isCenter={true} />
      <Title>Product</Title>
      <ProductContainer>
        {productList.map((item, index) => {
          return (
            <ProductCard
              key={index + 1 + "@"}
              // onClick={() => setSubProduct(ArrayConverter(item.SUB_PRODUCT))}
              onClick={() =>
                navigate("/customer", {
                  state: { productList: ArrayConverter(item.SUB_PRODUCT) },
                })
              }
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
