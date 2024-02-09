import { Paper, Typography } from "@mui/material";
import { languages } from "../../../../../../utils/UIObjects";
import { useSelector } from "react-redux";
import format from "date-fns/format";

export default function SpecialHoursCard({
  date,
  dateLabel,
  isClosed,
  isOpen24Hours,
  ranges,
}) {
  const language = useSelector((state) => state.language.selectedLanguage);

  function convertArrToText(arrString) {
    function isNull(val) {
      return val === null;
    }

    const result = [];
    const arr = JSON.parse(arrString);
    if (arr.length === 1 && isNull(arr[0][0]) && isNull(arr[0][1])) return null;

    for (let i = 0; i < arr.length; i++) {
      const range = arr[i];
      const [time1, time2] = [
        isNull(range[0]) ? "" : new Date(range[0]),
        isNull(range[1]) ? "" : new Date(range[1]),
      ];
      const [time1Str, time2Str] = [
        isNull(time1) || time1 === "" || time1.toString() === "Invalid Date"
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
      result.push(`${time1Str}-${time2Str}`);
    }
    return result;
  }

  const rangeStrings = convertArrToText(ranges);

  return (
    <Paper elevation={3} sx={{ width: "13rem", p: 2 }}>
      {/* To-Do: Make it say "adjusted hours" or "closed" depending on the hours */}
      <Typography fontSize={14} fontWeight="bold" display="block">
        {format(new Date(date), "PP", {
          locale: languages[language].locale,
        })}
      </Typography>
      <Typography
        fontSize={13}
        fontWeight="bold"
        display="block"
        sx={{ mb: 1 }}
      >
        {dateLabel}
      </Typography>

      {isClosed && (
        <Typography variant="caption" display="block">
          Closed
        </Typography>
      )}

      {isOpen24Hours && (
        <Typography variant="caption" display="block">
          Open all day
        </Typography>
      )}

      {rangeStrings &&
        rangeStrings.map((rangeStr) => (
          <Typography variant="caption" display="block">
            {rangeStr}
          </Typography>
        ))}
    </Paper>
  );
}
