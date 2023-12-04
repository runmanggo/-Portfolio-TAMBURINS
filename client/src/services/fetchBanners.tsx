import axios from "axios";
import { API } from "./api.config";
import { Banner } from "../model/banner";

//배너 컴포넌트
export const fetchBanners = async (category: string): Promise<Banner[]> => {
  try {
    const response = await axios.get<Banner[]>(API.BANNERS);
    const banners = response.data;
    const filteredBanners = category
      ? banners.filter((item) => item.category === category)
      : banners;
    return filteredBanners;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw error;
    }
  }
};
