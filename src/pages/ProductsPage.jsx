// src/pages/ProductsPage.jsx
import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../context/ProductContext';
import List from '../components/products/List';
import Loader from '../components/common/Loader';
import { Form, Container, Pagination, Row, Col, InputGroup } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { FaSearch } from 'react-icons/fa';
import { StyledSearchInput } from '../components/common/StyledSearchInput';

export default function ProductsPage() {
  const { products, loading, error, fetchProducts } = useContext(ProductContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 12;

  useEffect(() => {
    if (products.length === 0) fetchProducts();
  }, [fetchProducts, products.length]);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const start = (page - 1) * perPage;
  const currentItems = filtered.slice(start, start + perPage);

  if (loading) return <Loader />;
  if (error) return <div className="text-danger">{error}</div>;

  return (
    <>
      <Helmet>
        <title>Mi Tienda – Productos</title>
        <meta
          name="description"
          content="Consulta y navega nuestro catálogo de productos."
        />
      </Helmet>

      <Container className="mt-4">
        <h1 className="mb-4 text-center">Productos</h1>

        {/* Barra de búsqueda más visible */}
        <Row className="justify-content-center mb-4">
          <Col xs={12} sm={10} md={8} lg={6}>
            <InputGroup>
              <InputGroup.Text className="bg-white border-0">
                <FaSearch color="#0d6efd" />
              </InputGroup.Text>
              <StyledSearchInput
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={e => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
              />
            </InputGroup>
          </Col>
        </Row>

        <List products={currentItems} />

        {totalPages > 1 && (
          <Pagination className="justify-content-center mt-4">
            <Pagination.Prev
              disabled={page === 1}
              onClick={() => setPage(p => Math.max(p - 1, 1))}
            />
            {Array.from({ length: totalPages }, (_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === page}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              disabled={page === totalPages}
              onClick={() => setPage(p => Math.min(p + 1, totalPages))}
            />
          </Pagination>
        )}
      </Container>
    </>
  );
}
