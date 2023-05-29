import { Close } from "@mui/icons-material";
import { Box, IconButton, Paper, TextField, Typography } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "tss-react/mui";

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
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const { classes } = useStyles();
  const { t } = useTranslation();

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
        <div className="flex-row-start">
          <TextField
            sx={{ mb: 2 }}
            label="Title"
            variant="outlined"
            placeholder="(e.g. Closed for Christmas)"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            // error={promoNameError}
            // helperText={promoNameHelperText}
          />
        </div>
        <div className="flex-row-start">
          <MobileDatePicker
            sx={{ mr: 3 }}
            label="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e)}
          />
          <MobileDatePicker
            label="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e)}
          />
        </div>
        - date type (date or range) - indefinite checkbox - name - start date -
        end date - preview - add a matching announcement post - update on
        Google, Facebook, Yelp, uber eats, doordash, grubhub, via email -
        "orders have been scheduled during this range." with cancel BO dates,
        cancel orders, and cancel and notify patrons options - add social media
        checkboxes to new announcement thingy
      </form>
    </Paper>
  );
}
