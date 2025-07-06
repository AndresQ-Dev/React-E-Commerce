import React, { useContext } from 'react';
import { Navbar, Nav, Container, Badge, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './../../context/AuthContext'; // Contexto de autenticación
import { CartContext } from '../../context/CartContext'; // Contexto del carrito
import { CartFill, BoxArrowInRight, BoxArrowRight } from 'react-bootstrap-icons'; // Íconos (revisar si están visualizandose bien)

export default function AppNavbar() {
  // 1. llamado a contextos de autenticación y carrito
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  // 2. Calculamos el total de items en el carrito
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirige
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          🚀 REACT eCommerce
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Links izquierda */}
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/products">Productos</Nav.Link>
            {/*panel de admin solo visible si el usuario está logueado :) */}
            {isAuthenticated && (
              <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
            )}
          </Nav>

          {/*Links de usuario y carrito a la derecha siempre */}
          <Nav>
            <Nav.Link as={Link} to="/cart" className="d-flex align-items-center">
              <CartFill size={20} />
              <span className="ms-1 d-lg-none">Carrito</span> {/* Texto para vista móvil */}
              {totalItems > 0 && (
                <Badge pill bg="success" className="ms-2">{totalItems}</Badge>
              )}
            </Nav.Link>

            {isAuthenticated ? (
              // Si el usuario está autenticado
              <>
                <Navbar.Text className="mx-2 d-none d-lg-block">
                  Hola, {user.email}
                </Navbar.Text>
                <Button variant="outline-danger" onClick={handleLogout} size="sm" className="d-flex align-items-center">
                   <BoxArrowRight size={20} className="me-1"/> Logout
                </Button>
              </>
            ) : (
              // Si no lo estÁ
              <Nav.Link as={Link} to="/login" className="d-flex align-items-center">
                <BoxArrowInRight size={20} className="me-1" /> Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
// revisar estilos para que el navbar y estlizarlo...