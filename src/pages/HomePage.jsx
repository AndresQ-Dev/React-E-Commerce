// src/pages/HomePage.jsx
import React, { useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ProductContext } from '../context/ProductContext';
import List from '../components/products/List';
import Loader from '../components/common/Loader';
import logo from '../assets/img/logoCart.png'; // Correct import

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
        <title>REACT eCommerce – Inicio</title>
        <meta
          name="description"
          content="Bienvenido a Mi Tienda. Explora nuestro catálogo."
        />
      </Helmet>

      {/* Put the logo INSIDE the container for proper centering and responsiveness */}
      <div className="container mt-4 text-center">
        <img
          src={logo} // <-- Corrected: use the imported 'logo' variable here
          alt="Logo de la Tienda"
          className="img-fluid mb-3"
          style={{ maxWidth: '120px' }} // Adjust this value to control the logo's maximum size
        />
        
        <h1 className="mb-4">Bienvenido a la Tienda</h1>
        <List products={products} />
      </div>
    </>
  );
};

export default HomePage;
