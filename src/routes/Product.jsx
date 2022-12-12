import React, { useEffect, useState } from "react";
import LoaderSpinner from "../components/Loader";
import ProductCard from "../components/ProductCard";
import {
  ProductContainer,
  ProductDetailContainer,
} from "../styles/Product.styles";
import { ArrayConverter } from "../utils/ArrayConverter";
import { getData } from "../utils/firebase/firebaseApi";
import { Title, Wrapper } from "../utils/GlobalStyles";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import jsPDF from "jspdf";
import htmlToPdfmake from "html-to-pdfmake";
import pdfMake from "pdfmake";
import Email1 from "../utils/html/Email1";
import Html from "react-pdf-html";
import { Document, Page } from "react-pdf";

export default function Product() {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pdfData1, setPdfData1] = useState("");
  // const navigate=
  const { state } = useLocation();
  const navigate = useNavigate();
  const getProductList = async () => {
    try {
      const list = await getData(`ADMIN/PRODUCT`);
      setProductList(ArrayConverter(list));
      setLoading(false);
    } catch (error) {
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
  const base64toBlob = (data) => {
    // Cut the prefix `data:application/pdf;base64` from the raw base 64
    const base64WithoutPrefix = data.substr(
      "data:application/pdf;base64,".length
    );

    const bytes = atob(base64WithoutPrefix);
    let length = bytes.length;
    let out = new Uint8Array(length);

    while (length--) {
      out[length] = bytes.charCodeAt(length);
    }

    return new Blob([out], { type: "application/pdf" });
  };

  return (
    <Wrapper>
      <LoaderSpinner visible={loading} isCenter={true} />
      <Title>Product</Title>
      <ProductContainer>
        {productList.map((item, index) => {
          const length = ArrayConverter(item.SUB_PRODUCT).length;
          return (
            <ProductCard
              notHover={length > 0 ? false : true}
              key={index + 1 + "@"}
              onClick={() =>
                length > 0
                  ? navigate("/subproduct", {
                      state: {ProductDetail:item, productList: ArrayConverter(item.SUB_PRODUCT) },
                    })
                  : null
              }
              desc={item.prodductDescription}
              title={item.productName}
              url={item.productImage}
              subProduct={length}
            />
          );
        })}
      </ProductContainer>
      <ProductDetailContainer></ProductDetailContainer>
    </Wrapper>
  );
}
