// src/components/common/Footer.jsx
import React from 'react';
import { Container } from 'react-bootstrap';
import { FaGithub, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-light text-center text-muted py-3 mt-auto border-top">
      <Container>
        <div className="d-flex justify-content-center align-items-center gap-4 flex-wrap">
          <a
            href="https://github.com/AndresQ-Dev/React-E-Commerce.git"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted fs-5"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="mailto:andresquirogadev@protonmail.com"
            className="text-muted fs-5"
            aria-label="Email"
          >
            <FaEnvelope />
          </a>
        </div>
        <small className="d-block mt-2">&copy; {new Date().getFullYear()} REACT eCommerce</small>
      </Container>
    </footer>
  );
}
