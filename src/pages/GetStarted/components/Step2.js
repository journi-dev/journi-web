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
import { useState } from "react";
import { CustomButton } from "../../../components/ui/CustomComponents";

export const Step2 = ({ disabled }) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [hasApp, setHasApp] = useState(null);
  const [hasWeb, setHasWeb] = useState(null);
  const [isRequestingMarketing, setIsRequestingMarketing] = useState(null);

  const platforms = ["App", "Website"];
  const yesOrNo = ["Yes", "No"];
  const hasAppButtons = [
    yesOrNo.map((option) => (
      <CustomButton
        key={option}
        variant={hasApp === option ? "contained" : "outlined"}
        onClick={() => setHasApp(option)}
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
        onClick={() => setHasWeb(option)}
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
        onClick={() => setIsRequestingMarketing(option)}
      >
        {option}
      </CustomButton>
    )),
  ];

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
                  setSelectedPlatforms(
                    typeof e.target.value === "string"
                      ? e.target.value.split(",")
                      : e.target.value
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
