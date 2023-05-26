import { TabTitle } from "../utils/TabTitle";
import { Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { makeStyles } from "tss-react/mui";
import { useTranslation } from "react-i18next";
import { CustomLoadingButton } from "../components/CustomComponents";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../utils/redux/features/User";

const useStyles = makeStyles()((theme) => {
  return {
    root: {
      // display: "flex",
      textAlign: "center",
    },
    marginAutoContainer: {
      width: "100%",
    },
    marginAutoItem: {
      margin: "0 auto",
      // justifyContent: "center",
    },
    textField: {
      margin: "10px auto 10px auto",
    },
  };
});

export default function SignUp() {
  TabTitle("signUp");
  const { classes } = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

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
    dispatch(signUpUser(newUserData, history));
  };

  return (
    <div className={classes.root}>
      <Paper
        className={classes.marginAutoItem}
        sx={{ minWidth: 300, maxWidth: "33%", m: 2 }}
      >
        <Typography variant="h5">{t("signUp")}</Typography>
        <form noValidate onSubmit={handleSignup}>
          <TextField
            id="first-name"
            name="first-name"
            type="text"
            label="First Name"
            className={classes.textField}
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
            className={classes.textField}
            // helperText={errors.email || ""}
            // error={Boolean(errors.email)}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
            autoComplete="family-name"
            autoCapitalize="words"
          />
          <TextField
            id="username"
            name="username"
            type="text"
            label="Username"
            className={classes.textField}
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
            className={classes.textField}
            helperText={errors.email || ""}
            error={Boolean(errors.email)}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            autoComplete="email"
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            className={classes.textField}
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
            className={classes.textField}
            helperText={
              <div>
                <Typography variant="caption" display="block">
                  Password must contain:
                </Typography>
                <Typography variant="caption" display="block">
                  - At least 8 characters
                </Typography>
                <Typography variant="caption" display="block">
                  - 1 uppercase letter (i.e. A-Z)
                </Typography>
                <Typography variant="caption" display="block">
                  - 1 lowercase letter (i.e. a-z)
                </Typography>
                <Typography variant="caption" display="block">
                  - 1 digit (i.e. 0-9)
                </Typography>
                <Typography variant="caption" display="block">
                  - 1 special character (e.g. ! @ # $ % ^ & * -)
                </Typography>
                <Typography variant="caption" display="block">
                  - {errors.confirmPassword}
                </Typography>
              </div>
            }
            error={Boolean(errors.confirmPassword)}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            autoComplete="new-password"
          />
          <Typography variant="caption" color="error">
            {errors.general}
          </Typography>
          <CustomLoadingButton
            type="submit"
            variant="contained"
            disableElevation
            loading={isLoading}
            sx={{ borderRadius: 25, my: 2 }}
          >
            {t("signUp")}
          </CustomLoadingButton>
          <Link to="/login" sx={{ textDecoration: "none" }}>
            <Typography variant="caption" display="block">
              Already have an account? Click here to log in.
            </Typography>
          </Link>
        </form>
      </Paper>
    </div>
  );
}
