// src/components/products/StyledCard.jsx
import styled from 'styled-components';
import { Card } from 'react-bootstrap';

export const CardWrapper = styled(Card)`
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.03);
  }
  .card-title {
    font-size: 1.1rem;
    font-weight: bold;
  }
  .card-text {
    color: #555;
  }
`;
