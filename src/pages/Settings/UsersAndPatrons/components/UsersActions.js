import { Check, Save } from "@mui/icons-material";
import { Box, CircularProgress, Fab } from "@mui/material";
import axios from "axios";
import { /* useEffect, */ useState } from "react";

export default function UsersActions({ params, rowId, setRowId }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    await setLoading(true);
    setTimeout(async () => {
      const body = {
        accessLevel: params.row.accessLevel,
        disabled: params.row.disabled,
      };
      await axios
        .post(`/user/${rowId}/update`, body)
        .then(() => {
          setSuccess(true);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }, 1000);
  };

  /* useEffect(() => {
    if (rowId === params.id && success) setSuccess(false);
  }, [rowId]); */

  return (
    <Box sx={{ m: 1, position: "relative" }}>
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: "success.main",
            "&:hover": { bgcolor: "success.dark" },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
          disabled={params.id !== rowId || loading}
          onClick={handleSubmit}
        >
          <Save />
        </Fab>
      )}

      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: "success.main",
            position: "absolute",
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
}
