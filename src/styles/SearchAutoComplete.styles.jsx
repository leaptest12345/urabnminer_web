import { TextField } from "@mui/material";
import styled from "styled-components";

export const WhiteBorderTextField = styled(TextField)`
  .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: black;
    border-width: 0px;
  }
`;
export const ListBoxProps = {
  style: {
    backgroundColor: "whitesmoke",
    maxHeight: "200px",
    borderRadius: "6px",
  },
};
