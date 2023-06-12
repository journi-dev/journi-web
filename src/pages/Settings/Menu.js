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
import { ExcelRenderer } from "react-excel-renderer";
import { makeStyles } from "tss-react/mui";
import { fillEmptyValues } from "../../utils/Helpers";
import { CustomButton } from "../../components/ui/CustomComponents";

const useStyles = makeStyles()((theme) => {
  return {
    form: {
      width: "30%",
    },
    inputContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
    },
    dragActive: {
      backgroundColor: "#ffffff",
    },
    dragFileElement: {
      backgroundColor: "#ffff00",
    },
  };
});

export default function Menu() {
  const { classes } = useStyles();
  const [dragActive, setDragActive] = useState(false);
  const [header, setHeader] = useState([]);
  const [cols, setCols] = useState([]);
  const [menuItemCount, setMenuItemCount] = useState(0);
  const [overwrite, setOverwrite] = useState(false);
  const inputRef = useRef(null);

  const handleFile = (file) => {
    ExcelRenderer(file, (err, response) => {
      if (err) {
        console.error(err);
      } else {
        let rows = response.rows.filter((row) => row.length > 1);
        rows = fillEmptyValues(rows, "", rows[0].length);
        setHeader(rows[0]);
        setCols(rows);
        setMenuItemCount(rows.length - 1);
        console.log(rows);
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

  /* const handleButtonClick = () => {
    inputRef.current.click();
  }; */

  return (
    <div>
      <Typography>Menu</Typography>

      <form
        className={classes.form}
        onDragEnter={handleDrag}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={inputRef}
          type="file"
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
              label="Overwite current menu"
              checked={overwrite}
              onChange={(e) => setOverwrite(e.target.checked)}
            />
          </FormGroup>
          <CustomButton variant="contained" startIcon={<CloudUpload />}>
            Upload {menuItemCount} item{menuItemCount === 1 ? "" : "s"}
          </CustomButton>
        </div>
      )}

      {/* <table
        style={{
          borderCollapse: "collapse",
          margin: "10px auto",
          border: "1px auto black",
        }}
      >
        <thead>
          <tr>
            {header.map((h, i) => (
              <th style={{ border: "1px auto black" }} key={i}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cols.slice(1).map((col, i) => (
            <tr key={i}>
              {col.map((c, i) => (
                <td key={i}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
}
