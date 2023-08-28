import { Add, ContentCopy, Delete } from "@mui/icons-material";
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
import { useDispatch, useSelector } from "react-redux";
import {
  setFriday,
  setMonday,
  setSaturday,
  setSunday,
  setThursday,
  setTuesday,
  setWednesday,
} from "../../../../context/features/Hours";

export default function WeekdayHours({ dayOfWeek, id, setDay, isLast }) {
  const [closed, setClosed] = useState(false);
  // const [ranges, setRanges] = useState([[null, null]]);
  const [anchor, setAnchor] = useState(null);
  const handleClose = () => setAnchor(null);

  const dispatch = useDispatch();
  const reduxRanges = useSelector((state) => state.hours[id]);

  function updateRanges(arr, index, subIndex, newVal) {
    const newArr = [];
    for (let i = 0; i < arr.length; i++) {
      if (i === index) {
        const otherVal = subIndex === 0 ? arr[i][1] : arr[i][0];
        newArr.push(subIndex === 0 ? [newVal, otherVal] : [otherVal, newVal]);
      } else newArr.push(arr[i]);
    }
    return newArr;
  }

  function removeElement(arr, indexToRemove) {
    const newArr = [];
    for (let i = 0; i < arr.length; i++) {
      if (i !== indexToRemove) newArr.push(arr[i]);
    }
    return newArr;
  }

  const weekdayArr = [false, true, true, true, true, true, false];
  const weekendArr = [true, false, false, false, false, false, true];
  const allDaysArr = [true, true, true, true, true, true, true];
  const copyDayArr = [
    setSunday,
    setMonday,
    setTuesday,
    setWednesday,
    setThursday,
    setFriday,
    setSaturday,
  ];

  /* function updateAllDays(arr, copyArr, newValue) {
    const newArr = [];
    for (let i = 0; i < copyArr.length; i++) {
      if (copyArr[i]) newArr.push(newValue);
      else newArr.push(arr[i]);
    }
    return newArr;
  }

  function updateOneDay(arr, index, newValue) {
    const newArr = arr;
    for (let i = 0; i < newArr.length; i++) {
      if (i === index) newArr[i] = newValue;
    }
    return newArr;
  } */

  return (
    <div>
      {/* Copy Menu */}
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={handleClose}
        onClick={handleClose}
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
        <MenuItem
          dense
          onClick={() => {
            for (let i = 0; i < weekdayArr.length; i++) {
              const [isDayToCopy, setDayToCopy] = [
                weekdayArr[i],
                copyDayArr[i],
              ];
              if (isDayToCopy) dispatch(setDayToCopy(reduxRanges));
            }
          }}
        >
          Copy hours to weekdays
        </MenuItem>
        <MenuItem
          dense
          onClick={() => {
            for (let i = 0; i < weekendArr.length; i++) {
              const [isDayToCopy, setDayToCopy] = [
                weekendArr[i],
                copyDayArr[i],
              ];
              if (isDayToCopy) dispatch(setDayToCopy(reduxRanges));
            }
          }}
        >
          Copy hours to weekend
        </MenuItem>
        <MenuItem
          dense
          onClick={() => {
            for (let i = 0; i < allDaysArr.length; i++) {
              const [isDayToCopy, setDayToCopy] = [
                allDaysArr[i],
                copyDayArr[i],
              ];
              if (isDayToCopy) dispatch(setDayToCopy(reduxRanges));
            }
          }}
        >
          Copy hours to all days
        </MenuItem>
      </Menu>

      <Box className="flex-row-start" sx={{ mb: isLast ? 0 : 2 }}>
        {/* Day of the Week and Checkbox */}
        <Box>
          {/* Day of the Week */}
          <Box
            className="flex-row-start"
            sx={{
              width: "9em",
              alignItems: "center",
            }}
          >
            <Typography sx={{ fontWeight: "bold", mr: 1 }}>
              {dayOfWeek}
            </Typography>
            <IconButton
              size="small"
              sx={{ mr: 1 }}
              onClick={(e) => setAnchor(e.currentTarget)}
            >
              <ContentCopy fontSize="inherit" />
            </IconButton>
          </Box>
          {/* Checkbox */}
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={closed}
                  size="small"
                  key="Closed"
                  onClick={(e) => {
                    setClosed(e.target.checked);
                    if (e.target.checked) dispatch(setDay([[null, null]]));
                  }}
                />
              }
              label="Closed"
            />
          </FormGroup>
        </Box>

        {/* Hours */}
        {!closed && (
          <Box>
            {reduxRanges.map((range, i) => (
              <Box
                className="flex-row"
                key={i}
                sx={{ mb: 2, alignItems: "center" }}
              >
                {/* Hours */}
                <TimePicker
                  label="Opens at"
                  sx={{ width: "9em", mr: 2 }}
                  value={range[0] === null ? range[0] : new Date(range[0])}
                  onChange={async (e) => {
                    const newRanges = await updateRanges(
                      reduxRanges,
                      i,
                      0,
                      e.toString()
                    );
                    await dispatch(setDay(newRanges));
                  }}
                />
                <TimePicker
                  label="Closes at"
                  sx={{ width: "9em" }}
                  value={range[1] === null ? range[1] : new Date(range[1])}
                  onChange={async (e) => {
                    const newRanges = await updateRanges(
                      reduxRanges,
                      i,
                      1,
                      e.toString()
                    );
                    await dispatch(setDay(newRanges));
                  }}
                />

                {/* Add/Remove hours */}
                {i === 0 ? (
                  <IconButton
                    sx={{ ml: 1 }}
                    onClick={async () => {
                      const newRanges = [...reduxRanges, [null, null]];
                      await dispatch(setDay(newRanges));
                    }}
                  >
                    <Add />
                  </IconButton>
                ) : (
                  <IconButton
                    sx={{ ml: 1 }}
                    onClick={async () => {
                      const newRanges = await removeElement(reduxRanges, i);
                      await dispatch(setDay(newRanges));
                    }}
                  >
                    <Delete />
                  </IconButton>
                )}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </div>
  );
}
