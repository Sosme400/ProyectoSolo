import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import video1 from "../PaginaMicro/videos/video1.mp4"; // Ruta del video
import logo from "../images/tecnoshopBlanco.png"; // Ruta del logo

export default function RegistroClientes() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar contraseñas coincidan
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Petición al backend para registrar al usuario
      const response = await axios.post("http://localhost:8000/register", {
        name,
        email,
        password,
      });

      console.log(response.data); // Registro exitoso
      navigate("/LoginUsuarios"); // Redirigir al inicio de sesión
    } catch (err) {
      console.error(err);
      setError("Error al registrar usuario, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
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
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Nombre de Usuario"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Correo electrónico"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4 relative">
              <input
                type="password"
                placeholder="Contraseña"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4 relative">
              <input
                type="password"
                placeholder="Confirmar contraseña"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
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
          </form>
        </div>
      </div>
    </section>
  );
}
