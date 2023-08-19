/**
 *
 * @param {*} arr e
 * @param {*} target
 * @returns a sorted array including the target if it was not already in the array or excluding the target if it was already in the array
 */
export const updateArray = (arr, target) => {
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

  return result.sort();
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

export const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const usdWholeDollarFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
