import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Slider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { WatsonTabTitle } from "../../utils/WatsonTabTitle";

const marks = [
  {
    value: 4,
    label: "4",
  },
  {
    value: 8,
    label: "8",
  },
  {
    value: 12,
    label: "12",
  },
  {
    value: 16,
    label: "16",
  },
  {
    value: 20,
    label: "20",
  },
];

export default function GiftCards() {
  WatsonTabTitle("Gift Card Settings");
  const [enableGiftCards, setEnableGiftCards] = useState(true);
  const [codeLength, setCodeLength] = useState(12);
  const [codeType, setCodeType] = useState("");
  const [separator, setSeparator] = useState("");
  const [separatorPositions, setSeparatorPositions] = useState([]);

  const generateGiftCardCode = (
    codeType,
    codeLength,
    separator,
    separatorPosArr
  ) => {
    const abcArray = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];
    const digitArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const alphanumericArray = [...abcArray, ...digitArray];

    const selectedArray =
      codeType === "alpha"
        ? abcArray
        : codeType === "numeric"
        ? digitArray
        : codeType === "alphanumeric"
        ? alphanumericArray
        : [];
    let charArr = [];
    let resultArr = [];
    let code = "";

    if (codeLength < 4 || codeLength > 20) return code;

    // Gets characters for the gift card code.
    for (let i = 0; i < codeLength; i++) {
      let randomInt = Math.floor(Math.random() * selectedArray.length);
      let randomChar = String(selectedArray[randomInt]);
      charArr.push(randomChar);
    }

    separatorPosArr = [...separatorPosArr, codeLength];

    // Separates the characters by the separator at the given separator positions.
    // Separator positions are 1-based and represent which character's position the separator should be placed after.
    for (let i = 0; i < separatorPosArr.length; i++) {
      // Separator positions use a 1-based index.
      let prevSeparatorPos = separatorPosArr[i - 1] || 0;
      let currSeparatorPos = separatorPosArr[i] - 1;
      // console.log([prevSeparatorPos, currSeparatorPos]);

      for (let j = prevSeparatorPos; j <= currSeparatorPos; j++) {
        let char = charArr[j];
        resultArr.push(char);
        if (j === currSeparatorPos && j !== codeLength - 1)
          resultArr.push(separator);
      }
    }

    code = resultArr.join("");
    return code;
  };

  const separatorArr = Array.from(Array(codeLength).keys()).slice(2);

  return (
    <Box>
      <FormControlLabel
        control={
          <Checkbox
            defaultChecked
            value={enableGiftCards}
            onChange={(e) => setEnableGiftCards(e.target.checked)}
          />
        }
        label="Enable gift cards"
      />
      <Slider
        defaultValue={12}
        disabled={!enableGiftCards}
        step={1}
        marks={marks}
        min={4}
        max={20}
        valueLabelDisplay="on"
        value={codeLength}
        onChange={(e) => setCodeLength(e.target.value)}
      />

      {/* Code Type */}
      <FormControl fullWidth>
        <InputLabel id="gift-card-code-type">Code Type</InputLabel>
        <Select
          id="gift-card-code-type"
          value={codeType}
          label="Code Type"
          onChange={(e) => setCodeType(e.target.value)}
          disabled={!enableGiftCards}
        >
          <MenuItem value="alpha">Alpha</MenuItem>
          <MenuItem value="numeric">Numeric</MenuItem>
          <MenuItem value="alphanumeric">Alphanumeric</MenuItem>
        </Select>
      </FormControl>

      {/* Separator */}
      <FormControl fullWidth>
        <InputLabel id="separator-select">Separator</InputLabel>
        <Select
          disabled={!enableGiftCards}
          id="separator-select"
          value={separator}
          label="Separator"
          onChange={(e) => setSeparator(e.target.value)}
        >
          <MenuItem value="-">Dash</MenuItem>
          <MenuItem value=" ">Space</MenuItem>
          <MenuItem value="~">Tilde</MenuItem>
        </Select>
      </FormControl>

      {/* Separator Position(s) */}
      <FormControl fullWidth>
        <InputLabel>Separator Positions</InputLabel>
        <Select
          multiple
          value={separatorPositions}
          disabled={!enableGiftCards}
          // On autofill we get a stringified value.
          onChange={(e) =>
            setSeparatorPositions(
              typeof e.target.value === "string"
                ? e.target.value.split(",")
                : e.target.value
            )
          }
          input={<OutlinedInput label="Separator Positions" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {separatorArr.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {codeType !== "" && (
        <Typography>
          Example Code:{" "}
          {generateGiftCardCode(
            codeType,
            codeLength,
            separator,
            separatorPositions
          )}
        </Typography>
      )}
    </Box>
  );
}
