import axios from 'axios';

// Usa exactamente como lo indica MockAPI
const API_URL = "https://6869b5392af1d945cea265e5.mockapi.io/api/Products";
// Si en MockAPI se llama "Products" con mayúscula, cambia a: .../api/Products

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
