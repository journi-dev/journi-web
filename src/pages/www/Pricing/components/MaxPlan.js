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

export const MaxPlan = ({ svgArr, index }) => {
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
          <Typography variant="h4">Max</Typography>
          <Typography variant="caption">
            Maximum sales, maximum metrics, maximum effort. Get everything that
            Journi has to offer to make your business stand out.
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
              <Typography variant="h6">10% fee</Typography>
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
            <ListItemText primary="A dedicated marketing analyst to assist in maximizing your business' SEO and other marketing KPIs." />
          </ListItem>

          <ListItem disablePadding>
            <ListItemIcon>
              <Check />
            </ListItemIcon>
            <ListItemText primary="For the first 6 months, pay only 5% fees for each month that you don’t get at least 20 orders." />
          </ListItem>

          <ListItem disablePadding>
            <ListItemIcon>
              <Check />
            </ListItemIcon>
            <ListItemText primary="24/7 support for both your team and your patrons." />
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
