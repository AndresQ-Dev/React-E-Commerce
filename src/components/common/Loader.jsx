// src/components/Loader.jsx
import React from 'react';

const skeletonPulseKeyframes = `
  @keyframes skeleton-pulse {
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: 200px 0;
    }
  }
`;

const skeletonItemStyle = {
  height: '20px', // Altura de las "líneas"
  backgroundColor: '#e0e0e0', // Color base gris
  borderRadius: '4px',
  marginBottom: '10px', // Espacio entre las líneas
  animation: 'skeleton-pulse 1.5s infinite linear',
  background: 'linear-gradient(to right, #e0e0e0 8%, #f0f0f0 18%, #e0e0e0 33%)',
  backgroundSize: '400px 100%',
};

const Loader = () => {
  const numberOfLines = 5; // Cantidad de líneas de esqueleto a mostrar

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto', border: '1px solid #ddd', borderRadius: '8px' }}>
      <style>{skeletonPulseKeyframes}</style>

      {Array.from({ length: numberOfLines }).map((_, index) => {
        const widthPercentage = 80 + (index % 3) * 10; // 70%, 80%, 90%
        return (
          <div
            key={index}
            style={{ ...skeletonItemStyle, width: `${widthPercentage}%` }}
          ></div>
        );
      })}
    </div>
  );
};

export default Loader;