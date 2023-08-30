import { Box, Divider, IconButton, Paper, Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import HourEditComponent from "./HourEditComponent";
import { capitalizeString } from "../../../../utils/Helpers";
import {
  setFriday,
  setMonday,
  setSaturday,
  setSunday,
  setThursday,
  setTuesday,
  setWednesday,
} from "../../../../context/features/Hours";
import { CustomButton } from "../../../../components/ui/CustomComponents";
import { Close } from "@mui/icons-material";
import HourTextComponent from "./HourTextComponent";

const useStyles = makeStyles()((theme) => {
  return {
    root: {
      display: "flex",
    },
  };
});

export default function BusinessHours({ handleClose }) {
  const { classes } = useStyles();
  const daysOfWeek = [
    { id: 0, name: "sunday", setDay: setSunday },
    { id: 1, name: "monday", setDay: setMonday },
    { id: 2, name: "tuesday", setDay: setTuesday },
    { id: 3, name: "wednesday", setDay: setWednesday },
    { id: 4, name: "thursday", setDay: setThursday },
    { id: 5, name: "friday", setDay: setFriday },
    { id: 6, name: "saturday", setDay: setSaturday },
  ];

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: 24,
  };

  return (
    <Box sx={modalStyle}>
      <Paper
        elevation={1}
        className={classes.root}
        sx={{
          p: 3,
          maxWidth: "80vw",
          maxHeight: 750,
          overflow: "auto",
        }}
      >
        <Box className="flex-col-start">
          {/* Header */}
          <Box className="flex-row-space" sx={{ mb: 2, alignItems: "center" }}>
            <Typography variant="h6">Edit Business Hours</Typography>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>

          <Box className="flex-row-space">
            {/* Hour Edit Component */}
            <Box>
              {daysOfWeek.map((day, i) => (
                <HourEditComponent
                  dayOfWeek={capitalizeString(day.name)}
                  key={day.id}
                  name={day.name}
                  setDay={day.setDay}
                  isLast={i + 1 === daysOfWeek.length}
                />
              ))}
            </Box>

            {/* Hour Text Component and Buttons */}
            <Box className="flex-col-start">
              {/* Hour Text Component */}
              <Box sx={{ mx: 2 }}>
                <Typography variant="h6" sx={{ textAlign: "center" }}>
                  Your Hours
                </Typography>
                <Divider sx={{ mb: 1 }} />
                {daysOfWeek.map((day, i) => (
                  <HourTextComponent
                    dayOfWeek={capitalizeString(day.name)}
                    key={day.id}
                    name={day.name}
                  />
                ))}
              </Box>

              {/* Buttons */}
              <Box className="flex-row" sx={{ mt: 2 }}>
                <CustomButton
                  variant="outlined"
                  color="error"
                  sx={{ mr: 1 }}
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Cancel
                </CustomButton>
                <CustomButton
                  variant="contained"
                  sx={{ ml: 1 }}
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Save
                </CustomButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
