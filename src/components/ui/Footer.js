import {
  Box,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { CustomButton } from "./CustomComponents";
import { BugReport, Code, Favorite } from "@mui/icons-material";
import format from "date-fns/format";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "tss-react/mui";
import { appearances, languages } from "../../utils/UIObjects";
import { useState } from "react";
import { changeAppearance } from "../../context/features/Appearance";
import { setLanguage } from "../../context/features/Language";

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
        sx={{ mt: 1, py: 2, bgcolor: "footer.main" }}
      >
        {/* Footer Menu */}
        <Box className="flex-row" sx={{ mb: 1 }}>
          <CustomButton size="small">
            <Typography variant="caption" color="text.primary">
              {t("termsOfService")}
            </Typography>
          </CustomButton>
          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
          <CustomButton size="small">
            <Typography variant="caption" color="text.primary">
              {t("privacyPolicy")}
            </Typography>
          </CustomButton>
          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
          <CustomButton startIcon={<BugReport color="action" />} size="small">
            <Typography variant="caption" color="text.primary">
              {t("reportABug")}
            </Typography>
          </CustomButton>
          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
          <CustomButton
            onClick={handleClick2}
            size="small"
            startIcon={languages[localStorage.getItem("i18nextLng")].icon}
          >
            <Typography variant="caption" color="text.primary">
              {t("language")}:{" "}
              {t(languages[localStorage.getItem("i18nextLng")].name)}
            </Typography>
          </CustomButton>
          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
          <CustomButton
            onClick={handleClick3}
            size="small"
            startIcon={appearances[appearance].icon}
          >
            <Typography variant="caption" color="text.primary">
              {t("appearance")}: {t(appearance)}
            </Typography>
          </CustomButton>
        </Box>

        {/* Company Details */}
        <Box className="flex-row" sx={{ userSelect: "none", mb: 1 }}>
          <Typography variant="caption" sx={{ mr: 1 }}>
            &#169; {format(new Date(), "yyyy")} Journi R&D
          </Typography>
          {/* <Divider orientation="vertical" flexItem sx={{ mx: 1 }} /> */}
          <Code fontSize="small" sx={{ ml: 1 }} />
          <Typography variant="caption" sx={{ mx: 1 }}>
            {t("with")}
          </Typography>
          <Favorite fontSize="small" />
        </Box>
      </Box>
    </div>
  );
}
