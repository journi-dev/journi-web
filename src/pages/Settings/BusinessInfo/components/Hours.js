import { Edit } from "@mui/icons-material";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import BusinessHours from "./BusinessHours";
import { useState } from "react";

export default function Hours() {
  const [openBusinessHours, setOpenBusinessHours] = useState(false);
  const handleOpen = () => setOpenBusinessHours(true);
  const handleClose = () => setOpenBusinessHours(false);

  return (
    <div>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Hours of Operation
      </Typography>
      <Box className="flex-row-space">
        {/* Business Hours */}
        <Box className="flex-col-start" sx={{ width: "50%", px: 1 }}>
          <Box
            className="flex-row-start hover-container"
            sx={{ mb: 1, alignItems: "center" }}
          >
            <Typography sx={{ mr: 1 }}>Business Hours</Typography>
            <IconButton
              size="small"
              className="icon-button"
              onClick={handleOpen}
            >
              <Edit fontSize="inherit" />
            </IconButton>
          </Box>
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
        <BusinessHours />
      </Modal>
    </div>
  );
}
