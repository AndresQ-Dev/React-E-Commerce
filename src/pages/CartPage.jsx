import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Button, Table } from 'react-bootstrap';

export default function CartPage() {
  const {
    cartItems,
    removeProduct,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useContext(CartContext);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) return <h2>Tu carrito está vacío</h2>;

  return (
    <div>
      <h2>Tu Carrito</h2>
      <Table striped bordered hover>
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
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => decreaseQuantity(item.id)}
                  className="me-2"
                >
                  -
                </Button>
                {item.quantity}
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => increaseQuantity(item.id)}
                  className="ms-2"
                >
                  +
                </Button>
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
      <h3>Total: ${totalPrice}</h3>
      <Button variant="secondary" onClick={clearCart}>
        Vaciar carrito
      </Button>
    </div>
  );
}
