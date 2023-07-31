import {
  Add,
  Cancel,
  Delete,
  Edit,
  FileUpload,
  Keyboard,
  Refresh,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Modal,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { CustomButton } from "../../../components/ui/CustomComponents";
import { WattsnTabTitle } from "../../../utils/WattsnTabTitle";
import MenuAndRetailItems from "./components/MenuAndRetailItems";
import { useDispatch, useSelector } from "react-redux";
import MenuFileUploadForm from "./components/MenuFileUploadForm";
import {
  setIsEditActive,
  setItemIds,
  setLastUpdated,
} from "../../../context/features/Settings";
import MenuLoadingAccordion from "./components/MenuLoadingAccordion";
import axios from "axios";
import NoItemsPlaceholder from "./components/NoItemsPlaceholder";
import { makeStyles } from "tss-react/mui";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
};

const useStyles = makeStyles()((theme) => {
  return {
    container: {
      // position: "relative",
    },
  };
});

export default function MenuAndRetail() {
  WattsnTabTitle("Menu & Retail Settings");
  const { classes } = useStyles();

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.settings.isLoading);
  const error = useSelector((state) => state.settings.error);
  const menuCount = useSelector((state) => state.settings.menuCount);
  const isEditActive =
    useSelector((state) => state.settings.isEditActive) && menuCount > 0; // Needs menuCount so that if mass deletion is started but not finished, the button is not left in a state of "Delete # items".
  const itemIds = useSelector((state) => state.settings.itemIds);

  const [openIndividualMenuItemsForm, setOpenIndividualMenuItemsForm] =
    useState(false);
  const [openMultipleMenuItemsForm, setOpenMultipleMenuItemsForm] =
    useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleUpdate = () => dispatch(setLastUpdated(new Date().getTime()));
  const handleClose = () => setAnchorEl(null);
  const handleModalClose = (e, reason, setState) => {
    if (reason && reason === "backdropClick") return;
    setState(false);
  };

  const sentinelEl = document.querySelector(".sentinel");
  const stickyEl = document.querySelector(".stickyHeader");

  const handler = (entries) => {
    console.log(entries);
    // entries is an array of observed dom nodes
    // we're only interested in the first one at [0]
    // because that's our .sentinal node.
    // Here observe whether or not that node is in the viewport
    if (!entries[0].isIntersecting) stickyEl.classList.add("enabled");
    else stickyEl.classList.remove("enabled");
  };

  const observer = new window.IntersectionObserver(handler);
  observer.observe(sentinelEl);

  return (
    <div className={classes.container}>
      <div class="sentinel"></div>

      {/* Header & Buttons */}
      <Box className={`flex-row-space stickyHeader`} sx={{ mb: 2 }}>
        <Box className="flex-row-start" sx={{ alignItems: "center" }}>
          <Typography variant="h5" component="h1">
            Menu & Retail
          </Typography>
          <IconButton
            disabled={isLoading}
            onClick={handleUpdate}
            sx={{ ml: 1 }}
          >
            <Refresh fontSize="small" />
          </IconButton>
        </Box>
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
            color={isEditActive ? "error" : "primary"}
            disableElevation
            disabled={menuCount === 0}
            variant={
              isEditActive && itemIds.length === 0 ? "outlined" : "contained"
            }
            startIcon={
              isEditActive ? (
                itemIds.length === 0 ? (
                  <Cancel />
                ) : (
                  <Delete />
                )
              ) : (
                <Edit />
              )
            }
            sx={{ borderRadius: 25 }}
            onClick={() => {
              dispatch(setIsEditActive(!isEditActive));
              if (itemIds.length > 0) {
                axios.delete(`/menu/${itemIds.join("~")}/delete`).then(() => {
                  dispatch(setItemIds([]));
                  handleUpdate();
                  dispatch(setIsEditActive(!isEditActive));
                });
              }
            }}
          >
            {isEditActive
              ? itemIds.length === 0
                ? "Cancel"
                : `Delete${
                    itemIds.length > 0
                      ? ` ${itemIds.length} item${
                          itemIds.length === 1 ? "" : "s"
                        }`
                      : ""
                  }`
              : "Select Multiple"}
          </CustomButton>
          {isEditActive && itemIds.length > 0 && (
            <CustomButton
              color={"error"}
              disableElevation
              variant="outlined"
              startIcon={<Cancel />}
              sx={{ borderRadius: 25, ml: 1 }}
              onClick={() => {
                dispatch(setIsEditActive(false));
              }}
            >
              Cancel
            </CustomButton>
          )}
        </Box>
      </Box>

      {/* Loading Menu Cards */}
      {isLoading && menuCount === 0 && (
        <div>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Loading...
          </Typography>
          <MenuLoadingAccordion />
          <MenuLoadingAccordion />
          <MenuLoadingAccordion />
        </div>
      )}

      {/* Menu Cards */}
      <MenuAndRetailItems />

      {/* Placeholder */}
      {menuCount === 0 && !isLoading && !error && <NoItemsPlaceholder />}

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

      {/* "Add items manually" Modal */}
      <Modal
        // hideBackdrop
        open={openIndividualMenuItemsForm}
        onClose={(e, reason) =>
          handleModalClose(e, reason, setOpenIndividualMenuItemsForm)
        }
      >
        <Box sx={modalStyle}>Coming soon!</Box>
      </Modal>

      {/* "Add items via file upload" Modal */}
      <Modal
        open={openMultipleMenuItemsForm}
        onClose={(e, reason) =>
          handleModalClose(e, reason, setOpenMultipleMenuItemsForm)
        }
      >
        <Box sx={modalStyle}>
          <MenuFileUploadForm
            onClose={(e, reason) =>
              handleModalClose(e, reason, setOpenMultipleMenuItemsForm)
            }
          />
        </Box>
      </Modal>
    </div>
  );
}
