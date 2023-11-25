import axios from "axios";
import { API } from "./api.config";

export const fetchBest = async () => {
  try {
    const response = await axios.get(API.BEST);
    const best = response.data;

    return best;
  } catch (error) {
    throw new Error(error.message);
  }
};
