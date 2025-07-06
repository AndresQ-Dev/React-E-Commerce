// src/components/products/ProductForm.jsx
import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

export default function ProductForm({ onSubmit, onClose, initialData }) {
  // Estado de los campos
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [errors, setErrors] = useState([]);

  // Inicializar los campos si hay datos previos (modo edición)
  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setPrice(initialData.price || '');
      setDescription(initialData.description || '');
      setImage(initialData.image || '');
    }
  }, []); // Solo se ejecuta al montar, no al renderizar

  // Validación
  const validate = () => {
    const newErrors = [];

    if (!name.trim()) newErrors.push('El nombre es obligatorio.');
    if (Number(price) <= 0) newErrors.push('El precio debe ser mayor a 0.');
    if (description.trim().length < 10)
      newErrors.push('La descripción debe tener al menos 10 caracteres.');

    return newErrors;
  };

  // Enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const product = {
      name: name.trim(),
      price: Number(price),
      description: description.trim(),
      image: image.trim(),
    };

    if (initialData?.id) product.id = initialData.id;

    onSubmit(product); // Llama a la función del padre
    onClose(); // Cierra el modal
  };

  return (
    <Form onSubmit={handleSubmit}>
      {errors.length > 0 && (
        <Alert variant="danger">
          <ul className="mb-0">
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </Alert>
      )}

      <Form.Group className="mb-3">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej: Zapatillas deportivas"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Precio</Form.Label>
        <Form.Control
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Ej: 199.99"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Una breve descripción del producto..."
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>URL de Imagen</Form.Label>
        <Form.Control
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="https://..."
        />
      </Form.Group>

      <div className="d-flex justify-content-end">
        <Button variant="secondary" onClick={onClose} className="me-2">
          Cancelar
        </Button>
        <Button variant="primary" type="submit">
          {initialData ? 'Actualizar' : 'Agregar'}
        </Button>
      </div>
    </Form>
  );
}
