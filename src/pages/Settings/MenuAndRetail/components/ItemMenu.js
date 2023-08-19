import { Delete, Edit } from "@mui/icons-material";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import axios from "axios";
import { setLastUpdated } from "../../../../context/features/Settings";
import { useDispatch } from "react-redux";

export default function ItemMenu({ anchorEl, handleClose, itemId }) {
  const dispatch = useDispatch();
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
        key="edit"
        onClick={() => {
          handleClose();
        }}
      >
        <ListItemIcon>
          <Edit />
        </ListItemIcon>
        Edit item
      </MenuItem>
      <MenuItem
        dense
        key="delete"
        onClick={async () => {
          await axios.delete(`/menu/${itemId}`);
          await dispatch(setLastUpdated(new Date().getTime()));
          await handleClose();
        }}
      >
        <ListItemIcon>
          <Delete />
        </ListItemIcon>
        Delete item
      </MenuItem>
    </Menu>
  );
}
