import React, { useState } from "react";
import { Lightbox } from "react-modal-image";
import styled from "styled-components";
import LoaderSpinner from "./Loader";

export default function ImageModal({
  url,
  style,
  imgWidth,
  margin,
  disable,
  marginVertical,
}) {
  const [imageModal, setImageModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const ModalImage = styled.img`
    width: ${({ width }) => width || "150px"};
    height: 150px;
    border-radius: 6px;
    margin: ${({ margin }) => (margin ? "15px" : "")};
    margin-top: ${({ marginVertical }) => (marginVertical ? "15px" : "")};
    margin-bottom: ${({ marginVertical }) => (marginVertical ? "15px" : "")}; ;
  `;
  return (
    <>
      <ModalImage
        onLoadStart={() => setLoading(true)}
        onLoad={() => setLoading(false)}
        width={imgWidth}
        margin={margin}
        marginVertical={marginVertical}
        onClick={() => setImageModal(true)}
        style={style}
        src={url ? url : null}
      />
      {imageModal && !disable && url ? (
        <Lightbox
          large={url}
          alt="UrbanMiner"
          onClose={() => setImageModal(false)}
        />
      ) : null}
    </>
  );
}
