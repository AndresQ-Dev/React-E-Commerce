// src/pages/AdminPage.jsx
import React, { useContext, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { ProductContext } from '../context/ProductContext';
import ProductModal from '../components/products/ProductModal';
import { toast } from 'react-toastify';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

export default function AdminPage() {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useContext(ProductContext);

  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleOpenModal = (product = null) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setEditingProduct(null);
    setShowModal(false);
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
        toast.success('Producto actualizado correctamente');
      } else {
        await addProduct(formData);
        toast.success('Producto agregado correctamente');
      }
      handleCloseModal();
    } catch (err) {
      toast.error('Error al guardar el producto');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro que deseas eliminar este producto?')) {
      try {
        await deleteProduct(id);
        toast.success('Producto eliminado');
      } catch (err) {
        toast.error('Error al eliminar el producto');
      }
    }
  };

  return (
    <Container>
      <h1 className="mb-4">Panel de Administración</h1>
      <Button variant="success" className="mb-3" onClick={() => handleOpenModal()}>
        <FaPlus className="me-2" />
        Agregar Producto
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>
                <img
                  src={p.image}
                  alt={p.name}
                  style={{ width: '100px', height: '60px', objectFit: 'cover' }}
                />
              </td>
              <td>{p.name}</td>
              <td>${p.price}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleOpenModal(p)}>
                  <FaEdit className="me-1" />
                  Editar
                </Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(p.id)}>
                  <FaTrash className="me-1" />
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {showModal && (
        <ProductModal
          show={showModal}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          initialData={editingProduct}
        />
      )}
    </Container>
  );
}
