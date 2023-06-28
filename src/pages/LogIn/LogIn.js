import { TabTitle } from "../../utils/TabTitle";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { makeStyles } from "tss-react/mui";
import { useTranslation } from "react-i18next";
import { CustomLoadingButton } from "../../components/ui/CustomComponents";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logInUser } from "../../context/features/User";
import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";

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

export default function LogIn() {
  TabTitle("logIn");
  const { classes } = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLoading = useSelector((state) => state.user.isLoading);
  const errors = useSelector((state) => state.user.errors);

  const handleLogin = (e) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(logInUser(userData, navigate));
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.marginAutoItem} sx={{ width: 500, m: 2, p: 2 }}>
        <Typography variant="h5">{t("logIn")}</Typography>
        <form noValidate onSubmit={handleLogin}>
          <Box className="flex-col">
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.loginComponent}
              helperText={errors.email}
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
              className={classes.loginComponent}
              helperText={errors.password}
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

            <Box className={classes.loginComponent}>
              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Remember me" />
              </FormGroup>
            </Box>

            <CustomLoadingButton
              type="submit"
              variant="contained"
              disableElevation
              loading={isLoading}
              sx={{ borderRadius: 25, mb: 2, width: 100, mx: "auto" }}
            >
              {t("logIn")}
            </CustomLoadingButton>
            <Link to="/signup" className={classes.link}>
              <Box className={classes.linkContainer}>
                <Typography variant="caption" display="block">
                  Don't have an account? Sign up!
                </Typography>
              </Box>
            </Link>
            <Link to="/forgot-password" className={classes.link}>
              <Box className={classes.linkContainer} sx={{ mt: 1 }}>
                <Typography variant="caption" display="block">
                  Forgot password?
                </Typography>
              </Box>
            </Link>
          </Box>
        </form>
      </Paper>
    </div>
  );
}
