import { Autocomplete } from "@mui/material";
import React from "react";
import {
  ListBoxProps,
  WhiteBorderTextField,
} from "../styles/SearchAutoComplete.styles";
import { SearchOptions } from "../utils/constants/commonConst";

export default function SearchAutoComplete({
  onChange,
  defaultValue,
  width,
  searchOptions,
  clearIcon,
  placeholder,
}) {
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
      placeholder={placeholder}
      clearIcon={clearIcon}
      defaultValue={defaultValue}
      ListboxProps={ListBoxProps}
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
