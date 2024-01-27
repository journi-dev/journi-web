import { Box, ButtonBase, IconButton, Typography } from "@mui/material";
import { JourniTabTitle } from "../../utils/JourniTabTitle";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useState } from "react";
import { Step1 } from "./components/Step1";
import { Step2 } from "./components/Step2";
import { Step3 } from "./components/Step3";
import Carousel from "./components/Carousel";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Step4 } from "./components/Step4";
import { format } from "date-fns";
import { formatPercentage, formatUSD } from "../../utils/Helpers";
import { priceInfo } from "../../utils/PriceInfo";
import axios from "axios";
import { setErrors, setIsLoading } from "../../context/features/GetStarted";

export default function GetStarted() {
  JourniTabTitle("getStarted");

  const dispatch = useDispatch();
  const [step, setStep] = useState(0);
  const updateStep = (nextStep) => {
    if (nextStep < 0) nextStep = 0;
    else if (nextStep > steps.length - 1) nextStep = steps.length - 1;
    setStep(nextStep);
  };

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
  const isLoading = useSelector((state) => state.getStarted.isLoading);

  const isStep2Complete = useSelector(
    (state) => state.getStarted.isStep2Complete
  );

  const isStep3Complete = useSelector(
    (state) => state.getStarted.isStep3Complete
  );

  const steps = [
    {
      component: <Step1 disabled={step !== 0} />,
      icon: require("../../assets/images/svg/getting-started-step-1.svg"),
      alt: "",
      height: 300,
      disabled: false,
    },
    {
      component: <Step2 disabled={step !== 1} />,
      icon: require("../../assets/images/svg/getting-started-step-2.svg"),
      alt: "",
      height: 300,
      disabled: !isStep1Complete,
    },
    {
      component: (
        <Step3 disabled={step !== 2} updateStep={updateStep} nextStep={3} />
      ),
      icon: require("../../assets/images/svg/getting-started-step-3.svg"),
      alt: "",
      height: 400,
      disabled: !isStep1Complete || !isStep2Complete,
    },
    {
      component: <Step4 disabled={step !== 3} />,
      icon: require("../../assets/images/svg/getting-started-step-4.svg"),
      alt: "",
      height: 400,
      disabled: !isStep1Complete || !isStep2Complete || !isStep3Complete,
    },
  ];

  const firstName = useSelector((state) => state.getStarted.firstName);
  const lastName = useSelector((state) => state.getStarted.lastName);
  const phone = useSelector((state) => state.getStarted.phone);
  const email = useSelector((state) => state.getStarted.email);
  const jobTitle = useSelector((state) => state.getStarted.jobTitle);
  const leadSource = useSelector((state) => state.getStarted.leadSource);

  const selectedPlatforms = useSelector(
    (state) => state.getStarted.selectedPlatforms
  );
  const hasApp = useSelector((state) => state.getStarted.hasApp);
  const hasWeb = useSelector((state) => state.getStarted.hasWeb);
  const isRequestingMarketing = useSelector(
    (state) => state.getStarted.isRequestingMarketing
  );

  const orgName = useSelector((state) => state.getStarted.orgName);
  const orgSize = useSelector((state) => state.getStarted.orgSize);
  const selectedCategories = useSelector(
    (state) => state.getStarted.selectedCategories
  );
  const locationCount = useSelector((state) => state.getStarted.locationCount);
  const plan =
    isRequestingMarketing === "Yes"
      ? "Max"
      : selectedPlatforms.indexOf("App") > -1
      ? "Plus"
      : "Base";

  function handleSubmit() {
    dispatch(setIsLoading(true));

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const endOfThisMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    );
    const endOfNextMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    );
    const msToDays = (num) => num / (1000 * 60 * 60 * 24);
    const daysUntilEOM = msToDays(endOfThisMonth - today);

    const data = {
      firstName,
      lastName,
      phone,
      email,
      jobTitle,
      leadSource,
      selectedPlatforms,
      hasApp,
      hasWeb,
      isRequestingMarketing,
      orgName,
      orgSize,
      selectedCategories,
      locationCount,
      plan,
      deadline:
        daysUntilEOM >= 7
          ? format(endOfThisMonth, "MMMM d, yyyy")
          : format(endOfNextMonth, "MMMM d, yyyy"),
      discountMinMonthlyCharge: formatUSD(
        priceInfo.get(plan).discountMinMonthlyCharge
      ),
      discountRate: formatPercentage(priceInfo.get(plan).discountRate),
      standardMinMonthlyCharge: formatUSD(
        priceInfo.get(plan).standardMinMonthlyCharge
      ),
      standardRate: formatPercentage(priceInfo.get(plan).standardRate),
      startupFee: formatUSD(priceInfo.get(plan).startupFee),
      features: priceInfo.get(plan).features,
    };

    axios
      .post("/createLead", data)
      .then(() => {
        dispatch(setIsLoading(false));
        updateStep(3);
      })
      .catch((err) => {
        console.error(err);
        dispatch(setErrors(err.response.data.errors));
        dispatch(setIsLoading(false));
      });
  }

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
                disabled={isLoading}
              >
                <ChevronLeft fontSize="inherit" />
              </IconButton>
            </Box>

            {/* Indicators */}
            <Box className="flex-row" gap={1}>
              {steps.map((el, i) => (
                <ButtonBase
                  key={i}
                  onClick={() => {
                    scrollToSection(carousel);
                    if (i === steps.length - 1) handleSubmit();
                    else updateStep(i);
                  }}
                  disabled={isLoading || el.disabled}
                >
                  <Box
                    sx={{
                      width: i === step ? 25 : 7,
                      height: 7,
                      bgcolor: el.disabled ? "text.secondary" : "button.main",
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
                  if (step === steps.length - 2) handleSubmit();
                  else updateStep(step + 1);
                }}
                disabled={
                  isLoading ||
                  (step === 0
                    ? !isStep1Complete
                    : step === 1
                    ? !isStep1Complete || !isStep2Complete
                    : step === 2
                    ? !isStep1Complete || !isStep2Complete || !isStep3Complete
                    : false)
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
