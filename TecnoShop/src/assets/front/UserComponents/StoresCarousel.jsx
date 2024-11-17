import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Importa las imágenes usando rutas absolutas
import mgAccesorios from '/src/assets/front/images/mg_accesorios.png';
import bitplus from '/src/assets/front/images/bitplus.png';
import electronix from '/src/assets/front/images/electronix.png';

const stores = [
  { image: mgAccesorios, name: 'MG Accesorios' },
  { image: bitplus, name: 'BitPlus' },
  { image: electronix, name: 'Electronix' },
];

const StoresCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Transición automática cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === stores.length - 1 ? 0 : prevIndex + 1));
    }, 3000); // 3 segundos

    return () => clearInterval(interval);
  }, []);

  const prevStore = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? stores.length - 1 : prevIndex - 1));
  };

  const nextStore = () => {
    setCurrentIndex((prevIndex) => (prevIndex === stores.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative flex justify-center items-center my-8">
      <button onClick={prevStore} className="absolute left-0">
        <FaChevronLeft size={30} />
      </button>
      <div className="flex space-x-4">
        {stores.map((store, index) => (
          <div
            key={index}
            className={`transition-opacity duration-500 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
          >
            <img src={store.image} alt={store.name} className="h-32 w-64 object-contain rounded-lg" /> {/* Ajuste con object-contain */}
            <p className="text-center mt-2 font-semibold">{store.name}</p>
          </div>
        ))}
      </div>
      <button onClick={nextStore} className="absolute right-0">
        <FaChevronRight size={30} />
      </button>
    </div>
  );
};

export default StoresCarousel;
