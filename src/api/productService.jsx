import axios from 'axios';

// Variable de entorno en .env
const API_URL = import.meta.env.VITE_API_URL;

// Revisar si el endpoint es con myusculas o no...

//Enpoints de la API
export const getProducts = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

export const getProductById = async (id) => {
  const { data } = await axios.get(`${API_URL}/${id}`);
  return data;
};

export const createProduct = async (product) => {
  const { data } = await axios.post(API_URL, product);
  return data;
};

export const updateProduct = async (id, product) => {
  const { data } = await axios.put(`${API_URL}/${id}`, product);
  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await axios.delete(`${API_URL}/${id}`);
  return data;
};
