import {
  Accessible,
  BakeryDining,
  BookOnline,
  Business,
  Cancel,
  DeliveryDining,
  DinnerDining,
  DirectionsBus,
  DirectionsCar,
  Diversity2,
  Edit,
  EvStation,
  Fastfood,
  Flatware,
  FoodBank,
  Groups3,
  Kitchen,
  Liquor,
  LocalAtm,
  LocalCafe,
  LocalDining,
  LocalParking,
  LocalPizza,
  LocalShipping,
  Luggage,
  LunchDining,
  Nightlife,
  RoomService,
  SportsBar,
  TableRestaurant,
  TakeoutDining,
  Transgender,
  Wifi,
  WineBar,
} from "@mui/icons-material";
import {
  Box,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  Link,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { truncateText, updateArray } from "../../../../../utils/Helpers";

export default function About() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [desc, setDesc] = useState("");
  const [isEditBCActive, setIsEditBCActive] = useState(false);
  const [showMoreDesc, setShowMoreDesc] = useState(false);
  const [isEditDescActive, setIsEditDescActive] = useState(false);
  const [isEditODActive, setIsEditODActive] = useState(false);
  const [isEditAmenitiesActive, setIsEditAmenitiesActive] = useState(false);
  const [showMoreAmenities, setShowMoreAmenities] = useState(false);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const businessCategories = [
    { icon: <BakeryDining />, name: "Bakery" },
    { icon: <Liquor />, name: "Bar" },
    { icon: <SportsBar />, name: "Brewery" },
    { icon: <Flatware />, name: "Buffet" },
    { icon: <LocalCafe />, name: "Cafe" },
    { icon: <Nightlife />, name: "Club & Nightlife" },
    { icon: <DirectionsCar />, name: "Dessert shop" },
    { icon: <DirectionsCar />, name: "Drive-In" },
    { icon: <LunchDining />, name: "Fast casual restaurant" },
    { icon: <Fastfood />, name: "Fast food" },
    { icon: <DinnerDining />, name: "Fine dining" },
    { icon: <FoodBank />, name: "Food hall" },
    { icon: <LocalShipping />, name: "Food truck" },
    { icon: <Kitchen />, name: "Ghost kitchen" },
    { icon: <Luggage />, name: "Hotel restaurant" },
    { icon: <Business />, name: "Multi-unit restaurant/group" },
    { icon: <LocalDining />, name: "Neighborhood spot" },
    { icon: <LocalPizza />, name: "Pizzeria" },
    { icon: <RoomService />, name: "Private chef" },
    { icon: <WineBar />, name: "Winery" },
  ];
  const testDesc =
    "Tell us about your business. Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat vel rem odit! Repellat voluptatibus assumenda corrupti illo. Dignissimos, assumenda est numquam vel, magnam quos voluptatem amet adipisci accusamus nemo praesentium!";
  const descLimitLength = 50;
  const descMaxLength = 750;

  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState(null);
  const dayArr = Array(31).fill("");

  function isValidDay(dayStr, month, yearStr) {
    const monthsWith31Days = [
      "January",
      "March",
      "May",
      "July",
      "August",
      "October",
      "December",
    ];

    let isValid = false;
    const [day, year] = [Number(dayStr), Number(yearStr)];

    switch (day) {
      case 29:
        if (month !== "February" || (year >= 0 && year % 4 === 0))
          isValid = true;
        break;
      case 30:
        if (month !== "February") isValid = true;
        break;
      case 31:
        if (monthsWith31Days.indexOf(month) !== -1) isValid = true;
        break;
      default:
        isValid = true;
        break;
    }

    return isValid;
  }

  function findIndex(arr, key, value) {
    for (let i = 0; i < arr.length; i++) {
      const obj = arr[i];
      if (obj[key] === value) return i;
    }
    return -1;
  }

  const handleChange = (e) => {
    setSelectedCategories(
      typeof e.target.value === "string"
        ? e.target.value.split(",")
        : e.target.value
    );
  };

  return (
    <Box>
      <Typography variant="h6">About</Typography>

      {/* Business categories */}
      <Box className="hover-container" sx={{ mb: 1.5 }}>
        {/* Header and Button */}
        <Box className="flex-row-start" sx={{ mb: 0, alignItems: "center" }}>
          <Typography variant="subtitle1" sx={{ mr: 1 }}>
            Business categories
          </Typography>
          <IconButton
            size="small"
            className="icon-button"
            onClick={() => setIsEditBCActive(!isEditBCActive)}
          >
            <Edit fontSize="inherit" />
          </IconButton>
        </Box>

        {/* Dropdown and Text */}
        {isEditBCActive ? (
          <Box className="flex-col" sx={{ mt: 1 }}>
            <FormControl sx={{ width: 300 }}>
              <InputLabel id="business-category-dropdown-label">
                Business categories
              </InputLabel>
              <Select
                labelId="business-category-dropdown-label"
                multiple
                value={selectedCategories}
                onChange={handleChange}
                input={
                  <OutlinedInput
                    id="select-multiple-chip"
                    label="Business categories"
                  />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {selected.map((value) => (
                      <Chip
                        icon={
                          businessCategories[
                            findIndex(businessCategories, "name", value)
                          ].icon
                        }
                        key={value}
                        label={value}
                        clickable
                        size="small"
                        deleteIcon={
                          <Cancel onMouseDown={(e) => e.stopPropagation()} />
                        }
                        onDelete={() => {
                          setSelectedCategories(
                            updateArray(selectedCategories, value)
                          );
                        }}
                      />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {businessCategories.map((category) => (
                  <MenuItem key={category.name} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              Add as many as you like and in the order of relevance.
            </Typography>
          </Box>
        ) : (
          <Box>
            <Typography color="text.secondary">
              Pizzeria, Bar, Fast casual restaurant
            </Typography>
          </Box>
        )}
      </Box>

      {/* Description */}
      <Box className="hover-container" sx={{ mb: 1.5 }}>
        {/* Header and Button */}
        <Box className="flex-row-start" sx={{ mb: 0, alignItems: "center" }}>
          <Typography variant="subtitle1" sx={{ mr: 1 }}>
            Description
          </Typography>
          <IconButton
            size="small"
            className="icon-button"
            onClick={() => setIsEditDescActive(!isEditDescActive)}
          >
            <Edit fontSize="inherit" />
          </IconButton>
        </Box>

        {/* TextField and Text */}
        {isEditDescActive ? (
          <Box sx={{ mt: 1 }}>
            <TextField
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              fullWidth
              multiline
              placeholder="Tell us about your business."
              rows={4}
            />
            <Typography variant="caption">
              {desc.length} / {descMaxLength}
            </Typography>
          </Box>
        ) : (
          <Box>
            <Typography color="text.secondary" display="inline" sx={{ mr: 1 }}>
              {showMoreDesc
                ? testDesc
                : truncateText(testDesc, descLimitLength)}
            </Typography>
            {testDesc.length > descLimitLength && (
              <Link
                onClick={() => {
                  setShowMoreDesc(!showMoreDesc);
                }}
                color="info.main"
                underline="hover"
              >
                <Typography display="inline-block">
                  {showMoreDesc ? "See less" : "See more"}
                </Typography>
              </Link>
            )}
          </Box>
        )}
      </Box>

      {/* Opening date */}
      <Box className="hover-container" sx={{ mb: 1.5 }}>
        {/* Header and Button */}
        <Box className="flex-row-start" sx={{ mb: 0, alignItems: "center" }}>
          <Typography variant="subtitle1" sx={{ mr: 1 }}>
            Opening date
          </Typography>
          <IconButton
            size="small"
            className="icon-button"
            onClick={() => setIsEditODActive(!isEditODActive)}
          >
            <Edit fontSize="inherit" />
          </IconButton>
        </Box>

        {/* Dropdowns, Textfield, and Text */}
        {isEditODActive ? (
          <Box className="flex-row-start" sx={{ mt: 1 }}>
            {/* Month Dropdown */}
            <FormControl size="small" sx={{ width: "8rem" }}>
              <InputLabel id="opening-month-label">Month *</InputLabel>
              <Select
                labelId="opening-month-label"
                value={month}
                label="Month *"
                onChange={(e) => setMonth(e.target.value)}
                required
              >
                <MenuItem value="January">January</MenuItem>
                <MenuItem value="February">February</MenuItem>
                <MenuItem value="March">March</MenuItem>
                <MenuItem value="April">April</MenuItem>
                <MenuItem value="May">May</MenuItem>
                <MenuItem value="June">June</MenuItem>
                <MenuItem value="July">July</MenuItem>
                <MenuItem value="August">August</MenuItem>
                <MenuItem value="September">September</MenuItem>
                <MenuItem value="October">October</MenuItem>
                <MenuItem value="November">November</MenuItem>
                <MenuItem value="December">December</MenuItem>
              </Select>
            </FormControl>

            {/* Day Dropdown */}
            <FormControl size="small" sx={{ width: "6rem", mx: 1 }}>
              <InputLabel id="opening-day-label">Day</InputLabel>
              <Select
                labelId="opening-day-label"
                value={day}
                label="Day"
                onChange={(e) => setDay(e.target.value)}
              >
                <MenuItem value={0}>None</MenuItem>
                {dayArr.map(
                  (el, i) =>
                    isValidDay(i + 1, month, year) && (
                      <MenuItem key={i + 1} value={i + 1}>
                        {i + 1}
                      </MenuItem>
                    )
                )}
              </Select>
            </FormControl>

            {/* Year TextField */}
            <TextField
              value={year}
              onChange={(e) => setYear(e.target.value)}
              label="Year"
              required
              size="small"
              // type="number"
              sx={{ width: "5rem" }}
              variant="outlined"
            />
          </Box>
        ) : (
          <Box>
            <Typography color="text.secondary">
              Opened in October 2023
            </Typography>
          </Box>
        )}
      </Box>

      {/* Amenities and more */}
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
              color="info.main"
              underline="hover"
            >
              <Typography sx={{ m: 0.5 }}>
                {showMoreAmenities ? "See less" : "See more"}
              </Typography>
            </Link>
          </Box>
        )}
      </Box>
    </Box>
  );
}
