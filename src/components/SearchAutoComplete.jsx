import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { SearchOptions } from "../utils/constants/commonConst";

export default function SearchAutoComplete({ onChange, defaultValue }) {
  const WhiteBorderTextField = styled(TextField)`
    .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: black;
      border-width: 0px;
    }
  `;

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={SearchOptions}
      sx={{
        width: "100%",
        backgroundColor: "white",
        borderRadius: "3px",
      }}
      defaultValue={defaultValue}
      ListboxProps={{
        style: {
          backgroundColor: "whitesmoke",
          maxHeight: "200px",
          border: "1px solid black",
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
