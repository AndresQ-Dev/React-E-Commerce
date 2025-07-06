import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import AppRouter from './routes/AppRouter';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <ProductProvider>
            <CartProvider>
              <AppRouter />
              <ToastContainer position="top-right" autoClose={3000} />
            </CartProvider>
          </ProductProvider>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
