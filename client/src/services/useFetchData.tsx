import { useCallback } from "react";
import axios from "axios";

export const useFetchData = (url: string) => {
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw error;
      }
    }
  }, [url]);

  return fetchData;
};
