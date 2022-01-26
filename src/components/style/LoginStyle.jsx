import { styled as muiStyled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { green } from "@mui/material/colors";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { NoEncryptionTwoTone } from "@mui/icons-material";

export const CssTextField = muiStyled(TextField)({
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

// export const Button1 = styled.button`
//   border-radius: 5px;
//   /* box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2); */
//   width: ${(props) => props.buttonWidth || "100%"};
//   background-color: Green;
//   border: none;
//   color: white;
//   padding: 1vh;
//   text-align: center;
//   /* text-decoration: none; */
//   font-size: 2.5vh;
//   margin: 1vh;
// `;

export const ColorButton = muiStyled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(green[500]),
  textTransform: "none",
  backgroundColor: green[500],
  boxShadow: "0.5vw 0.5vw 2vw lightgray",
  "&:hover": {
    backgroundColor: green[700],
  },
}));

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2em;
`;
