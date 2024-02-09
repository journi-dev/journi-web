import { useEffect, useState } from "react";
import { Cancel, CheckCircle } from "@mui/icons-material";
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
import axios from "axios";
import { isEmail } from "../../../../utils/Helpers";
import { MuiTelInput } from "mui-tel-input";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmail,
  setFirstName,
  setIsStep1Complete,
  setJobTitle,
  setLastName,
  setLeadSource,
  setPhone,
} from "../../../../context/features/GetStarted";

export const Step1 = ({ disabled }) => {
  const dispatch = useDispatch();
  const firstName = useSelector((state) => state.getStarted.firstName);
  const lastName = useSelector((state) => state.getStarted.lastName);
  const phone = useSelector((state) => state.getStarted.phone);
  const email = useSelector((state) => state.getStarted.email);
  const [loadEmails, setLoadEmails] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(null);
  const jobTitle = useSelector((state) => state.getStarted.jobTitle);
  const leadSource = useSelector((state) => state.getStarted.leadSource);
  const leadSourceOptions = [
    "Internet search",
    "Facebook",
    "Instagram",
    "Journi employee",
    "LinkedIn",
    "Referral",
    "Threads",
    "TikTok",
    "Twitter / X",
    "YouTube",
    "Other",
  ];
  const isStep1Complete =
    firstName !== "" &&
    lastName !== "" &&
    phone.length === 15 &&
    isValidEmail &&
    jobTitle !== "";

  useEffect(() => {
    const checkCredentials = () => {
      setLoadEmails(true);

      axios.get("/leads").then((res) => {
        const takenEmails = [];
        for (const obj of res.data) takenEmails.push(obj["email"]);
        setLoadEmails(false);
        setIsValidEmail(takenEmails.indexOf(email) === -1 && isEmail(email));
      });
    };

    const timeoutId = setTimeout(() => checkCredentials(), 1000);
    return () => clearTimeout(timeoutId);
  }, [email]);

  useEffect(() => {
    dispatch(setIsStep1Complete(isStep1Complete));
  }, [dispatch, isStep1Complete]);

  return (
    <Box sx={{ width: "100%" }}>
      {/* Container to hide elements if the user is not on that step. */}
      {!disabled && (
        <Box className="flex-col" sx={{ p: 2, gap: 2 }}>
          {/* Label */}
          <Typography variant="h5" component="h3">
            First, tell us about you.
          </Typography>

          {/* First and Last Name */}
          <Box className="flex-row" sx={{ gap: 2 }}>
            <TextField
              id="first-name"
              name="first-name"
              type="text"
              label="First Name"
              helperText={firstName === "" && "Please enter your first name."}
              error={firstName === ""}
              value={firstName}
              onChange={(e) => dispatch(setFirstName(e.target.value))}
              fullWidth
              autoComplete="given-name"
              autoCapitalize="words"
              required
              disabled={disabled}
            />
            <TextField
              id="last-name"
              name="last-name"
              type="text"
              label="Last Name"
              helperText={lastName === "" && "Please enter your last name."}
              error={lastName === ""}
              value={lastName}
              onChange={(e) => dispatch(setLastName(e.target.value))}
              fullWidth
              autoComplete="family-name"
              autoCapitalize="words"
              required
              disabled={disabled}
            />
          </Box>

          {/* Phone & Email */}
          <Box className="flex-row" sx={{ gap: 2 }}>
            <MuiTelInput
              id="phone"
              name="phone"
              label="Phone"
              value={phone}
              onChange={(e) => dispatch(setPhone(e))}
              fullWidth
              autoComplete="tel"
              required
              disabled={disabled}
            />
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              error={email !== "" && !isValidEmail}
              helperText={
                email !== "" && !isValidEmail && "Please enter a valid email."
              }
              value={email}
              onChange={(e) => dispatch(setEmail(e.target.value))}
              fullWidth
              autoComplete="email"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {email !== "" && loadEmails && (
                      <CheckCircle sx={{ opacity: 0 }} />
                    )}
                    {email !== "" && !loadEmails && isValidEmail && (
                      <CheckCircle />
                    )}
                    {email !== "" && !loadEmails && !isValidEmail && <Cancel />}
                  </InputAdornment>
                ),
              }}
              required
              disabled={disabled}
            />
          </Box>

          {/* Title  & Lead Source */}
          <Box className="flex-row" sx={{ gap: 2 }}>
            <TextField
              id="job-title"
              name="job-title"
              type="text"
              label="Job Title"
              helperText={jobTitle === "" && "Please enter your job title."}
              error={jobTitle === ""}
              value={jobTitle}
              onChange={(e) => dispatch(setJobTitle(e.target.value))}
              fullWidth
              autoComplete="organization-title"
              autoCapitalize="words"
              required
              disabled={disabled}
            />
            <FormControl fullWidth>
              <InputLabel id="lead-source-label">
                How did you hear about us?
              </InputLabel>
              <Select
                labelId="lead-source-label"
                id="lead-source"
                value={leadSource}
                label="How did you hear about us?"
                onChange={(e) => dispatch(setLeadSource(e.target.value))}
              >
                {leadSourceOptions.map((src) => (
                  <MenuItem key={src} value={src}>
                    {src}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      )}
    </Box>
  );
};
