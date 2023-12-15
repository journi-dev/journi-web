import { LoadingButton } from "@mui/lab";
import { Button, styled, ToggleButton, ToggleButtonGroup } from "@mui/material";

export const CustomButton = styled(Button)({
  textTransform: "none",
  borderRadius: 0,
  paddingRight: 25,
  paddingLeft: 25,
});

export const CustomLargeButton = styled(Button)({
  textTransform: "none",
  borderRadius: 0,
  paddingTop: 10,
  paddingRight: 15,
  paddingBottom: 10,
  paddingLeft: 15,
});

export const CustomLoadingButton = styled(LoadingButton)({
  textTransform: "none",
  borderRadius: 0,
  paddingRight: 25,
  paddingLeft: 25,
});

export const CustomToggleButton = styled(ToggleButton)({
  textTransform: "none",
  borderRadius: 0,
  paddingRight: 25,
  paddingLeft: 25,
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
