import React from "react";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  const backgroundImage = "https://i.stack.imgur.com/VYPSF.png"; // URL del fondo

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "contain", // Cambiado a "contain" para que la imagen se ajuste
        backgroundRepeat: "no-repeat", // Evita que la imagen se repita
        backgroundPosition: "center", // Centra la imagen
        minHeight: "100vh",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;