import {
  BakeryDining,
  Business,
  Cancel,
  DinnerDining,
  DirectionsCar,
  Edit,
  Fastfood,
  Flatware,
  FoodBank,
  Icecream,
  Kitchen,
  Liquor,
  LocalCafe,
  LocalDining,
  LocalPizza,
  LocalShipping,
  Luggage,
  LunchDining,
  Nightlife,
  RoomService,
  SportsBar,
  WineBar,
} from "@mui/icons-material";
import {
  Box,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { updateArray } from "../../../../../utils/Helpers";

export default function BusinessCategories() {
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
    { icon: <Icecream />, name: "Dessert shop" },
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

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isEditBCActive, setIsEditBCActive] = useState(false);

  function findIndex(arr, key, value) {
    for (let i = 0; i < arr.length; i++) {
      const obj = arr[i];
      if (obj[key] === value) return i;
    }
    return -1;
  }

  function handleChange(e) {
    setSelectedCategories(
      typeof e.target.value === "string"
        ? e.target.value.split(",")
        : e.target.value
    );
  }
  return (
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
          <FormControl sx={{ width: 300, maxWidth: "100%" }}>
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
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
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
  );
}
