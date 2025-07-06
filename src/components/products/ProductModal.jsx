// src/components/products/ProductModal.jsx
import React from 'react';
import { Modal } from 'react-bootstrap';
import ProductForm from './ProductForm';

export default function ProductModal({ show, onClose, onSubmit, initialData }) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{initialData ? 'Editar producto' : 'Agregar producto'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ProductForm
          onSubmit={onSubmit}
          onClose={onClose}
          initialData={initialData}
        />
      </Modal.Body>
    </Modal>
  );
}
