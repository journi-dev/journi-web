import {
  AttachMoney,
  BarChart,
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
import { setError, setIsLoading } from "../../../../context/features/Settings";

// TODO: Make based on theme with makeStyles
const breakpoints = {
  default: 3,
  1100: 2,
  700: 1,
};

export default function MenuAndRetailItems() {
  const dispatch = useDispatch();
  const isEditActive = useSelector((state) => state.settings.isEditActive);
  const error = useSelector((state) => state.settings.error);

  const [menu, setMenu] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("/menu")
      .then((response) => {
        const data = response.data;
        setMenu(data);
        setCategories(getMenu(data, "menuCategory", "itemCategory"));
        dispatch(setError(null));
        dispatch(setIsLoading(false));
      })
      .catch((err) => {
        dispatch(setError(err));
        dispatch(setIsLoading(false));
      });
  }, [dispatch]);

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

  return (
    <div>
      {categories.map((category, i) => (
        <div key={i}>
          <Accordion sx={{ mb: i === categories.length - 1 ? 0 : 2 }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="h6">{category.menu}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Masonry
                breakpointCols={breakpoints}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
                key={i}
              >
                {category.items.map((itemCategory, j) => (
                  <Paper sx={{ p: 1.5 }} key={j}>
                    <Box
                      className="flex-row-space"
                      sx={{ alignItems: "center" }}
                    >
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
                      <IconButton>
                        {/* To-Do: Rename menu category; Delete menu category */}
                        <MoreVert />
                      </IconButton>
                    </Box>
                    {menu
                      .filter(
                        (menuItem) => menuItem.itemCategory === itemCategory
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
                                  <IconButton>
                                    <MoreVert fontSize="small" />
                                    {/* To-Do: make a menu for favoriting, deleting, editing */}
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
                              (menuItem) =>
                                menuItem.itemCategory === itemCategory
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
