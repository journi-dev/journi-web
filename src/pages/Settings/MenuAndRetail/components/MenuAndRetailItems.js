import {
  AttachMoney,
  BarChart,
  Cancel,
  CheckCircle,
  ExpandMore,
  MoreVert,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  Divider,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import ErrorPlaceholder from "../../../../components/placeholders/ErrorPlaceholder";
import { usdFormatter } from "../../../../utils/Helpers";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveCategory,
  setActiveSubcategory,
  setError,
  setIsLoading,
  setItemIds,
} from "../../../../context/features/Settings";
import CategoryMenu from "./CategoryMenu";
import SubcategoryMenu from "./SubcategoryMenu";
import ItemMenu from "./ItemMenu";

// TODO: Make based on theme with makeStyles
const breakpoints = {
  default: 3,
  1100: 2,
  700: 1,
};

export default function MenuAndRetailItems() {
  const dispatch = useDispatch();
  const isEditActive = useSelector((state) => state.settings.isEditActive);
  const activeCategory = useSelector((state) => state.settings.activeCategory);
  const activeSubcategory = useSelector(
    (state) => state.settings.activeSubcategory
  );
  const itemIds = useSelector((state) => state.settings.itemIds);
  const error = useSelector((state) => state.settings.error);

  const [menu, setMenu] = useState([]);
  const [categories, setCategories] = useState([]);

  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");

  const [newCategory, setNewCategory] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");

  const [itemAnchorEl, setItemAnchorEl] = useState(null);
  const [subcategoryAnchorEl, setSubcategoryAnchorEl] = useState(null);
  const [categoryAnchorEl, setCategoryAnchorEl] = useState(null);

  const [itemId, setItemId] = useState(null);

  useEffect(() => {
    axios
      .get("/menu")
      .then((response) => {
        const data = response.data;
        setMenu(data);
        setCategories(getMenu(data, "category", "subcategory"));
        dispatch(setError(null));
        dispatch(setIsLoading(false));
      })
      .catch((err) => {
        dispatch(setError(err));
        dispatch(setIsLoading(false));
      });
  }, [dispatch]);

  const getMenu = (data, categoryKey, subcategoryKey) => {
    const result = [];
    let map = new Map();

    for (const menuItem of data) {
      const [menu, item] = [menuItem[categoryKey], menuItem[subcategoryKey]];
      if (!map.has(menu)) {
        map.set(menu, map.size);
        result.push({
          name: menu,
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

  const getItemIds = (menuItems) => {
    let result = "";
    for (let i = 0; i < menuItems.length; i++) {
      result +=
        i === menuItems.length - 1 ? menuItems[i].id : `${menuItems[i].id}-`;
    }
    return result;
  };

  const handleClick = (e, setAnchor) => {
    setAnchor(e.currentTarget);
  };

  const handleClose = (e, setAnchor) => {
    setAnchor(null);
  };

  const updateMenuItems = async (categoryType) => {
    await axios
      .post(`/menu/${categoryType}/${itemIds}/rename`, {
        category: newCategory,
        subcategory: newSubcategory,
      })
      .then(() => {
        dispatch(setActiveCategory(""));
        dispatch(setActiveSubcategory(""));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      {/* "Item" Menu Options */}
      <ItemMenu
        anchorEl={itemAnchorEl}
        handleClose={(e) => handleClose(e, setItemAnchorEl)}
        itemId={itemId}
      />

      {/* "Subcategory" Menu Options */}
      <SubcategoryMenu
        anchorEl={subcategoryAnchorEl}
        handleClose={(e) => handleClose(e, setSubcategoryAnchorEl)}
        activeSubcategory={subcategory}
      />

      {/* "Category" Menu Options */}
      <CategoryMenu
        anchorEl={categoryAnchorEl}
        handleClose={(e) => handleClose(e, setCategoryAnchorEl)}
        activeCategory={category}
      />

      {categories.map((category, i) => (
        <div key={i}>
          <Accordion sx={{ mb: i === categories.length - 1 ? 0 : 2 }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box className="flex-row-start" sx={{ alignItems: "center" }}>
                <IconButton
                  onClick={(e) => {
                    const items = menu.filter(
                      (item) => item.category === category.name
                    );

                    dispatch(setItemIds(getItemIds(items)));
                    handleClick(e, setCategoryAnchorEl);
                    setCategory(category.name);
                    setNewCategory(category.name);
                  }}
                  sx={{ mr: 1 }}
                >
                  <MoreVert />
                </IconButton>
                {activeCategory === category.name ? (
                  <Box>
                    <TextField
                      label=""
                      variant="standard"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                    />
                    <Tooltip title="Save changes">
                      <IconButton
                        size="small"
                        color="success"
                        onClick={() => {
                          updateMenuItems("category");
                        }}
                        disabled={
                          newCategory === category.name || newCategory === ""
                        }
                        sx={{ ml: 1 }}
                      >
                        <CheckCircle />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Cancel">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => {
                          dispatch(setActiveCategory(""));
                        }}
                      >
                        <Cancel />
                      </IconButton>
                    </Tooltip>
                  </Box>
                ) : (
                  <Typography variant="h6">{category.name}</Typography>
                )}
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Masonry
                breakpointCols={breakpoints}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
                key={i}
              >
                {category.items.map((subcategory, j) => (
                  <Paper sx={{ p: 1.5 }} key={j}>
                    <Box
                      className="flex-row-space"
                      sx={{ alignItems: "center" }}
                    >
                      {activeSubcategory === subcategory ? (
                        <Box>
                          <TextField
                            label=""
                            variant="standard"
                            value={newSubcategory}
                            onChange={(e) => setNewSubcategory(e.target.value)}
                          />
                          <Tooltip title="Save changes">
                            <IconButton
                              size="small"
                              color="success"
                              onClick={() => {
                                updateMenuItems("subcategory");
                              }}
                              disabled={
                                newSubcategory === subcategory ||
                                newSubcategory === ""
                              }
                              sx={{ ml: 1 }}
                            >
                              <CheckCircle />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Cancel">
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => {
                                dispatch(setActiveSubcategory(""));
                              }}
                            >
                              <Cancel />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      ) : (
                        <Typography variant="subtitle1" sx={{ ml: 2, mb: 1 }}>
                          {subcategory} (
                          {
                            menu.filter(
                              (menuItem) => menuItem.subcategory === subcategory
                            ).length
                          }{" "}
                          item
                          {menu.filter(
                            (menuItem) => menuItem.subcategory === subcategory
                          ).length === 1
                            ? ""
                            : "s"}
                          )
                        </Typography>
                      )}

                      <IconButton
                        onClick={(e) => {
                          const items = menu.filter(
                            (item) => item.subcategory === subcategory
                          );

                          dispatch(setItemIds(getItemIds(items)));
                          handleClick(e, setSubcategoryAnchorEl);
                          setSubcategory(subcategory);
                          setNewSubcategory(subcategory);
                        }}
                      >
                        <MoreVert />
                      </IconButton>
                    </Box>
                    {menu
                      .filter(
                        (menuItem) => menuItem.subcategory === subcategory
                      )
                      .map((menuItem, k) => (
                        <Box>
                          {/* Menu Item */}
                          <Box
                            className="flex-row-space"
                            sx={{ alignItems: "center", my: 1.25, mx: 1 }}
                          >
                            <Box
                              className="flex-row-start"
                              sx={{ alignItems: "baseline" }}
                            >
                              <Box sx={{ width: 30, height: 30 }}>
                                {!isEditActive && (
                                  <IconButton
                                    onClick={(e) => {
                                      setItemId(menuItem.id);
                                      handleClick(e, setItemAnchorEl);
                                    }}
                                  >
                                    <MoreVert fontSize="small" />
                                  </IconButton>
                                )}
                                {isEditActive && <Checkbox size="small" />}
                              </Box>

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
                                    <Typography variant="caption">
                                      Small
                                    </Typography>
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
                                    <Typography variant="caption">
                                      Large
                                    </Typography>
                                  </Box>
                                )}

                                {menuItem.size4Price > 0 && (
                                  <Box sx={{ textAlign: "center", ml: 3 }}>
                                    <Typography fontSize={14}>
                                      {usdFormatter.format(menuItem.size4Price)}
                                    </Typography>
                                    <Typography variant="caption">
                                      Jumbo
                                    </Typography>
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
                          {k !==
                            menu.filter(
                              (menuItem) => menuItem.subcategory === subcategory
                            ).length -
                              1 && <Divider sx={{ mx: 0 }} />}
                        </Box>
                      ))}
                  </Paper>
                ))}
              </Masonry>
            </AccordionDetails>
          </Accordion>
        </div>
      ))}

      {error && <ErrorPlaceholder code={error.code} />}
    </div>
  );
}
