import { useCallback } from "react";
import axios from "axios";
import { Banner } from "../model/banner";
import { MainCtg } from "model/mainCtg";
import { ItemsDetail } from "model/itemsDetail";
import { MainItems } from "model/mainItems";

export const useFetchData = (url: string) => {
  const fetchData = useCallback(async (): Promise<
    Banner[] | MainCtg[] | ItemsDetail[] | MainItems[]
  > => {
    try {
      const response = await axios.get<
        Banner[] | MainCtg[] | ItemsDetail[] | MainItems[]
      >(url);
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
