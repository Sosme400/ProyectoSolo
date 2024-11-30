import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import Layout from "./Layout";
import "@fontsource/press-start-2p";

const backgroundFrame = "https://pbs.twimg.com/media/Ex-NacFWgAA-94O.png";
const priceIcon = "https://media.tenor.com/WfIMNAGsNrYAAAAi/minecraft.gif";
const decorativeImage = "https://64.media.tumblr.com/d96658c1fca1872b2a3c5a797c4a58d3/697a6f24d73d2f32-e0/s640x960/470f6e8380f45723a7c314c5b7d07e9ff65020d0.gif";

const UserPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleViewDetailsClick = (product) => {
    navigate(`/product-details/${product.id}`);
  };

  const renderRating = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {Array.from({ length: fullStars }).map((_, index) => (
          <FaStar key={index} className="text-yellow-500" />
        ))}
        {hasHalfStar && <FaStarHalfAlt className="text-yellow-500" />}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <FaRegStar key={index} className="text-yellow-500" />
        ))}
        <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const renderCategorySection = (category, productsToRender) => {
    if (productsToRender.length === 0) {
      return null;
    }

    return (
      <div key={category} className="mb-12">
        <h3 className="text-3xl font-bold mb-6 text-center text-black bg-gray-200 py-3 rounded-lg shadow-lg font-minecraft">
          {category}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto relative">
          {/* GIF decorativo lado izquierdo */}
          <img
            src={decorativeImage}
            alt="Decoración izquierda"
            className="absolute left-[-60px] top-1/2 transform -translate-y-1/2 w-20 h-auto"
          />
          {productsToRender.map((product) => (
            <div
              key={product.id}
              onClick={() => handleViewDetailsClick(product)}
              className="border border-[#8B4513] rounded-lg shadow-md p-4 cursor-pointer 
                        hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out transform relative bg-transparent"
            >
              <div className="relative w-full h-48 mb-4 flex items-center justify-center">
                <img
                  src={backgroundFrame}
                  alt="background frame"
                  className="absolute inset-0 w-full h-full object-contain z-0 opacity-100"
                />
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="relative z-10 w-auto h-5/6 object-contain"
                />
              </div>
              <h3 className="font-semibold text-lg mb-2 font-minecraft text-black">
                {product.name}
              </h3>
              <p className="text-black font-bold mb-2 flex items-center font-minecraft">
                <img
                  src={priceIcon}
                  alt="price icon"
                  className="w-6 h-6 mr-2"
                />
                {product.price}
              </p>
              <p className="text-black mb-2 font-minecraft">{product.description}</p>
              <div>{renderRating(product.rating || 4.5)}</div>
              {/* Mostrar cantidad en stock */}
              <p className="text-black mt-2 font-minecraft">
                <strong>Stock disponible:</strong> {product.stock} unidades
              </p>
            </div>
          ))}
          {/* GIF decorativo lado derecho */}
          <img
            src={decorativeImage}
            alt="Decoración derecha"
            className="absolute right-[-60px] top-1/2 transform -translate-y-1/2 w-20 h-auto"
          />
        </div>
      </div>
    );
  };

  const uniqueCategories = [
    ...new Set(products.map((product) => product.category_name)),
  ];

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "Todas" || product.category_name === selectedCategory)
  );

  return (
    <Layout>
      <div
        className="min-h-screen flex flex-col"
        style={{
          backgroundColor: "#ebdec2", // Color similar al fondo de la imagen
          border: "15px solid #8B4513", // Borde de color café más grande
        }}
      >
        {/* Banner */}
        <section className="bg-gray-800 bg-opacity-75 text-white p-6 mb-8 rounded-lg shadow-lg">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="flex-1 text-center lg:text-left mb-4 lg:mb-0">
              <h1 className="text-3xl font-bold mb-3 font-minecraft">Bienvenido a Tienda MC</h1>
              <p className="text-lg font-minecraft">
                Explora los mejores productos y ofertas del mundo de Minecraft.
              </p>
            </div>
            <div className="flex-1 flex justify-center lg:justify-end">
              <img
                src="https://minecraft.wiki/images/thumb/Enchanter_Idle.gif/160px-Enchanter_Idle.gif?c70a6"
                alt="Banner"
                className="w-3/4 max-w-md object-cover rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* Filtro y búsqueda */}
        <div className="mb-12 text-center">
          <div className="mb-6">
            <label htmlFor="categoryFilter" className="text-xl font-semibold mr-4 text-black font-minecraft">
              Filtrar por Categoría:
            </label>
            <select
              id="categoryFilter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg font-minecraft text-black"
            >
              <option value="Todas">Todas</option>
              {uniqueCategories.map((category) => (
                <option key={category} value={category} className="font-minecraft text-black">
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="search" className="text-xl font-semibold mr-4 text-black font-minecraft">
              Buscar Producto:
            </label>
            <input
              type="text"
              id="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre de producto"
              className="p-2 border border-gray-300 rounded-lg w-full max-w-md font-minecraft text-black"
            />
          </div>
        </div>

        {/* Productos */}
        {selectedCategory === "Todas"
          ? uniqueCategories.map((category) => {
              const productsInCategory = filteredProducts.filter(
                (product) => product.category_name === category
              );
              return renderCategorySection(category, productsInCategory);
            })
          : renderCategorySection(selectedCategory, filteredProducts)}
      </div>
    </Layout>
  );
};

export default UserPage;
