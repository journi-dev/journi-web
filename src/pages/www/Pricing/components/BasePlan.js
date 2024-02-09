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
import { CustomButton } from "../../../../components/ui/CustomComponents";

export const BasePlan = ({ svgArr, index }) => {
  const navigate = useNavigate();
  const isDark = useSelector((state) => state.appearance.isDark);
  const { t } = useTranslation();

  return (
    <Paper
      variant="outlined"
      className="flex-col"
      sx={{
        width: "30%",
        height: "675px",
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      {/* Border */}
      <Box sx={{ bgcolor: "primary.main", width: "100%", height: "10px" }} />

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
          <Typography variant="h4">Base</Typography>
          <Typography variant="caption">
            Keep up with the times while keeping costs low. Serve your patrons
            who already know you.
          </Typography>
        </Box>

        <Typography variant="subtitle1">What you pay...</Typography>
        <Paper variant="outlined">
          <Box className="flex-row-even" textAlign={"center"}>
            <Box className="flex-col" width={"40%"}>
              <Typography variant="h6">$500</Typography>
              <Typography>setup fee</Typography>
            </Box>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Box className="flex-col" width={"40%"}>
              <Typography variant="h6">3% fee</Typography>
              <Typography>on web orders</Typography>
            </Box>
          </Box>
        </Paper>

        <Typography variant="subtitle1">What you get...</Typography>

        <List dense={true}>
          <ListItem disablePadding>
            <ListItemIcon>
              <Check />
            </ListItemIcon>
            <ListItemText primary="A custom-built, fully customizable website." />
          </ListItem>

          <ListItem disablePadding>
            <ListItemIcon>
              <Check />
            </ListItemIcon>
            <ListItemText primary="Full access to Journi's WATSON platform to track orders, patrons, and metrics." />
          </ListItem>

          <ListItem disablePadding>
            <ListItemIcon>
              <Check />
            </ListItemIcon>
            <ListItemText
              primary="A dedicated product manager to assist in managing your business'
            metrics and platform experience."
            />
          </ListItem>

          <ListItem disablePadding>
            <ListItemIcon>
              <Check />
            </ListItemIcon>
            <ListItemText primary="Support for your team Mon-Fri from 9 AM to 6 PM." />
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
    </Paper>
  );
};
