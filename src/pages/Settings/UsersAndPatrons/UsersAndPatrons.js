import { Avatar, Box, Typography, gridClasses } from "@mui/material";
import { grey } from "@mui/material/colors";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
// import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import UsersActions from "./components/UsersActions";

export default function UsersAndPatrons() {
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
        width: 60,
        renderCell: (params) => <Avatar src={params.row.userImage} />,
        sortable: false,
        filterable: false,
      },
      { field: "firstName", headerName: "First Name", width: 125 },
      { field: "lastName", headerName: "Last Name", width: 125 },
      { field: "id", headerName: "Username", width: 125 },
      { field: "email", headerName: "Email", width: 200 },
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
        width: 60,
        type: "boolean",
        editable: true,
      },
      {
        field: "emailVerified",
        headerName: "Email Verified",
        width: 60,
        type: "boolean",
        editable: true,
      },
      {
        field: "createdAt",
        headerName: "Created At",
        width: 200,
        // renderCell: (params) => format(params.row.createdAt, "EEE, MMM d, Y"),
      },
      {
        field: "actions",
        headerName: "Actions",
        renderCell: (params) => (
          <UsersActions {...{ params, rowId, setRowId }} />
        ),
      },
    ],
    [rowId]
  );

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
  }, []);

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Users & Patrons
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">Users</Typography>
        <Typography>
          Team work makes the dream work. Manage your team and their permissions
          here.
        </Typography>
      </Box>

      {isLoading && (
        <div>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Loading...
          </Typography>
        </div>
      )}

      <DataGrid
        columns={columns}
        rows={users}
        getRowId={(row) => row.id}
        rowsPerPageOptions={[5, 10, 25, 50]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        /* getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 5,
          bottom: params.isLastVisible ? 0 : 5,
        })} */
        sx={{
          [`& .${gridClasses.row}`]: {
            bgcolor: (theme) =>
              theme.palette.mode === "light" ? grey[200] : grey[900],
          },
        }}
        onCellEditStop={(params) => setRowId(params.id)}
      />

      {error && (
        <div>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Error ({error})
          </Typography>
        </div>
      )}

      <Box sx={{ my: 2 }}>
        <Typography variant="h6">Patrons</Typography>
        <Typography>
          Patrons are bloodline and soul of your business. Manage all of them
          here.
        </Typography>
      </Box>
    </div>
  );
}
