import { Edit } from "@mui/icons-material";
import { Box, IconButton, Link, Modal, Paper, Typography } from "@mui/material";
import { useState } from "react";
import useFetchHours from "../../../../../hooks/useFetchHours";
import { useSelector } from "react-redux";
import format from "date-fns/format";
import EditHoursModal from "./EditHoursModal";
import SpecialHours from "./SpecialHours";

export default function Hours() {
  const [openBusinessHours, setOpenBusinessHours] = useState(false);
  const [openSupportHours, setOpenSupportHours] = useState(false);

  const [businessHourslastUpdated, supportHourslastUpdated] = [
    useSelector((state) => state.businessHours.lastUpdated),
    useSelector((state) => state.supportHours.lastUpdated),
  ];

  const businessHours = useFetchHours("business", businessHourslastUpdated);
  const supportHours = useFetchHours("support", supportHourslastUpdated);

  const [groupedBusinessHours, groupedSupportHours] = [
    groupById(businessHours),
    groupById(supportHours),
  ];

  function groupById(arr) {
    let idMap = new Map();
    const strArr = [];
    const result = [];

    for (const el of arr) {
      const id = el[3];
      const str = [el[0], el[1], el[2]].toString();
      const strIndex = strArr.indexOf(str);

      if (strIndex === -1) {
        idMap.set(strArr.length, [id]);
        strArr.push(str);
      } else {
        const otherIds = idMap.get(strIndex);
        idMap.set(strIndex, [...otherIds, id]);
      }
    }

    idMap.forEach((val) => {
      result.push(val);
    });
    return result;
  }

  function listDays(arr) {
    function listify(str) {
      const ranges = str.split(", ");
      const resultArr = [];

      for (const range of ranges) {
        const days = range.split(" & ");
        const [firstDay, lastDay] = [days[0], days[days.length - 1]];

        if (days.length === 1) resultArr.push(firstDay);
        else if (days.length === 2) resultArr.push(days.join(" & "));
        else resultArr.push(`${firstDay}-${lastDay}`);
      }
      return resultArr.join(", ");
    }

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let str = "";

    for (let i = 0; i < arr.length; i++) {
      const [prev, curr] = [arr[i - 1], arr[i]];
      const day = days[curr];

      if (i === 0) str += day;
      else if (curr - prev === 1 || arr.length <= 2) str += ` & ${day}`;
      else if (curr - prev === 6) str = `${day} & ${str}`;
      else if (curr - prev > 1) str += `, ${day}`;
    }
    return listify(str);
  }

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
      <Box className="flex-col-start">
        <Typography variant="h6" sx={{ mb: 2 }}>
          Hours of Operation
        </Typography>

        {/* Business & Support Hours */}
        <Box className="flex-row-space">
          {/* Business Hours */}
          <Paper
            elevation={3}
            className="flex-col-start hover-container"
            sx={{ width: "50%", px: 2, py: 1, mr: 1 }}
          >
            <Box className="flex-col-space" sx={{ flexGrow: 1 }}>
              <Box>
                <Box
                  className="flex-row-start"
                  sx={{ mb: 1, alignItems: "center" }}
                >
                  <Typography>Business Hours</Typography>
                  <IconButton
                    size="small"
                    className="icon-button"
                    onClick={() => setOpenBusinessHours(true)}
                  >
                    <Edit fontSize="inherit" />
                  </IconButton>
                </Box>
                {groupedBusinessHours.map((group, i) => (
                  <Box
                    className="flex-row-space"
                    sx={{ mb: i !== groupedBusinessHours.length - 1 ? 0.5 : 0 }}
                  >
                    <Typography
                      variant="caption"
                      fontWeight="bold"
                      display="block"
                    >
                      {listDays(group)}
                    </Typography>

                    <Box className="flex-col-start">
                      {convertArrToText(businessHours[group[0]]).map(
                        (range) => (
                          <Typography
                            variant="caption"
                            display="block"
                            textAlign="right"
                          >
                            {truncateText(range, 15)}
                          </Typography>
                        )
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>
              <Box sx={{ m: "0 auto", mt: 0.5 }}>
                <Link onClick={() => {}} underline="hover">
                  <Typography color="text.secondary" variant="caption">
                    Add Temporary Hours
                  </Typography>
                </Link>
              </Box>
            </Box>
          </Paper>

          {/* Support Hours */}
          <Paper
            elevation={3}
            className="flex-col-start hover-container"
            sx={{ width: "50%", px: 2, py: 1, ml: 1 }}
          >
            <Box className="flex-col-space" sx={{ flexGrow: 1 }}>
              <Box>
                <Box
                  className="flex-row-start"
                  sx={{ mb: 1, alignItems: "center" }}
                >
                  <Typography>Support Hours</Typography>
                  <IconButton
                    size="small"
                    className="icon-button"
                    onClick={() => setOpenSupportHours(true)}
                  >
                    <Edit fontSize="inherit" />
                  </IconButton>
                </Box>
                {groupedSupportHours.map((group, i) => (
                  <Box
                    className="flex-row-space"
                    sx={{ mb: i !== groupedSupportHours.length - 1 ? 0.5 : 0 }}
                  >
                    <Typography
                      variant="caption"
                      fontWeight="bold"
                      display="block"
                    >
                      {listDays(group)}
                    </Typography>

                    <Box className="flex-col-start">
                      {convertArrToText(supportHours[group[0]]).map((range) => (
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
              <Box sx={{ m: "0 auto", mt: 0.5 }}>
                <Link onClick={() => {}} underline="hover">
                  <Typography color="text.secondary" variant="caption">
                    Add Temporary Hours
                  </Typography>
                </Link>
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* Special Hours */}
        <SpecialHours />
      </Box>

      {/* Business Hours Modal */}
      <Modal
        open={openBusinessHours}
        onClose={() => setOpenBusinessHours(false)}
      >
        <EditHoursModal
          hoursType="business"
          handleClose={() => setOpenBusinessHours(false)}
        />
      </Modal>

      {/* Support Hours Modal */}
      <Modal open={openSupportHours} onClose={() => setOpenSupportHours(false)}>
        <EditHoursModal
          hoursType="support"
          handleClose={() => setOpenSupportHours(false)}
        />
      </Modal>
    </div>
  );
}
