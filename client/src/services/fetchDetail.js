import axios from "axios";
import { API } from "./api.config";

//SliderItems 컴포넌트
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

// ItemDetails 컴포넌트
export const fetchDetailId = async (id) => {
  try {
    const response = await axios.get(`${API.ITEMS_DETAIL}/${id}`);
    const details = response.data;

    const matchedId = details.find((detail) => detail.itemId === Number(id));

    return matchedId;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};