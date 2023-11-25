const BASE_URL = process.env.REACT_APP_BASE_URL;

export const API = {
  // 몽고디비 banner
  BANNERS: `${BASE_URL}/categories/banner`,
  // 몽고디비 mainItems
  BEST: `${BASE_URL}/items/best`,
};
