import React, { useContext } from 'react';
import { Row, Col, Button, Spinner } from 'react-bootstrap';
import { CartContext } from '../../context/CartContext';
import { CardWrapper } from './StyledCard';   // <- tu styled card

export default function List({ products }) {
  const { addProduct } = useContext(CartContext);

  return (
    <Row xs={1} sm={2} md={3} lg={4} className="g-4">
      {products.map(product => (
        <Col key={product.id}>
          <CardWrapper className="h-100">
            <CardWrapper.Img
              variant="top"
              src={product.image}
              alt={product.name}
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <CardWrapper.Body className="d-flex flex-column">
              <CardWrapper.Title>{product.name}</CardWrapper.Title>
              <CardWrapper.Text>${product.price}</CardWrapper.Text>
              <Button
                variant="primary"
                onClick={() => addProduct(product)}
                className="mt-auto"
                aria-label={`Agregar ${product.name} al carrito`}
              >
                🛒 Agregar
              </Button>
            </CardWrapper.Body>
          </CardWrapper>
        </Col>
      ))}
    </Row>
  );
}
