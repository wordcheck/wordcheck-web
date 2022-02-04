import { styled as muiStyled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { green } from "@mui/material/colors";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { NoEncryptionTwoTone } from "@mui/icons-material";

export const CssTextField = muiStyled(TextField)({
  zIndex: "0",
  "& label.Mui-focused": {
    color: "green",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#bfbfbf",
    },
    "&:hover fieldset": {
      borderColor: "#bfbfbf",
    },
    "&.Mui-focused fieldset": {
      borderColor: "green",
    },
  },
});

export const ColorButton = muiStyled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(green[500]),
  textTransform: "none",
  backgroundColor: green[500],
  boxShadow: "0.5vw 0.5vw 2vw lightgray",
  "&:hover": {
    backgroundColor: green[700],
  },
}));
