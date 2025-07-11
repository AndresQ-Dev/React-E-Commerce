import React, { createContext, useState, useCallback } from 'react';
import axios from 'axios';

export const ProductContext = createContext();

const API_URL = import.meta.env.VITE_API_URL;

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

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

  // Ahora recibe (id, productData)
  const updateProduct = async (id, productData) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, productData);
      setProducts(prev =>
        prev.map(p => (p.id === id ? response.data : p))
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
