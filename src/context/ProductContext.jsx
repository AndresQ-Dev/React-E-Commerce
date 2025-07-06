// src/context/ProductContext.jsx
import React, { createContext, useState, useCallback } from 'react';
import axios from 'axios';

export const ProductContext = createContext();

const API_URL = 'https://6869b5392af1d945cea265e5.mockapi.io/api/Products';

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setProducts(response.data);
    } catch (err) {
      setError('No se pudieron cargar los productos.');
    } finally {
      setLoading(false);
    }
  }, []);

  const addProduct = async (newProduct) => {
    try {
      const response = await axios.post(API_URL, newProduct);
      setProducts(prev => [...prev, response.data]);
    } catch (err) {
      setError('Error al agregar el producto.');
    }
  };

  const updateProduct = async (updatedProduct) => {
    try {
      await axios.put(`${API_URL}/${updatedProduct.id}`, updatedProduct);
      setProducts(prev =>
        prev.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
      );
    } catch (err) {
      setError('Error al actualizar el producto.');
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      setError('Error al eliminar el producto.');
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        fetchProducts,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
