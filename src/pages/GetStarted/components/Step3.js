import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { CustomLoadingButton } from "../../../components/ui/CustomComponents";
import { useSelector } from "react-redux";

export const Step3 = () => {
  const isLoading = useSelector((state) => state.user.isLoading);
  const isDark = useSelector((state) => state.appearance.isDark);
  const [org, setOrg] = useState("");

  return (
    <Box
      className="flex-col"
      sx={{ p: 2, gap: 2, width: "100%", height: "100%" }}
    >
      {/* Label */}
      <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
        Last, tell us about your business.
      </Typography>

      {/* Company */}
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
