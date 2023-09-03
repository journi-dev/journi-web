import { Add, Close, CloudUpload, Remove } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { CustomLoadingButton } from "../../../../components/ui/CustomComponents";
import axios from "axios";
import { makeStyles } from "tss-react/mui";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsLoading,
  setLastUpdated,
} from "../../../../context/features/Settings";
import useFetchMenu from "../../../../hooks/useFetchMenu";
import { abbreviateString } from "../../../../utils/Helpers";

const useStyles = makeStyles()((theme) => {
  return {
    root: {
      display: "flex",
    },
    form: { width: "100%" },
    nameTextField: {
      width: "10em",
    },
    abbrTextField: {
      width: "7em",
    },
    priceTextField: {
      width: "7.5em",
    },
    buttons: {
      alignItems: "center",
    },
  };
});

export default function MenuItemAddForm({ onClose }) {
  const maxLength = 140;
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.appearance.isDark);
  const isLoading = useSelector((state) => state.settings.isLoading);

  const [qty, setQty] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [descLength, setDescLength] = useState(0);

  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newSubcategory, setNewSubcategory] = useState("");

  const [isSpecial, setIsSpecial] = useState(false);
  const [isVariantEnabled, setIsVariantEnabled] = useState(false);
  const [singleSizePrice, setSingleSizePrice] = useState("");

  const [sizeCount, setSizeCount] = useState(1);

  const [size1Name, setSize1Name] = useState("");
  const [size1Abbrv, setSize1Abbrv] = useState("");
  const [size1Price, setSize1Price] = useState("");

  const [size2Name, setSize2Name] = useState("");
  const [size2Abbrv, setSize2Abbrv] = useState("");
  const [size2Price, setSize2Price] = useState("");

  const [size3Name, setSize3Name] = useState("");
  const [size3Abbrv, setSize3Abbrv] = useState("");
  const [size3Price, setSize3Price] = useState("");

  const [size4Name, setSize4Name] = useState("");
  const [size4Abbrv, setSize4Abbrv] = useState("");
  const [size4Price, setSize4Price] = useState("");

  const lastUpdated = useSelector((state) => state.settings.lastUpdated);
  const { categories } = useFetchMenu(lastUpdated);

  const notifySuccess = (message) => {
    toast.success(message, {
      theme: isDark ? "dark" : "light",
    });
  };

  const handleSubmit = () => {
    dispatch(setIsLoading(true));

    const data = {
      category: category === "new" ? newCategory : category,
      description,
      name,
      singleSizePrice,
      size1Price,
      size2Price,
      size3Price,
      size4Price,
      subcategory: subcategory === "new" ? newSubcategory : subcategory,
    };

    axios
      .post("/createMenuItem", data)
      .then((response) => {
        dispatch(setIsLoading(false));
        dispatch(setLastUpdated(new Date().getTime()));
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
        {/* Header */}
        <Box className="flex-row-space" sx={{ mb: 2, alignItems: "center" }}>
          <Typography variant="h5">Add an item</Typography>
          <IconButton sx={{ ml: 2 }} onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
        {/* Form Content */}
        <Box className="flex-col-start">
          <form className={classes.form} onSubmit={(e) => e.preventDefault()}>
            {/* Quantity and Name */}
            <Box className="flex-row-start">
              <TextField
                sx={{ width: "5em", mr: 2 }}
                type="number"
                label="Qty"
                variant="outlined"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              />
              <TextField
                sx={{ width: `calc(100% - 5em)` }}
                label="Item Name"
                variant="outlined"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>

            {/* Description */}
            <Box className="flex-col-start" sx={{ mt: 2 }}>
              <TextField
                sx={{ width: "100%" }}
                label={"Description"}
                variant="outlined"
                rows={3}
                multiline
                placeholder="Add a short description about your item."
                value={description}
                onChange={(e) => {
                  setDescLength(e.target.value.length);
                  setDescription(e.target.value);
                }}
                inputProps={{ maxLength }}
              />

              <Typography variant="caption">
                {descLength}/{maxLength} characters
              </Typography>
            </Box>

            <Divider sx={{ my: 1, borderStyle: "dashed" }} />

            {/* Categories */}
            <Box className="flex-row-space" sx={{ mt: 2 }}>
              <Box className="flex-col-start" sx={{ width: "50%", mr: 1 }}>
                <FormControl fullWidth>
                  <InputLabel id="menu-category-select-label">
                    Menu Category
                  </InputLabel>
                  <Select
                    labelId="menu-category-select-label"
                    value={category}
                    label="Menu Category"
                    onChange={(e) => {
                      setCategory(e.target.value);
                      setSubcategory("");
                    }}
                  >
                    {categories.map((category) => (
                      <MenuItem
                        key={category.categoryName}
                        value={category.categoryName}
                      >
                        {category.categoryName}
                      </MenuItem>
                    ))}
                    <MenuItem value={"new"}>New category</MenuItem>
                  </Select>
                </FormControl>

                {category === "new" && (
                  <TextField
                    sx={{ mt: 2 }}
                    label="New category"
                    variant="outlined"
                    required={category === "new"}
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                )}
              </Box>

              <Box className="flex-col-start" sx={{ width: "50%", ml: 1 }}>
                <FormControl fullWidth>
                  <InputLabel id="menu-subcategory-select-label">
                    Item Category
                  </InputLabel>
                  <Select
                    labelId="menu-subcategory-select-label"
                    value={subcategory}
                    label="Item Category"
                    onChange={(e) => setSubcategory(e.target.value)}
                  >
                    {categories.filter(
                      (ctgry) => ctgry.categoryName === category
                    ).length > 0 &&
                      categories
                        .filter((ctgry) => ctgry.categoryName === category)[0]
                        .subcategories.map((subcategory) => (
                          <MenuItem key={subcategory} value={subcategory}>
                            {subcategory}
                          </MenuItem>
                        ))}
                    <MenuItem value={"new"}>New subcategory</MenuItem>
                  </Select>
                </FormControl>

                {subcategory === "new" && (
                  <TextField
                    sx={{ mt: 2 }}
                    label="New subcategory"
                    variant="outlined"
                    required={subcategory === "new"}
                    value={newSubcategory}
                    onChange={(e) => setNewSubcategory(e.target.value)}
                  />
                )}
              </Box>
            </Box>

            <Divider sx={{ my: 2, borderStyle: "dashed" }} />

            {/* Single-size Pricing and Checkboxes */}
            <Box className="flex-row-start" sx={{ mt: 2 }}>
              {/* Single-size Pricing */}
              <FormControl>
                <InputLabel htmlFor="single-size-price">
                  Single-Size Price
                </InputLabel>
                <OutlinedInput
                  className={classes.priceTextField}
                  sx={{ mr: 2 }}
                  type="number"
                  id="single-size-price"
                  value={singleSizePrice}
                  onChange={(e) => setSingleSizePrice(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  label="Single-Size Price"
                  disabled={isVariantEnabled}
                />
              </FormControl>

              {/* Checkboxes */}
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={isSpecial}
                      onChange={(e) => setIsSpecial(e.target.checked)}
                    />
                  }
                  label="Special"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      value={isVariantEnabled}
                      onChange={(e) => {
                        setIsVariantEnabled(e.target.checked);
                        if (e.target.checked) setSingleSizePrice("");
                      }}
                    />
                  }
                  label="Variant pricing"
                />
              </FormGroup>
            </Box>

            {/* Variant Pricing */}
            {isVariantEnabled && (
              <Box>
                {/* Size 1 */}
                <Box
                  className={`flex-row-start ${classes.buttons}`}
                  sx={{ mt: 2 }}
                >
                  <TextField
                    className={classes.nameTextField}
                    label="Size 1 Name"
                    variant="outlined"
                    required
                    value={size1Name}
                    onChange={(e) => {
                      setSize1Name(e.target.value);
                      setSize1Abbrv(abbreviateString(e.target.value));
                    }}
                  />
                  <TextField
                    className={classes.abbrTextField}
                    sx={{ mx: 2 }}
                    label="Abbreviation"
                    placeholder="Abbr."
                    variant="outlined"
                    required
                    value={size1Abbrv}
                    onChange={(e) => setSize1Abbrv(e.target.value)}
                  />

                  <FormControl>
                    <InputLabel htmlFor="size-1-price">
                      {size1Name === "" ? "Price" : `${size1Name} Price`.trim()}
                    </InputLabel>
                    <OutlinedInput
                      className={classes.priceTextField}
                      type="number"
                      id="size-1-price"
                      value={size1Price}
                      onChange={(e) => setSize1Price(e.target.value)}
                      startAdornment={
                        <InputAdornment position="start">$</InputAdornment>
                      }
                      label={
                        size1Name === "" ? "Price" : `${size1Name} Price`.trim()
                      }
                    />
                  </FormControl>

                  {/* Add and Remove Buttons */}
                  {sizeCount === 1 && (
                    <Box sx={{ ml: 1 }}>
                      <IconButton
                        size="small"
                        onClick={(e) => setSizeCount(sizeCount + 1)}
                        disabled={sizeCount === 4}
                      >
                        <Add />
                      </IconButton>

                      <IconButton
                        size="small"
                        onClick={(e) => setSizeCount(sizeCount - 1)}
                        disabled={sizeCount === 1}
                      >
                        <Remove />
                      </IconButton>
                    </Box>
                  )}
                </Box>

                {/* Size 2 */}
                {sizeCount >= 2 && (
                  <Box
                    className={`flex-row-start ${classes.buttons}`}
                    sx={{ mt: 2 }}
                  >
                    <TextField
                      className={classes.nameTextField}
                      label="Size 2 Name"
                      variant="outlined"
                      required
                      value={size2Name}
                      onChange={(e) => {
                        setSize2Name(e.target.value);
                        setSize2Abbrv(abbreviateString(e.target.value));
                      }}
                    />
                    <TextField
                      className={classes.abbrTextField}
                      sx={{ mx: 2 }}
                      label="Abbreviation"
                      variant="outlined"
                      required
                      value={size2Abbrv}
                      onChange={(e) => setSize2Abbrv(e.target.value)}
                    />

                    <FormControl>
                      <InputLabel htmlFor="size-2-price">
                        {size2Name === ""
                          ? "Price"
                          : `${size2Name} Price`.trim()}
                      </InputLabel>
                      <OutlinedInput
                        className={classes.priceTextField}
                        type="number"
                        id="size-2-price"
                        value={size2Price}
                        onChange={(e) => setSize2Price(e.target.value)}
                        startAdornment={
                          <InputAdornment position="start">$</InputAdornment>
                        }
                        label={
                          size2Name === ""
                            ? "Price"
                            : `${size2Name} Price`.trim()
                        }
                      />
                    </FormControl>

                    {/* Add and Remove Buttons */}
                    {sizeCount === 2 && (
                      <Box sx={{ ml: 1 }}>
                        <IconButton
                          size="small"
                          onClick={(e) => setSizeCount(sizeCount + 1)}
                          disabled={sizeCount === 4}
                        >
                          <Add />
                        </IconButton>

                        <IconButton
                          size="small"
                          onClick={(e) => setSizeCount(sizeCount - 1)}
                          disabled={sizeCount === 1}
                        >
                          <Remove />
                        </IconButton>
                      </Box>
                    )}
                  </Box>
                )}

                {/* Size 3 */}
                {sizeCount >= 3 && (
                  <Box
                    className={`flex-row-start ${classes.buttons}`}
                    sx={{ mt: 2 }}
                  >
                    <TextField
                      className={classes.nameTextField}
                      label="Size 3 Name"
                      variant="outlined"
                      required
                      value={size3Name}
                      onChange={(e) => {
                        setSize3Name(e.target.value);
                        setSize3Abbrv(abbreviateString(e.target.value));
                      }}
                    />
                    <TextField
                      className={classes.abbrTextField}
                      sx={{ mx: 2 }}
                      label="Abbreviation"
                      variant="outlined"
                      required
                      value={size3Abbrv}
                      onChange={(e) => setSize3Abbrv(e.target.value)}
                    />

                    <FormControl>
                      <InputLabel htmlFor="size-3-price">
                        {size3Name === ""
                          ? "Price"
                          : `${size3Name} Price`.trim()}
                      </InputLabel>
                      <OutlinedInput
                        className={classes.priceTextField}
                        type="number"
                        id="size-3-price"
                        value={size3Price}
                        onChange={(e) => setSize3Price(e.target.value)}
                        startAdornment={
                          <InputAdornment position="start">$</InputAdornment>
                        }
                        label={
                          size3Name === ""
                            ? "Price"
                            : `${size3Name} Price`.trim()
                        }
                      />
                    </FormControl>

                    {/* Add and Remove Buttons */}
                    {sizeCount === 3 && (
                      <Box sx={{ ml: 1 }}>
                        <IconButton
                          size="small"
                          onClick={(e) => setSizeCount(sizeCount + 1)}
                          disabled={sizeCount === 4}
                        >
                          <Add />
                        </IconButton>

                        <IconButton
                          size="small"
                          onClick={(e) => setSizeCount(sizeCount - 1)}
                          disabled={sizeCount === 1}
                        >
                          <Remove />
                        </IconButton>
                      </Box>
                    )}
                  </Box>
                )}

                {/* Size 4 */}
                {sizeCount >= 4 && (
                  <Box
                    className={`flex-row-start ${classes.buttons}`}
                    sx={{ mt: 2 }}
                  >
                    <TextField
                      className={classes.nameTextField}
                      label="Size 4 Name"
                      variant="outlined"
                      required
                      value={size4Name}
                      onChange={(e) => {
                        setSize4Name(e.target.value);
                        setSize4Abbrv(abbreviateString(e.target.value));
                      }}
                    />
                    <TextField
                      className={classes.abbrTextField}
                      sx={{ mx: 2 }}
                      label="Abbreviation"
                      variant="outlined"
                      required
                      value={size4Abbrv}
                      onChange={(e) => setSize4Abbrv(e.target.value)}
                    />

                    <FormControl>
                      <InputLabel htmlFor="size-4-price">
                        {size4Name === ""
                          ? "Price"
                          : `${size4Name} Price`.trim()}
                      </InputLabel>
                      <OutlinedInput
                        className={classes.priceTextField}
                        type="number"
                        id="size-4-price"
                        value={size4Price}
                        onChange={(e) => setSize4Price(e.target.value)}
                        startAdornment={
                          <InputAdornment position="start">$</InputAdornment>
                        }
                        label={
                          size4Name === ""
                            ? "Price"
                            : `${size4Name} Price`.trim()
                        }
                      />
                    </FormControl>

                    {/* Add and Remove Buttons */}
                    {sizeCount === 4 && (
                      <Box sx={{ ml: 1 }}>
                        <IconButton
                          size="small"
                          onClick={(e) => setSizeCount(sizeCount + 1)}
                          disabled={sizeCount === 4}
                        >
                          <Add />
                        </IconButton>

                        <IconButton
                          size="small"
                          onClick={(e) => setSizeCount(sizeCount - 1)}
                          disabled={sizeCount === 1}
                        >
                          <Remove />
                        </IconButton>
                      </Box>
                    )}
                  </Box>
                )}
              </Box>
            )}

            {/* Submit Button */}
            <Box className="flex-row">
              <CustomLoadingButton
                sx={{ mt: 2 }}
                variant="contained"
                startIcon={<CloudUpload />}
                onClick={handleSubmit}
                disableElevation
                disabled={isLoading}
                loading={isLoading}
              >
                Upload item
              </CustomLoadingButton>
            </Box>
          </form>
        </Box>
      </Box>

      <ToastContainer theme={isDark ? "dark" : "light"} />
    </Paper>
  );
}
