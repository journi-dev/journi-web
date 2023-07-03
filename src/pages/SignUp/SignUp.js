import { JourniTabTitle } from "../../utils/JourniTabTitle";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { makeStyles } from "tss-react/mui";
import { useTranslation } from "react-i18next";
import { CustomLoadingButton } from "../../components/ui/CustomComponents";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../../context/features/User";
import { CheckBoxOutlineBlank } from "@mui/icons-material";

const useStyles = makeStyles()((theme) => {
  return {
    root: {
      textAlign: "center",
    },
    marginAutoContainer: {
      width: "100%",
    },
    marginAutoItem: {
      margin: "0 auto",
    },
    loginComponent: {
      width: "90%",
      margin: "10px auto",
    },
    link: {
      textDecoration: "none",
    },
    linkContainer: {
      color: theme.palette.text.secondary,
    },
  };
});

export default function SignUp() {
  JourniTabTitle("signUp");
  const { classes } = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isLoading = useSelector((state) => state.user.isLoading);
  const errors = useSelector((state) => state.user.errors);

  const handleSignup = (e) => {
    e.preventDefault();

    const newUserData = {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      username,
    };
    dispatch(signUpUser(newUserData, navigate));
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.marginAutoItem} sx={{ width: 500, m: 2, p: 2 }}>
        <Typography variant="h5">{t("signUp")}</Typography>
        <form noValidate onSubmit={handleSignup}>
          <Box className="flex-col">
            <Box className={`flex-row ${classes.loginComponent}`}>
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
            <TextField
              id="username"
              name="username"
              type="text"
              label="Username"
              className={classes.loginComponent}
              helperText={errors.username || ""}
              error={Boolean(errors.username)}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              autoComplete="username"
              autoCapitalize="words"
            />
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.loginComponent}
              helperText={errors.email || ""}
              error={Boolean(errors.email)}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              autoComplete="email"
            />
            <Box className={`flex-row ${classes.loginComponent}`}>
              <TextField
                id="password"
                name="password"
                type="password"
                label="Password"
                sx={{ mr: 1 }}
                helperText={errors.password || ""}
                error={Boolean(errors.password)}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                autoComplete="new-password"
              />
              <TextField
                id="confirm-password"
                name="confirm-password"
                type="password"
                label="Confirm Password"
                sx={{ ml: 1 }}
                error={Boolean(errors.confirmPassword)}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                fullWidth
                autoComplete="new-password"
              />
            </Box>
            <Box color="text.secondary">
              <Typography variant="caption" display="block" sx={{ mb: 1 }}>
                Password must have the following:
              </Typography>

              <Box className="flex-row">
                <Box className="flex-col" sx={{ textAlign: "left", mr: 2 }}>
                  <Typography variant="caption" display="block">
                    {<CheckBoxOutlineBlank fontSize="inherit" />} At least 8
                    characters
                  </Typography>
                  <Typography variant="caption" display="block">
                    {<CheckBoxOutlineBlank fontSize="inherit" />} 1 uppercase
                    letter (i.e. A-Z)
                  </Typography>
                  <Typography variant="caption" display="block">
                    {<CheckBoxOutlineBlank fontSize="inherit" />} 1 lowercase
                    letter (i.e. a-z)
                  </Typography>
                </Box>
                <Box className="flex-col" sx={{ textAlign: "left", ml: 2 }}>
                  <Typography variant="caption" display="block">
                    {<CheckBoxOutlineBlank fontSize="inherit" />} 1 digit (i.e.
                    0-9)
                  </Typography>
                  <Typography variant="caption" display="block">
                    {<CheckBoxOutlineBlank fontSize="inherit" />} 1 special
                    character (e.g. ! @ # $ %)
                  </Typography>
                  <Typography variant="caption" display="block">
                    {<CheckBoxOutlineBlank fontSize="inherit" />} Passwords must
                    match
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Typography variant="caption" color="error">
              {errors.general}
            </Typography>
            <Box className={classes.loginComponent}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label={
                    <Typography
                      variant="caption"
                      textAlign="left"
                      color="text.secondary"
                    >
                      I agree to the Terms of Service, Privacy Policy, and
                      Cookies Policy.
                    </Typography>
                  }
                />
              </FormGroup>
            </Box>
            <CustomLoadingButton
              type="submit"
              variant="contained"
              disableElevation
              loading={isLoading}
              sx={{ borderRadius: 25, my: 2, width: 100, mx: "auto" }}
            >
              {t("signUp")}
            </CustomLoadingButton>

            <Link to="/login" className={classes.link}>
              <Box className={classes.linkContainer}>
                <Typography variant="caption" display="block">
                  Already have an account? Log in!
                </Typography>
              </Box>
            </Link>
          </Box>
        </form>
      </Paper>
    </div>
  );
}
