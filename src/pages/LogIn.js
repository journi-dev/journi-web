import { TabTitle } from "../utils/TabTitle";
import { Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
// import Auth from "../components/Auth";
import { makeStyles } from "tss-react/mui";
import { useTranslation } from "react-i18next";
import { CustomLoadingButton } from "../components/CustomComponents";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

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

export default function LogIn() {
  TabTitle("logIn");
  const { classes } = useStyles();
  const { t } = useTranslation();
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      const userData = {
        email,
        password,
      };
      axios
        .post("/login", userData)
        .then((response) => {
          console.log(response);
          localStorage.setItem("FBIdToken", `Bearer ${response.data.token}`);
          setIsLoading(false);
          if (response.data.token) {
            history.push("/");
          }
        })
        .catch((err) => {
          console.error(err);
          setErrors(err.response.data.errors);
          setIsLoading(false);
        });
    } catch (err) {
      console.error(err);
    }
    // }
  };

  return (
    <div className={classes.root}>
      <Paper
        className={classes.marginAutoItem}
        sx={{ minWidth: 300, maxWidth: "33%", m: 2 }}
      >
        <Typography variant="h5">{t("logIn")}</Typography>
        <form noValidate onSubmit={handleLogin}>
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
            autoCapitalize="off"
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
            autoComplete="current-password"
            autoCapitalize="off"
          />
          <Typography variant="caption" color="error">
            {errors.credentials}
          </Typography>
          <CustomLoadingButton
            type="submit"
            variant="contained"
            disableElevation
            loading={isLoading}
            sx={{ borderRadius: 25, my: 2 }}
          >
            {t("logIn")}
          </CustomLoadingButton>
          <Link to="/signup" sx={{ textDecoration: "none" }}>
            <Typography variant="caption" display="block">
              Don't have an account? Click here to sign up.
            </Typography>
          </Link>
        </form>
      </Paper>
    </div>
  );
}
