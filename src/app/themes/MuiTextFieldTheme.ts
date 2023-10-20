import { createTheme } from "@mui/material/styles";

export const TextFieldTheme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            color: "white",
            fontWeight: "600",
            fontFamily: '"Poppins", sans-serif',
          },
          "& .MuiInputBase-root:before": {
            borderColor: "white",
          },
          "& .MuiInputBase-root:after": {
            borderColor: "white",
          },
          "& .MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before": {
            borderColor: "white",
          },
          "& .MuiInputLabel-root": {
            color: "white",
            fontWeight: "600",
            fontFamily: '"Poppins", sans-serif',
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
        },
      },
    },
  },
});
