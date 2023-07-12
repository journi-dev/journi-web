import {
  Close,
  CloudUpload,
  DeleteForever,
  FileUpload,
} from "@mui/icons-material";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useRef, useState } from "react";
import {
  CustomButton,
  CustomLoadingButton,
} from "../../../../components/ui/CustomComponents";
import { ExcelRenderer } from "react-excel-renderer";
import axios from "axios";
import { fillEmptyValues } from "../../../../utils/Helpers";
import { makeStyles } from "tss-react/mui";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoading } from "../../../../context/features/Settings";

const useStyles = makeStyles()((theme) => {
  return {
    root: {
      display: "flex",
    },
    dragActive: {
      backgroundColor: "rgba(255, 204, 102, 0.25)",
    },
    form: { width: "100%" },
    inputContainer: {},
  };
});

export default function MenuFileUploadForm() {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.appearance.value.isDark);
  const isLoading = useSelector((state) => state.settings.isLoading);
  const inputRef = useRef(null);

  const [dragActive, setDragActive] = useState(false);
  const [header, setHeader] = useState([]);
  const [cols, setCols] = useState([]);

  const [fileName, setFileName] = useState("");
  const [menuData, setMenuData] = useState([]);
  const [menuItemCount, setMenuItemCount] = useState(0);

  const [overwrite, setOverwrite] = useState(false);

  const convertMenuData = (menuData) => {
    const result = [];
    const headerRow = menuData[0];
    for (let i = 1; i < menuData.length; i++) {
      const menuItem = {
        name: menuData[i][headerRow.indexOf("Name")],
        description: menuData[i][headerRow.indexOf("Description")],
        size1Price: menuData[i][headerRow.indexOf("Size 1 Price")],
        size2Price: menuData[i][headerRow.indexOf("Size 2 Price")],
        size3Price: menuData[i][headerRow.indexOf("Size 3 Price")],
        size4Price: menuData[i][headerRow.indexOf("Size 4 Price")],
        singleSizePrice: menuData[i][headerRow.indexOf("Single-Size Price")],
        category: menuData[i][headerRow.indexOf("Menu Category")],
        subcategory: menuData[i][headerRow.indexOf("Item Category")],
      };
      result.push(menuItem);
    }
    return result;
  };

  const handleFile = (file) => {
    ExcelRenderer(file, (err, response) => {
      if (err) {
        console.error(err);
      } else {
        let rows = response.rows.filter((row) => row.length > 1);
        rows = fillEmptyValues(rows, "", rows[0].length);
        setFileName(file.name);
        setHeader(rows[0]);
        setCols(rows);
        setMenuItemCount(rows.length - 1);
        setMenuData(convertMenuData(rows));
      }
    });
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const notifySuccess = (message) => {
    toast.success(message, {
      theme: isDark ? "dark" : "light",
    });
  };

  const handleSubmit = () => {
    dispatch(setIsLoading(true));
    axios
      .post("/addMultipleToMenu", menuData)
      .then((response) => {
        dispatch(setIsLoading(false));
        notifySuccess(response.data.message);
      })
      .catch((err) => {
        dispatch(setIsLoading(false));
        console.log("Error:", err);
        // dispatch(setError(err));
      });
  };

  return (
    <Paper
      elevation={1}
      className={classes.root}
      sx={{
        p: 3,
        maxWidth: "80vw",
        maxHeight: 750,
        overflow: "auto",
      }}
    >
      <Box className="flex-col-start" sx={{ width: "100%" }}>
        <Box className="flex-row-space" sx={{ mb: 1, alignItems: "center" }}>
          <Typography variant="h5">Add items via file upload</Typography>
          <IconButton sx={{ ml: 2 }}>
            <Close />
          </IconButton>
        </Box>
        <Box className="flex-row-space">
          {/* File Upload */}
          <Box
            sx={{
              width: menuItemCount > 0 ? "25%" : "100%",
              mr: menuItemCount > 0 ? 2 : 0,
            }}
          >
            <form
              className={classes.form}
              onDragEnter={handleDrag}
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                id="input-file-upload"
                multiple={false}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFile(e.target.files[0]);
                  }
                }}
                hidden
              />

              {dragActive && (
                <div
                  id="drag-file-element"
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                ></div>
              )}

              <Box className="flex-row">
                <label htmlFor="input-file-upload">
                  <Box
                    className={`${
                      isDark ? "placeholder-dark" : "placeholder-light"
                    } ${classes.inputContainer} ${
                      dragActive ? classes.dragActive : ""
                    }`}
                    sx={{ p: 2, my: 2, textAlign: "center" }}
                  >
                    <FileUpload fontSize="large" />
                    <Typography variant="h6">
                      Drag and drop your file here
                    </Typography>
                    <Typography className="click-here-text">
                      or click here to upload a file
                    </Typography>
                    <Typography
                      variant="caption"
                      display="block"
                      sx={{ mt: 1 }}
                    >
                      Accepted file types: .xlsx, .csv, .tsv
                    </Typography>
                  </Box>
                </label>
              </Box>

              {/* Checkbox and Button */}
              {fileName !== "" && menuItemCount > 0 && (
                <Box className="flex-col" sx={{ alignItems: "center" }}>
                  <CustomButton
                    color="error"
                    sx={{ borderRadius: 25, height: 35 }}
                    endIcon={<DeleteForever />}
                  >
                    <Typography
                      color="text.primary"
                      variant="caption"
                      display="block"
                      // fontWeight="bold"
                    >
                      Selected file: {fileName}
                    </Typography>
                  </CustomButton>
                  <FormGroup sx={{ height: 35 }}>
                    <FormControlLabel
                      control={<Checkbox size="small" />}
                      label={
                        <Typography variant="caption">
                          Overwrite current menu
                        </Typography>
                      }
                      checked={overwrite}
                      onChange={(e) => setOverwrite(e.target.checked)}
                    />
                  </FormGroup>
                </Box>
              )}

              {/* Button */}
              <Box className="flex-row">
                <CustomLoadingButton
                  sx={{ borderRadius: 25, mt: 2 }}
                  variant="contained"
                  startIcon={<CloudUpload />}
                  onClick={handleSubmit}
                  disableElevation
                  disabled={menuItemCount === 0 || isLoading}
                  loading={isLoading}
                >
                  {`Upload${
                    menuItemCount > 0
                      ? ` ${menuItemCount} item${
                          menuItemCount === 1 ? "" : "s"
                        }`
                      : ""
                  }`}
                </CustomLoadingButton>
              </Box>
            </form>
          </Box>

          {/* Table */}
          {menuItemCount > 0 && (
            <Box sx={{ width: "75%" }}>
              <TableContainer component={Paper} sx={{ height: 600 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      {header.map((h, i) => (
                        <TableCell align="center" key={i}>
                          {h}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cols.slice(1).map((col, i) => (
                      <TableRow key={i}>
                        {col.map((c, i) => (
                          <TableCell key={i}>{c}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </Box>
      </Box>

      <ToastContainer theme={isDark ? "dark" : "light"} />
    </Paper>
  );
}
