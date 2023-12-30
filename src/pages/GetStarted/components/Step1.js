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
import { isEmail } from "../../../utils/Helpers";
import { MuiTelInput } from "mui-tel-input";

export const Step1 = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("+1");
  const [email, setEmail] = useState("");
  const [loadEmails, setLoadEmails] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [leadSource, setLeadSource] = useState("");

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
    <Box
      className="flex-col"
      sx={{ p: 2, gap: 2, width: "100%", height: "100%" }}
    >
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

      {/* Phone & Email */}
      <Box className="flex-row" sx={{ gap: 2 }}>
        <MuiTelInput
          id="phone"
          name="phone"
          label="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
          autoComplete="tel"
        />
        <TextField
          id="email"
          name="email"
          type="email"
          label="Email"
          error={email !== "" && !isValidEmail}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          fullWidth
          autoComplete="email"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {email !== "" && loadEmails && (
                  <CheckCircle sx={{ opacity: 0 }} />
                )}
                {email !== "" && !loadEmails && isValidEmail && <CheckCircle />}
                {email !== "" && !loadEmails && !isValidEmail && <Cancel />}
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Title  & Lead Source */}
      <Box className="flex-row" sx={{ gap: 2 }}>
        <TextField
          id="job-title"
          name="job-title"
          type="text"
          label="Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          fullWidth
          autoComplete="organization-title"
          autoCapitalize="words"
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
            onChange={(e) => setLeadSource(e.target.value)}
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
  );
};
