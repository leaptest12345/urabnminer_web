import React, { useState } from "react";
import { Lightbox } from "react-modal-image";
import styled from "styled-components";

export default function ImageModal({ url, style, imgWidth, margin, disable }) {
  const [imageModal, setImageModal] = useState(false);
  const ModalImage = styled.img`
    width: ${({ width }) => width || "150px"};
    height: 150px;
    border-radius: 6px;
    margin: ${({ margin }) => (margin ? "15px" : "")};
  `;
  return (
    <>
      <ModalImage
        width={imgWidth}
        margin={margin}
        onClick={() => setImageModal(true)}
        style={style}
        src={url ? url : null}
      />
      {imageModal && !disable ? (
        <Lightbox
          large={url}
          alt="UrbanMiner"
          onClose={() => setImageModal(false)}
        />
      ) : null}
    </>
  );
}
