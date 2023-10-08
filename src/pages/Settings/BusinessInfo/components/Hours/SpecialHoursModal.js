import { Add, Close, Delete } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { CustomButton } from "../../../../../components/ui/CustomComponents";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { convertObjToArr } from "../../../../../utils/Helpers";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsUpdating,
  setLastUpdated,
  setSpecialHours,
} from "../../../../../context/features/SpecialAndTempHours";
import axios from "axios";

const useStyles = makeStyles()((theme) => {
  return {
    root: {
      display: "flex",
    },
  };
});

export default function SpecialHoursModal({ handleClose }) {
  const { classes } = useStyles();
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: 24,
  };

  const specialHoursExamples = [
    "Martin Luther King Jr. Day",
    "Presidents' Day",
    "St. Patrick's Day",
    "Easter Sunday",
    "Memorial Day",
    "Juneteenth",
    "Fourth of July",
    "Closed for maintenance",
    "Labor Day",
    "Indigenous Peoples' Day",
    "Thanksgiving",
    "Christmas",
  ];

  const [date, setDate] = useState(null);
  const [dateLabel, setDateLabel] = useState("");

  const dispatch = useDispatch();
  const ranges = convertObjToArr(
    useSelector((state) => state.specialAndTempHours.specialHours.ranges)
  );
  const isClosed = useSelector(
    (state) => state.specialAndTempHours.specialHours.isClosed
  );
  const isOpen24Hours = useSelector(
    (state) => state.specialAndTempHours.specialHours.isOpen24Hours
  );

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

  function convertDateToStr(date) {
    const [m, d, y] = [
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1,
      date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
      date.getFullYear(),
    ];
    return `${m}${d}${y}`;
  }

  const handleSubmit = () => {
    dispatch(setIsUpdating(true));

    axios.get("/hours/special").then(async (res) => {
      const specialDates = res.data.specialDates;

      axios
        .post(`/hours/special/${convertDateToStr(date)}`, {
          specialDates,
          newSpecialDates: {
            id: convertDateToStr(date),
            date,
            dateLabel,
            isClosed,
            isOpen24Hours,
            lastUpdated: new Date(),
            ranges: JSON.stringify(ranges),
          },
        })
        .then((res) => {
          dispatch(
            setSpecialHours({
              ranges: { 0: [null, null] },
              isClosed: false,
              isOpen24Hours: false,
            })
          );
          dispatch(setIsUpdating(false));
          dispatch(setLastUpdated(new Date().getTime()));
          handleClose();
        })
        .catch((err) => {
          dispatch(setIsUpdating(false));
          console.error(err);
        });
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
          <Box className="flex-row-space" sx={{ mb: 1, alignItems: "center" }}>
            <Box className="flex-row-start" sx={{ alignItems: "center" }}>
              <Typography variant="h6" sx={{ mr: 2 }}>
                Add special hours for:
              </Typography>
              <TextField
                label="Reason for special hours"
                placeholder={
                  date !== null
                    ? `e.g. ${specialHoursExamples[date.getMonth()]}`
                    : ""
                }
                size="small"
                value={dateLabel}
                onChange={(e) => setDateLabel(e.target.value)}
                variant="filled"
                sx={{ width: "15em" }}
              />
            </Box>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>

          {/* Date, Checkboxes, and Hours */}
          <Box className="flex-row-space" sx={{ alignItems: "top", my: 2 }}>
            <Box className="flex-col-start">
              <DatePicker
                label="Date"
                value={date}
                onChange={(e) => setDate(e)}
                sx={{ mr: 2, width: "11em" }}
              />

              {/* Checkboxes */}
              <FormGroup row>
                {/* Closed */}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isClosed}
                      size="small"
                      key="Closed"
                      onClick={(e) => {
                        dispatch(
                          setSpecialHours({
                            ranges: e.target.checked ? [[null, null]] : ranges,
                            isClosed: e.target.checked,
                            isOpen24Hours: e.target.checked
                              ? false
                              : isOpen24Hours,
                          })
                        );
                      }}
                    />
                  }
                  label={<Typography fontSize={13}>Closed</Typography>}
                />

                {/* 24 Hours */}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isOpen24Hours}
                      size="small"
                      key="24 hours"
                      disabled={isClosed}
                      onClick={(e) => {
                        dispatch(
                          setSpecialHours({
                            ranges: e.target.checked ? [[null, null]] : ranges,
                            isClosed,
                            isOpen24Hours: e.target.checked,
                          })
                        );
                      }}
                    />
                  }
                  label={<Typography fontSize={13}>24 hours</Typography>}
                />
              </FormGroup>
            </Box>

            {/* Hours */}
            {!isOpen24Hours && (
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
                        value={
                          range[0] === null ? range[0] : new Date(range[0])
                        }
                        disabled={isClosed}
                        onChange={async (e) => {
                          const newRanges =
                            e === null
                              ? await updateRanges(ranges, i, 0, null)
                              : await updateRanges(ranges, i, 0, e.toString());
                          await dispatch(
                            setSpecialHours({
                              ranges: newRanges,
                              isClosed,
                              isOpen24Hours,
                            })
                          );
                        }}
                      />
                      <Link
                        disabled={isClosed}
                        onClick={async () => {
                          const newRanges = await updateRanges(
                            ranges,
                            i,
                            0,
                            null
                          );
                          await dispatch(
                            setSpecialHours({
                              ranges: newRanges,
                              isClosed,
                              isOpen24Hours,
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
                          disabled={isClosed}
                          onChange={async (e) => {
                            const newRanges =
                              e === null
                                ? await updateRanges(ranges, i, 1, null)
                                : await updateRanges(
                                    ranges,
                                    i,
                                    1,
                                    e.toString()
                                  );
                            await dispatch(
                              setSpecialHours({
                                ranges: newRanges,
                                isClosed,
                                isOpen24Hours,
                              })
                            );
                          }}
                        />

                        {/* Add/Remove hours Icon Button */}
                        {i === 0 ? (
                          <IconButton
                            sx={{ ml: 1 }}
                            disabled={isClosed || ranges.length >= 5}
                            onClick={async () => {
                              const newRanges = [...ranges, [null, null]];
                              await dispatch(
                                setSpecialHours({
                                  ranges: newRanges,
                                  isClosed,
                                  isOpen24Hours,
                                })
                              );
                            }}
                          >
                            <Add />
                          </IconButton>
                        ) : (
                          <IconButton
                            sx={{ ml: 1 }}
                            disabled={isClosed}
                            onClick={async () => {
                              const newRanges = await removeElement(ranges, i);
                              await dispatch(
                                setSpecialHours({
                                  ranges: newRanges,
                                  isClosed,
                                  isOpen24Hours,
                                })
                              );
                            }}
                          >
                            <Delete />
                          </IconButton>
                        )}
                      </Box>

                      <Link
                        disabled={isClosed}
                        onClick={async () => {
                          const newRanges = await updateRanges(
                            ranges,
                            i,
                            1,
                            null
                          );
                          await dispatch(
                            setSpecialHours({
                              ranges: newRanges,
                              isClosed,
                              isOpen24Hours,
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

          <Box sx={{ m: "0 auto" }}>
            <CustomButton variant="contained" onClick={handleSubmit}>
              Save
            </CustomButton>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
