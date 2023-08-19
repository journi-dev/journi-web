import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setError,
  setIsLoading,
  setMenuCount,
} from "../context/features/Settings";

const useFetchMenu = (lastUpdated) => {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState([]);
  const [categories, setCategories] = useState([]);

  function getMenu(data, categoryKey, subcategoryKey) {
    const categories = [];
    let map = new Map();

    for (const menuItem of data) {
      const [categoryName, subcategory] = [
        menuItem[categoryKey],
        menuItem[subcategoryKey],
      ];
      if (!map.has(categoryName)) {
        map.set(categoryName, map.size);
        categories.push({
          categoryName,
          subcategories: [subcategory],
        });
      } else {
        categories[map.get(categoryName)].subcategories = [
          ...new Set([
            ...categories[map.get(categoryName)].subcategories,
            subcategory,
          ]),
        ];
      }
    }
    return categories;
  }

  useEffect(() => {
    dispatch(setIsLoading(true));

    axios
      .get("/menu")
      .then((response) => {
        const data = response.data;
        setMenu(data);
        setCategories(getMenu(data, "category", "subcategory"));
        dispatch(setMenuCount(data.length));
        dispatch(setError(null));
        dispatch(setIsLoading(false));
      })
      .catch((err) => {
        dispatch(setError(err));
        dispatch(setIsLoading(false));
      });
  }, [dispatch, lastUpdated]);

  return { menu, categories };
};

export default useFetchMenu;
