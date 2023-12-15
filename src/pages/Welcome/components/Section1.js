import { Box, Typography } from "@mui/material";
import { CustomLargeButton } from "../../../components/ui/CustomComponents";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import animationData from "../../../assets/motion-graphics/25992-hand-scrolls-the-messages-on-the-phone.json";

export default function Section1({ classes }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isDark = useSelector((state) => state.appearance.isDark);

  return (
    <Box
      className={`flex-row ${classes}`}
      sx={{ width: "100%", height: "70vh", alignItems: "center" }}
    >
      <Box className="flex-col">
        {/* Text */}
        <Box>
          <Typography variant="coloredText1" fontSize={50} component="div">
            Build a fully customizable, production-grade{" "}
            <Typography variant="coloredText2" fontSize={50}>
              app
            </Typography>{" "}
            and{" "}
            <Typography variant="coloredText2" fontSize={50}>
              website
            </Typography>{" "}
            for your business.{" "}
            <Typography
              variant="coloredText2"
              fontSize={50}
              display={"inline-block"}
            >
              All with Journi
            </Typography>
            .
          </Typography>
        </Box>
        {/* "Get started" button */}
        <Box sx={{ mt: 2 }}>
          <CustomLargeButton
            variant={"contained"}
            color={isDark ? "button" : "secondary"}
            disableElevation
            onClick={() => navigate("/demo")}
          >
            <Typography variant="buttonText" fontSize={20} sx={{ mx: 2 }}>
              {t("getStarted")}
            </Typography>
          </CustomLargeButton>
        </Box>
      </Box>

      <Lottie animationData={animationData} />
    </Box>
  );
}
