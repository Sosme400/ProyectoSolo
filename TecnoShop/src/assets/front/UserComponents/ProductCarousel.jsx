// src/ProductCarousel.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import laptopImage from './images/laptop.png';
import processorImage from './images/processor.png';
import accessoryImage from './images/accessory.png';
import monitorImage from './images/monitor.png';

const products = [
  { image: laptopImage, alt: "Laptop", description: "Laptop de alto rendimiento" },
  { image: processorImage, alt: "Procesador", description: "Procesador Intel Core i7" },
  { image: accessoryImage, alt: "Accesorio", description: "Accesorio para celular" },
  { image: monitorImage, alt: "Monitor", description: "Monitor 4K" },
];

const ProductCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleRegisterClick = () => {
    navigate('/registro');
  };

  return (
    <div className="text-center">
      <img
        src={products[currentIndex].image}
        alt={products[currentIndex].alt}
        className="mx-auto w-1/2 md:w-1/3 lg:w-1/4"
      />
      <p className="mt-4 text-white font-semibold">{products[currentIndex].description}</p>
      
    </div>
  );
};

export default ProductCarousel;
