import { Add, ContentCopy, Delete } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  Link,
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
} from "../../../../../../context/features/BusinessHours";
import { convertObjToArr } from "../../../../../../utils/Helpers";

export default function HourEditComponent({
  hoursType,
  dayOfWeek,
  name,
  setDay,
  isLast,
}) {
  const [closed, setClosed] = useState(false);
  const [open24Hours, setOpen24Hours] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const handleClose = () => setAnchor(null);

  const dispatch = useDispatch();
  const ranges = convertObjToArr(
    useSelector((state) => state[hoursType][name].ranges)
  );
  const isClosed = useSelector((state) => state[hoursType][name].isClosed);
  const isOpen24Hours = useSelector(
    (state) => state[hoursType][name].isOpen24Hours
  );
  const hoursObj = { ranges, isClosed, isOpen24Hours };

  function updateRanges(obj, objIndex, arrIndex, newVal) {
    const newObj = { ...obj }; // Copies object to avoid mutation
    let arr = newObj[objIndex]; // Position reference
    let newArr = arrIndex === 0 ? [newVal, arr[1]] : [arr[0], newVal]; // New array value
    newObj[objIndex] = newArr; // Updates value in copied object
    return newObj;
  }

  function removeElement(obj, indexToRemove) {
    const newObj = {}; // Initialize an empty object
    // Loop through the length of the object and add each element to new object if it is not located at the index to remove.
    for (let i = 0; i < Object.keys(obj).length; i++) {
      if (i !== indexToRemove) newObj[Object.keys(newObj).length] = obj[i];
    }
    return newObj;
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
              if (isDayToCopy) dispatch(setDayToCopy(hoursObj));
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
              if (isDayToCopy) dispatch(setDayToCopy(hoursObj));
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
              if (isDayToCopy) dispatch(setDayToCopy(hoursObj));
            }
          }}
        >
          Copy hours to all days
        </MenuItem>
      </Menu>

      <Box>
        <Box className="flex-row-start" sx={{ mb: isLast ? 0 : 2 }}>
          {/* Day of the Week and Checkboxes */}
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
            {/* Checkboxes */}
            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={closed}
                    size="small"
                    key="Closed"
                    onClick={(e) => {
                      setClosed(e.target.checked);
                      if (e.target.checked) {
                        setOpen24Hours(false);
                        dispatch(
                          setDay({
                            ranges: [[null, null]],
                            isClosed: e.target.checked,
                            isOpen24Hours: false,
                          })
                        );
                      } else {
                        dispatch(
                          setDay({
                            ranges,
                            isClosed: e.target.checked,
                            isOpen24Hours: open24Hours,
                          })
                        );
                      }
                    }}
                  />
                }
                label={<Typography fontSize={13}>Closed</Typography>}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={open24Hours}
                    size="small"
                    key="24 hours"
                    disabled={closed}
                    onClick={(e) => {
                      setOpen24Hours(e.target.checked);
                      if (e.target.checked) {
                        dispatch(
                          setDay({
                            ranges: [[null, null]],
                            isClosed: closed,
                            isOpen24Hours: e.target.checked,
                          })
                        );
                      } else {
                        dispatch(
                          setDay({
                            ranges,
                            isClosed: closed,
                            isOpen24Hours: e.target.checked,
                          })
                        );
                      }
                    }}
                  />
                }
                label={<Typography fontSize={13}>24 hours</Typography>}
              />
            </FormGroup>
          </Box>

          {/* Hours */}
          {!open24Hours && (
            <Box>
              {ranges.map((range, i) => (
                <Box
                  className="flex-row"
                  key={i}
                  sx={{ mb: i !== ranges.length - 1 ? 2 : 0 }}
                >
                  {/* Opens at */}
                  <Box className="flex-col-start">
                    <TimePicker
                      label="Opens at"
                      sx={{ width: "9em", mr: 2 }}
                      value={range[0] === null ? range[0] : new Date(range[0])}
                      disabled={closed}
                      onChange={async (e) => {
                        const newRanges =
                          e === null
                            ? await updateRanges(ranges, i, 0, null)
                            : await updateRanges(ranges, i, 0, e.toString());
                        await dispatch(
                          setDay({
                            ranges: newRanges,
                            isClosed: closed,
                            isOpen24Hours: open24Hours,
                          })
                        );
                      }}
                    />
                    <Link
                      disabled={closed}
                      onClick={async () => {
                        const newRanges = await updateRanges(
                          ranges,
                          i,
                          0,
                          null
                        );
                        await dispatch(
                          setDay({
                            ranges: newRanges,
                            isClosed: closed,
                            isOpen24Hours: open24Hours,
                          })
                        );
                      }}
                      underline="hover"
                    >
                      <Typography variant="caption" color="text.primary">
                        Clear time
                      </Typography>
                    </Link>
                  </Box>

                  {/* Closes at & Add/Remove hours Icon Button */}
                  <Box className="flex-col-start">
                    <Box
                      className="flex-row"
                      key={i}
                      sx={{ alignItems: "center" }}
                    >
                      <TimePicker
                        label="Closes at"
                        sx={{ width: "9em" }}
                        value={
                          range[1] === null ? range[1] : new Date(range[1])
                        }
                        disabled={closed}
                        onChange={async (e) => {
                          const newRanges =
                            e === null
                              ? await updateRanges(ranges, i, 1, null)
                              : await updateRanges(ranges, i, 1, e.toString());
                          await dispatch(
                            setDay({
                              ranges: newRanges,
                              isClosed: closed,
                              isOpen24Hours: open24Hours,
                            })
                          );
                        }}
                      />

                      {/* Add/Remove hours Icon Button */}
                      {i === 0 ? (
                        <IconButton
                          sx={{ ml: 1 }}
                          disabled={closed}
                          onClick={async () => {
                            const newRanges = [...ranges, [null, null]];
                            await dispatch(
                              setDay({
                                ranges: newRanges,
                                isClosed: closed,
                                isOpen24Hours: open24Hours,
                              })
                            );
                          }}
                        >
                          <Add />
                        </IconButton>
                      ) : (
                        <IconButton
                          sx={{ ml: 1 }}
                          disabled={closed}
                          onClick={async () => {
                            const newRanges = await removeElement(ranges, i);
                            await dispatch(
                              setDay({
                                ranges: newRanges,
                                isClosed: closed,
                                isOpen24Hours: open24Hours,
                              })
                            );
                          }}
                        >
                          <Delete />
                        </IconButton>
                      )}
                    </Box>

                    <Link
                      disabled={closed}
                      onClick={async () => {
                        const newRanges = await updateRanges(
                          ranges,
                          i,
                          1,
                          null
                        );
                        await dispatch(
                          setDay({
                            ranges: newRanges,
                            isClosed: closed,
                            isOpen24Hours: open24Hours,
                          })
                        );
                      }}
                      underline="hover"
                    >
                      <Typography variant="caption" color="text.primary">
                        Clear time
                      </Typography>
                    </Link>
                  </Box>
                </Box>
              ))}
            </Box>
          )}
        </Box>
        {!isLast && <Divider sx={{ borderStyle: "dashed", mb: 2 }} />}
      </Box>
    </div>
  );
}
