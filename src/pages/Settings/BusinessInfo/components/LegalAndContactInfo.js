import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function LegalAndContactInfo({ isEditActive }) {
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
  const inputProps = { readOnly: !isEditActive };

  return (
    <div>
      {/* Business Info and Social Media */}
      <Box className="flex-col-start">
        <Typography variant="h6" sx={{ pb: 2 }}>
          Legal & Contact Info
        </Typography>

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
      </Box>
      ein
    </div>
  );
}
