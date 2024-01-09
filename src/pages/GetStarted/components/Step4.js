import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

export const Step4 = ({ disabled }) => {
  const firstName = useSelector((state) => state.getStarted.firstName);
  const email = useSelector((state) => state.getStarted.email);
  return (
    <Box sx={{ width: "100%" }}>
      {/* Container to hide elements if the user is not on that step. */}
      {!disabled && (
        <Box className="flex-col" sx={{ p: 2, gap: 2 }}>
          <Typography variant="h5" component="h3">
            All done, {firstName}!
          </Typography>

          <Typography variant="h6" component="h4">
            Check your email at {email}.
          </Typography>
        </Box>
      )}
    </Box>
  );
};
