import axios from "axios";
import { API } from "./api.config";

export const fetchDetail = async (id) => {
  try {
    const response = await axios.get(API.ITEMS_DETAIL);
    const details = response.data;

    const matchedId = details.find((detail) => detail.itemId === Number(id));

    return matchedId;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const fetchDetailId = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8000/detail/${id}`);
    const details = response.data;

    const matchedId = details.find((detail) => detail.itemId === Number(id));

    return matchedId;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};
