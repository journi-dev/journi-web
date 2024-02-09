import { AddressAutofill } from "@mapbox/search-js-react";
import { Box, Divider, OutlinedInput, Typography } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { useState } from "react";

export default function LegalAndContactInfo({ isEditActive }) {
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <div>
      {/* Business Info and Social Media */}
      <Box className="flex-col-start">
        <Typography variant="h6" sx={{ pb: 2 }}>
          Legal & Contact Info
        </Typography>

        {/* Business Info */}
        <form>
          <AddressAutofill accessToken="pk.eyJ1IjoiamFtYWxyaWxleSIsImEiOiJjbG5sd255MjQwMDhzMmtwdGZxZTRoc29xIn0.hrsYaM97CWwo177fDwLGWA">
            <OutlinedInput
              fullWidth
              name="Address"
              placeholder="Address"
              autoComplete="address-line1"
              sx={{ p: 0.5, mb: 1.5 }}
            />
          </AddressAutofill>
          <OutlinedInput
            fullWidth
            name="Address line 2 (optional)"
            placeholder="Address line 2 (optional)"
            autoComplete="address-line2"
            sx={{ p: 0.5, mb: 1.5 }}
          />

          <Box className="flex-row-start" sx={{ gap: 1 }}>
            <OutlinedInput
              name="City"
              placeholder="City"
              autoComplete="address-level2"
              sx={{ p: 0.5, width: "50%" }}
            />
            <OutlinedInput
              name="State/Region"
              placeholder="State/Region"
              autoComplete="address-level1"
              sx={{ p: 0.5, width: "20%" }}
            />
            <OutlinedInput
              name="ZIP Code"
              placeholder="ZIP Code"
              autoComplete="postal-code"
              sx={{ p: 0.5, width: "30%" }}
            />
          </Box>
        </form>

        <Divider sx={{ my: 2, borderStyle: "dashed" }} />

        {/* Contact Info */}
        <MuiTelInput
          value={phoneNumber}
          onChange={(value) => setPhoneNumber(value)}
          placeholder="Phone Number"
          sx={{ mb: 1.5 }}
        />
        <OutlinedInput
          name="Primary Business Email"
          placeholder="Primary Business Email"
          autoComplete="email"
          type="email"
          sx={{ mb: 1.5 }}
        />

        <OutlinedInput
          name="Employer ID Number (EIN)"
          placeholder="Employer ID Number (EIN)"
          sx={{ mb: 1 }}
        />
      </Box>
    </div>
  );
}
