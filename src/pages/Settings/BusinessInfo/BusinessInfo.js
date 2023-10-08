import { Edit, Save } from "@mui/icons-material";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { CustomButton } from "../../../components/ui/CustomComponents";
import { WattsnTabTitle } from "../../../utils/WattsnTabTitle";
import LegalAndContactInfo from "./components/Hours/LegalAndContactInfo";
import Hours from "./components/Hours/Hours"

export default function BusinessInfo() {
  WattsnTabTitle("Business Info Settings");

  const [isEditActive, setIsEditActive] = useState(false);

  return (
    <div>
      <Box className="flex-row-start" sx={{ mb: 2 }}>
        <Typography variant="h5">Business Info</Typography>
        <CustomButton
          color={isEditActive ? "secondary" : "primary"}
          disableElevation
          variant="contained"
          startIcon={isEditActive ? <Save /> : <Edit />}
          sx={{ borderRadius: 25, ml: 3 }}
          onClick={() => setIsEditActive(!isEditActive)}
        >
          {isEditActive ? "Save" : "Edit"}
        </CustomButton>
      </Box>

      <Grid container>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ m: 2, p: 2 }}>
            <LegalAndContactInfo isEditActive={isEditActive} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ m: 2, p: 2 }}>
            <Typography variant="h6">About</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ m: 2, p: 2 }}>
            <Hours />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ m: 2, p: 2 }}>
            <Typography variant="h6">Delivery & Shipping</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ m: 2, p: 2 }}>
            <Typography variant="h6">Social Platforms</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ m: 2, p: 2 }}>
            <Typography variant="h6">Team</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Typography>Delivery Settings</Typography>
      <Typography>Enable delivery chekbox</Typography>
      <Typography>
        Set delivery territory by dropdown - radius, zip code, neighborhood,
        city, draw
      </Typography>
    </div>
  );
}
