import axios from "axios";
import { API } from "./api.config";

//배너 컴포넌트
export const fetchBanners = async (category) => {
  try {
    const response = await axios.get(API.BANNERS);
    const banners = response.data;
    const filteredBanners = category
      ? banners.filter((item) => item.category === category)
      : banners;
    return filteredBanners;
  } catch (error) {
    throw new Error(error.message);
  }
};
