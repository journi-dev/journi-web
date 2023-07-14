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
  }

  useEffect(() => {
    dispatch(setIsLoading(true));

    axios
      .get("/menu")
      .then((response) => {
        const data = response.data;
        setMenu(data);
        console.log(lastUpdated);
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
