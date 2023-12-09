import { Box, Divider, IconButton, Paper, Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import HourEditComponent from "./HourEditComponent";
import { capitalizeString, modalStyle } from "../../../../../utils/Helpers";
import {
  setFriday as setFridayBusiness,
  setIsUpdating as setIsUpdatingBusiness,
  setLastUpdated as setLastUpdatedBusiness,
  setMonday as setMondayBusiness,
  setSaturday as setSaturdayBusiness,
  setSunday as setSundayBusiness,
  setThursday as setThursdayBusiness,
  setTuesday as setTuesdayBusiness,
  setWednesday as setWednesdayBusiness,
} from "../../../../../context/features/BusinessHours";
import {
  setFriday as setFridaySupport,
  setIsUpdating as setIsUpdatingSupport,
  setLastUpdated as setLastUpdatedSupport,
  setMonday as setMondaySupport,
  setSaturday as setSaturdaySupport,
  setSunday as setSundaySupport,
  setThursday as setThursdaySupport,
  setTuesday as setTuesdaySupport,
  setWednesday as setWednesdaySupport,
} from "../../../../../context/features/SupportHours";
import {
  CustomButton,
  CustomLoadingButton,
} from "../../../../../components/ui/CustomComponents";
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

export default function EditHoursModal({ hoursType, handleClose }) {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const daysOfWeek = [
    {
      id: 0,
      name: "sunday",
      setDay: hoursType === "support" ? setSundaySupport : setSundayBusiness,
    },
    {
      id: 1,
      name: "monday",
      setDay: hoursType === "support" ? setMondaySupport : setMondayBusiness,
    },
    {
      id: 2,
      name: "tuesday",
      setDay: hoursType === "support" ? setTuesdaySupport : setTuesdayBusiness,
    },
    {
      id: 3,
      name: "wednesday",
      setDay:
        hoursType === "support" ? setWednesdaySupport : setWednesdayBusiness,
    },
    {
      id: 4,
      name: "thursday",
      setDay:
        hoursType === "support" ? setThursdaySupport : setThursdayBusiness,
    },
    {
      id: 5,
      name: "friday",
      setDay: hoursType === "support" ? setFridaySupport : setFridayBusiness,
    },
    {
      id: 6,
      name: "saturday",
      setDay:
        hoursType === "support" ? setSaturdaySupport : setSaturdayBusiness,
    },
  ];

  const sunday = useSelector((state) => state[`${hoursType}Hours`].sunday);
  const monday = useSelector((state) => state[`${hoursType}Hours`].monday);
  const tuesday = useSelector((state) => state[`${hoursType}Hours`].tuesday);
  const wednesday = useSelector(
    (state) => state[`${hoursType}Hours`].wednesday
  );
  const thursday = useSelector((state) => state[`${hoursType}Hours`].thursday);
  const friday = useSelector((state) => state[`${hoursType}Hours`].friday);
  const saturday = useSelector((state) => state[`${hoursType}Hours`].saturday);

  const isUpdating = useSelector(
    (state) => state[`${hoursType}Hours`].isUpdating
  );

  const handleSubmit = () => {
    dispatch(
      hoursType === "support"
        ? setIsUpdatingSupport(true)
        : setIsUpdatingBusiness(true)
    );
    const hours = {
      sunday: { id: 0, ...sunday, ranges: { ...sunday.ranges } },
      monday: { id: 1, ...monday, ranges: { ...monday.ranges } },
      tuesday: { id: 2, ...tuesday, ranges: { ...tuesday.ranges } },
      wednesday: { id: 3, ...wednesday, ranges: { ...wednesday.ranges } },
      thursday: { id: 4, ...thursday, ranges: { ...thursday.ranges } },
      friday: { id: 5, ...friday, ranges: { ...friday.ranges } },
      saturday: { id: 6, ...saturday, ranges: { ...saturday.ranges } },
    };

    axios
      .post(`/hours/${hoursType}/update`, hours)
      .then((res) => {
        if (hoursType === "support") {
          dispatch(setIsUpdatingSupport(false));
          dispatch(setLastUpdatedSupport(new Date().getTime()));
        } else {
          dispatch(setIsUpdatingBusiness(false));
          dispatch(setLastUpdatedBusiness(new Date().getTime()));
        }
        handleClose();
      })
      .catch((err) => {
        if (hoursType === "support") dispatch(setIsUpdatingSupport(false));
        else dispatch(setIsUpdatingBusiness(false));
        console.error(err);
      });
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
            <Typography variant="h6">Edit {hoursType} hours</Typography>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>

          <Box className="flex-row-space">
            {/* Hour Edit Component */}
            <Box>
              {daysOfWeek.map((day, i) => (
                <HourEditComponent
                  hoursType={`${hoursType}Hours`}
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
                    hoursType={`${hoursType}Hours`}
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
