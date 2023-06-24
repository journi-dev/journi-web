import {
  AttachMoney,
  BarChart,
  CloudUpload,
  Edit,
  FileUpload,
  MoreVert,
} from "@mui/icons-material";
import {
  Box,
  Checkbox,
  Container,
  Divider,
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
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { ExcelRenderer } from "react-excel-renderer";
import { makeStyles } from "tss-react/mui";
import { fillEmptyValues, usdFormatter } from "../../utils/Helpers";
import { CustomButton } from "../../components/ui/CustomComponents";
import axios from "axios";
import Masonry from "react-masonry-css";

const useStyles = makeStyles()((theme) => {
  return {
    root: {
      // display: "flex",
      width: "100%",
    },
  };
});

// TODO: Make based on theme with makeStyles
const breakpoints = {
  default: 3,
  1100: 2,
  700: 1,
};

export default function Menu() {
  const { classes } = useStyles();
  const [dragActive, setDragActive] = useState(false);
  const [header, setHeader] = useState([]);
  const [cols, setCols] = useState([]);
  const [menu, setMenu] = useState([]);
  const [categories, setCategories] = useState([]);
  const [menuData, setMenuData] = useState([]);
  const [menuItemCount, setMenuItemCount] = useState(0);
  const [overwrite, setOverwrite] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    axios
      .get("/menu")
      .then((response) => {
        const data = response.data;
        setMenu(data);
        setCategories(getMenu(data, "menuCategory", "itemCategory"));
        console.log(data);
        // console.log(getMenu(data, "menuCategory", "itemCategory"));
      })
      .catch((err) => console.error(err));
  }, []);

  const getMenu = (menuData, menuKey, itemKey) => {
    const result = [];
    let map = new Map();

    for (const menuItem of menuData) {
      const [menu, item] = [menuItem[menuKey], menuItem[itemKey]];
      if (!map.has(menu)) {
        map.set(menu, map.size);
        result.push({
          menu,
          items: [item],
        });
      } else {
        result[map.get(menu)].items = [
          ...new Set([...result[map.get(menu)].items, item]),
        ];
      }
    }
    return result;
  };

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
        console.log(rows);
        console.log(convertMenuData(rows));
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

  /* const handleButtonClick = () => {
    inputRef.current.click();
  }; */

  return (
    <div className={classes.root}>
      <Box className="flex-row-start" sx={{ mb: 2 }}>
        <Typography variant="h5" component="h1">
          Menu & Retail
        </Typography>
        <CustomButton
          disableElevation
          variant="contained"
          startIcon={<Edit />}
          sx={{ borderRadius: 25, ml: 3 }}
        >
          Edit
        </CustomButton>
      </Box>

      {categories.map((category) => (
        <div>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {category.menu}
          </Typography>
          <Masonry
            breakpointCols={breakpoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {category.items.map((itemCategory) => (
              <Paper sx={{ p: 1.5 }}>
                <Typography variant="subtitle1" sx={{ ml: 2, mb: 1 }}>
                  {itemCategory} (
                  {
                    menu.filter(
                      (menuItem) => menuItem.itemCategory === itemCategory
                    ).length
                  }{" "}
                  item
                  {menu.filter(
                    (menuItem) => menuItem.itemCategory === itemCategory
                  ).length === 1
                    ? ""
                    : "s"}
                  )
                </Typography>
                {menu
                  .filter((menuItem) => menuItem.itemCategory === itemCategory)
                  .map((menuItem, i) => (
                    <Box>
                      {/* Menu Item */}
                      <Box
                        className="flex-row-space"
                        sx={{ alignItems: "center", my: 1.25, mx: 1 }}
                      >
                        <Box
                          className="flex-row-start"
                          sx={{ alignItems: "center" }}
                        >
                          <IconButton>
                            <MoreVert fontSize="small" />
                            {/* To-Do: make a menu for favoriting, deleting, editing */}
                          </IconButton>

                          {/* Menu Item Name */}
                          <Tooltip
                            TransitionComponent={Zoom}
                            arrow
                            placement="top"
                            title={
                              <Box className="flex-row">
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                  display="flex"
                                  alignItems="center"
                                  sx={{ ml: 1, color: "white" }}
                                >
                                  <BarChart fontSize="inherit" />
                                  3.1k
                                </Typography>

                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                  display="flex"
                                  alignItems="center"
                                  sx={{ ml: 1, color: "white" }}
                                >
                                  <AttachMoney fontSize="inherit" />
                                  $2.3k
                                </Typography>
                              </Box>
                            }
                          >
                            <Box sx={{ ml: 1 }}>
                              <Typography fontSize={14}>
                                {menuItem.name}
                              </Typography>
                              {menuItem.description.length > 0 && (
                                <Typography variant="caption">
                                  {menuItem.description}
                                </Typography>
                              )}
                            </Box>
                          </Tooltip>
                        </Box>

                        {(menuItem.size1Price > 0 ||
                          menuItem.size2Price > 0 ||
                          menuItem.size3Price > 0 ||
                          menuItem.size4Price > 0) && (
                          <Box className="flex-row-end">
                            {menuItem.size1Price > 0 && (
                              <Box sx={{ textAlign: "center", ml: 3 }}>
                                <Typography fontSize={14}>
                                  {usdFormatter.format(menuItem.size1Price)}
                                </Typography>
                                <Typography variant="caption">Small</Typography>
                              </Box>
                            )}

                            {menuItem.size2Price > 0 && (
                              <Box sx={{ textAlign: "center", ml: 3 }}>
                                <Typography fontSize={14}>
                                  {usdFormatter.format(menuItem.size2Price)}
                                </Typography>
                                <Typography variant="caption">
                                  Medium
                                </Typography>
                              </Box>
                            )}

                            {menuItem.size3Price > 0 && (
                              <Box sx={{ textAlign: "center", ml: 3 }}>
                                <Typography fontSize={14}>
                                  {usdFormatter.format(menuItem.size3Price)}
                                </Typography>
                                <Typography variant="caption">Large</Typography>
                              </Box>
                            )}

                            {menuItem.size4Price > 0 && (
                              <Box sx={{ textAlign: "center", ml: 3 }}>
                                <Typography fontSize={14}>
                                  {usdFormatter.format(menuItem.size4Price)}
                                </Typography>
                                <Typography variant="caption">Jumbo</Typography>
                              </Box>
                            )}
                          </Box>
                        )}

                        {menuItem.singleSizePrice > 0 && (
                          <Typography fontSize={14}>
                            {usdFormatter.format(menuItem.singleSizePrice)}
                          </Typography>
                        )}
                      </Box>

                      {/* Divider */}
                      {i !==
                        menu.filter(
                          (menuItem) => menuItem.itemCategory === itemCategory
                        ).length -
                          1 && <Divider sx={{ mx: 0 }} />}
                    </Box>
                  ))}
              </Paper>
            ))}
          </Masonry>
        </div>
      ))}

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
    </div>
  );
}
