import React, { useState } from "react";
import { Lightbox } from "react-modal-image";
import { ModalImage } from "../styles/ModalImage.styles";

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

  const src = url
    ? url.toString().includes("http")
      ? url
      : url.toString().includes("/src/assets")
      ? url
      : URL.createObjectURL(url)
    : null;
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
        src={src}
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
