import { createNews } from "./createNews";
import { noticiasId} from "./noticiasId";
import { obtNoticias } from "./obtNoticias";
import { getCategorias } from "./getCategorias";
import { getNews } from "./get-news.action";
import { login } from "./login";
import { getAvailabilityById } from "./places/get-availability-by-id.action";
import { getPlaces } from "./places/get-places.action";
import { getAllNews } from "@/actions/noticias/get-all-news.action";
export const server = {
    getNews,
     getPlaces,
  getAvailabilityById,
  login,
<<<<<<< HEAD
  createNews,
  getCategorias,
  obtNoticias,
  noticiasId,
=======
  getAllNews
>>>>>>> 3077d711fadb2b478f290889acd15b7f6c937bbd

};





