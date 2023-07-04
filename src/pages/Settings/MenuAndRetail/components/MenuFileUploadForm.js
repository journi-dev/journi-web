import { CloudUpload, FileUpload } from "@mui/icons-material";
import {
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
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
import { CustomButton } from "../../../../components/ui/CustomComponents";
import { ExcelRenderer } from "react-excel-renderer";
import axios from "axios";
import { fillEmptyValues } from "../../../../utils/Helpers";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    root: {
      display: "flex",
    },
  };
});

export default function MenuFileUploadForm() {
  const { classes } = useStyles();
  const inputRef = useRef(null);

  const [dragActive, setDragActive] = useState(false);
  const [header, setHeader] = useState([]);
  const [cols, setCols] = useState([]);

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
        menuCategory: menuData[i][headerRow.indexOf("Menu Category")],
        itemCategory: menuData[i][headerRow.indexOf("Item Category")],
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
        rows = fillEmptyValues(rows, null, rows[0].length);
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

  const handleSubmit = () => {
    axios
      .post("/addMultipleToMenu", menuData)
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((err) => {
        console.error("Ruh-roh", err);
      });
  };

  return (
    <Paper
      elevation={1}
      className={classes.root}
      sx={{
        p: 3,
        width: 1000,
        minHeight: "50vh",
        maxHeight: "80vh",
        overflow: "auto",
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
        <label htmlFor="input-file-upload">
          <Container
            className={`placeholder-light ${classes.inputContainer} ${
              dragActive ? classes.dragActive : ""
            }`}
          >
            <FileUpload fontSize="large" />
            <Typography variant="h6">Drag and drop your file here</Typography>
            <Typography className="click-here-text">
              or click here to upload a file
            </Typography>
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              Accepted file types: .xlsx, .csv, .tsv
            </Typography>
          </Container>
        </label>
        {dragActive && (
          <div
            id="drag-file-element"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          ></div>
        )}
      </form>

      {menuItemCount > 0 && (
        <div>
          <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
            <Table sx={{ minWidth: 650 }} stickyHeader>
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

          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Overwrite current menu"
              checked={overwrite}
              onChange={(e) => setOverwrite(e.target.checked)}
            />
          </FormGroup>
          <CustomButton
            variant="contained"
            startIcon={<CloudUpload />}
            onClick={handleSubmit}
          >
            Upload {menuItemCount} item{menuItemCount === 1 ? "" : "s"}
          </CustomButton>
        </div>
      )}
    </Paper>
  );
}
