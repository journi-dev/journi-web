import { Box, ButtonBase, IconButton, Typography } from "@mui/material";
import { JourniTabTitle } from "../../utils/JourniTabTitle";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useState } from "react";
import { Step1 } from "./components/Step1";
import { Step2 } from "./components/Step2";
import { Step3 } from "./components/Step3";
import Carousel from "./components/Carousel";
import { useRef } from "react";

export default function GetStarted() {
  JourniTabTitle("getStarted");

  const [step, setStep] = useState(0);
  const updateStep = (nextStep) => {
    if (nextStep < 0) nextStep = 0;
    else if (nextStep > steps.length - 1) nextStep = steps.length - 1;
    setStep(nextStep);
  };
  const steps = [
    {
      component: <Step1 disabled={step !== 0} />,
      icon: require("../../assets/images/svg/getting-started-step-1.svg"),
      alt: "",
      height: 300,
    },
    {
      component: <Step2 disabled={step !== 1} />,
      icon: require("../../assets/images/svg/getting-started-step-2.svg"),
      alt: "",
      height: 300,
    },
    {
      component: <Step3 disabled={step !== 2} />,
      icon: require("../../assets/images/svg/getting-started-step-3.svg"),
      alt: "",
      height: 600,
      // height: 400,
    },
  ];
  const carousel = useRef(null);
  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop - 85,
      behavior: "smooth",
    });
  };

  // const cannotAddUser =
  //   firstName === "" ||
  //   lastName === "" ||
  //   loadEmails ||
  //   !isValidEmail ||
  //   org === "" ||
  //   jobTitle === "" ||
  //   isLoading;

  return (
    <Box className="flex-col" p={5}>
      <Typography variant="h1">Let's get started.</Typography>
      <Typography variant="h4" component="h2" sx={{ my: 2 }}>
        Complete 3 steps in 3 minutes.
      </Typography>

      <Box className="flex-row" sx={{ gap: 5, alignItems: "center" }}>
        <Box
          className="flex-col"
          sx={{ width: "50%", height: "100%", alignItems: "center", gap: 2 }}
        >
          {/* Carousel */}
          <div ref={carousel} style={{ width: "100%" }}>
            <Carousel steps={steps} step={step} />
          </div>

          {/* Buttons */}
          <Box
            className="flex-row-space"
            sx={{ width: "100%", height: "10%", alignItems: "center" }}
          >
            {/* Left Arrow */}
            <Box>
              <IconButton
                onClick={() => {
                  scrollToSection(carousel);
                  updateStep(step - 1);
                }}
              >
                <ChevronLeft fontSize="inherit" />
              </IconButton>
            </Box>

            {/* Indicators */}
            <Box className="flex-row" gap={1}>
              {steps.map((_, i) => (
                <ButtonBase
                  key={i}
                  onClick={() => {
                    scrollToSection(carousel);
                    updateStep(i);
                  }}
                >
                  <Box
                    sx={{
                      width: i === step ? 25 : 7,
                      height: 7,
                      bgcolor: "button.main",
                      borderRadius: 10,
                      transition: "width 0.5s",
                    }}
                  />
                </ButtonBase>
              ))}
            </Box>

            {/* Right Arrow */}
            <Box>
              <IconButton
                onClick={() => {
                  scrollToSection(carousel);
                  updateStep(step + 1);
                }}
              >
                <ChevronRight fontSize="inherit" />
              </IconButton>
            </Box>
          </Box>
        </Box>

        <img
          src={steps[step].icon.default}
          alt={steps[step].alt}
          style={{
            width: "50%",
            height: `${steps[step].height}px`,
            objectFit: "contain",
            userSelect: "none",
            transition: "height 0.5s ease-in-out",
          }}
        />
      </Box>
    </Box>
  );
}
