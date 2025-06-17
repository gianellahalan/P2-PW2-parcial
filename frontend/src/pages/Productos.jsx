import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Productos.module.css";
import useSearchStore from "../store/searchStore";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [error, setError] = useState("");
  const { termino } = useSearchStore();

  useEffect(() => {
    document.title = "Productos";
    fetch("http://localhost:3000/api/productos")
      .then(res => res.json())
      .then(data => {
        setProductos(data);
        setFiltrados(data);
      })
      .catch(() => setError("No se pudieron cargar los productos"));
  }, []);

  useEffect(() => {
    if (!termino.trim()) {
      setFiltrados(productos);
    } else {
      const resultado = productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(termino.toLowerCase())
      );
      setFiltrados(resultado);
    }
  }, [termino, productos]);

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
        body: JSON.stringify({ productId, cantidad: 1 }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.mensaje || "Error al agregar al carrito");
      }

      alert("Producto agregado al carrito");
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      alert("No se pudo agregar al carrito");
    }
  };

  return (
    <div className={styles.productosContainer}>
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.grid}>
        {filtrados.map((producto) => (
          <div key={producto._id} className={styles.card}>
            <Link to={`/detallesproducto/${producto._id}`} className={styles.link}>
              <img src={producto.imagen} alt={producto.nombre} className={styles.img} />
              <h3>{producto.nombre}</h3>
              <p>${producto.precio}</p>
            </Link>
            <button className={styles.boton} onClick={() => agregarAlCarrito(producto._id)}>
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Productos;
