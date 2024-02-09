import { Cancel, Edit } from "@mui/icons-material";
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
import {
  businessCategories,
  findIndex,
  updateArray,
} from "../../../../../../utils/Helpers";

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

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isEditBCActive, setIsEditBCActive] = useState(false);

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
