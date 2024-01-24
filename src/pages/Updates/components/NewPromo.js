import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  Chip,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  ToggleButton,
  Typography,
} from "@mui/material";
import {
  AttachMoney,
  Close,
  ContentCopy,
  // Done,
  ExpandMore,
  Facebook,
  Google,
  HelpOutline,
  Instagram,
  LinkedIn,
  Percent,
  Publish,
  Save,
  Schedule,
  Twitter,
  Visibility,
} from "@mui/icons-material";
import {
  MobileDatePicker,
  MobileDateTimePicker,
} from "@mui/x-date-pickers-pro";
import { format } from "date-fns";
import { useState } from "react";
import { makeStyles } from "tss-react/mui";
import { useNavigate } from "react-router-dom";
import {
  CustomButton,
  CustomToggleButton,
  CustomToggleButtonGroup,
} from "../../../components/ui/CustomComponents";
import { useTranslation } from "react-i18next";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../../utils/Firebase";
import { formatUSD, updateArray } from "../../../utils/Helpers";

const useStyles = makeStyles()((theme) => {
  return {
    root: {
      display: "flex",
    },
    form: {
      width: "100%",
    },
    toggleButtonGroup: {
      width: 30,
      height: 30,
    },
    singleLineTextField: {
      width: "30ch",
    },
    multiLineTextField: {
      width: "50ch",
    },
    flexCol: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    flexColWithStart: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "start",
    },
    flexRow: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: "15px",
    },
    flexRowWithStart: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "start",
    },
    flexRowWithSpace: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    vAlignToTop: {
      display: "flex",
      alignItems: "start",
    },
    vAlignToCenter: {
      display: "flex",
      alignItems: "center",
    },
    vAlignToBottom: {
      display: "flex",
      alignItems: "end",
    },
    blockRowWithStart: {
      display: "inline-block",
      // justifyContent: 'start',
      verticalAlign: "bottom",
    },
    title: {
      paddingBottom: theme.spacing(2),
    },
    test: {
      border: (note) => {
        if (note.category === "work") return "1px solid red"; // In order to use this properly, do const { classes } = useStyles(note);
      },
    },
  };
});

export default function NewPromo({ onSubmit, onClose }) {
  const [discountUnit, setDiscountUnit] = useState("dollar");
  const [discountType, setDiscountType] = useState("discount");
  const [discountAmt, setDiscountAmt] = useState(0);

  const [promoSummary, setPromoSummary] = useState("Get $0 off your order!");

  const [promoName, setPromoName] = useState("");
  const [promoNameError, setPromoNameError] = useState(false);
  const [promoNameHelperText, setPromoNameHelperText] = useState("");

  const [promoCode, setPromoCode] = useState("");
  const [promoCodeError, setPromoCodeError] = useState(false);
  const [promoCodeHelperText, setPromoCodeHelperText] = useState("");

  const [promoDesc, setPromoDesc] = useState("");
  const [promoDescError, setPromoDescError] = useState(false);
  const [promoDescHelperText, setPromoDescHelperText] = useState("");

  const [promoStartDate, setPromoStartDate] = useState(null);
  const [promoEndDate, setPromoEndDate] = useState(null);

  const [noEndDate, setNoEndDate] = useState(false);
  const [includeTimes, setIncludeTimes] = useState(false);

  const [promoCoverage, setPromoCoverage] = useState("");
  const [menuSelection, setMenuSelection] = useState([]);

  const [promoLimitType, setPromoLimitType] = useState("Unlimited");
  const [promoLimitQty, setPromoLimitQty] = useState(0);
  const [promoLimitUnits, setPromoLimitUnits] = useState("all");
  const [userGroups, setUserGroups] = useState([]);

  const [conditions, setConditions] = useState([]);
  const [orderMin, setOrderMin] = useState("");
  const [orderMax, setOrderMax] = useState("");
  const [buySome, setBuySome] = useState("");
  const [getSome, setGetSome] = useState("");

  const [notifChecks, setNotifChecks] = useState([false, false, false]);
  const [notifContent, setNotifContent] = useState("journi");
  const [socialMedia, setSocialMedia] = useState([]);

  const [enableNotifCustomDateTime, setEnableNotifCustomDateTime] =
    useState(false);
  const [notifCustomDateTime, setNotifCustomDateTime] = useState(null);

  const { classes } = useStyles();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const testCategorySelection = [
    "Dat Donut - Food",
    "Dat Donut - Beverages",
    "Uncle John's - Lunch & Dinner",
    "Uncle John's - Catering",
  ];
  const testItemSelection = [
    "Bacon & Egg Toast",
    "Sausage & Egg Toast",
    "Ham & Egg Toast",
    "Turkey Bacon & Egg Toast",
    "Egg & Cheese Toast",
    "Coffee",
    "Hot Cocoa",
    "Tea",
    "Iced Coffee",
    "White Milk (2%)",
    "Uncle John's Special",
    "Rib Tips",
    "Hot Links",
    "Rib Tips & Hot Link Combo",
    "Chicken Gizzards",
  ];
  const menuSelectionArr =
    promoCoverage === "Select Categories"
      ? testCategorySelection
      : promoCoverage === "Select Items"
      ? testItemSelection
      : [];
  const testUserGroups = [
    "New users",
    "Users with upcoming birthdays",
    "Essential workers",
    "Employees",
    "Custom user group",
  ];
  const conditionsArr = [
    "Order minimum",
    "Order maximum",
    "Buy some, get some",
  ];

  const promotionsCollectionsRef = collection(
    db,
    "organizations/uncle-johns/promotions"
  );

  // METHODS

  const handlePromoSummary = (
    discountType,
    discountUnit,
    discountAmt,
    promoCode
  ) => {
    setPromoSummary(
      `Get ${
        discountType === "discount"
          ? (discountUnit === "dollar"
              ? formatUSD(discountAmt)
              : discountAmt + "%") + " off your order"
          : "the entire order for " + formatUSD(discountAmt)
      }${promoCode.length >= 3 ? " with the promo code " + promoCode : ""}!`
    );
  };

  const handleDiscountUnit = (event, newDiscountUnit) => {
    setDiscountUnit(newDiscountUnit);
    handlePromoSummary(discountType, newDiscountUnit, discountAmt, promoCode);
  };

  const handleDiscountType = (event, newDiscountType) => {
    setDiscountType(newDiscountType);
    handlePromoSummary(newDiscountType, discountUnit, discountAmt, promoCode);
  };

  const detectSpecialCharacters = (string) => {
    const noSpecialCharString = string.replace(/[^a-zA-Z0-9]/g, "");
    return {
      containsSpecialChars: string.length !== noSpecialCharString.length,
      noSpecialCharLength: noSpecialCharString.length,
    };
  };

  const convertToList = (arr) => {
    let filteredArr = arr.filter((el) => el !== "");
    let result = "";
    for (let i = 0; i < filteredArr.length; i++) {
      let item = filteredArr[i];
      if (item.length !== 0) {
        if (i === filteredArr.length - 1 && filteredArr.length >= 2) {
          result += ` and ${item}`;
        } else {
          result += `${item}${
            i + 1 < filteredArr.length && filteredArr.length > 2 ? ", " : ""
          }`;
        }
      }
    }
    return result;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page from refreshing
    setPromoNameError(false);
    setPromoCodeError(false);
    setPromoDescError(false);
    setPromoNameHelperText("");
    setPromoCodeHelperText("");
    setPromoDescHelperText("");

    const LENGTH_MIN = 3;

    if (promoName === "") {
      setPromoNameError(true);
      setPromoNameHelperText("Please enter a promo name.");
    } else if (promoName.length < LENGTH_MIN) {
      setPromoNameError(true);
      setPromoNameHelperText(
        `Promo names should be at least ${LENGTH_MIN} alphanumeric characters (i.e. A-Z, 0-9).`
      );
    }

    if (promoCode === "") {
      setPromoCodeError(true);
      setPromoCodeHelperText("Please enter a promo code.");
    } else if (detectSpecialCharacters(promoCode).containsSpecialChars) {
      setPromoCodeError(true);
      setPromoCodeHelperText(
        "Promo codes cannot have any spaces or special characters."
      );
    } else if (promoCode.length < LENGTH_MIN) {
      setPromoCodeError(true);
      setPromoCodeHelperText(
        `Promo codes should be at least ${LENGTH_MIN} alphanumeric characters (i.e. A-Z, 0-9).`
      );
    }

    if (promoDesc === "") {
      setPromoDescError(true);
      setPromoDescHelperText("Please enter a promo description.");
    } else if (promoDesc.length < LENGTH_MIN) {
      setPromoDescError(true);
      setPromoDescHelperText(
        `Promo descriptions should be at least ${LENGTH_MIN} alphanumeric characters (i.e. A-Z, 0-9).`
      );
    }

    try {
      await addDoc(promotionsCollectionsRef, {
        promoName,
        promoCode,
        promoDesc,
        createdAt: new Date(),
        userId: auth?.currentUser?.uid,
      });

      // onSubmit();
      onClose();
    } catch (err) {
      console.error(err);
    }
    navigate("/updates");
  };

  // COMPONENTS

  const notifChecksChildren = (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
      <FormGroup>
        <FormControlLabel
          label="Push notification"
          control={
            <Checkbox
              checked={notifChecks[0]}
              onChange={(e) =>
                setNotifChecks([
                  e.target.checked,
                  notifChecks[1],
                  notifChecks[2],
                ])
              }
            />
          }
        />
        <FormControlLabel
          label="Email notification"
          control={
            <Checkbox
              checked={notifChecks[1]}
              onChange={(e) =>
                setNotifChecks([
                  notifChecks[0],
                  e.target.checked,
                  notifChecks[2],
                ])
              }
            />
          }
        />
        <FormControlLabel
          label="Digital & social media"
          control={
            <Checkbox
              checked={notifChecks[2]}
              onChange={(e) => {
                setNotifChecks([
                  notifChecks[0],
                  notifChecks[1],
                  e.target.checked,
                ]);
                if (!e.target.checked) setSocialMedia([]);
              }}
            />
          }
        />
      </FormGroup>
    </Box>
  );

  const promoMenu = (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        border: (theme) => `1px solid ${theme.palette.divider}`,
        flexWrap: "wrap",
        width: 300,
        height: 40,
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      {/* Discount Unit Selection */}
      <CustomToggleButtonGroup
        color="primary"
        size="small"
        value={discountUnit}
        exclusive
        onChange={handleDiscountUnit}
        aria-label="discount-unit"
        sx={{ height: 30 }}
      >
        <ToggleButton value="dollar" aria-label="dollar">
          <AttachMoney />
        </ToggleButton>
        <ToggleButton value="percent" aria-label="percent">
          <Percent />
        </ToggleButton>
      </CustomToggleButtonGroup>

      <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />

      {/* Discount Type Selection */}
      <CustomToggleButtonGroup
        color="primary"
        size="small"
        value={discountType}
        exclusive
        onChange={handleDiscountType}
        aria-label="discount-type"
        sx={{ height: 30 }}
      >
        <CustomToggleButton value="discount" aria-label="discount">
          <Typography>Discount</Typography>
        </CustomToggleButton>
        <CustomToggleButton
          value="subtotal"
          aria-label="subtotal"
          disabled={discountUnit !== "dollar"}
        >
          <Typography>Subtotal</Typography>
        </CustomToggleButton>
      </CustomToggleButtonGroup>
    </Paper>
  );

  const mediaMenu = (
    <Box>
      <Chip
        variant={socialMedia.includes("Google") ? "filled" : "outlined"}
        color={socialMedia.includes("Google") ? "primary" : "default"}
        sx={{ m: 1 }}
        icon={<Google />}
        label="Google"
        clickable
        onClick={() => {
          let newArr = updateArray(socialMedia, "Google");
          setSocialMedia(newArr);
        }}
      />
      <Chip
        variant={socialMedia.includes("Facebook") ? "filled" : "outlined"}
        color={socialMedia.includes("Facebook") ? "primary" : "default"}
        sx={{ m: 1 }}
        icon={<Facebook />}
        label="Facebook"
        clickable
        onClick={() => {
          let newArr = updateArray(socialMedia, "Facebook");
          setSocialMedia(newArr);
        }}
      />
      <Chip
        variant={socialMedia.includes("Twitter") ? "filled" : "outlined"}
        color={socialMedia.includes("Twitter") ? "primary" : "default"}
        sx={{ m: 1 }}
        icon={<Twitter />}
        label="Twitter"
        clickable
        onClick={() => {
          let newArr = updateArray(socialMedia, "Twitter");
          setSocialMedia(newArr);
        }}
      />
      <Chip
        variant={socialMedia.includes("Instagram") ? "filled" : "outlined"}
        color={socialMedia.includes("Instagram") ? "primary" : "default"}
        sx={{ m: 1 }}
        icon={<Instagram />}
        label="Instagram"
        clickable
        onClick={() => {
          let newArr = updateArray(socialMedia, "Instagram");
          setSocialMedia(newArr);
        }}
      />
      <Chip
        variant={socialMedia.includes("LinkedIn") ? "filled" : "outlined"}
        color={socialMedia.includes("LinkedIn") ? "primary" : "default"}
        sx={{ m: 1 }}
        icon={<LinkedIn />}
        label="LinkedIn"
        clickable
        onClick={() => {
          let newArr = updateArray(socialMedia, "LinkedIn");
          setSocialMedia([...newArr]);
        }}
      />
    </Box>
  );

  return (
    <Paper
      elevation={1}
      className={classes.root}
      sx={{
        p: 3,
        width: 800,
        minHeight: "50vh",
        maxHeight: "80vh",
        overflow: "auto",
      }}
    >
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        {/* "New Promo" Row */}
        <Box
          className={`${classes.flexRowWithSpace} ${classes.vAlignToCenter}`}
          // sx={{ mb: 2 }}
        >
          <Typography variant="h5" sx={{ userSelect: "none" }}>
            {t("newPromo")}
          </Typography>

          {promoMenu}

          {/* Discount Amount */}
          <div>
            {/* <Typography
              sx={{ display: "inline-block", verticalAlign: "middle", mr: 1 }}
            >
              Amount:
            </Typography> */}
            <FormControl
              fullWidth
              sx={{
                width: "13ch",
                display: "inline-block",
                verticalAlign: "middle",
              }}
              variant="outlined"
            >
              <OutlinedInput
                type="number"
                startAdornment={
                  discountUnit === "dollar" && (
                    <InputAdornment position="start">$</InputAdornment>
                  )
                }
                endAdornment={
                  discountUnit === "percent" && (
                    <InputAdornment position="end">%</InputAdornment>
                  )
                }
                inputProps={{
                  min: 0,
                  max: discountUnit === "percent" ? 100 : null,
                  sx: { textAlign: "center" },
                }}
                value={discountAmt}
                onChange={(e) => {
                  setDiscountAmt(e.target.value);
                  handlePromoSummary(
                    discountType,
                    discountUnit,
                    e.target.value,
                    promoCode
                  );
                }}
              />
            </FormControl>
          </div>

          <IconButton>
            <Close />
          </IconButton>
        </Box>

        {/* Promo Summary */}
        <Box
          className={`${classes.flexRowWithStart} ${classes.vAlignToCenter}`}
          sx={{ mb: 2 }}
        >
          <Typography>{promoSummary}</Typography>
          {promoSummary.length > 0 && (
            <IconButton
              onClick={() => {
                navigator.clipboard.writeText(promoSummary);
              }}
            >
              <ContentCopy />
            </IconButton>
          )}
        </Box>

        {/* Promo Name, Code, and Description */}
        <div className={classes.flexRow}>
          {/* Promo Name and Code */}
          <Box
            className={classes.flexColWithStart}
            sx={{ width: "40%", mr: 3 }}
          >
            <TextField
              sx={{ mb: 2 }}
              label={t("promoName")}
              variant="outlined"
              placeholder="(e.g. First Order)"
              required
              value={promoName}
              onChange={(e) => setPromoName(e.target.value)}
              error={promoNameError}
              helperText={promoNameHelperText}
            />
            <TextField
              label={t("promoCode")}
              variant="outlined"
              placeholder="(e.g. FIRSTORDER)"
              required
              value={promoCode}
              onChange={(e) => {
                setPromoCode(e.target.value.toUpperCase());
                handlePromoSummary(
                  discountType,
                  discountUnit,
                  discountAmt,
                  e.target.value
                );
              }}
              error={promoCodeError}
              helperText={promoCodeHelperText}
            />
          </Box>

          {/* Promo Description */}
          <TextField
            className={classes.flexColWithStart}
            sx={{ width: "60%" }}
            label={t("promoDesc")}
            variant="outlined"
            rows={4}
            multiline
            placeholder="Get 10% off your first online order."
            required
            value={promoDesc}
            onChange={(e) => setPromoDesc(e.target.value)}
            error={promoDescError}
            helperText={promoDescHelperText}
          />
        </div>

        {/* Promo Date Range and Checkboxes */}
        <div className={classes.flexRow}>
          <Box
            className={classes.flexRowWithSpace}
            sx={{ width: "60%", pr: 5 }}
          >
            {!includeTimes && (
              <MobileDatePicker
                sx={{ mr: 1 }}
                label="Start Date"
                value={promoStartDate}
                onChange={(e) => setPromoStartDate(e)}
              />
            )}
            {!includeTimes && (
              <MobileDatePicker
                disabled={noEndDate}
                sx={{ ml: 1 }}
                label="End Date"
                minDate={promoStartDate}
                value={promoEndDate}
                onChange={(e) => setPromoEndDate(e)}
              />
            )}
            {includeTimes && (
              <MobileDateTimePicker
                sx={{ mr: 1 }}
                label="Start Date"
                value={promoStartDate}
                onChange={(e) => setPromoStartDate(e)}
              />
            )}
            {includeTimes && (
              <MobileDateTimePicker
                disabled={noEndDate}
                sx={{ ml: 1 }}
                label="End Date"
                minDate={promoStartDate}
                value={promoEndDate}
                onChange={(e) => setPromoEndDate(e)}
              />
            )}
          </Box>
          <Box className={classes.flexColWithStart} sx={{ width: "40%" }}>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={noEndDate}
                    onChange={(e) => {
                      setNoEndDate(e.target.checked);
                      setPromoEndDate(null);
                    }}
                  />
                }
                label="No end date"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={includeTimes}
                    onChange={(e) => {
                      setIncludeTimes(e.target.checked);
                      if (promoStartDate && !includeTimes) {
                        promoStartDate.setHours(0, 0, 0);
                      }
                      if (promoEndDate && !includeTimes) {
                        promoEndDate.setHours(0, 0, 0);
                      }
                    }}
                  />
                }
                label="Include times"
              />
            </FormGroup>
          </Box>
        </div>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography>Advanced options</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className={classes.flexRow}>
              {/* Promo Coverage and Menu Item Multi-Select */}
              <Container
                className={classes.flexColWithStart}
                sx={{ width: "50%" }}
              >
                {/* Promo Coverage */}
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Promotion Coverage</InputLabel>
                  <Select
                    value={promoCoverage}
                    label="Promotion Coverage"
                    onChange={(e) => {
                      setPromoCoverage(e.target.value);
                      setMenuSelection([]);
                    }}
                  >
                    <MenuItem value="Full Menu">Full Menu</MenuItem>
                    <MenuItem value="Select Categories">
                      Select Categories
                    </MenuItem>
                    <MenuItem value="Select Items">Select Items</MenuItem>
                  </Select>
                </FormControl>

                {/* Menu Multi-Select */}
                {promoCoverage !== "Full Menu" && promoCoverage !== "" && (
                  <FormControl fullWidth>
                    <InputLabel>Menu Selection</InputLabel>
                    <Select
                      multiple
                      value={menuSelection}
                      disabled={
                        promoCoverage === "Full Menu" || promoCoverage === ""
                      }
                      // On autofill we get a stringified value.
                      onChange={(e) =>
                        setMenuSelection(
                          typeof e.target.value === "string"
                            ? e.target.value.split(",")
                            : e.target.value
                        )
                      }
                      input={<OutlinedInput label="Menu Selection" />}
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                    >
                      {menuSelectionArr.map((item) => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Container>

              {/* Promotion Limit (Type, Qty, Units) */}
              <Container
                className={classes.flexColWithStart}
                sx={{ width: "50%" }}
              >
                {/* Promotion Limit Type */}
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Promo Limit</InputLabel>
                  <Select
                    value={promoLimitType}
                    label="Promo Limit"
                    onChange={(e) => {
                      setPromoLimitType(e.target.value);
                      setPromoLimitUnits("");
                    }}
                  >
                    <MenuItem value="Unlimited">Unlimited</MenuItem>
                    <MenuItem value="Limited">Limited</MenuItem>
                  </Select>
                </FormControl>

                {/* Promotion Limit Qty & Units */}
                <div className={classes.flexRowWithStart}>
                  {/* Promotion Limit Qty */}
                  <FormControl
                    sx={{
                      width: 200,
                      mr: 1,
                      display: "inline-block",
                      verticalAlign: "middle",
                    }}
                    variant="outlined"
                  >
                    <OutlinedInput
                      type="number"
                      endAdornment={
                        <InputAdornment position="end">
                          {promoLimitQty === 1 ? "use" : "uses"}
                        </InputAdornment>
                      }
                      inputProps={{ min: 0, sx: { textAlign: "center" } }}
                      value={promoLimitQty}
                      onChange={(e) => setPromoLimitQty(e.target.value)}
                    />
                  </FormControl>

                  {/* Promo Limit Units */}
                  <FormControl fullWidth sx={{ ml: 1 }}>
                    <InputLabel>Promo Limit</InputLabel>
                    <Select
                      value={promoLimitUnits}
                      label="Promo Limit"
                      onChange={(e) => {
                        setPromoLimitUnits(e.target.value);
                        setUserGroups([]);
                      }}
                    >
                      <MenuItem
                        value="per"
                        disabled={promoLimitType === "Unlimited"}
                      >
                        per user
                      </MenuItem>
                      <MenuItem value="all">for all users</MenuItem>
                      <MenuItem value="specific">for specific users</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </Container>
            </div>

            {/* User Types */}
            {promoLimitUnits === "specific" && (
              <div className={classes.flexRow}>
                <Container sx={{ width: "50%" }}></Container>
                <Container
                  className={classes.flexColWithStart}
                  sx={{ width: "50%" }}
                >
                  <FormControl fullWidth>
                    <InputLabel>User Types</InputLabel>
                    <Select
                      multiple
                      value={userGroups}
                      // On autofill we get a stringified value.
                      onChange={(e) =>
                        setUserGroups(
                          typeof e.target.value === "string"
                            ? e.target.value.split(",")
                            : e.target.value
                        )
                      }
                      input={<OutlinedInput label="User Types" />}
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                    >
                      {testUserGroups.map((group) => (
                        <MenuItem key={group} value={group}>
                          {group}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Container>
              </div>
            )}

            {/* Condition Multi-Select, Order minimum, Order maximum, and "Buy some, get some" */}
            <div className={classes.flexRow}>
              {/* Conditions Multi-Select */}
              <Container
                className={classes.flexColWithStart}
                sx={{ width: "50%" }}
              >
                <FormControl fullWidth>
                  <InputLabel>Conditions</InputLabel>
                  <Select
                    multiple
                    value={conditions}
                    // On autofill we get a stringified value.
                    onChange={(e) =>
                      setConditions(
                        typeof e.target.value === "string"
                          ? e.target.value.split(",")
                          : e.target.value
                      )
                    }
                    input={<OutlinedInput label="Conditions" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                  >
                    {conditionsArr.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Container>

              {/* Order minimum, Order maximum, and "Buy some, get some" */}
              <Container
                className={classes.flexColWithStart}
                sx={{ width: "50%" }}
              >
                {/* Order minimum and maximum */}
                <div className={classes.flexRowWithSpace}>
                  <FormControl
                    fullWidth
                    sx={{
                      width: 150,
                      display: "inline-block",
                      verticalAlign: "middle",
                    }}
                    variant="outlined"
                  >
                    <InputLabel htmlFor="outlined-adornment-amount">
                      Order minimum
                    </InputLabel>
                    <OutlinedInput
                      type="number"
                      id="outlined-adornment-amount"
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      label="Order minimum"
                      inputProps={{ min: 0 }}
                      value={orderMin}
                      onChange={(e) => setOrderMin(e.target.value)}
                    />
                  </FormControl>

                  <FormControl
                    fullWidth
                    sx={{
                      width: 150,
                      display: "inline-block",
                      verticalAlign: "middle",
                    }}
                    variant="outlined"
                  >
                    <InputLabel htmlFor="outlined-adornment-amount">
                      Order maximum
                    </InputLabel>
                    <OutlinedInput
                      type="number"
                      id="outlined-adornment-amount"
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      label="Order maximum"
                      inputProps={{ min: 0 }}
                      value={orderMax}
                      onChange={(e) => setOrderMax(e.target.value)}
                    />
                  </FormControl>
                </div>

                {/* Buy some, get some */}
                <div className={classes.flexColWithStart}>
                  <Box>
                    <Typography className={classes.blockRowWithStart}>
                      Buy
                    </Typography>
                    <TextField
                      className={classes.blockRowWithStart}
                      sx={{ mx: 1, width: 50 }}
                      label="Some"
                      type="number"
                      variant="standard"
                      inputProps={{ min: 0, textAlign: "center" }}
                      value={buySome}
                      onChange={(e) => setBuySome(e.target.value)}
                    />
                    <Typography className={classes.blockRowWithStart}>
                      , get
                    </Typography>
                    <TextField
                      className={classes.blockRowWithStart}
                      sx={{ mx: 1, width: 50 }}
                      label="Some"
                      type="number"
                      variant="standard"
                      inputProps={{ min: 0, textAlign: "center" }}
                      value={getSome}
                      onChange={(e) => setGetSome(e.target.value)}
                    />
                    <Typography className={classes.blockRowWithStart}>
                      for {discountUnit === "dollar" ? "$" : ""}
                      {discountAmt}
                      {discountUnit === "percent" ? "%" : ""} off.
                    </Typography>
                  </Box>
                </div>
              </Container>
            </div>

            <Divider variant="middle" sx={{ my: 3, borderStyle: "dashed" }} />

            {/* Notification Settings */}
            <div className={classes.flexRow}>
              {/* Notification Checkboxes */}
              <Container
                className={classes.flexColWithStart}
                sx={{ width: "50%" }}
              >
                <FormLabel>
                  Notification Platforms
                  <IconButton>
                    <HelpOutline />
                  </IconButton>
                </FormLabel>
                <FormControlLabel
                  label="Notify users on all platforms"
                  control={
                    <Checkbox
                      checked={
                        notifChecks[0] && notifChecks[1] && notifChecks[2]
                      }
                      indeterminate={
                        notifChecks[0] !== notifChecks[1] ||
                        notifChecks[1] !== notifChecks[2] ||
                        notifChecks[0] !== notifChecks[2]
                      }
                      onChange={(e) =>
                        setNotifChecks([
                          e.target.checked,
                          e.target.checked,
                          e.target.checked,
                        ])
                      }
                    />
                  }
                />
                {notifChecksChildren}

                {/* Notify at a different date and time */}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={enableNotifCustomDateTime}
                      onChange={(e) => {
                        setEnableNotifCustomDateTime(e.target.checked);
                        if (!e.target.checked) {
                          setNotifCustomDateTime(null);
                        }
                      }}
                    />
                  }
                  label="Notify at a different date and time"
                />

                {/* Custom Notification Date & Time */}
                {enableNotifCustomDateTime && (
                  <MobileDateTimePicker
                    sx={{ mt: 2 }}
                    disablePast
                    label="Notification Date & Time"
                    value={notifCustomDateTime}
                    onChange={(e) => setNotifCustomDateTime(e)}
                  />
                )}
              </Container>

              {/* Motification Content Generation & Social Media */}
              <Container
                className={classes.flexColWithStart}
                sx={{ width: "50%" }}
              >
                {/* Notification Content Generation */}
                <FormControl>
                  <FormLabel>
                    Notification Content
                    <IconButton>
                      <HelpOutline />
                    </IconButton>
                  </FormLabel>
                  <RadioGroup
                    value={notifContent}
                    onChange={(e) => setNotifContent(e.target.value)}
                  >
                    <FormControlLabel
                      value="journi"
                      control={<Radio />}
                      label="AI-assisted content from Journi"
                    />
                    <FormControlLabel
                      value="custom"
                      control={<Radio />}
                      label="Custom notification"
                    />
                  </RadioGroup>
                </FormControl>
                {/* Digital and Social Media */}
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      display: "inline-block",
                      verticalAlign: "middle",
                      mr: 1,
                      // fontWeight: "bold",
                      mt: 2,
                      mb: 1,
                    }}
                  >
                    Please select the advertising platforms you'd like to
                    promote your promotion on.
                  </Typography>
                  {mediaMenu}
                </Box>
              </Container>
            </div>
            {promoStartDate && (
              <Typography sx={{ mt: 5 }}>
                Users will be notified of this promotion on{" "}
                {notifCustomDateTime
                  ? format(notifCustomDateTime, "MMM d, yyyy 'at' h:mm")
                  : format(promoStartDate, "MMM d, yyyy")}
                {notifChecks[0] || notifChecks[1] ? " " : ""}
                {convertToList([
                  notifChecks[0] ? "on the app and website" : "",
                  notifChecks[1] ? "via email" : "",
                ])}
                {socialMedia.length > 0
                  ? `, and this promotion will also be advertised on ${convertToList(
                      socialMedia
                    )}`
                  : ""}
                .
              </Typography>
            )}
          </AccordionDetails>
        </Accordion>

        <Container className={classes.flexRow}>
          <CustomButton
            variant="contained"
            color="action"
            endIcon={<Visibility />}
            sx={{ mt: 2, mx: 2 }}
          >
            Preview
          </CustomButton>

          <CustomButton
            variant="contained"
            color="secondary"
            endIcon={<Save />}
            type="submit"
            sx={{ mt: 2, mx: 2 }}
          >
            Save Draft
          </CustomButton>

          <CustomButton
            variant="contained"
            endIcon={promoStartDate <= new Date() ? <Publish /> : <Schedule />}
            type="submit"
            sx={{ mt: 2, mx: 2 }}
          >
            {promoStartDate <= new Date() ? "Publish" : "Schedule"}
          </CustomButton>
        </Container>
      </form>
    </Paper>
  );
}
