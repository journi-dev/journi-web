import { Edit } from "@mui/icons-material";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import BusinessHours from "./BusinessHours";
import { useState } from "react";
import useFetchHours from "../../../../hooks/useFetchHours";
import { useSelector } from "react-redux";
import format from "date-fns/format";

export default function Hours() {
  const [openBusinessHours, setOpenBusinessHours] = useState(false);
  const handleOpen = () => setOpenBusinessHours(true);
  const handleClose = () => setOpenBusinessHours(false);
  const lastUpdated = useSelector((state) => state.hours.lastUpdated);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const { businessHours } = useFetchHours(lastUpdated);

  function convertArrToText(arr) {
    const [ranges, isClosed, isOpen24Hours] = [arr[0], arr[1], arr[2]];
    const result = [];
    let isAllNullValues = true;

    if (isClosed) return ["Closed"];
    else if (isOpen24Hours) return ["Open all day"];
    else if (
      ranges.length === 1 &&
      ranges[0][0] === null &&
      ranges[0][1] === null
    )
      return ["Hours not set"];

    for (let i = 0; i < ranges.length; i++) {
      const range = ranges[i];
      const [time1, time2] = [
        range[0] === null ? "" : new Date(range[0]),
        range[1] === null ? "" : new Date(range[1]),
      ];
      const [time1Str, time2Str] = [
        time1 === null || time1 === "" || time1.toString() === "Invalid Date"
          ? ""
          : Number(format(time1, "m")) === 0
          ? format(time1, "h a")
          : format(time1, "h:mm a"),
        time2 === "" || time2.toString() === "Invalid Date"
          ? ""
          : Number(format(time2, "m")) === 0
          ? format(time2, "h a")
          : format(time2, "h:mm a"),
      ];
      if (time1Str !== "" || time2Str !== "") {
        result.push(`${time1Str}-${time2Str}`);
        isAllNullValues = false;
      }
    }
    return isAllNullValues ? ["Hours not set"] : result;
  }

  function truncateText(str, length) {
    return str.length <= length ? str : `${str.substring(0, length + 1)} ...`;
  }

  return (
    <div>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Hours of Operation
      </Typography>

      <Box className="flex-row-space">
        {/* Business Hours */}
        <Box
          className="flex-col-start hover-container"
          sx={{ width: "50%", px: 1 }}
        >
          <Box className="flex-row-start" sx={{ mb: 1, alignItems: "center" }}>
            <Typography sx={{ mr: 1 }}>Business Hours</Typography>
            <IconButton
              size="small"
              className="icon-button"
              onClick={handleOpen}
            >
              <Edit fontSize="inherit" />
            </IconButton>
          </Box>
          {businessHours.map((day, i) => (
            <Box
              className="flex-row-space"
              sx={{ mb: i !== businessHours.length - 1 ? 0.5 : 0 }}
            >
              <Typography variant="caption" fontWeight="bold" display="block">
                {/* ID is located at index 3 of each day's array */}
                {daysOfWeek[day[3]]}
                {/* {daysOfWeek[day[3]].substring(0, 4)} */}
              </Typography>

              <Box className="flex-col-start">
                {convertArrToText(day).map((range) => (
                  <Typography
                    variant="caption"
                    display="block"
                    textAlign="right"
                  >
                    {truncateText(range, 15)}
                  </Typography>
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        {/* Support Hours */}
        <Box className="flex-col-start" sx={{ width: "50%", px: 1 }}>
          <Typography sx={{ mb: 1 }}>Support Hours</Typography>
          <Box className="flex-row-space">
            <Typography variant="caption" fontWeight="bold">
              Monday
            </Typography>
            <Typography variant="caption">10 AM–12 PM</Typography>
          </Box>
          <Box className="flex-row-space">
            <Typography variant="caption" fontWeight="bold">
              Tuesday
            </Typography>
            <Typography variant="caption">10 AM–12 PM</Typography>
          </Box>
          <Box className="flex-row-space">
            <Typography variant="caption" fontWeight="bold">
              Wednesday
            </Typography>
            <Typography variant="caption">10 AM–12 PM</Typography>
          </Box>
          <Box className="flex-row-space">
            <Typography variant="caption" fontWeight="bold">
              Thursday
            </Typography>
            <Typography variant="caption">10 AM–12 PM</Typography>
          </Box>
          <Box className="flex-row-space">
            <Typography variant="caption" fontWeight="bold">
              Friday
            </Typography>
            <Typography variant="caption">10 AM–12 PM</Typography>
          </Box>
          <Box className="flex-row-space">
            <Typography variant="caption" fontWeight="bold">
              Saturday
            </Typography>
            <Typography variant="caption">Closed</Typography>
          </Box>
          <Box className="flex-row-space">
            <Typography variant="caption" fontWeight="bold">
              Sunday
            </Typography>
            <Typography variant="caption">3–11 PM</Typography>
          </Box>
        </Box>
      </Box>

      <Modal open={openBusinessHours} onClose={handleClose}>
        <BusinessHours handleClose={handleClose} />
      </Modal>
    </div>
  );
}
