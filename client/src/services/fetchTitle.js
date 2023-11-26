import axios from "axios";
import { API } from "./api.config";

export const fetchTitle = async (category) => {
  try {
    const response = await axios.get(API.CATEGORIES);
    const titles = response.data;

    const matchedTitle = titles.filter((title) => title.category === category);

    return matchedTitle.length > 0 ? matchedTitle[0].sliderTitle : "";
  } catch (error) {
    throw new Error(error.message);
  }
};
