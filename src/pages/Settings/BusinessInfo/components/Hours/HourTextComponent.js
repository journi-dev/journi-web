import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import format from "date-fns/format";
import { convertObjToArr } from "../../../../../utils/Helpers";

export default function HourTextComponent({ hoursType, dayOfWeek, name }) {
  const ranges = convertObjToArr(
    useSelector((state) => state[hoursType][name].ranges)
  );
  const isClosed = useSelector((state) => state[hoursType][name].isClosed);
  const isOpen24Hours = useSelector(
    (state) => state[hoursType][name].isOpen24Hours
  );

  function convertRangeToText() {
    const resultArr = [];
    let isAllNullValues = true;
    let result = "";

    if (isClosed) return "Closed";
    else if (isOpen24Hours) return "Open all day";
    else if (
      ranges.length === 1 &&
      ranges[0][0] === null &&
      ranges[0][1] === null
    )
      return "Hours not set";

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
        resultArr.push(`${time1Str}–${time2Str}`);
        isAllNullValues = false;
      }
    }
    result = resultArr.join("; ");
    return isAllNullValues ? "Hours not set" : result;
  }

  return (
    <div>
      <Box className="flex-row-start" sx={{ mb: 1 }}>
        {/* Day of the Week */}
        <Typography
          sx={{
            width: "6em",
            fontWeight: "bold",
            textAlign: "right",
            mr: 1,
          }}
        >
          {dayOfWeek}:
        </Typography>

        {/* Hours */}
        <Typography
          fontStyle={
            convertRangeToText() === "Hours not set" ? "italic" : "normal"
          }
          color={
            convertRangeToText() === "Hours not set"
              ? "text.secondary"
              : "text.primary"
          }
        >
          {convertRangeToText()}
        </Typography>
      </Box>
    </div>
  );
}
