import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setError,
  setIsLoading,
} from "../context/features/SpecialAndTempHours";

const useFetchSpecialHours = (lastUpdated) => {
  const dispatch = useDispatch();
  const [specialHours, setSpecialHours] = useState([]);

  useEffect(() => {
    dispatch(setIsLoading(true));

    axios
      .get("/hours/special")
      .then((response) => {
        const data = response.data.specialDates;
        setSpecialHours(data);
        dispatch(setError(null));
        dispatch(setIsLoading(false));
      })
      .catch((err) => {
        dispatch(setError(err));
        dispatch(setIsLoading(false));
      });
  }, [dispatch, lastUpdated]);

  return specialHours.sort((a, b) => a["dateLabel"] - b["dateLabel"]);
};

export default useFetchSpecialHours;
