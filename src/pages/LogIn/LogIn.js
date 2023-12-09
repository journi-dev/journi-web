import { JourniTabTitle } from "../../utils/JourniTabTitle";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { makeStyles } from "tss-react/mui";
import { useTranslation } from "react-i18next";
import {
  CustomButton,
  CustomLoadingButton,
} from "../../components/ui/CustomComponents";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  logInWithEmail,
  setAuthenticated,
  setAuthorizationHeader,
  setErrors,
  setIsLoading,
} from "../../context/features/User";
import { Box, Divider } from "@mui/material";
import GoogleLogo from "../../components/icons/Google";
import { auth, googleProvider } from "../../utils/Firebase";
import { signInWithPopup } from "firebase/auth";
import MicrosoftLogo from "../../components/icons/Microsoft";

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
  JourniTabTitle("logIn");
  const { classes } = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/home";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLoading = useSelector((state) => state.user.isLoading);
  const errors = useSelector((state) => state.user.errors);

  const handleEmailLogin = (e) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(logInWithEmail(userData, navigate, from));
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();

    dispatch(setIsLoading(true));

    await signInWithPopup(auth, googleProvider)
      .then((data) => {
        return data.user.getIdToken();
      })
      .then((token) => {
        setAuthorizationHeader(token);
        dispatch(setIsLoading(false));
        dispatch(setAuthenticated(true));
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.error(err);
        dispatch(setErrors(err));
        dispatch(setIsLoading(false));
      });
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.marginAutoItem} sx={{ width: 500, m: 2, p: 2 }}>
        <Typography variant="h5" sx={{ my: 2 }}>
          {t("logIn")}
        </Typography>
        <form noValidate onSubmit={handleEmailLogin}>
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

            <CustomLoadingButton
              type="submit"
              variant="contained"
              disableElevation
              loading={isLoading}
              sx={{ borderRadius: 25, my: 2, width: 100, mx: "auto" }}
              disabled={email === "" || password === ""}
            >
              {t("logIn")}
            </CustomLoadingButton>

            <Divider>
              <Typography>or</Typography>
            </Divider>
            <Box className="flex-row" sx={{ my: 2 }}>
              <CustomButton
                onClick={handleGoogleLogin}
                sx={{
                  bgcolor: "background.default",
                  color: "text.primary",
                  mr: 1,
                  py: 1,
                  px: 2,
                }}
                startIcon={<GoogleLogo />}
              >
                Sign in with Google
              </CustomButton>

              <CustomButton
                // onClick={handleGoogleLogin}
                sx={{
                  bgcolor: "background.default",
                  color: "text.primary",
                  ml: 1,
                  py: 1,
                  px: 2,
                }}
                startIcon={<MicrosoftLogo />}
              >
                Sign in with Microsoft
              </CustomButton>
            </Box>
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
