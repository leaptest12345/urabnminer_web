import React from "react";
import Button from "./Button";

export default function PhotoCapture({ handleChange, title, width, height }) {
  const hiddenFileInput = React.useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  return (
    <>
      <Button
        height={height}
        title={title || "photo"}
        width={width || "20%"}
        onClick={handleClick}
      />
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: "none" }}
      />
    </>
  );
}
