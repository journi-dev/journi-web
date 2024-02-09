import { Check } from "@mui/icons-material";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../../components/ui/CustomComponents";
import { green } from "@mui/material/colors";

export const PlanTile = ({ svgArr, index }) => {
  const navigate = useNavigate();
  const isDark = useSelector((state) => state.appearance.isDark);
  const { t } = useTranslation();

  return (
    <Box className="flex-col" sx={{ height: "675px" }}>
      {/* Border */}
      <Box
        sx={{
          bgcolor: "primary.main",
          width: "100%",
          height: "10px",
          opacity: 0,
        }}
      />

      {/* Content */}
      <Box className="flex-col-start" sx={{ p: 2, gap: 1, height: "640px" }}>
        {/* Image */}
        <Box
          className="flex-row"
          sx={{ width: "100%", justifyContent: "center" }}
        >
          <img
            src={svgArr[index].default}
            alt=""
            style={{
              height: "150px",
              objectFit: "contain",
              userSelect: "none",
              margin: "0 auto",
            }}
          />
        </Box>

        {/* Name & Description */}
        <Box className="flex-col">
          <Typography variant="h4">Plus</Typography>
          <Typography variant="caption">
            All the basics, plus a little more. Expand your patron base with
            higher discoverability and more digital mediums.
          </Typography>
        </Box>

        <Typography variant="subtitle1">What you pay...</Typography>
        <Paper variant="outlined">
          <Box className="flex-row-even" textAlign={"center"}>
            <Box className="flex-col" width={"40%"}>
              <Typography variant="h6">$750</Typography>
              <Typography>setup fee</Typography>
            </Box>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Box className="flex-col" width={"40%"}>
              <Typography variant="h6">5% fee</Typography>
              <Typography>on app & web orders</Typography>
            </Box>
          </Box>
        </Paper>

        <Typography variant="subtitle1">What you also get...</Typography>

        <List dense={true}>
          <ListItem disablePadding>
            <ListItemIcon>
              <Check />
            </ListItemIcon>
            <ListItemText primary="A custom-built, companion iOS and Android app, also with full content customization." />
          </ListItem>

          <ListItem disablePadding>
            <ListItemIcon>
              <Check />
            </ListItemIcon>
            <ListItemText primary="Integrations with other business and social media platforms to manage your business storefront and social presence, all from one place." />
          </ListItem>

          <ListItem disablePadding>
            <ListItemIcon>
              <Check />
            </ListItemIcon>
            <ListItemText primary="Support for both your team and your patrons during your business hours." />
          </ListItem>
        </List>
      </Box>

      {/* "Get started" button */}
      <Box
        className="flex-row"
        sx={{ width: "100%", justifyContent: "center", mb: 3 }}
      >
        <CustomButton
          variant={"contained"}
          color={isDark ? "button" : "secondary"}
          disableElevation
          onClick={() => navigate("/getting-started")}
        >
          <Typography variant="buttonText">{t("getStarted")}</Typography>
        </CustomButton>
      </Box>
    </Box>
  );
};

export const PlanTileWithBanner = ({ svgArr, index = 1 }) => {
  return (
    <Paper
      variant="outlined"
      className="flex-col"
      sx={{
        width: "30%",
        borderRadius: 3,
        overflow: "hidden",
        borderColor: green["A400"],
      }}
    >
      {/* Most popular */}
      <Box sx={{ bgcolor: green["A400"], height: "40px" }}>
        <Typography
          variant="subtitle1"
          sx={{
            py: 1,
            textAlign: "center",
            color: "black",
          }}
        >
          Most popular
        </Typography>
      </Box>
      <PlusPlan svgArr={svgArr} index={index} />
    </Paper>
  );
};
