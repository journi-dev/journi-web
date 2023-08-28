import { Box, Paper, Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import HourComponent from "./HourComponent";
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

const useStyles = makeStyles()((theme) => {
  return {
    root: {
      display: "flex",
    },
  };
});

export default function BusinessHours() {
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
    <div className={classes.root}>
      <Box sx={modalStyle}>
        <Paper>
          <Box className="flex-col-start">
            <Typography variant="h6" sx={{ mb: 2 }}>
              Business Hours
            </Typography>

            {daysOfWeek.map((day, i) => (
              <HourComponent
                dayOfWeek={capitalizeString(day.name)}
                key={day.id}
                id={day.name}
                setDay={day.setDay}
                isLast={i + 1 === daysOfWeek.length}
              />
            ))}
          </Box>
        </Paper>
      </Box>
    </div>
  );
}
