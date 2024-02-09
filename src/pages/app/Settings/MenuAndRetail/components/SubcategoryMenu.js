import { Delete, DriveFileRenameOutline } from "@mui/icons-material";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveSubcategory,
  setItemIds,
  setLastUpdated,
} from "../../../../../context/features/Settings";

export default function SubcategoryMenu({
  anchorEl,
  handleClose,
  activeSubcategory,
}) {
  const dispatch = useDispatch();
  const itemIds = useSelector((state) => state.settings.itemIds);
  const handleUpdate = () => dispatch(setLastUpdated(new Date().getTime()));

  return (
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
          dispatch(setActiveSubcategory(activeSubcategory));
          handleClose();
        }}
      >
        <ListItemIcon>
          <DriveFileRenameOutline />
        </ListItemIcon>
        Rename subcategory
      </MenuItem>
      <MenuItem
        dense
        key="muliple"
        onClick={() => {
          axios.delete(`/menu/${itemIds.join("~")}/delete`).then(() => {
            handleUpdate();
            dispatch(setItemIds([]));
          });
          handleClose();
        }}
      >
        <ListItemIcon>
          <Delete />
        </ListItemIcon>
        Delete subcategory
      </MenuItem>
    </Menu>
  );
}
