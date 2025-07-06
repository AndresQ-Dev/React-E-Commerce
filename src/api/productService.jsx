import axios from 'axios';

// Usar la variable de entorno
const API_URL = import.meta.env.VITE_API_URL;

// Carga de clave de la API en mockapi.io
// const API_URL = "https://6869b5392af1d945cea265e5.mockapi.io/api/Products";
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
