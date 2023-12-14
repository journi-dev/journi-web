import { Box, TextField, Typography } from "@mui/material";
import Lottie from "lottie-react";
import animationData from "../../assets/motion-graphics/25992-hand-scrolls-the-messages-on-the-phone.json";
import { JourniTabTitle } from "../../utils/JourniTabTitle";
import { CustomLoadingButton } from "../../components/ui/CustomComponents";
import { Cancel, CheckCircle } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { isEmail } from "../../utils/Helpers";

export default function Demo() {
  JourniTabTitle("Demo");

  const isLoading = useSelector((state) => state.user.isLoading);
  const isDark = useSelector((state) => state.appearance.isDark);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loadEmails, setLoadEmails] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(null);
  const [org, setOrg] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const cannotAddUser =
    firstName === "" ||
    lastName === "" ||
    loadEmails ||
    !isValidEmail ||
    org === "" ||
    jobTitle === "" ||
    isLoading;

  useEffect(() => {
    const checkCredentials = () => {
      setLoadEmails(true);

      axios.get("/users").then((res) => {
        const takenUsers = [];
        for (const obj of res.data) takenUsers.push(obj["email"]);
        setLoadEmails(false);
        setIsValidEmail(takenUsers.indexOf(email) === -1 && isEmail(email));
      });
    };

    const timeoutId = setTimeout(() => checkCredentials(), 1000);
    return () => clearTimeout(timeoutId);
  }, [email]);

  return (
    <div>
      <Box className="flex-row" sx={{ height: "70vh" }}>
        <Box className="flex-col">
          <Typography variant="h1" sx={{ mb: 1 }}>
            Let's get started.
          </Typography>
          <Typography variant="h5" component="h2">
            First, we need a little bit of info.
          </Typography>

          {/* Form */}
          <Box sx={{ width: "50%", mt: 5 }}>
            {/* First and Last Name */}
            <Box className="flex-row" sx={{ mb: 2, gap: 2 }}>
              <TextField
                id="first-name"
                name="first-name"
                type="text"
                label="First Name"
                // helperText={errors.email || ""}
                // error={Boolean(errors.email)}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
                autoComplete="given-name"
                autoCapitalize="words"
              />
              <TextField
                id="last-name"
                name="last-name"
                type="text"
                label="Last Name"
                // helperText={errors.email || ""}
                // error={Boolean(errors.email)}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
                autoComplete="family-name"
                autoCapitalize="words"
              />
            </Box>

            {/* Email */}
            <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
              <TextField
                id="email"
                name="email"
                type="email"
                label="Email"
                //  helperText={
                //    isEmail(email)
                //       ? "Invalid email"
                //      : !isValidEmail
                //      ? "Email taken"
                //      : errors.email || ""
                //  }
                //  error={Boolean(errors.email)}
                error={email !== "" && !isValidEmail}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                fullWidth
                autoComplete="email"
              />
              {email !== "" && loadEmails && (
                <CheckCircle sx={{ ml: 1, opacity: 0 }} />
              )}
              {email !== "" && !loadEmails && isValidEmail && (
                <CheckCircle sx={{ ml: 1 }} />
              )}
              {email !== "" && !loadEmails && !isValidEmail && (
                <Cancel sx={{ ml: 1 }} />
              )}
            </Box>

            {/* Company and Title */}
            <Box className="flex-row" sx={{ mb: 2, gap: 2 }}>
              <TextField
                id="organization"
                name="organization"
                type="text"
                label="Company Name"
                // helperText={errors.email || ""}
                // error={Boolean(errors.email)}
                value={org}
                onChange={(e) => setOrg(e.target.value)}
                fullWidth
                autoComplete="organization"
                autoCapitalize="words"
              />
              <TextField
                id="job-title"
                name="job-title"
                type="text"
                label="Job Title"
                // helperText={errors.email || ""}
                // error={Boolean(errors.email)}
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                fullWidth
                autoComplete="organization-title"
                autoCapitalize="words"
              />
            </Box>

            {/* "Get started" button */}
            <Box>
              <CustomLoadingButton
                sx={{ mt: 1 }}
                variant={"contained"}
                color={isDark ? "button" : "secondary"}
                disableElevation
                onClick={() => {}}
                disabled={cannotAddUser}
                loading={isLoading}
              >
                <Typography variant="buttonText">
                  Get started{cannotAddUser ? "" : `, ${firstName}`}
                </Typography>
              </CustomLoadingButton>
            </Box>
          </Box>
        </Box>
        <Lottie animationData={animationData} />
      </Box>
    </div>
  );
}
