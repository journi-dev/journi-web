import {
  Avatar,
  Box,
  ListItemIcon,
  Menu,
  MenuItem,
  Modal,
  Typography,
  gridClasses,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import UsersActions from "./components/UsersActions";
import { WatsonTabTitle } from "../../../../utils/WatsonTabTitle";
import ErrorPlaceholder from "../../../../components/placeholders/ErrorPlaceholder";
import { CustomButton } from "../../../../components/ui/CustomComponents";
import { Add, GroupAdd, PersonAddAltRounded } from "@mui/icons-material";
import AddUser from "./components/AddUser";
import { modalStyle } from "../../../../utils/Helpers";
import { useSelector } from "react-redux";

export default function UsersAndPatrons() {
  WatsonTabTitle("Users & Patrons Settings");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openAddUserForm, setOpenAddUserForm] = useState(false);

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [pageSize, setPageSize] = useState(5);
  const [rowId, setRowId] = useState(null);
  const columns = useMemo(
    () => [
      {
        field: "userImage",
        headerName: "Avatar",
        // width: 60,
        renderCell: (params) => <Avatar src={params.row.userImage} />,
        sortable: false,
        filterable: false,
      },
      { field: "firstName", headerName: "First Name" /* width: 125 */ },
      { field: "lastName", headerName: "Last Name" /* width: 125 */ },
      { field: "id", headerName: "Username" /* width: 125 */ },
      { field: "email", headerName: "Email" /* width: 200 */ },
      {
        field: "accessLevel",
        headerName: "Role",
        width: 100,
        type: "singleSelect",
        valueOptions: ["Employee", "Manager", "Admin"],
        editable: true,
      },
      {
        field: "disabled",
        headerName: "Disabled",
        // width: 60,
        type: "boolean",
        editable: true,
      },
      {
        field: "emailVerified",
        headerName: "Email Verified",
        // width: 60,
        type: "boolean",
        editable: true,
      },
      {
        field: "createdAt",
        headerName: "Created At",
        width: 200,
        renderCell: (params) =>
          format(new Date(params.row.createdAt._seconds * 1000), "MM/dd/yyyy"),
      },
      {
        field: "actions",
        headerName: "Action",
        renderCell: (params) => (
          <UsersActions {...{ params, rowId, setRowId }} />
        ),
      },
    ],
    [rowId]
  );

  const lastUpdated = useSelector((state) => state.user.lastUpdated);

  const handleAddUsersClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);
  const handleModalClose = (e, reason, setState) => {
    if (reason && reason === "backdropClick") return;
    setState(false);
  };

  useEffect(() => {
    axios
      .get("/users")
      .then((response) => {
        setUsers(response.data);
        setError(null);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [lastUpdated]);

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Users & Patrons
      </Typography>

      {/* Users */}
      <Box sx={{ width: "100%" }}>
        <Box className="flex-row-space">
          <Box>
            <Typography variant="h6">Users</Typography>
            <Typography sx={{ mb: 2 }}>
              Team work makes the dream work. Manage your team and their
              permissions here.
            </Typography>
          </Box>
          <Box>
            <CustomButton
              disableElevation
              onClick={handleAddUsersClick}
              variant="contained"
              startIcon={<Add />}
            >
              Add user(s)
            </CustomButton>
          </Box>
        </Box>
        {isLoading ? (
          <div>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Loading...
            </Typography>
          </div>
        ) : (
          <DataGrid
            columns={columns}
            rows={users}
            getRowId={(row) => row.id}
            pageSize={pageSize}
            pageSizeOptions={[5, 10, 25, 50]}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            sx={{
              [`& .${gridClasses.row}`]: {
                bgcolor: (theme) =>
                  theme.palette.mode === "light" ? grey[200] : grey[900],
              },
              width: "100%",
            }}
            onCellEditStop={(params) => setRowId(params.id)}
          />
        )}
      </Box>

      {error && <ErrorPlaceholder code={error.code} />}

      {/* Patrons */}
      <Box sx={{ width: "100%", my: 2 }}>
        <Box className="flex-row-space">
          <Box>
            <Typography variant="h6">Patrons</Typography>
            <Typography sx={{ mb: 2 }}>
              Patrons are bloodline and soul of your business. Manage all of
              them here.
            </Typography>
          </Box>
          <Box>
            <CustomButton
              disableElevation
              onClick={() => {}}
              variant="contained"
              startIcon={<Add />}
            >
              Add patron(s)
            </CustomButton>
          </Box>
        </Box>
      </Box>

      {/* "Add users" button menu */}
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
            setOpenAddUserForm(true);
            handleClose();
          }}
        >
          <ListItemIcon>
            <PersonAddAltRounded />
          </ListItemIcon>
          Add single user
        </MenuItem>
        <MenuItem
          dense
          key="muliple"
          onClick={() => {
            // setOpenAddUserForm(true);
            handleClose();
          }}
        >
          <ListItemIcon>
            <GroupAdd />
          </ListItemIcon>
          Add multiple users
        </MenuItem>
      </Menu>

      {/* "Add items via file upload" Modal */}
      <Modal
        open={openAddUserForm}
        onClose={(e, reason) => handleModalClose(e, reason, setOpenAddUserForm)}
      >
        <Box sx={modalStyle}>
          <AddUser
            onClose={(e, reason) =>
              handleModalClose(e, reason, setOpenAddUserForm)
            }
          />
        </Box>
      </Modal>
    </div>
  );
}
