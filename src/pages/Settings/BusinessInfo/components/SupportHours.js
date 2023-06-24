import { ContentCopy } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    root: {
      display: "flex",
    },
  };
});

export default function SupportHours() {
  const { classes } = useStyles();
  const daysOfWeek = [
    { id: 1, day: "Mon" },
    { id: 2, day: "Tue" },
    { id: 3, day: "Wed" },
    { id: 4, day: "Thu" },
    { id: 5, day: "Fri" },
    { id: 6, day: "Sat" },
    { id: 7, day: "Sun" },
  ];

  const [checkedList, setCheckedList] = useState(uncheckAll(daysOfWeek));
  const [anchor, setAnchor] = useState(null);

  const handleCopyButtonClick = (e) => {
    setAnchor(e.currentTarget);
  };

  const handleCopyButtonClose = () => setAnchor(null);

  function uncheckAll(options) {
    return options.map((option) => ({
      ...option,
      checked: false,
    }));
  }

  function toggleOption(options, id, checked) {
    return options.map((option) =>
      option.id === id ? { ...option, checked } : option
    );
  }

  function changeList(id, checked) {
    setCheckedList((checkedList) => toggleOption(checkedList, id, checked));
  }

  return (
    <div className={classes.root}>
      {/* New Button Menu */}
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={handleCopyButtonClose}
        onClick={handleCopyButtonClose}
        PaperProps={{
          elevation: 0,
          sx: {
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem dense onClick={() => {}}>
          Copy hours to all weekdays
        </MenuItem>
        <MenuItem dense onClick={() => {}}>
          Copy hours to weekend
        </MenuItem>
        <MenuItem dense onClick={() => {}}>
          Copy hours to all days
        </MenuItem>
      </Menu>
      <Box
        className="flex-col-start"
        sx={{
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "text.secondary",
          borderRadius: 5,
          p: 2,
        }}
      >
        <Typography variant="h6">Support Hours</Typography>
        {checkedList.map(({ id, day, checked }) => (
          <Box className="flex-row" sx={{ mb: 2, alignItems: "center" }}>
            <IconButton
              size="small"
              sx={{ mr: 1 }}
              onClick={handleCopyButtonClick}
            >
              {/* To-Do: copy to other week(days/end days), copy to all */}
              <ContentCopy fontSize="inherit" />
            </IconButton>
            <Typography
              sx={{
                width: 50,
                display: "flex",
                mr: 0.5,
                fontWeight: "bold",
              }}
            >
              {day}:
            </Typography>
            <TimePicker label="Open" sx={{ width: "9em", mr: 2 }} />
            <TimePicker label="Close" sx={{ width: "9em" }} />
            <FormGroup row sx={{ ml: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checked}
                    onChange={(e) => changeList(id, e.target.checked)}
                  />
                }
                label="Closed"
              />
            </FormGroup>
          </Box>
        ))}
      </Box>
    </div>
  );
}
