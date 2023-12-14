import { LoadingButton } from "@mui/lab";
import { Button, styled, ToggleButton, ToggleButtonGroup } from "@mui/material";

export const CustomButton = styled(Button)({
  textTransform: "none",
  borderRadius: 0,
  paddingLeft: 25,
  paddingRight: 25,
});

export const CustomLoadingButton = styled(LoadingButton)({
  textTransform: "none",
  borderRadius: 0,
  paddingLeft: 25,
  paddingRight: 25,
});

export const CustomToggleButton = styled(ToggleButton)({
  textTransform: "none",
  borderRadius: 0,
  paddingLeft: 25,
  paddingRight: 25,
});

export const CustomToggleButtonGroup = styled(ToggleButtonGroup)(
  ({ theme }) => ({
    "& .MuiToggleButtonGroup-grouped": {
      margin: theme.spacing(0.5),
      border: 0,
      "&.Mui-disabled": {
        border: 0,
      },
      "&:not(:first-of-type)": {
        borderRadius: theme.shape.borderRadius,
      },
      "&:first-of-type": {
        borderRadius: theme.shape.borderRadius,
      },
    },
  })
);
