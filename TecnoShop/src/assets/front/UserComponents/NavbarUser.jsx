import React from 'react';
import logo from '/src/assets/front/images/tecnoshopBlanco.png'; // Ruta absoluta para Vite

const Navbar = () => {
  return (
    <header
      className="bg-black p-4 flex justify-between items-center"
      style={{
        position: 'sticky', // Hace que el Navbar permanezca fijo
        top: 0,
        zIndex: 1000,
      }}
    >
      <div className="flex items-center">
        <img src={logo} alt="TecnoShop Logo" className="h-10 mr-3" />
        <span className="font-semibold text-xl text-white">TecnoShop</span>
      </div>
    </header>
  );
};

export default Navbar;
