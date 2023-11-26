import { useState, useCallback } from "react";
import axios from "axios";

export const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
      return response.data;
    } catch (error) {
      setError(error);
      throw error;
    }
  }, [url]);

  return { data, error, fetchData };
};
