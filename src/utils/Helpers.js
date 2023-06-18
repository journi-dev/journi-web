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

export const generateRandomId = (length) => {
  const charArray = [
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
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomChar = charArray[Math.floor(Math.random() * charArray.length)];
    result += randomChar;
  }
  return result;
};
