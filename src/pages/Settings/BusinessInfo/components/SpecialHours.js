import { Add } from "@mui/icons-material";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import SpecialHoursCard from "./SpecialHoursCard";
import { useState } from "react";
import SpecialHoursModal from "./SpecialHoursModal";
import useFetchSpecialHours from "../../../../hooks/useFetchSpecialHours";
import { useSelector } from "react-redux";
import { sortArrOfObjs } from "../../../../utils/Helpers";

export default function SpecialHours() {
  const [open, setOpen] = useState(false);
  const lastUpdated = useSelector(
    (state) => state.specialAndTempHours.lastUpdated
  );
  const isLoading = useSelector((state) => state.specialAndTempHours.isLoading);
  const isUpdating = useSelector(
    (state) => state.specialAndTempHours.isUpdating
  );
  const specialHours = sortArrOfObjs(useFetchSpecialHours(lastUpdated), "date");
  const handleOpen = () => setOpen(true);

  return (
    <Box>
      {/* Special Hours */}
      <Box className="flex-col-start hover-container" sx={{ mt: 2 }}>
        <Box className="flex-row-start" sx={{ mb: 1, alignItems: "center" }}>
          <Typography sx={{ mr: 1 }}>Special Hours</Typography>
          <IconButton
            className="icon-button"
            disabled={isLoading || isUpdating}
            onClick={handleOpen}
            size="small"
          >
            <Add fontSize="inherit" />
          </IconButton>
        </Box>

        <Box
          className="flex-row-start"
          sx={{ overflowX: "scroll", pb: 3, alignItems: "center" }}
        >
          <Box className="flex-row">
            {specialHours.map((specialEl, i) => (
              <Box
                sx={{ mr: i === specialHours.length - 1 ? 0 : 2 }}
                key={specialEl.id}
              >
                <SpecialHoursCard
                  date={specialEl.date}
                  dateLabel={specialEl.dateLabel}
                  isClosed={specialEl.isClosed}
                  isOpen24Hours={specialEl.isOpen24Hours}
                  ranges={specialEl.ranges}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Special Hours Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <SpecialHoursModal handleClose={() => setOpen(false)} />
      </Modal>
    </Box>
  );
}
