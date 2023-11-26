import { useCallback } from "react";
import axios from "axios";

export const useFetchData = (url) => {
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }, [url]);

  return fetchData;
};
