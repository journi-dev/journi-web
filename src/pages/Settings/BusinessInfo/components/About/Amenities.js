import {
  Accessible,
  BookOnline,
  DeliveryDining,
  DirectionsBus,
  Diversity2,
  Edit,
  EvStation,
  Groups3,
  LocalAtm,
  LocalParking,
  TableRestaurant,
  TakeoutDining,
  Transgender,
  Wifi,
} from "@mui/icons-material";
import { Box, Chip, IconButton, Link, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function Amenities() {
  const isDark = useSelector((state) => state.appearance.isDark);

  const [isEditAmenitiesActive, setIsEditAmenitiesActive] = useState(false);
  const [showMoreAmenities, setShowMoreAmenities] = useState(false);

  return (
    <Box className="hover-container">
      {/* Header and Button */}
      <Box className="flex-row-start" sx={{ mb: 0, alignItems: "center" }}>
        <Typography variant="subtitle1" sx={{ mr: 1 }}>
          Amenities and more
        </Typography>
        <IconButton
          size="small"
          className="icon-button"
          onClick={() => setIsEditAmenitiesActive(!isEditAmenitiesActive)}
        >
          <Edit fontSize="inherit" />
        </IconButton>
      </Box>

      {/* Chips */}
      {isEditAmenitiesActive ? (
        <Box sx={{ mt: 1 }}>
          {/* Chips */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            <Chip
              icon={<LocalAtm />}
              label="Has ATM"
              onDelete={() => {}}
              size="small"
            />
            <Chip
              icon={<LocalParking />}
              label="Customer parking"
              onDelete={() => {}}
              size="small"
            />
            <Chip
              icon={<EvStation />}
              label="EV Station"
              onDelete={() => {}}
              size="small"
            />
            <Chip
              icon={<DirectionsBus />}
              label="Near transit"
              onDelete={() => {}}
              size="small"
            />
            <Chip
              icon={<BookOnline />}
              label="Reservations allowed"
              onDelete={() => {}}
              size="small"
            />
            <Chip
              icon={<Wifi />}
              label="Wi-Fi"
              onDelete={() => {}}
              size="small"
            />
            <Chip
              icon={<TableRestaurant />}
              label="Dine-in"
              onDelete={() => {}}
              size="small"
            />
            <Chip
              icon={<TakeoutDining />}
              label="Takeout"
              onDelete={() => {}}
              size="small"
            />
            <Chip
              icon={<DeliveryDining />}
              label="Delivery"
              onDelete={() => {}}
              size="small"
            />
            <Chip
              icon={<Transgender />}
              label="Gender-neutral restrooms"
              onDelete={() => {}}
              size="small"
            />
            <Chip
              icon={<Diversity2 />}
              label="Open to all"
              onDelete={() => {}}
              size="small"
            />
            <Chip
              icon={<Accessible />}
              label="Wheelchair-accessible"
              onDelete={() => {}}
              size="small"
            />
            <Chip
              icon={<Groups3 />}
              label="Large party seating"
              onDelete={() => {}}
              size="small"
            />
            <Chip label="Asian-owned" onDelete={() => {}} size="small" />
            <Chip label="Black-owned" onDelete={() => {}} size="small" />
            <Chip label="Latinx-owned" onDelete={() => {}} size="small" />
            <Chip label="LGBTQ+-owned" onDelete={() => {}} size="small" />
            <Chip label="Veteran-owned" onDelete={() => {}} size="small" />
            <Chip label="Woman-owned" onDelete={() => {}} size="small" />
          </Box>
        </Box>
      ) : (
        <Box sx={{ mt: 1 }}>
          {/* Chips */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            <Chip icon={<LocalAtm />} label="Has ATM" size="small" />
            <Chip
              icon={<LocalParking />}
              label="Customer parking"
              size="small"
            />
            <Chip icon={<EvStation />} label="EV Station" size="small" />
            <Chip icon={<Wifi />} label="Wi-Fi" size="small" />
            <Chip icon={<TakeoutDining />} label="Takeout" size="small" />
            <Chip icon={<DeliveryDining />} label="Delivery" size="small" />
          </Box>
          <Link
            onClick={() => {
              setShowMoreAmenities(!showMoreAmenities);
            }}
            color={isDark ? "primary.main" : "text.primary"}
            underline="hover"
          >
            <Typography sx={{ m: 0.5 }}>
              {showMoreAmenities ? "See less" : "See more"}
            </Typography>
          </Link>
        </Box>
      )}
    </Box>
  );
}
