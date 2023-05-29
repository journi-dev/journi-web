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
