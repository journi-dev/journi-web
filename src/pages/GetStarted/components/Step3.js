import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { CustomLoadingButton } from "../../../components/ui/CustomComponents";
import { useSelector } from "react-redux";
import { businessCategories } from "../../../utils/Helpers";
import { green, grey, yellow } from "@mui/material/colors";
import { WarningRounded } from "@mui/icons-material";

export const Step3 = () => {
  const isLoading = useSelector((state) => state.user.isLoading);
  const isDark = useSelector((state) => state.appearance.isDark);
  const [org, setOrg] = useState("");
  const [orgSize, setOrgSize] = useState("");
  const [orgType, setOrgType] = useState("");
  const [locationCount, setLocationCount] = useState(1);
  const orgSizes = [
    "1-5 employees",
    "6-10 employees",
    "11-25 employees",
    "26-50 employees",
    "51+ employees",
  ];

  return (
    <Box
      className="flex-col"
      sx={{ p: 2, gap: 2, width: "100%", height: "100%" }}
    >
      {/* Label */}
      <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
        Last, tell us about your business.
      </Typography>
      {/* Company Name and Size */}
      <Box className="flex-row" sx={{ gap: 2 }}>
        <TextField
          id="organization"
          name="organization"
          type="text"
          label="Company Name"
          value={org}
          onChange={(e) => setOrg(e.target.value)}
          fullWidth
          autoComplete="organization"
          autoCapitalize="words"
        />
        <FormControl fullWidth>
          <InputLabel id="org-size-label">Company Size</InputLabel>
          <Select
            labelId="org-size-label"
            id="org-size"
            value={orgSize}
            label="Company Size"
            onChange={(e) => setOrgSize(e.target.value)}
          >
            {orgSizes.map((range) => (
              <MenuItem key={range} value={range}>
                {range}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {/* Company Type */}
      <Box className="flex-row-start" sx={{ gap: 2, alignItems: "center" }}>
        <Typography>Which category best describes your company?</Typography>
        <FormControl fullWidth>
          <InputLabel id="company-type-label">Category</InputLabel>
          <Select
            labelId="company-type-label"
            id="company-type"
            value={orgType}
            label="Category"
            onChange={(e) => {
              const val = e.target.value;
              setOrgType(val);
              if (val === "Multi-unit restaurant/group" && locationCount < 2) {
                setLocationCount(2);
              }
            }}
          >
            {businessCategories.map((category, i) => (
              <MenuItem key={i} value={category.name}>
                <ListItemIcon>{category.icon}</ListItemIcon>
                <ListItemText>{category.name}</ListItemText>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {/* Multi-unit Info */}
      <Box className="flex-col" sx={{ gap: 1 }}>
        {/* Location Count */}
        <Box className="flex-row-space" sx={{ gap: 2, alignItems: "center" }}>
          <Typography>How many locations does your company have?</Typography>
          <TextField
            id="locations"
            name="locations"
            type="number"
            label="Locations"
            value={locationCount}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setLocationCount(
                Math.max(orgType === "Multi-unit restaurant/group" ? 2 : 1, val)
              );
            }}
          />
        </Box>
        {/* App/website per location? */}
        <Box className="flex-row-space" sx={{ gap: 2, alignItems: "center" }}>
          <FormControl>
            <FormLabel id="multi-unit-app-type-label">
              Do you want an app/website per location?
            </FormLabel>
            <RadioGroup
              aria-labelledby="multi-unit-app-type-label"
              defaultValue="no"
              name="multi-unit-app-type-buttons-group"
            >
              <FormControlLabel
                value="no"
                control={<Radio />}
                label={
                  <Box
                    className="flex-row"
                    sx={{ gap: 2, alignItems: "center" }}
                  >
                    <Typography>
                      No, I want a single app/website for all of my locations.
                    </Typography>
                    <Paper
                      variant="outlined"
                      sx={{
                        bgcolor: isDark ? green["900"] : green["100"],
                        px: 0.5,
                      }}
                    >
                      <Typography variant="caption">Recommended</Typography>
                    </Paper>
                  </Box>
                }
              />
              <FormControlLabel
                value="yes"
                control={<Radio />}
                label={
                  <Box
                    className="flex-row"
                    sx={{
                      gap: 2,
                    }}
                  >
                    <Typography>
                      Yes, I want a standalone app/website for
                      {locationCount === 1 ? "" : " each of"} my {locationCount}{" "}
                      location{locationCount === 1 ? "" : "s"}.
                    </Typography>
                    <Box>
                      <Paper
                        variant="outlined"
                        className="flex-row"
                        sx={{
                          bgcolor: isDark ? grey["900"] : yellow["100"],
                          borderColor: yellow["A700"],
                          py: 0.5,
                          gap: 1,
                          width: "200px",
                        }}
                      >
                        <WarningRounded
                          sx={{ color: yellow["A700"], fontSize: 18 }}
                        />
                        <Typography variant="caption">
                          Note: This affects final pricing.
                        </Typography>
                      </Paper>
                    </Box>
                  </Box>
                }
              />
            </RadioGroup>
          </FormControl>
        </Box>
      </Box>
      <Typography variant="caption" color="text.secondary">
        By clicking "Get started", you agree to receive recurring advertising
        emails, text messages and calls from Journi to the phone number/email
        provided above. Consent to receive advertising text messages and calls
        is not required to purchase goods or services. By clicking "Get
        started", you also consent to Journi's Terms and Conditions of Use and
        Privacy Policy.
      </Typography>
      {/* "Get started" button */}
      <Box>
        <CustomLoadingButton
          sx={{ mt: 1 }}
          variant={"contained"}
          color={isDark ? "button" : "secondary"}
          disableElevation
          onClick={() => {}}
          // disabled={cannotAddUser}
          loading={isLoading}
        >
          <Typography variant="buttonText">
            Get started
            {/* Get started{cannotAddUser ? "" : `, ${firstName}`} */}
          </Typography>
        </CustomLoadingButton>
      </Box>
    </Box>
  );
};
