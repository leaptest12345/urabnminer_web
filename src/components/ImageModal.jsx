import React, { useState } from "react";
import { Lightbox } from "react-modal-image";
import { ModalImage } from "../styles/ModalImage.styles";
export default function ImageModal({
  url,
  style,
  imgWidth,
  imgHeight,
  margin,
  disable,
  marginVertical,
  circle,
}) {
  const [imageModal, setImageModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const src = url;
  return (
    <>
      <ModalImage
        circle={circle}
        onLoadStart={() => setLoading(true)}
        onLoad={() => setLoading(false)}
        width={imgWidth}
        height={imgHeight}
        margin={margin}
        marginVertical={marginVertical}
        onClick={() => setImageModal(true)}
        style={style}
        src={src}
      />
      {imageModal && !disable && src ? (
        <Lightbox
          large={src}
          alt="UrbanMiner"
          onClose={() => setImageModal(false)}
        />
      ) : null}
    </>
  );
}
