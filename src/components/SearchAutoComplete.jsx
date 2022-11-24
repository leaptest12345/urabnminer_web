import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import styled from "styled-components";

export default function SearchAutoComplete({ onChange, defaultValue }) {
  const options = [
    "The Godfather",
    "Pulp Fiction",
    "The Godfather",
    "Pulp Fiction",
    "The Godfather",
    "Pulp Fiction",
    "The Godfather",
    "Pulp Fiction",
    "The Godfather",
    "Pulp Fiction",
    "The Godfather",
    "Pulp Fiction",
    "The Godfather",
    "Pulp Fiction",
    "The Godfather",
    "Pulp Fiction",
    "The Godfather",
    "Pulp Fiction",
    "The Godfather",
    "Pulp Fiction",
    "The Godfather",
    "Pulp Fiction",
    "The Godfather",
    "Pulp Fiction",
    "The Godfather",
    "Pulp Fiction",
    "The Godfather",
    "Pulp Fiction",
    "The Godfather",
    "Pulp Fiction",
    "The Godfather",
    "Pulp Fiction",
    "The Godfather",
    "Pulp Fiction",
    "The Godfather",
    "Pulp Fiction",
    "The Godfather",
    "Pulp Fiction",
    "The Godfather",
    "Pulp Fiction",
    "The Godfather",
    "Pulp Fiction",
    "The Godfather",
    "Pulp Fiction",
    "The Godfather",
    "Pulp Fiction",
    "The Godfather",
    "Pulp Fiction",
    "The Godfather",
    "Pulp Fiction",
    "The Godfather",
    "Pulp Fiction",
    "The Godfather",
    "Pulp Fiction",
    "The Godfather",
    "Pulp Fiction",
  ];
  const WhiteBorderTextField = styled(TextField)`
    .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: lightblue;
      border-width: 2px;
    }
  `;

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      sx={{
        width: "100%",
        backgroundColor: "white",
        borderRadius: "3px",
      }}
      defaultValue={defaultValue}
      ListboxProps={{
        style: { backgroundColor: "lightgreen", maxHeight: "200px" },
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
