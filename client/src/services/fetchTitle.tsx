import axios from "axios";
import { API } from "./api.config";
import { MainCtg } from "model/mainCtg";

export const fetchTitle = async (category: string): Promise<string> => {
  try {
    const response = await axios.get<MainCtg[]>(API.CATEGORIES);
    const titles = response.data;

    const matchedTitle = titles.filter((title) => title.category === category);

    return matchedTitle.length > 0 ? matchedTitle[0].sliderTitle : "";
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw error;
    }
  }
};
