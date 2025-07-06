
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Button, Table, Container, Row, Col } from 'react-bootstrap';

export default function CartPage() {
  const {
    cartItems,
    removeProduct,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useContext(CartContext);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return <h2 className="text-center mt-5">Tu carrito está vacío</h2>;
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Tu Carrito</h2>

      {/* ====== TABLA para md+ ====== */}
      <div className="d-none d-md-block">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>
                  <div className="d-flex align-items-center">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      −
                    </Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </Button>
                  </div>
                </td>
                <td>${item.price * item.quantity}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeProduct(item.id)}
                  >
                    Quitar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* ====== LISTA para xs/sm en moviles chicos... ====== */}
      <div className="d-md-none">
        {cartItems.map(item => (
          <div 
            key={item.id} 
            className="mb-3 p-3 border rounded d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{item.name}</strong><br/>
              <small>Precio: ${item.price}</small><br/>
              <small>Cant: {item.quantity}</small><br/>
              <small>Subtotal: ${item.price * item.quantity}</small>
            </div>
            <Button
              variant="danger"
              size="sm"
              onClick={() => removeProduct(item.id)}
            >
              ×
            </Button>
          </div>
        ))}
      </div>

      {/*TOTAL Y BOTÓN */}
      <Row className="justify-content-center mt-3">
        <Col xs="auto" className="text-center">
          <h3>Total: ${totalPrice}</h3>
          <Button variant="secondary" onClick={clearCart}>
            Vaciar carrito
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
