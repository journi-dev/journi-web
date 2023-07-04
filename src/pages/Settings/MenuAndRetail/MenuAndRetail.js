import { Add, Edit, FileUpload, Keyboard, Save } from "@mui/icons-material";
import {
  Box,
  ListItemIcon,
  Menu,
  MenuItem,
  Modal,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { CustomButton } from "../../../components/ui/CustomComponents";
import Masonry from "react-masonry-css";
import MenuCategoryLoadingCard from "./components/MenuCategoryLoadingCard";
import { WattsnTabTitle } from "../../../utils/WattsnTabTitle";
import MenuAndRetailItems from "./components/MenuAndRetailItems";
import { useDispatch, useSelector } from "react-redux";
import MenuFileUploadForm from "./components/MenuFileUploadForm";
import { setIsEditActive } from "../../../context/features/Settings";

// TODO: Make based on theme with makeStyles
const breakpoints = {
  default: 3,
  1100: 2,
  700: 1,
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
};

export default function MenuAndRetail() {
  WattsnTabTitle("Menu & Retail Settings");

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.settings.isLoading);
  const isEditActive = useSelector((state) => state.settings.isEditActive);

  const [openIndividualMenuItemsForm, setOpenIndividualMenuItemsForm] =
    useState(false);
  const [openMultipleMenuItemsForm, setOpenMultipleMenuItemsForm] =
    useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <div>
      {/* Header & Buttons */}
      <Box className="flex-row-space" sx={{ mb: 2 }}>
        <Typography variant="h5" component="h1">
          Menu & Retail
        </Typography>
        <Box sx={{ ml: 3 }}>
          <CustomButton
            disableElevation
            onClick={handleClick}
            variant="contained"
            startIcon={<Add />}
            sx={{ borderRadius: 25, mr: 1 }}
          >
            Add
          </CustomButton>
          <CustomButton
            color={isEditActive ? "secondary" : "primary"}
            disableElevation
            variant="contained"
            startIcon={isEditActive ? <Save /> : <Edit />}
            sx={{ borderRadius: 25 }}
            onClick={() => dispatch(setIsEditActive(!isEditActive))}
          >
            {isEditActive ? "Save" : "Edit"}
          </CustomButton>
        </Box>
      </Box>

      {/* Add Button Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          dense
          key="individual"
          onClick={() => {
            setOpenIndividualMenuItemsForm(true);
            handleClose();
          }}
        >
          <ListItemIcon>
            <Keyboard />
          </ListItemIcon>
          Add items manually
        </MenuItem>
        <MenuItem
          dense
          key="muliple"
          onClick={() => {
            setOpenMultipleMenuItemsForm(true);
            handleClose();
          }}
        >
          <ListItemIcon>
            <FileUpload />
          </ListItemIcon>
          Add items via file upload
        </MenuItem>
      </Menu>

      {/* Loading Menu Cards */}
      {isLoading && (
        <div>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Loading...
          </Typography>
          <Masonry
            breakpointCols={breakpoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            <MenuCategoryLoadingCard itemCount={3} />
            <MenuCategoryLoadingCard itemCount={1} />
            <MenuCategoryLoadingCard itemCount={2} />
            <MenuCategoryLoadingCard itemCount={2} />
            <MenuCategoryLoadingCard itemCount={4} />
            <MenuCategoryLoadingCard itemCount={3} />
          </Masonry>
        </div>
      )}

      {/* Menu Cards */}
      <MenuAndRetailItems />

      {/* "Add items via file upload" Modal */}
      <Modal
        open={openMultipleMenuItemsForm}
        onClose={() => setOpenMultipleMenuItemsForm(false)}
      >
        <Box sx={modalStyle}>
          <MenuFileUploadForm />
        </Box>
      </Modal>
    </div>
  );
}
