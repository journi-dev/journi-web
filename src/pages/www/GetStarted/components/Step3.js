import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { CustomLoadingButton } from "../../../../components/ui/CustomComponents";
import { useDispatch, useSelector } from "react-redux";
import {
  businessCategories,
  findIndex,
  formatPercentage,
  formatUSD,
  updateArray,
} from "../../../../utils/Helpers";
import { Cancel } from "@mui/icons-material";
import {
  setErrors,
  setIsLoading,
  setIsStep3Complete,
  setLocationCount,
  setOrgName,
  setOrgSize,
  setSelectedCategories,
} from "../../../../context/features/GetStarted";
import { useEffect } from "react";
import axios from "axios";
import { PRICE_INFO } from "../../../../utils/PriceInfo";
import { format } from "date-fns";

export const Step3 = ({ disabled, updateStep, nextStep }) => {
  const dispatch = useDispatch();

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

  const isLoading = useSelector((state) => state.user.isLoading);
  const isDark = useSelector((state) => state.appearance.isDark);

  const orgSizes = [
    "1-5 employees",
    "6-10 employees",
    "11-25 employees",
    "26-50 employees",
    "51+ employees",
  ];

  const isStep3Complete =
    orgName !== "" && orgSize !== "" && selectedCategories.length > 0;

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
        PRICE_INFO.get(plan).discountMinMonthlyCharge
      ),
      discountRate: formatPercentage(PRICE_INFO.get(plan).discountRate),
      standardMinMonthlyCharge: formatUSD(
        PRICE_INFO.get(plan).standardMinMonthlyCharge
      ),
      standardRate: formatPercentage(PRICE_INFO.get(plan).standardRate),
      startupFee: formatUSD(PRICE_INFO.get(plan).startupFee),
      features: PRICE_INFO.get(plan).features,
    };

    axios
      .post("/createLead", data)
      .then(() => {
        dispatch(setIsLoading(false));
        updateStep(nextStep);
      })
      .catch((err) => {
        console.error(err);
        dispatch(setErrors(err.response.data.errors));
        dispatch(setIsLoading(false));
      });
  }

  useEffect(() => {
    dispatch(setIsStep3Complete(isStep3Complete));
  }, [dispatch, isStep3Complete]);

  return (
    <Box sx={{ width: "100%" }}>
      {/* Container to hide elements if the user is not on that step. */}
      {!disabled && (
        <Box className="flex-col" sx={{ p: 2, gap: 2 }}>
          {/* Label */}
          <Typography variant="h5" component="h3" sx={{ mb: 2 }}>
            Last, tell us about your business.
          </Typography>
          {/* Company Name and Size */}
          <Box className="flex-row" sx={{ gap: 2 }}>
            <TextField
              id="organization"
              name="organization"
              type="text"
              label="Company Name"
              value={orgName}
              onChange={(e) => dispatch(setOrgName(e.target.value))}
              fullWidth
              autoComplete="organization"
              autoCapitalize="words"
              required
              disabled={disabled}
            />
            <FormControl fullWidth required disabled={disabled}>
              <InputLabel id="org-size-label">Company Size</InputLabel>
              <Select
                labelId="org-size-label"
                id="org-size"
                value={orgSize}
                label="Company Size"
                onChange={(e) => dispatch(setOrgSize(e.target.value))}
              >
                {orgSizes.map((range) => (
                  <MenuItem key={range} value={range}>
                    {range}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          {/* Company Type */}
          <Box
            className="flex-row-space"
            sx={{ gap: 2, alignItems: "flex-start" }}
          >
            <Typography sx={{ width: "50%" }}>
              Select all categories that best describe your company.
            </Typography>
            <FormControl required disabled={disabled} sx={{ width: "50%" }}>
              <InputLabel id="business-category-dropdown-label">
                Categories
              </InputLabel>
              <Select
                labelId="business-category-dropdown-label"
                multiple
                value={selectedCategories}
                onChange={(e) => {
                  const val =
                    typeof e.target.value === "string"
                      ? e.target.value.split(",")
                      : e.target.value;

                  dispatch(setSelectedCategories(val));
                  if (val.indexOf("Multi-unit restaurant/group") > -1) {
                    dispatch(setLocationCount(2));
                  }
                }}
                input={
                  <OutlinedInput id="select-multiple-chip" label="Categories" />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {selected.map((value) => (
                      <Chip
                        icon={
                          businessCategories[
                            findIndex(businessCategories, "name", value)
                          ].icon
                        }
                        key={value}
                        label={value}
                        clickable
                        size="small"
                        deleteIcon={
                          <Cancel onMouseDown={(e) => e.stopPropagation()} />
                        }
                        onDelete={() => {
                          dispatch(
                            setSelectedCategories(
                              updateArray(selectedCategories, value)
                            )
                          );
                        }}
                      />
                    ))}
                  </Box>
                )}
                // MenuProps={MenuProps}
              >
                {businessCategories.map((category) => (
                  <MenuItem key={category.name} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          {/* Multi-unit Info */}
          {selectedCategories.indexOf("Multi-unit restaurant/group") > -1 && (
            <Box className="flex-col" sx={{ gap: 1 }}>
              {/* Location Count */}
              <Box
                className="flex-row-space"
                sx={{ gap: 2, alignItems: "center" }}
              >
                <Typography>
                  How many locations does your company have?
                </Typography>
                <TextField
                  id="locations"
                  name="locations"
                  type="number"
                  label="Locations"
                  value={locationCount}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    dispatch(
                      setLocationCount(
                        Math.max(
                          selectedCategories.indexOf(
                            "Multi-unit restaurant/group"
                          ) > -1
                            ? 2
                            : 1,
                          val
                        )
                      )
                    );
                  }}
                  required={
                    selectedCategories.indexOf("Multi-unit restaurant/group") >
                    -1
                  }
                  disabled={disabled}
                />
              </Box>
            </Box>
          )}
          <Typography variant="caption" color="text.secondary" width={"100%"}>
            By clicking "Get started", you agree to receive recurring
            advertising emails, text messages and calls from Journi to the phone
            number/email provided above. Consent to receive advertising text
            messages and calls is not required to purchase goods or services. By
            clicking "Get started", you also consent to Journi's Terms and
            Conditions of Use and Privacy Policy.
          </Typography>
          {/* "Get started" button */}
          <Box>
            <CustomLoadingButton
              sx={{ mt: 1 }}
              variant={"contained"}
              color={isDark ? "button" : "secondary"}
              disableElevation
              onClick={handleSubmit}
              disabled={isLoading || !isStep3Complete}
              loading={isLoading}
            >
              <Typography variant="buttonText">
                Get started{!isStep3Complete ? "" : `, ${firstName}.`}
              </Typography>
            </CustomLoadingButton>
          </Box>
        </Box>
      )}
    </Box>
  );
};
