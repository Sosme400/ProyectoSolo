import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const backgroundFrame = "https://pbs.twimg.com/media/Ex-NacFWgAA-94O.png";
const priceIcon = "https://media.tenor.com/WfIMNAGsNrYAAAAi/minecraft.gif";

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
        <h3 className="text-3xl font-bold mb-6 text-center text-white bg-gray-800 bg-opacity-75 py-3 rounded-lg shadow-lg">
          {category}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {productsToRender.map((product) => (
            <div
              key={product.id}
              onClick={() => handleViewDetailsClick(product)}
              className="bg-white bg-opacity-90 border border-gray-300 rounded-lg shadow-md p-4 cursor-pointer 
                        hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out transform relative"
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
              <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
              <p className="text-gray-700 font-bold mb-2 flex items-center">
                <img
                  src={priceIcon}
                  alt="price icon"
                  className="w-6 h-6 mr-2"
                />
                {product.price}
              </p>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <div>{renderRating(product.rating || 4.5)}</div>
            </div>
          ))}
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
    <div>
      <div className="max-w-7xl mx-auto py-12">
        {/* Banner */}
        <section className="bg-gray-800 bg-opacity-75 text-white p-8 mb-12 rounded-lg shadow-lg">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="flex-1 text-center lg:text-left mb-6 lg:mb-0">
              <h1 className="text-4xl font-bold mb-4">Bienvenido a Tienda MC</h1>
              <p className="text-xl">
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
            <label htmlFor="categoryFilter" className="text-xl font-semibold mr-4 text-white">
              Filtrar por Categoría:
            </label>
            <select
              id="categoryFilter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg"
            >
              <option value="Todas">Todas</option>
              {uniqueCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="search" className="text-xl font-semibold mr-4 text-white">
              Buscar Producto:
            </label>
            <input
              type="text"
              id="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre de producto"
              className="p-2 border border-gray-300 rounded-lg w-full max-w-md"
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
    </div>
  );
};

export default UserPage;
