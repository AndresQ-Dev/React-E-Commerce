
import React, { useContext, useState } from 'react';
import { Button, Container, Table, Row, Col, Card } from 'react-bootstrap';
import { ProductContext } from '../context/ProductContext';
import ProductModal from '../components/products/ProductModal';
import { toast } from 'react-toastify';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

export default function AdminPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useContext(ProductContext);

  const [showModal, setShowModal]           = useState(false);
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
        toast.success('Producto actualizado');
      } else {
        await addProduct(formData);
        toast.success('Producto agregado');
      }
      handleCloseModal();
    } catch {
      toast.error('Error al guardar');
    }
  };
  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar?')) {
      try {
        await deleteProduct(id);
        toast.success('Producto eliminado');
      } catch {
        toast.error('Error al eliminar');
      }
    }
  };

  return (
    <Container className="mt-4">
      <h1 className="mb-4 text-center">Panel de Administración</h1>

      <div className="d-flex justify-content-end mb-3">
        <Button onClick={() => handleOpenModal()} variant="success">
          <FaPlus className="me-2" />
          <span className="d-none d-md-inline">Agregar Producto</span>
        </Button>
      </div>

      {/* Tabla para md+ */}
      <div className="d-none d-md-block">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>
                  <img
                    src={p.image}
                    alt={p.name}
                    width={100}
                    height={60}
                    style={{ objectFit: 'cover' }}
                  />
                </td>
                <td>{p.name}</td>
                <td>${p.price}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleOpenModal(p)}
                  >
                    <FaEdit className="me-1" />
                    <span className="d-none d-md-inline">Editar</span>
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(p.id)}
                  >
                    <FaTrash className="me-1" />
                    <span className="d-none d-md-inline">Eliminar</span>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Tarjetas para xs/sm */}
      <Row className="d-md-none g-3">
        {products.map(p => (
          <Col xs={12} key={p.id}>
            <Card className="p-2 d-flex flex-row align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <img
                  src={p.image}
                  alt={p.name}
                  width={60}
                  height={40}
                  style={{ objectFit: 'cover' }}
                  className="me-3"
                />
                <div>
                  <strong>{p.name}</strong>
                  <div>${p.price}</div>
                </div>
              </div>
              <div>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleOpenModal(p)}
                >
                  <FaEdit />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(p.id)}
                >
                  <FaTrash />
                </Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

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
