import {
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { CustomButton } from "./CustomComponents";
import {
  Accessibility,
  Cookie,
  Facebook,
  Gavel,
  Instagram,
  KeyboardArrowDown,
  LinkedIn,
  Policy,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import format from "date-fns/format";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "tss-react/mui";
import { appearances, languages } from "../../utils/UIObjects";
import { useState } from "react";
import { changeAppearance } from "../../context/features/Appearance";
import { setLanguage } from "../../context/features/Language";
import { Image } from "mui-image";

const footerHeight = 100;

const useStyles = makeStyles()(() => {
  return {
    footer: {
      width: "100%",
      display: "flex",
      flex: `0 1 ${footerHeight}px`,
      flexDirection: "column",
      justifyContent: "center",
    },
    footerButton: {
      padding: 0,
      margin: 0,
    },
    uiButton: {
      paddingLeft: 10,
      paddingRight: 10,
    },
    imgContainer: {
      objectFit: "contain",
    },
    img: {
      maxWidth: "100%",
    },
  };
});

export default function Footer() {
  const { classes } = useStyles();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const appearance = useSelector((state) => state.appearance.mode);

  const [anchorEl2, setAnchorEl2] = useState(null);
  const [anchorEl3, setAnchorEl3] = useState(null);

  const handleClick2 = (e) => {
    setAnchorEl2(e.currentTarget);
  };

  const handleClick3 = (e) => {
    setAnchorEl3(e.currentTarget);
  };

  const handleClose2 = (e) => {
    setAnchorEl2(null);
  };

  const handleClose3 = (e) => {
    setAnchorEl3(null);
  };

  return (
    <div>
      {/* Language Menu */}
      <Menu
        anchorEl={anchorEl2}
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        onClick={handleClose2}
        PaperProps={{
          elevation: 0,
          sx: {
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {Object.keys(languages).map((lang) => (
          <MenuItem
            dense
            key={languages[lang].name}
            sx={{
              fontWeight:
                i18n.resolvedLanguage === lang.code ? "bold" : "normal",
            }}
            type="submit"
            onClick={() => {
              i18n.changeLanguage(languages[lang].code);
              handleClose2();
              dispatch(setLanguage(languages[lang].code));
            }}
          >
            <ListItemIcon>{languages[lang].icon}</ListItemIcon>
            {t(languages[lang].name)}
          </MenuItem>
        ))}
      </Menu>

      {/* Appearance Menu */}
      <Menu
        anchorEl={anchorEl3}
        open={Boolean(anchorEl3)}
        onClose={handleClose3}
        onClick={handleClose3}
        PaperProps={{
          elevation: 0,
          sx: {
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {Object.keys(appearances).map((mode) => (
          <MenuItem
            dense
            key={appearances[mode].name}
            type="submit"
            onClick={() => {
              const newAppearance = appearances[mode].name;
              dispatch(changeAppearance(newAppearance));
              localStorage.setItem("Appearance", JSON.stringify(newAppearance));
              handleClose3();
            }}
          >
            <ListItemIcon>{appearances[mode].icon}</ListItemIcon>
            {t(appearances[mode].name)}
          </MenuItem>
        ))}
      </Menu>

      {/* Footer */}
      <Box
        className={classes.footer}
        elevation={0}
        sx={{ px: 5, pt: 3, pb: 5, bgcolor: "footer.main", gap: 1 }}
      >
        <Box className="flex-row-space" sx={{ alignItems: "flex-start" }}>
          {/* Menus & Company Details */}
          <Box className="flex-col" gap={1.5}>
            {/* UI Menu */}
            <Box className="flex-row-start" gap={1}>
              <CustomButton
                variant="contained"
                color="button"
                disableElevation
                onClick={handleClick2}
                size="small"
                startIcon={languages[localStorage.getItem("i18nextLng")].icon}
                endIcon={<KeyboardArrowDown color="buttonTextColor" />}
                className={classes.uiButton}
              >
                <Typography variant="buttonText">
                  {t("language")}:{" "}
                  {t(languages[localStorage.getItem("i18nextLng")].name)}
                </Typography>
              </CustomButton>
              <CustomButton
                variant="contained"
                color="button"
                disableElevation
                onClick={handleClick3}
                size="small"
                startIcon={appearances[appearance].icon}
                endIcon={<KeyboardArrowDown color="buttonTextColor" />}
                className={classes.uiButton}
              >
                <Typography variant="buttonText">
                  {t("appearance")}: {t(appearance)}
                </Typography>
              </CustomButton>
            </Box>

            {/* Company Details */}
            <Box className="flex-row-start" sx={{ userSelect: "none", gap: 3 }}>
              <Typography fontSize={14} fontWeight="bold">
                &#169; {format(new Date(), "yyyy")} Journi R&D LLC. All Rights
                Reserved.
              </Typography>
            </Box>

            {/* Footer Menu */}
            <Box className="flex-row-start" sx={{ mb: 1 }}>
              <CustomButton
                startIcon={<Gavel color="action" />}
                size="small"
                className={classes.footerButton}
              >
                <Typography variant="caption" color="text.primary">
                  Legal
                </Typography>
              </CustomButton>
              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
              <CustomButton
                startIcon={<Policy color="action" />}
                size="small"
                className={classes.footerButton}
              >
                <Typography variant="caption" color="text.primary">
                  Trust & Privacy
                </Typography>
              </CustomButton>
              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
              <CustomButton
                startIcon={<Cookie color="action" />}
                size="small"
                className={classes.footerButton}
              >
                <Typography variant="caption" color="text.primary">
                  Cookie Preferences
                </Typography>
              </CustomButton>
              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
              <CustomButton
                startIcon={<Accessibility color="action" />}
                size="small"
                className={classes.footerButton}
              >
                <Typography variant="caption" color="text.primary">
                  Accessibility
                </Typography>
              </CustomButton>
            </Box>
          </Box>

          {/* Badges */}
          <Box className="flex-row" gap={5}>
            {/* App Store Badge */}
            <Box className="imgContainer">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/journi-dev.appspot.com/o/projectFiles%2Fapp-store-badge.png?alt=media&token=1717a95c-0de5-4232-8236-df891f76a8c3"
                className={classes.img}
                shift="top"
                distance={footerHeight * 2}
                height={40}
              />
            </Box>
            {/* Google Play Store Badge */}
            <Box className="imgContainer">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/journi-dev.appspot.com/o/projectFiles%2Fgoogle-play-badge.png?alt=media&token=f0befc11-0bc4-42a9-8019-5140bc6cf14b"
                className={classes.img}
                shift="top"
                distance={footerHeight * 2}
                height={40}
              />
            </Box>
          </Box>

          {/* Platforms */}
          <Box className="flex-row" gap={1}>
            <Box>
              <IconButton size="large">
                <Facebook fontSize="inherit" />
              </IconButton>
            </Box>

            <Box>
              <IconButton size="large">
                <Instagram fontSize="inherit" />
              </IconButton>
            </Box>

            <Box>
              <IconButton size="large">
                <Twitter fontSize="inherit" />
              </IconButton>
            </Box>

            <Box>
              <IconButton size="large">
                <YouTube fontSize="inherit" />
              </IconButton>
            </Box>

            <Box>
              <IconButton size="large">
                <LinkedIn fontSize="inherit" />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
