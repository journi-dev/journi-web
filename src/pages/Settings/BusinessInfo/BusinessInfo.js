import {
  Edit,
  Facebook,
  Instagram,
  Save,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import BusinessHours from "./components/BusinessHours";
import SupportHours from "./components/SupportHours";
import { CustomButton } from "../../../components/ui/CustomComponents";

export default function BusinessInfo() {
  const usTerritoryAbbrv = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "AS",
    "CA",
    "CO",
    "CT",
    "DE",
    "DC",
    "FL",
    "GA",
    "GU",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "MP",
    "OH",
    "OK",
    "OR",
    "PA",
    "PR",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "TT",
    "UT",
    "VT",
    "VA",
    "VI",
    "WA",
    "WV",
    "WI",
    "WY",
  ];
  /* const usTerritoryNames = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "American Samoa",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "District of Columbia",
    "Florida",
    "Georgia",
    "Guam",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Northern Mariana Islands",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Puerto Rico",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Trust Territories",
    "Utah",
    "Vermont",
    "Virginia",
    "Virgin Islands",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ]; */

  const [state, setState] = useState("");
  const [isEditActive, setIsEditActive] = useState(false);
  const inputProps = { readOnly: !isEditActive };

  return (
    <div>
      <Box className="flex-row-start" sx={{ mb: 2 }}>
        <Typography variant="h5">Business Info</Typography>
        <CustomButton
          color={isEditActive ? "secondary" : "primary"}
          disableElevation
          variant="contained"
          startIcon={isEditActive ? <Save /> : <Edit />}
          sx={{ borderRadius: 25, ml: 3 }}
          onClick={() => setIsEditActive(!isEditActive)}
        >
          {isEditActive ? "Save" : "Edit"}
        </CustomButton>
      </Box>
      <form>
        <Box className="flex-col-start">
          {/* Business Info and Social Media */}
          <Box className="flex-col-start">
            <Typography variant="h6">Legal & Contact Info</Typography>
            <Box className="flex-row-start">
              {/* Business Info */}
              <Box className="flex-col-start">
                <Box className="flex-row-start">
                  <TextField
                    label="Legal Business Name"
                    variant="outlined"
                    InputProps={inputProps}
                  />
                  <TextField
                    label="Trade Name (i.e. DBA)"
                    variant="outlined"
                    InputProps={inputProps}
                  />
                </Box>
                <TextField
                  label="Address 1"
                  variant="outlined"
                  InputProps={inputProps}
                />
                <TextField label="Address 2" variant="outlined" />
                <Box className="flex-row-start">
                  <TextField
                    label="City"
                    variant="outlined"
                    InputProps={inputProps}
                  />
                  <FormControl>
                    <InputLabel id="state-label">State</InputLabel>
                    <Select
                      labelId="state-label"
                      id="state"
                      value={state}
                      label="State"
                      onChange={(e) => setState(e.target.value)}
                    >
                      {usTerritoryAbbrv.map((state) => (
                        <MenuItem value={state}>{state}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    label="Zip Code"
                    variant="outlined"
                    type="number"
                    InputProps={inputProps}
                  />
                </Box>
              </Box>

              {/* Contact Info and Social Media */}
              <Box className="flex-col-start">
                {/* Contact Info */}
                <Box className="flex-row-start">
                  <TextField
                    label="Primary Business Phone"
                    variant="outlined"
                    InputProps={inputProps}
                  />
                  <TextField
                    label="Primary Contact Email"
                    variant="outlined"
                    InputProps={inputProps}
                    type="email"
                  />
                </Box>

                <Box className="flex-row-start">
                  <Box className="flex-col-start">
                    <TextField
                      label="Facebook"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Facebook />
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                    />
                    <TextField
                      label="Twitter"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Twitter />
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                    />
                  </Box>
                  <Box className="flex-col-start">
                    <TextField
                      label="Instagram"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Instagram />
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                    />
                    <TextField
                      label="YouTube"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <YouTube />
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Business and Support Hours */}
          <Box className="flex-row-space">
            <BusinessHours />
            <SupportHours />
          </Box>
        </Box>
      </form>
    </div>
  );
}
