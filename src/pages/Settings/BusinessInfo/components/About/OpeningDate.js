import { Edit } from "@mui/icons-material";
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function OpeningDate() {
  const [isEditODActive, setIsEditODActive] = useState(false);

  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState(null);
  const mosArr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayArr = Array(31).fill("");

  function isValidDay(dayStr, month, yearStr) {
    const monthsWith31Days = [
      "January",
      "March",
      "May",
      "July",
      "August",
      "October",
      "December",
    ];

    let isValid = false;
    const [day, year] = [Number(dayStr), Number(yearStr)];

    switch (day) {
      case 29:
        if (month !== "February" || (year >= 0 && year % 4 === 0))
          isValid = true;
        break;
      case 30:
        if (month !== "February") isValid = true;
        break;
      case 31:
        if (monthsWith31Days.indexOf(month) !== -1) isValid = true;
        break;
      default:
        isValid = true;
        break;
    }

    return isValid;
  }

  return (
    <Box className="hover-container" sx={{ mb: 1.5 }}>
      {/* Header and Button */}
      <Box className="flex-row-start" sx={{ mb: 0, alignItems: "center" }}>
        <Typography variant="subtitle1" sx={{ mr: 1 }}>
          Opening date
        </Typography>
        <IconButton
          size="small"
          className="icon-button"
          onClick={() => setIsEditODActive(!isEditODActive)}
        >
          <Edit fontSize="inherit" />
        </IconButton>
      </Box>

      {/* Dropdowns, Textfield, and Text */}
      {isEditODActive ? (
        <Box className="flex-row-start" sx={{ mt: 1 }}>
          {/* Month Dropdown */}
          <FormControl size="small" sx={{ width: "8rem" }}>
            <InputLabel id="opening-month-label">Month *</InputLabel>
            <Select
              labelId="opening-month-label"
              value={month}
              label="Month *"
              onChange={(e) => setMonth(e.target.value)}
              required
            >
              {mosArr.map((month) => (
                <MenuItem key={month} value={month}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Day Dropdown */}
          <FormControl size="small" sx={{ width: "6rem", mx: 1 }}>
            <InputLabel id="opening-day-label">Day</InputLabel>
            <Select
              labelId="opening-day-label"
              value={day}
              label="Day"
              onChange={(e) => setDay(e.target.value)}
            >
              <MenuItem value={0}>None</MenuItem>
              {dayArr.map(
                (el, i) =>
                  isValidDay(i + 1, month, year) && (
                    <MenuItem key={i + 1} value={i + 1}>
                      {i + 1}
                    </MenuItem>
                  )
              )}
            </Select>
          </FormControl>

          {/* Year TextField */}
          <TextField
            value={year}
            onChange={(e) => setYear(e.target.value)}
            label="Year"
            required
            size="small"
            // type="number"
            sx={{ width: "5rem" }}
            variant="outlined"
          />
        </Box>
      ) : (
        <Box>
          <Typography color="text.secondary">Opened in October 2023</Typography>
        </Box>
      )}
    </Box>
  );
}
