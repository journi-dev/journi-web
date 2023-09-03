import { Box, Divider, IconButton, Paper, Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import HourEditComponent from "./HourEditComponent";
import { capitalizeString } from "../../../../utils/Helpers";
import {
  setFriday,
  setIsUpdating,
  setLastUpdated,
  setMonday,
  setSaturday,
  setSunday,
  setThursday,
  setTuesday,
  setWednesday,
} from "../../../../context/features/Hours";
import {
  CustomButton,
  CustomLoadingButton,
} from "../../../../components/ui/CustomComponents";
import { Close } from "@mui/icons-material";
import HourTextComponent from "./HourTextComponent";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles()((theme) => {
  return {
    root: {
      display: "flex",
    },
  };
});

export default function BusinessHours({ handleClose }) {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const daysOfWeek = [
    { id: 0, name: "sunday", setDay: setSunday },
    { id: 1, name: "monday", setDay: setMonday },
    { id: 2, name: "tuesday", setDay: setTuesday },
    { id: 3, name: "wednesday", setDay: setWednesday },
    { id: 4, name: "thursday", setDay: setThursday },
    { id: 5, name: "friday", setDay: setFriday },
    { id: 6, name: "saturday", setDay: setSaturday },
  ];

  const sunday = useSelector((state) => state.hours.sunday);
  const monday = useSelector((state) => state.hours.monday);
  const tuesday = useSelector((state) => state.hours.tuesday);
  const wednesday = useSelector((state) => state.hours.wednesday);
  const thursday = useSelector((state) => state.hours.thursday);
  const friday = useSelector((state) => state.hours.friday);
  const saturday = useSelector((state) => state.hours.saturday);

  const isUpdating = useSelector((state) => state.hours.isUpdating);

  const handleSubmit = () => {
    dispatch(setIsUpdating(true));
    const businessHours = {
      sunday: { id: 0, ...sunday, ranges: { ...sunday.ranges } },
      monday: { id: 1, ...monday, ranges: { ...monday.ranges } },
      tuesday: { id: 2, ...tuesday, ranges: { ...tuesday.ranges } },
      wednesday: { id: 3, ...wednesday, ranges: { ...wednesday.ranges } },
      thursday: { id: 4, ...thursday, ranges: { ...thursday.ranges } },
      friday: { id: 5, ...friday, ranges: { ...friday.ranges } },
      saturday: { id: 6, ...saturday, ranges: { ...saturday.ranges } },
    };

    axios
      .post("/hours/business/update", businessHours)
      .then((res) => {
        dispatch(setIsUpdating(false));
        dispatch(setLastUpdated(new Date().getTime()));
        handleClose();
      })
      .catch((err) => {
        dispatch(setIsUpdating(false));
        console.error(err);
      });
  };

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
                  onClick={handleClose}
                >
                  Cancel
                </CustomButton>
                <CustomLoadingButton
                  variant="contained"
                  sx={{ ml: 1 }}
                  onClick={handleSubmit}
                  disableElevation
                  disabled={isUpdating}
                  loading={isUpdating}
                >
                  Save
                </CustomLoadingButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
