// src/assets/front/registrologinclient/RegistroClientes.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import video1 from "../PaginaMicro/videos/video1.mp4"; // Ruta del video
import logo from "../images/tecnoshopBlanco.png"; // Ruta del logo

export default function RegistroClientes() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Estado para mostrar/ocultar confirmación de contraseña
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/LoginUsuarios"); // Redirige a la página de inicio de sesión después del registro
    }, 2000);
  };

  const redirectToLogin = () => {
    navigate("/LoginUsuarios"); // Redirige a la página de inicio de sesión
  };

  return (
    <section className="relative h-screen flex items-center justify-center">
      <video className="absolute top-0 left-0 w-full h-full object-cover -z-10" src={video1} autoPlay loop muted />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 -z-10"></div>
      <div className="flex max-w-5xl bg-gray-200 bg-opacity-90 rounded-lg shadow-lg overflow-hidden w-full z-10 gap-8">
        <div className="w-1/2 p-8 bg-black text-white flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold mb-4">Bienvenido a TecnoShop</h2>
          <p className="text-lg mb-4 text-center">Regístrate para explorar y comprar productos en nuestra plataforma.</p>
          <img src={logo} alt="TecnoShop logo" className="w-40 h-40 mb-6" />
          <h3 className="text-xl font-semibold mb-2">Ventajas:</h3>
          <ul className="list-disc list-inside text-left">
            <li>Compra segura y rápida.</li>
            <li>Acceso a ofertas exclusivas y descuentos.</li>
          </ul>
        </div>
        <div className="w-1/2 p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">TecnoShop</h1>
          <h3 className="text-lg font-medium text-center text-gray-600 mb-6">Crea tu cuenta Ahora</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Ingresar nombre de Usuario"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-500"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Ingresar correo"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-500"
                required
              />
            </div>
            <div className="mb-4 relative">
              <input
                type={showPassword ? "text" : "password"} // Cambia entre texto y contraseña
                placeholder="Ingresar contraseña"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} // Alterna el estado de showPassword
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
            <div className="mb-4 relative">
              <input
                type={showConfirmPassword ? "text" : "password"} // Cambia entre texto y contraseña
                placeholder="Confirmar contraseña"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Alterna el estado de showConfirmPassword
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
            <div className="mb-6 text-center">
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-black text-white py-3 rounded-lg font-semibold transition duration-150 ease-in-out ${
                  loading ? "cursor-not-allowed" : "hover:bg-gray-800"
                }`}
              >
                {loading ? "Procesando..." : "Crear cuenta"}
              </button>
            </div>
            <div className="text-center text-gray-600">
              ¿Ya tienes cuenta?{" "}
              <button
                onClick={redirectToLogin}
                className="text-black font-semibold hover:underline"
              >
                Inicia sesión ahora
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
