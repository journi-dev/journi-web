import {
  Campaign,
  Close,
  Event,
  Facebook,
  Google,
  Instagram,
  LinkedIn,
  Publish,
  Save,
  Today,
  Twitter,
  Visibility,
} from "@mui/icons-material";
import {
  Box,
  Checkbox,
  Chip,
  FormControlLabel,
  FormGroup,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { MobileDatePicker, MobileDateTimePicker } from "@mui/x-date-pickers";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "tss-react/mui";
import { updateArray } from "../../../utils/Helpers";
import Doordash from "../../../components/icons/Doordash";
import {
  CustomButton,
  CustomToggleButton,
  CustomToggleButtonGroup,
} from "../../../components/ui/CustomComponents";

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

export default function NewBlockoutDates({ onSubmit, onClose }) {
  const [name, setName] = useState("");
  const [dateType, setDateType] = useState("single");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [includeTimes, setIncludeTimes] = useState(false);
  const [isIndefinite, setIsIndefinite] = useState(false);
  const [addAnnouncement, setAddAnnouncement] = useState(false);
  const [businessIsClosed, setBusinessIsClosed] = useState(false);
  const [socialMedia, setSocialMedia] = useState([]);

  const { classes } = useStyles();
  const { t } = useTranslation();

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
      <Chip
        variant={socialMedia.includes("Doordash") ? "filled" : "outlined"}
        color={socialMedia.includes("Doordash") ? "primary" : "default"}
        sx={{ m: 1 }}
        icon={<Doordash />}
        label="Doordash"
        clickable
        onClick={() => {
          let newArr = updateArray(socialMedia, "Doordash");
          setSocialMedia(newArr);
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
        noValidate
        autoComplete="off"
        onSubmit={() => {}}
        className={classes.form}
      >
        {/* New Announcement Row */}
        <Box className="flex-row-space" sx={{ mb: 2 }}>
          <Typography variant="h5" sx={{ userSelect: "none" }}>
            {t("newBlockoutDate")}
          </Typography>

          <IconButton>
            <Close />
          </IconButton>
        </Box>
        <div className="flex-row-space">
          {/* Title, Date Type, Dates, and Date Checkboxes */}
          <Box className="flex-col-start" sx={{ width: "55%", pr: 3 }}>
            <TextField
              sx={{ mb: 2 }}
              label="Title"
              variant="outlined"
              placeholder="(e.g. Closed for Christmas)"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              // error={promoNameError}
              helperText={`Users will see this title if they schedule ${
                dateType === "range" ? "during this range" : "on this date"
              }.`}
            />

            {/* Date Type Selection */}
            <Paper
              elevation={0}
              sx={{
                display: "flex",
                border: (theme) => `1px solid ${theme.palette.divider}`,
                flexWrap: "wrap",
                width: 260,
                height: 40,
                alignContent: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <CustomToggleButtonGroup
                color="primary"
                size="small"
                value={dateType}
                exclusive
                onChange={(e, newDateType) => {
                  setDateType(newDateType);
                  if (newDateType === "single" && isIndefinite) {
                    setIsIndefinite(false);
                  }
                }}
                sx={{ height: 30 }}
              >
                <CustomToggleButton value="single">
                  <Today />
                  <Typography variant="caption" sx={{ ml: 0.5 }}>
                    Single Date
                  </Typography>
                </CustomToggleButton>

                <CustomToggleButton value="range">
                  <Today />
                  <Typography>-</Typography>
                  <Event />
                  <Typography variant="caption" sx={{ ml: 0.5 }}>
                    Date Range
                  </Typography>
                </CustomToggleButton>
              </CustomToggleButtonGroup>
            </Paper>

            {/* Dates */}
            <div className="flex-row-space">
              {!includeTimes && (
                <MobileDatePicker
                  label={dateType === "range" ? "Start Date" : "Date"}
                  maxDate={endDate}
                  value={startDate}
                  onChange={(e) => setStartDate(e)}
                  sx={{ mr: 1.5 }}
                />
              )}
              {!includeTimes && !isIndefinite && dateType !== "single" && (
                <MobileDatePicker
                  disabled={isIndefinite || dateType === "single"}
                  label={dateType === "range" ? "End Date" : "N/A"}
                  minDate={startDate}
                  value={endDate}
                  onChange={(e) => setEndDate(e)}
                />
              )}
              {includeTimes && (
                <MobileDateTimePicker
                  label={dateType === "range" ? "Start Date" : "Date"}
                  maxDate={endDate}
                  value={startDate}
                  onChange={(e) => setStartDate(e)}
                  sx={{ mr: 1.5 }}
                />
              )}
              {includeTimes && !isIndefinite && dateType !== "single" && (
                <MobileDateTimePicker
                  disabled={isIndefinite || dateType === "single"}
                  label={dateType === "range" ? "End Date" : "N/A"}
                  minDate={startDate}
                  value={endDate}
                  onChange={(e) => setEndDate(e)}
                />
              )}
            </div>

            <div className="flex-row-start">
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={includeTimes}
                      onChange={(e) => {
                        setIncludeTimes(e.target.checked);
                        if (startDate && !includeTimes) {
                          startDate.setHours(0, 0, 0);
                        }
                        if (endDate && !includeTimes) {
                          endDate.setHours(0, 0, 0);
                        }
                      }}
                    />
                  }
                  label="Include times"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isIndefinite}
                      onChange={(e) => {
                        setIsIndefinite(e.target.checked);
                        if (e.target.checked) {
                          setDateType("range");
                        }
                        if (endDate && e.target.checked) {
                          setEndDate(null);
                        }
                      }}
                    />
                  }
                  label="Indefinite"
                />
              </FormGroup>
            </div>
          </Box>

          {/* Checkboxes and Social Media Chips */}
          <Box className="flex-col-start" sx={{ width: "45%" }}>
            <FormGroup sx={{ mb: 1 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={addAnnouncement}
                    onChange={(e) => setAddAnnouncement(e.target.checked)}
                  />
                }
                label="Add accompanying announcement"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={businessIsClosed}
                    onChange={(e) => setBusinessIsClosed(e.target.checked)}
                  />
                }
                label="Business is closed"
              />
            </FormGroup>
            <Typography variant="caption">
              Please select the platforms you'd like to add your blockout
              date(s) to.
            </Typography>
            {mediaMenu}
          </Box>
        </div>

        {/* Buttons */}
        <Box className="flex-row">
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
            endIcon={<Publish />}
            type="submit"
            sx={{ mt: 2, mx: 2 }}
          >
            Publish
          </CustomButton>

          <CustomButton
            variant="contained"
            endIcon={<Campaign />}
            type="submit"
            sx={{ mt: 2, mx: 2 }}
          >
            Publish & Notify
          </CustomButton>
        </Box>
      </form>
    </Paper>
  );
}
