import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/",
});

export const fetchUsers = () => API.get("users/");
export const fetchSales = (userId) =>
  userId ? API.get(`sales/?user=${userId}`) : API.get("sales/");

export const createSales = (payload) => API.post("sales/", payload);
export const fetchCountries = () => API.get("countries/");
export const fetchProducts = () => API.get("products/");
export const fetchCities = (id) => API.get(`cities/${id}/`);
