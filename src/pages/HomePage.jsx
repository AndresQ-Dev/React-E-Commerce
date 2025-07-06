// src/pages/HomePage.jsx
import React, { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ProductContext } from '../context/ProductContext';
import List from '../components/products/List';
import Loader from '../components/common/Loader';

const HomePage = () => {
  const { products, loading, error, fetchProducts } = useContext(ProductContext);

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [fetchProducts, products.length]);

  if (loading) return <Loader />;
  if (error) return <div className="text-danger">Error al cargar los productos: {error}</div>;

  return (
    <>
      <Helmet>
        <title>Mi Tienda – Inicio</title>
        <meta
          name="description"
          content="Bienvenido a Mi Tienda. Explora nuestro catálogo con los mejores productos al mejor precio."
        />
      </Helmet>

      <div className="container mt-4">
        <h1 className="mb-4">Bienvenido a nuestra tienda</h1>
        <List products={products} />
      </div>
    </>
  );
};

export default HomePage;
