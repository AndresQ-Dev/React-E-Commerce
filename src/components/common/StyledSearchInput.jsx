// src/components/common/StyledSearchInput.jsx
import styled from 'styled-components';
import { Form } from 'react-bootstrap';

export const StyledSearchInput = styled(Form.Control)`
  border: 2px solid #0d6efd;         /* azul de Bootstrap */
  background-color: #f1f5ff;         /* un ligero tono celeste */
  box-shadow: 0 0 8px rgba(13, 110, 253, 0.3);
  transition: box-shadow 0.2s ease-in-out;

  &:focus {
    box-shadow: 0 0 12px rgba(13, 110, 253, 0.6);
    border-color: #0a58ca;
  }
`;
