import React from "react";
import Button from "./Button";

export default function PhotoCapture({ handleChange, title, width }) {
  const hiddenFileInput = React.useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  return (
    <>
      <Button
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
