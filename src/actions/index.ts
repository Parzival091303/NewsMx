import { createNews } from "./createNews";
import { noticiasId } from "./noticiasId";
import { obtNoticias } from "./obtNoticias";
import { getCategorias } from "./getCategorias";
import { getNews } from "./get-news.action";
import { login } from "./login";
import { getAvailabilityById } from "./places/get-availability-by-id.action";
import { getPlaces } from "./places/get-places.action";
import { getAllNews, addNews, countNews, getNewsById, getNewsBySlug, getNewsByCategory, getNewsByUserId } from "@/actions/noticias";
import { getAllCategories, getCategoryById, addCategory, deleteCategory, updateCategory } from "@/actions/categorias";
import { getAllUsers, deleteUser, updateUser, getUserById } from "@/actions/usuarios";
import {loginAuth, register, updatePassword, resetPassword} from "@/actions/auth";
export const server = {
  getNews,
  getPlaces,
  getAvailabilityById,
  login,
  createNews,
  getCategorias,
  obtNoticias,
  noticiasId,
  getAllNews,
  addNews,
  getNewsById,
  countNews,
  getNewsBySlug,
  getNewsByCategory,
  getNewsByUserId,
  getAllCategories,
  getCategoryById,
  addCategory,
  deleteCategory,
  updateCategory,
  getAllUsers,
  deleteUser,
  getUserById,
  updateUser,
  loginAuth,
  register
};





