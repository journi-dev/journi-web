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
import { green } from "@mui/material/colors";

const PlanTile = ({ svgArr, index, plan }) => {
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
          <Typography variant="h4">{plan.name}</Typography>
          <Typography variant="caption">{plan.description}</Typography>
        </Box>

        <Typography variant="subtitle1">What you pay...</Typography>
        <Paper variant="outlined">
          <Box className="flex-row-even" textAlign={"center"}>
            <Box className="flex-col" width={"40%"}>
              <Typography variant="h6">${plan.startupFee}</Typography>
              <Typography>setup fee</Typography>
            </Box>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Box className="flex-col" width={"40%"}>
              <Typography variant="h6">{plan.standardRate}% fee</Typography>
              <Typography>on {plan.feeCoverage}</Typography>
            </Box>
          </Box>
        </Paper>

        <Typography variant="subtitle1">What you get...</Typography>

        <List dense={true}>
          {plan.features.map((listItem) => (
            <ListItem disablePadding>
              <ListItemIcon>
                <Check />
              </ListItemIcon>
              <ListItemText primary={listItem} />
            </ListItem>
          ))}
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

export const PlanTileWithBanner = ({
  svgArr,
  index,
  plan,
  isBannerShowing,
}) => {
  return (
    <Paper
      variant="outlined"
      className="flex-col"
      sx={{
        width: "30%",
        borderRadius: 3,
        overflow: "hidden",
        borderColor: isBannerShowing ? green["A400"] : "",
      }}
    >
      {/* Most popular */}
      {isBannerShowing && (
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
      )}
      <PlanTile svgArr={svgArr} index={index} plan={plan} />
    </Paper>
  );
};
