import { Box, ButtonBase, IconButton, Typography } from "@mui/material";
import { JourniTabTitle } from "../../utils/JourniTabTitle";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useState } from "react";
import { Step1 } from "./components/Step1";
import { Step2 } from "./components/Step2";
import { Step3 } from "./components/Step3";
import Carousel from "./components/Carousel";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { Step4 } from "./components/Step4";

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
    {
      component: <Step4 disabled={step !== 3} />,
      icon: require("../../assets/images/svg/getting-started-step-4.svg"),
      alt: "",
      height: 300,
    },
  ];
  const carousel = useRef(null);
  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop - 85,
      behavior: "smooth",
    });
  };

  const isStep1Complete = useSelector(
    (state) => state.getStarted.isStep1Complete
  );

  const isStep2Complete = useSelector(
    (state) => state.getStarted.isStep2Complete
  );

  const isStep3Complete = useSelector(
    (state) => state.getStarted.isStep3Complete
  );

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
                  if (step + 1 === 1 && isStep1Complete) {
                    updateStep(step + 1);
                  } else if (
                    step + 1 === 2 &&
                    isStep1Complete &&
                    isStep2Complete
                  ) {
                    updateStep(step + 1);
                  } else {
                    updateStep(step + 1);
                  }
                }}
                disabled={
                  step === 0
                    ? !isStep1Complete
                    : step === 1
                    ? !isStep1Complete || !isStep2Complete
                    : step === 2
                    ? !isStep1Complete || !isStep2Complete || !isStep3Complete
                    : false
                }
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
