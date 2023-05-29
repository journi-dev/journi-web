import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "tss-react/mui";
import AddPhotosBox from "./AddPhotosBox";
import {
  Backspace,
  Close,
  Publish,
  Save,
  Schedule,
  Visibility,
} from "@mui/icons-material";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { CustomButton } from "./CustomComponents";

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

export default function NewAnnouncement({ onSubmit, onClose }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [action, setAction] = useState("None");
  const [publishDate, setPublishDate] = useState(null);
  const [expirationDate, setExpirationDate] = useState(null);

  const callsToAction = [
    "None",
    "Book",
    "Order",
    "Buy",
    "Learn more",
    "Sign up",
    "Call now",
    "Custom",
  ];

  const { classes } = useStyles();
  const { t } = useTranslation();

  const height = 225;

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
        <Box className={classes.flexRowWithSpace} sx={{ mb: 2 }}>
          <Typography variant="h5" sx={{ userSelect: "none" }}>
            {t("newAnnouncement")}
          </Typography>
          <IconButton>
            <Close />
          </IconButton>
        </Box>

        {/* New Announcement Name, Description, and Photos */}
        <Box className="flex-row-space" sx={{ mb: 3 }}>
          <Box className="flex-col-space" sx={{ width: "50%", height, pr: 3 }}>
            {/* Announcement Name */}
            <TextField
              sx={{ mb: 2 }}
              label={t("announcementName")}
              variant="outlined"
              placeholder="(e.g. New Menu Offerings!)"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              // error={promoNameError}
              // helperText={promoNameHelperText}
            />

            {/* Announcement Description */}
            <TextField
              label={t("announcementDesc")}
              variant="outlined"
              rows={4}
              multiline
              placeholder="Introducing our new menu item! Try it out today!"
              required
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              // error={promoDescError}
              // helperText={promoDescHelperText}
            />
          </Box>

          <Box sx={{ width: "50%" }}>
            <AddPhotosBox height={height} />
          </Box>
        </Box>

        {/* Publish and Expiration Dates, and Call-to-Action Dropdown */}
        <Box className="flex-row-space">
          {/* Publish and Expiration Dates */}
          <Box
            className="flex-row-start"
            sx={{ mb: 3, alignItems: "center", width: "70%" }}
          >
            <MobileDateTimePicker
              sx={{ mr: 3 }}
              label="Publish Date"
              value={publishDate}
              onChange={(e) => setPublishDate(e)}
            />

            <MobileDateTimePicker
              label="Expiration Date"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e)}
            />
            <Box>
              <IconButton
                sx={{ mx: 2 }}
                onClick={() => setExpirationDate(null)}
                disabled={expirationDate === null}
              >
                <Backspace />
              </IconButton>
            </Box>
          </Box>

          {/* Call-to-Action Dropdown */}
          <FormControl sx={{ width: "30%" }}>
            <InputLabel>Action (optional)</InputLabel>
            <Select
              id="call-to-action"
              value={action}
              label="Action (optional)"
              onChange={(e) => setAction(e.target.value)}
            >
              {callsToAction.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

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
            endIcon={publishDate <= new Date() ? <Publish /> : <Schedule />}
            type="submit"
            sx={{ mt: 2, mx: 2 }}
          >
            {publishDate <= new Date() ? "Publish" : "Schedule"}
          </CustomButton>
        </Box>
      </form>
    </Paper>
  );
}
