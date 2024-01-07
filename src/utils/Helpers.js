import {
  BakeryDining,
  Business,
  DinnerDining,
  DirectionsCar,
  Fastfood,
  Flatware,
  FoodBank,
  Icecream,
  Kitchen,
  Liquor,
  LocalCafe,
  LocalDining,
  LocalPizza,
  LocalShipping,
  Luggage,
  LunchDining,
  Nightlife,
  RoomService,
  SportsBar,
  WineBar,
} from "@mui/icons-material";

/**
 *
 * @param {*} arr e
 * @param {*} target
 * @returns a sorted array including the target if it was not already in the array or excluding the target if it was already in the array
 */
export const updateArray = (arr, target, sort = false) => {
  let set = new Set();
  let allElements = [...arr, target];
  for (const element of allElements) {
    if (!set.has(element)) set.add(element);
    else set.delete(element);
  }

  let result = [];
  for (const value of set) {
    result.push(value);
  }

  return sort ? result.sort() : result;
};

export const fillEmptyValues = (rows, placeholderValue, expectedRowCount) => {
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      if (rows[i][j] === undefined) rows[i][j] = placeholderValue;
    }
    // If the row length is smaller than expected, fill the rest of it with empty string values.
    if (rows[i].length < expectedRowCount) {
      rows[i].push(
        ...Array(expectedRowCount - rows[i].length).fill(placeholderValue)
      );
    }
  }
  return rows;
};

export const abbreviateString = (string) => {
  const capitalLetters = [
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
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  let result = "";
  for (let i = 0; i < string.length; i++) {
    const [prevChar, currChar] = [string[i - 1], string[i]];
    const isValid =
      capitalLetters.indexOf(currChar) !== -1 ||
      numbers.indexOf(currChar) !== -1 ||
      prevChar === " " ||
      prevChar === "-" ||
      !prevChar;
    if (isValid) result += currChar.toUpperCase();
  }
  return result;
};

export const capitalizeString = (string) => {
  return string[0].toUpperCase() + string.substring(1);
};

export const convertObjToArr = (obj) => {
  const result = []; // Initialize an empty array
  // For each key, push its value to the result array.
  Object.keys(obj).forEach((key) => {
    result.push(obj[key]);
  });
  return result;
};

export const isEmail = (string) => {
  const emailRegEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return Boolean(string.toLowerCase().match(emailRegEx));
};

export const setDelay = (n) => new Promise((r) => setTimeout(r, n * 1000));

export function truncateText(str, length) {
  return str.length <= length ? str : `${str.substring(0, length + 1)} ...`;
}

export function sortArrOfObjs(arr, key) {
  const result = [];
  let map = new Map();

  // Add each object to the map
  for (let i = 0; i < arr.length; i++) {
    const obj = arr[i];
    map.set(obj[key], obj);
  }

  map = new Map([...map.entries()].sort()); // Sort the map by key
  for (const el of map) result.push(el[1]); // Iterate through the map and push each value to an array
  return result; // Return the result array
}

export function generateTempPassword() {
  let result = "";
  const allChars = {
    upperLetters: [
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
    ],
    lowerLetters: [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
    ],
    digits: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    specialChars: [
      "~",
      "`",
      "!",
      "@",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "(",
      ")",
      "-",
      "_",
      "+",
      "=",
      "{",
      "}",
      "[",
      "]",
      "|",
      ";",
      ":",
      "<",
      ">",
      ",",
      ".",
      "/",
      "?",
    ],
  };
  const pwdChars = [];

  Object.keys(allChars).forEach((charType) => {
    const randInt = Math.floor(Math.random() * 3) + 2; // Random integer between 2 and 4.
    for (let i = 0; i < randInt; i++) {
      const randChar =
        allChars[charType][
          Math.floor(Math.random() * allChars[charType].length)
        ];
      pwdChars.push(randChar);
    }
  });

  result = joinInRandOrder(pwdChars);
  return result;

  function joinInRandOrder(arr) {
    let str = "";
    while (arr.length > 0) {
      const randIdx = Math.floor(Math.random() * arr.length);
      const randChar = arr[randIdx];

      // Password must start with an alphanumeric character.
      if (
        str.length === 0 &&
        allChars.digits.indexOf(randChar) === -1 &&
        allChars.lowerLetters.indexOf(randChar) === -1 &&
        allChars.upperLetters.indexOf(randChar) === -1
      ) {
        continue;
      } else {
        str += randChar;
        arr = arr.slice(0, randIdx).concat(arr.slice(randIdx + 1));
      }
    }
    return str;
  }
}

export const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const usdWholeDollarFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
};

export const businessCategories = [
  { icon: <BakeryDining />, name: "Bakery" },
  { icon: <Liquor />, name: "Bar" },
  { icon: <SportsBar />, name: "Brewery" },
  { icon: <Flatware />, name: "Buffet" },
  { icon: <LocalCafe />, name: "Cafe" },
  { icon: <Nightlife />, name: "Club & Nightlife" },
  { icon: <Icecream />, name: "Dessert shop" },
  { icon: <DirectionsCar />, name: "Drive-In" },
  { icon: <LunchDining />, name: "Fast casual restaurant" },
  { icon: <Fastfood />, name: "Fast food" },
  { icon: <DinnerDining />, name: "Fine dining" },
  { icon: <FoodBank />, name: "Food hall" },
  { icon: <LocalShipping />, name: "Food truck" },
  { icon: <Kitchen />, name: "Ghost kitchen" },
  { icon: <Luggage />, name: "Hotel restaurant" },
  { icon: <Business />, name: "Multi-unit restaurant/group" },
  { icon: <LocalDining />, name: "Neighborhood spot" },
  { icon: <LocalPizza />, name: "Pizzeria" },
  { icon: <RoomService />, name: "Private chef" },
  { icon: <WineBar />, name: "Winery" },
];
