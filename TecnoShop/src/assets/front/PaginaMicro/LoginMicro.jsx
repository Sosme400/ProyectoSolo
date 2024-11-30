import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import video1 from "./videos/video1.mp4";
import logo from "../images/tecnoshopBlanco.png";

export default function LoginMicro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post("http://localhost:8000/login", {
        correo: email,
        contraseña: password,
      });

      const { usuario, token } = response.data;

      console.log("Datos del usuario recibido:", usuario);

      localStorage.setItem("user", JSON.stringify(usuario));
      localStorage.setItem("token", token);

      if (usuario.rol === "admin") {
        navigate("/admin-dashboard");
      } else if (usuario.rol === "cliente") {
        navigate("/");
      } else {
        setErrorMessage("Rol de usuario no reconocido");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.mensaje || "Error al iniciar sesión"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        src={video1}
        autoPlay
        loop
        muted
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 -z-10"></div>
      <div className="flex max-w-5xl bg-gray-200 bg-opacity-90 rounded-lg shadow-lg overflow-hidden w-full z-10 gap-8">
        <div className="w-1/2 p-8 bg-black text-white flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold mb-4">Bienvenido a TecnoShop</h2>
          <p className="text-lg mb-4 text-center">Ingresa para gestionar tu negocio de forma eficiente.</p>
          <img src={logo} alt="TecnoShop logo" className="w-40 h-40 mb-6" />
          <h3 className="text-xl font-semibold mb-2">Beneficios:</h3>
          <ul className="list-disc list-inside text-left">
            <li>Acceso a herramientas avanzadas para gestionar tus productos.</li>
            <li>Actualizaciones en tiempo real sobre pedidos y comentarios.</li>
          </ul>
        </div>
        <div className="w-1/2 p-8">
          <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">TecnoShop</h1>
          <h2 className="text-lg font-medium text-center mb-6 text-gray-600">Iniciar sesión como vendedor</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-600 mb-2">Correo</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@domain.com"
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="flex justify-between text-gray-600 mb-2">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
            <div className="mb-6 flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className={`w-3/4 flex items-center justify-center bg-black text-white py-2 px-4 rounded-lg ${
                  loading ? "cursor-not-allowed" : "hover:bg-gray-800"
                }`}
              >
                {loading ? "Procesando..." : "Iniciar sesión Ahora"}
              </button>
            </div>
          </form>
          <p className="mt-4 text-center">
            ¿No tienes cuenta? <Link to="/registro-micro" className="text-blue-500 hover:underline">Regístrate</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
