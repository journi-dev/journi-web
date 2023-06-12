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
