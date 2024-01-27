import { Box, Typography } from "@mui/material";
import { InlineWidget } from "react-calendly";
import { useSelector } from "react-redux";

export const Step4 = ({ disabled }) => {
  const firstName = useSelector((state) => state.getStarted.firstName);
  const lastName = useSelector((state) => state.getStarted.lastName);
  const email = useSelector((state) => state.getStarted.email);
  const isDark = useSelector((state) => state.appearance.isDark);
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

          <InlineWidget
            url="https://calendly.com/journidotdev/30min"
            styles={{
              height: "250px",
            }}
            pageSettings={{
              backgroundColor: isDark ? "121212" : "ffffff",
              hideEventTypeDetails: false,
              hideLandingPageDetails: false,
              primaryColor: "#fc6",
              textColor: "4d5055",
            }}
            prefill={{
              email,
              firstName,
              lastName,
              name: `${firstName} ${lastName}`.trim(),
              // smsReminderNumber: "+1234567890",
              // guests: ["janedoe@example.com", "johndoe@example.com"],
              // customAnswers: {
              //   a1: "a1",
              //   a2: "a2",
              //   a3: "a3",
              //   a4: "a4",
              //   a5: "a5",
              //   a6: "a6",
              //   a7: "a7",
              //   a8: "a8",
              //   a9: "a9",
              //   a10: "a10",
              // },
              // date: new Date(Date.now() + 86400000),
            }}
            // utm={{
            //   utmCampaign: 'Spring Sale 2019',
            //   utmContent: 'Shoe and Shirts',
            //   utmMedium: 'Ad',
            //   utmSource: 'Facebook',
            //   utmTerm: 'Spring'
            // }}
          />
        </Box>
      )}
    </Box>
  );
};
