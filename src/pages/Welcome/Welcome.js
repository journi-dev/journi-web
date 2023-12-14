import React from "react";
import { JourniTabTitle } from "../../utils/JourniTabTitle";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Typography,
} from "@mui/material";
import Lottie from "lottie-react";
import animationData from "../../assets/motion-graphics/25992-hand-scrolls-the-messages-on-the-phone.json";
import { CustomButton } from "../../components/ui/CustomComponents";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ExpandMore } from "@mui/icons-material";
import AnimatedNumber from "react-animated-numbers";

export default function Welcome() {
  JourniTabTitle("Welcome");

  const navigate = useNavigate();
  const { t } = useTranslation();
  const isDark = useSelector((state) => state.appearance.isDark);
  const accordions = [
    "💰 More sales",
    "🗣️ More reach",
    "🕹️ More control",
    "🤝 More support",
    "🧠 Less work",
  ];

  return (
    <Box className="flex-col">
      <Box
        className="flex-row"
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
            <CustomButton
              variant={"contained"}
              color={isDark ? "button" : "secondary"}
              disableElevation
              onClick={() => navigate("/demo")}
            >
              <Typography variant="buttonText" fontSize={20} sx={{ mx: 2 }}>
                {t("getStarted")}
              </Typography>
            </CustomButton>
          </Box>
        </Box>

        <Lottie animationData={animationData} />
      </Box>

      <Typography variant="h4" sx={{ m: "0 auto" }}>
        What can Journi do?
      </Typography>

      <Box className="flex-row-space" sx={{ width: "80%", m: "0 auto" }}>
        <Box className="flex-col">
          <Typography
            fontSize={72}
            fontWeight="bold"
            display="inline-flex"
            gap={1}
            mb={-1}
          >
            +
            <AnimatedNumber
              includeComma
              animateToNumber={123}
              transitions={(index) => ({
                type: "spring",
                duration: index + 0.3,
              })}
              fontStyle={{
                fontFamily: "'avenir_nextbold', 'Arial', 'sans-serif'",
                fontSize: 72,
              }}
            />
            %
          </Typography>
          <Typography fontWeight="bold" m="0 auto">
            increase in reach, year over year
          </Typography>
        </Box>
        <Box className="flex-col">
          <Typography
            fontSize={72}
            fontWeight="bold"
            display="inline-flex"
            gap={1}
            mb={-1}
          >
            +
            <AnimatedNumber
              includeComma
              animateToNumber={123}
              transitions={(index) => ({
                type: "spring",
                duration: index + 0.3,
              })}
              fontStyle={{
                fontFamily: "'avenir_nextbold', 'Arial', 'sans-serif'",
                fontSize: 72,
              }}
            />
            %
          </Typography>
          <Typography fontWeight="bold" m="0 auto">
            increase in reach, year over year
          </Typography>
        </Box>
        <Box className="flex-col">
          <Typography
            fontSize={72}
            fontWeight="bold"
            display="inline-flex"
            gap={1}
            mb={-1}
          >
            +
            <AnimatedNumber
              includeComma
              animateToNumber={123}
              transitions={(index) => ({
                type: "spring",
                duration: index + 0.3,
              })}
              fontStyle={{
                fontFamily: "'avenir_nextbold', 'Arial', 'sans-serif'",
                fontSize: 72,
              }}
            />
            %
          </Typography>
          <Typography fontWeight="bold" m="0 auto">
            increase in reach, year over year
          </Typography>
        </Box>
      </Box>

      <Typography variant="h4" sx={{ margin: "0 auto" }}>
        Why use Journi?
      </Typography>

      {/* Accordion */}
      <Box width="50%" sx={{ mt: 2 }}>
        <Divider />
        {accordions.map((accordion, i) => (
          <Accordion
            key={i}
            elevation={0}
            sx={{ bgcolor: "background.default" }}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h5">{accordion}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
        <Divider />
      </Box>

      <Typography variant="h4" sx={{ margin: "0 auto" }}>
        Brands that trust Journi
      </Typography>
      <Typography>North Side Notables</Typography>
      <Typography>East Side Excellence</Typography>
      <Typography>West Side Wonders</Typography>
      <Typography>South Side Staples</Typography>
      <Typography variant="h4" sx={{ margin: "0 auto" }}>
        What people are saying about Journi
      </Typography>
    </Box>
  );
}
