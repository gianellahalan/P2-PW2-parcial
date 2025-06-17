import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Productos.module.css";
<<<<<<< HEAD
import useSearchStore from "../store/searchStore"; 
=======
import useSearchStore from "../store/searchStore";
>>>>>>> 279b5809e4fa2ac973f976bd79f50a3e23be6f55

function Productos() {
  const [productos, setProductos] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [error, setError] = useState("");
<<<<<<< HEAD
  const { termino } = useSearchStore(); 
=======
  const { termino } = useSearchStore();
>>>>>>> 279b5809e4fa2ac973f976bd79f50a3e23be6f55

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
<<<<<<< HEAD
      setFiltrados(productos); 
=======
      setFiltrados(productos);
>>>>>>> 279b5809e4fa2ac973f976bd79f50a3e23be6f55
    } else {
      const resultado = productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(termino.toLowerCase())
      );
<<<<<<< HEAD
      setFiltrados(resultado); 
    }
  }, [termino, productos]); 
=======
      setFiltrados(resultado);
    }
  }, [termino, productos]);
>>>>>>> 279b5809e4fa2ac973f976bd79f50a3e23be6f55

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
