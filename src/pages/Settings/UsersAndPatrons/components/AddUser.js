import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../../../../context/features/User";
import { generateTempPassword, isEmail } from "../../../../utils/Helpers";
import { makeStyles } from "tss-react/mui";
import axios from "axios";
import { Cancel, CheckCircle, Close } from "@mui/icons-material";
import { CustomLoadingButton } from "../../../../components/ui/CustomComponents";

const useStyles = makeStyles()((theme) => {
  return {
    root: {
      display: "flex",
    },
    formRow: {
      width: "100%",
      margin: "10px auto",
    },
    credential: {
      display: "flex",
      alignItems: "center",
    },
    singleItem: {
      margin: "0 auto",
    },
  };
});

export default function AddUser({ onClose }) {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [accessLevel, setAccessLevel] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [key, setKey] = useState(null);
  const redirectUrl = "https://www.youtube.com/watch?v=dKrVegVI0Us";

  let password, confirmPassword;
  password = confirmPassword = generateTempPassword();

  const isLoading = useSelector((state) => state.user.isLoading);

  const [loadUsers, setLoadUsers] = useState(false);
  const [loadEmails, setLoadEmails] = useState(false);
  const [isValidUser, setIsValidUser] = useState(null);
  const [isValidEmail, setIsValidEmail] = useState(null);

  const cannotAddUser =
    firstName === "" ||
    lastName === "" ||
    loadUsers ||
    loadEmails ||
    !isValidUser ||
    !isValidEmail ||
    isLoading;

  const handleSignup = async (e) => {
    e.preventDefault();

    const newUserData = {
      accessLevel,
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      jobTitle,
      username,
      redirectUrl,
    };
    await dispatch(signUpUser(newUserData));
    await onClose();
  };

  useEffect(() => {
    const checkCredentials = (key) => {
      if (key === "username") setLoadUsers(true);
      else if (key === "email") setLoadEmails(true);

      axios.get("/users").then((res) => {
        const takenUsers = [];
        for (const obj of res.data) takenUsers.push(obj[key]);
        if (key === "username") {
          setLoadUsers(false);
          setIsValidUser(
            takenUsers.indexOf(username) === -1 && username.length >= 3
          );
        } else if (key === "email") {
          setLoadEmails(false);
          setIsValidEmail(takenUsers.indexOf(email) === -1 && isEmail(email));
        }
      });
    };

    const timeoutId = setTimeout(() => checkCredentials(key), 1000);
    return () => clearTimeout(timeoutId);
  }, [key, username, email]);

  return (
    <Paper
      elevation={1}
      className={classes.root}
      sx={{
        p: 3,
        maxWidth: "80vw",
        maxHeight: 750,
        overflow: "auto",
      }}
    >
      <Box className="flex-col-start">
        {/* Header */}
        <Box className="flex-row-space" sx={{ mb: 1, alignItems: "center" }}>
          <Typography variant="h5">Add user</Typography>
          <IconButton sx={{ ml: 2 }} onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
        <Box className="flex-col">
          {/* First and Last Name */}
          <Box className={`flex-row ${classes.formRow}`}>
            <TextField
              id="first-name"
              name="first-name"
              type="text"
              label="First Name"
              sx={{ mr: 1 }}
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
              sx={{ ml: 1 }}
              // helperText={errors.email || ""}
              // error={Boolean(errors.email)}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
              autoComplete="family-name"
              autoCapitalize="words"
            />
          </Box>
          {/* Username */}
          <Box className={`${classes.formRow} ${classes.credential}`}>
            <TextField
              id="username"
              name="username"
              type="text"
              label="Username"
              //  helperText={
              //    username.length < 3
              //      ? "Invalid username"
              //      : !isValidUser
              //      ? "Username taken"
              //      : errors.username || ""
              //  }
              // error={Boolean(errors.username)}
              error={username !== "" && !isValidUser}
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setKey("username");
              }}
              fullWidth
              autoComplete="username"
            />
            {username !== "" && loadUsers && (
              <CheckCircle sx={{ ml: 1, opacity: 0 }} />
            )}
            {username !== "" && !loadUsers && isValidUser && (
              <CheckCircle sx={{ ml: 1 }} />
            )}
            {username !== "" && !loadUsers && !isValidUser && (
              <Cancel sx={{ ml: 1 }} />
            )}
          </Box>
          {/* Email */}
          <Box className={`${classes.formRow} ${classes.credential}`}>
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
                setKey("email");
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
          {/* Title and Access Level */}
          <Box className={`flex-row ${classes.formRow}`}>
            <TextField
              id="job-title"
              name="job-title"
              type="text"
              label="Job Title"
              sx={{ mr: 1 }}
              // helperText={errors.email || ""}
              // error={Boolean(errors.email)}
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              fullWidth
              autoComplete="organization-title"
              autoCapitalize="words"
            />
            <FormControl sx={{ width: "60%", ml: 1 }}>
              <InputLabel id="access-level-label">Access Level</InputLabel>
              <Select
                labelId="access-level-label"
                id="access-level"
                value={accessLevel}
                label="Access Level"
                onChange={(e) => setAccessLevel(e.target.value)}
              >
                <MenuItem value={"Employee"}>Employee</MenuItem>
                <MenuItem value={"Manager"}>Manager</MenuItem>
                <MenuItem value={"Admin"}>Admin</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {/* "Add user" button */}
          <Box className={classes.singleItem}>
            <CustomLoadingButton
              sx={{ mt: 1 }}
              variant="contained"
              onClick={(e) => handleSignup(e)}
              disableElevation
              disabled={cannotAddUser}
              loading={isLoading}
            >
              Add {cannotAddUser ? "user" : firstName}
            </CustomLoadingButton>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
