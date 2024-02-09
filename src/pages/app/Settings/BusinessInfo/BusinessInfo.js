import { Edit, Save } from "@mui/icons-material";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { CustomButton } from "../../../../components/ui/CustomComponents";
import Hours from "./components/Hours/Hours";
import About from "./components/About/About";
import LegalAndContactInfo from "./components/LegalAndContactInfo";
import Platforms from "./components/Platforms";
import { WatsonTabTitle } from "../../../../utils/WatsonTabTitle";

export default function BusinessInfo() {
  WatsonTabTitle("Business Info Settings");

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
            <About />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper sx={{ m: 2, p: 2 }}>
            <Platforms />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Paper sx={{ m: 2, p: 2 }}>
            <Hours />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Paper sx={{ m: 2, p: 2 }}>
            <Typography variant="h6">Delivery & Shipping</Typography>
            <Typography>Delivery Settings</Typography>
            <Typography>Enable delivery chekbox</Typography>
            <Typography>
              Set delivery territory by dropdown - radius, zip code,
              neighborhood, city, draw
            </Typography>
            <Typography>show mapbox map of delivery territory</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
