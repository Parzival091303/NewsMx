import { getNews } from "./get-news.action";
import { login } from "./login";
import { getAvailabilityById } from "./places/get-availability-by-id.action";
import { getPlaces } from "./places/get-places.action";
export const server = {
    getNews,
     getPlaces,
  getAvailabilityById,
  login,

};





