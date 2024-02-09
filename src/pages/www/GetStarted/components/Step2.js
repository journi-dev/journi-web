import {
  Box,
  ButtonGroup,
  Checkbox,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { CustomButton } from "../../../../components/ui/CustomComponents";
import { useDispatch, useSelector } from "react-redux";
import {
  setHasApp,
  setHasWeb,
  setIsRequestingMarketing,
  setIsStep2Complete,
  setSelectedPlatforms,
} from "../../../../context/features/GetStarted";
import { useEffect } from "react";

export const Step2 = ({ disabled }) => {
  const dispatch = useDispatch();
  const selectedPlatforms = useSelector(
    (state) => state.getStarted.selectedPlatforms
  );
  const hasApp = useSelector((state) => state.getStarted.hasApp);
  const hasWeb = useSelector((state) => state.getStarted.hasWeb);
  const isRequestingMarketing = useSelector(
    (state) => state.getStarted.isRequestingMarketing
  );

  const isStep2Complete =
    selectedPlatforms.length > 0 &&
    hasApp !== "" &&
    hasWeb !== "" &&
    isRequestingMarketing !== "";

  const platforms = ["App", "Website"];
  const yesOrNo = ["Yes", "No"];
  const hasAppButtons = [
    yesOrNo.map((option) => (
      <CustomButton
        key={option}
        variant={hasApp === option ? "contained" : "outlined"}
        onClick={() => dispatch(setHasApp(option))}
      >
        {option}
      </CustomButton>
    )),
  ];
  const hasWebButtons = [
    yesOrNo.map((option) => (
      <CustomButton
        key={option}
        variant={hasWeb === option ? "contained" : "outlined"}
        onClick={() => dispatch(setHasWeb(option))}
      >
        {option}
      </CustomButton>
    )),
  ];
  const isRequestingMarketingButtons = [
    yesOrNo.map((option) => (
      <CustomButton
        key={option}
        variant={isRequestingMarketing === option ? "contained" : "outlined"}
        onClick={() => dispatch(setIsRequestingMarketing(option))}
      >
        {option}
      </CustomButton>
    )),
  ];

  useEffect(() => {
    dispatch(setIsStep2Complete(isStep2Complete));
  }, [dispatch, isStep2Complete]);

  return (
    <Box sx={{ width: "100%" }}>
      {/* Container to hide elements if the user is not on that step. */}
      {!disabled && (
        <Box className="flex-col" sx={{ p: 2, gap: 2 }}>
          {/* Label */}
          <Typography variant="h5" component="h3">
            Next, tell us how we can help.
          </Typography>

          {/* I want Journi to build a(n)... */}
          <Box
            className="flex-row"
            sx={{
              gap: 1,
              alignItems: "baseline",
              justifyContent: "flex-start",
            }}
          >
            <Typography>
              I want Journi to build{" "}
              {selectedPlatforms[0] === "App"
                ? "an"
                : selectedPlatforms[0]
                ? "a"
                : ""}
            </Typography>
            <FormControl required disabled={disabled}>
              <Select
                sx={{ px: 0.5 }}
                variant="standard"
                id="platform-selection"
                multiple
                value={selectedPlatforms}
                onChange={(e) =>
                  dispatch(
                    setSelectedPlatforms(
                      typeof e.target.value === "string"
                        ? e.target.value.split(",")
                        : e.target.value
                    )
                  )
                }
                renderValue={(selected) => selected.join(" and ").toLowerCase()}
              >
                {platforms.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={selectedPlatforms.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography>for me.</Typography>
          </Box>

          {/* Existing app? */}
          <Box className="flex-row-space" sx={{ gap: 2, alignItems: "center" }}>
            <Typography>Do you have an existing app?</Typography>
            <ButtonGroup size="small">{hasAppButtons}</ButtonGroup>
          </Box>

          {/* Existing website? */}
          <Box className="flex-row-space" sx={{ gap: 2, alignItems: "center" }}>
            <Typography>Do you have an existing website?</Typography>
            <ButtonGroup size="small">{hasWebButtons}</ButtonGroup>
          </Box>

          {/* Existing website? */}
          <Box className="flex-row-space" sx={{ gap: 2, alignItems: "center" }}>
            <Typography>
              Are you interested in receiving marketing assistance to maximize
              your business?
            </Typography>
            <ButtonGroup size="small">
              {isRequestingMarketingButtons}
            </ButtonGroup>
          </Box>
        </Box>
      )}
    </Box>
  );
};
