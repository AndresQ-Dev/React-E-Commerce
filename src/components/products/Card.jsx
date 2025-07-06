import React, { useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { CartContext } from '../../context/CartContext';

export default function ProductCard({ product }) {
    const { addProduct } = useContext(CartContext);

    return (
        <Card className="h-100">
            <Card.Img
                variant="top"
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                style={{ objectFit: 'cover' }}
                loading='lazy'
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>${product.price}</Card.Text>
                {/* Aquí va el botón */}
                <Button
                    variant="primary"
                    onClick={() => addProduct(product)}
                    className="mt-auto"
                >
                    Agregar al carrito
                </Button>
            </Card.Body>
        </Card>
    );
}

