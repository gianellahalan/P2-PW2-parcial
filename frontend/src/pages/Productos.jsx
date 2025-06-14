import { useEffect, useState } from "react";
import styles from "./Productos.module.css";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Productos";
    fetch("http://localhost:3000/api/productos")
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(() => setError("❌ No se pudieron cargar los productos"));
  }, []);

const agregarAlCarrito = async (productId) => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Debes iniciar sesión para agregar al carrito.");
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/api/carrito/agregar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ productId }), 
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.mensaje || "Error al agregar al carrito");
    }

    alert("Producto agregado al carrito");
  } catch (error) {
    console.error("Error al agregar al carrito:", error);
    alert("❌ No se pudo agregar al carrito");
  }
};

  return (
    <div className={styles.productosContainer}>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.grid}>
        {productos.map((producto) => (
          <div key={producto._id} className={styles.card}>
            <img src={producto.imagen} alt={producto.nombre} className={styles.img} />
            <h3>{producto.nombre}</h3>
            <p>${producto.precio}</p>
            <button className={styles.boton} onClick={() => agregarAlCarrito(producto._id)}>Agregar al carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
}



export default Productos;
