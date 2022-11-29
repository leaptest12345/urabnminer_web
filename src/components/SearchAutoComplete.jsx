import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { SearchOptions } from "../utils/constants/commonConst";

export default function SearchAutoComplete({
  onChange,
  defaultValue,
  width,
  searchOptions,
  clearIcon,
}) {
  const WhiteBorderTextField = styled(TextField)`
    .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: black;
      border-width: 0px;
    }
  `;

  return (
    <Autocomplete
      style={{ zIndex: 111 }}
      disablePortal
      id="combo-box-demo"
      options={searchOptions || SearchOptions}
      sx={{
        width: width ? width : "100%",
        backgroundColor: "white",
        borderRadius: "3px",
      }}
      clearIcon={clearIcon}
      defaultValue={defaultValue}
      ListboxProps={{
        style: {
          backgroundColor: "whitesmoke",
          maxHeight: "200px",
          borderRadius: "6px",
        },
      }}
      onChange={onChange}
      renderInput={(params) => (
        <WhiteBorderTextField
          {...params}
          size="small"
          variant="outlined"
          InputLabelProps={{
            shrink: false,
          }}
        />
      )}
    />
  );
}
