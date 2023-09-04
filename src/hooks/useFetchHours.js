import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setError, setIsLoading } from "../context/features/BusinessHours";
import { convertObjToArr } from "../utils/Helpers";

const useFetchHours = (hoursType, lastUpdated) => {
  const dispatch = useDispatch();
  const [hours, setHours] = useState([]);

  function getHours(obj) {
    const keys = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const result = [];
    Object.keys(obj).forEach((key) => {
      const isValid = keys.indexOf(key) !== -1;
      const val = convertObjToArr(obj[key]);
      const newVal = [];

      for (const el of val) {
        if (typeof el === "object") newVal.push(convertObjToArr(el));
        else newVal.push(el);
      }

      if (isValid) result.push(newVal);
    });
    return result.sort((a, b) => a[3] - b[3]); // Sorts it by their ID, located at index 3.
  }

  useEffect(() => {
    dispatch(setIsLoading(true));

    axios
      .get(`/hours/${hoursType}`)
      .then((response) => {
        const data = response.data;
        setHours(getHours(data));
        dispatch(setError(null));
        dispatch(setIsLoading(false));
      })
      .catch((err) => {
        dispatch(setError(err));
        dispatch(setIsLoading(false));
      });
  }, [dispatch, hoursType, lastUpdated]);

  return hours;
};

export default useFetchHours;
