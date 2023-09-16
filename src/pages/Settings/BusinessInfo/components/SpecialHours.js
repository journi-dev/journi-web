import { Add } from "@mui/icons-material";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import SpecialHoursCard from "./SpecialHoursCard";
import { useState } from "react";
import SpecialHoursModal from "./SpecialHoursModal";

export default function SpecialHours() {
  const [open, setOpen] = useState(false);
  const testArr = [1, 2, 3, 4, 5];

  const handleOpen = () => setOpen(true);

  return (
    <Box>
      {/* Special Hours */}
      <Box className="flex-col-start hover-container" sx={{ px: 1, mt: 2 }}>
        <Box className="flex-row-start" sx={{ mb: 1, alignItems: "center" }}>
          <Typography sx={{ mr: 1 }}>Special Hours</Typography>
          <IconButton size="small" className="icon-button" onClick={handleOpen}>
            <Add fontSize="inherit" />
          </IconButton>
        </Box>

        <Box
          className="flex-row-start"
          sx={{ overflowX: "scroll", pb: 2, alignItems: "center" }}
        >
          {testArr.map(() => (
            <Box sx={{ mr: 2 }}>
              <SpecialHoursCard />
            </Box>
          ))}
          <div>
            <IconButton onClick={handleOpen}>
              <Add />
            </IconButton>
          </div>
        </Box>
      </Box>

      {/* Special Hours Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <SpecialHoursModal handleClose={() => setOpen(false)} />
      </Modal>
    </Box>
  );
}
