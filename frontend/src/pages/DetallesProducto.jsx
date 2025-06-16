import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../styles/DetallesProducto.module.css';

const DetallesProducto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const respuesta = await fetch(`http://localhost:3000/api/productos/${id}`);
        const data = await respuesta.json();
        setProducto(data);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      }
    };

    obtenerProducto();
  }, [id]);

  const agregarAlCarrito = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch("http://localhost:3000/api/carrito/agregar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: id, cantidad: 1 }),
      });

      if (!response.ok) {
        throw new Error('Error al agregar al carrito');
      }

      const data = await response.json();
      setMensaje('Producto añadido al carrito correctamente!');

      setTimeout(() => setMensaje(''), 3000);
    } catch (error) {
      console.error(error);
      setMensaje('Error al agregar el producto al carrito.');
      setTimeout(() => setMensaje(''), 3000);
    }
  };

  if (!producto) return <p>Cargando...</p>;

  return (
    <div className={styles.contenedor}>
      <div className={styles.info}>
        <article className={styles.article}>
          <img src={`/${producto.imagen}`} alt={producto.nombre} className={styles.product} />
          <div className={styles.divTransparente}>
            <p className={styles.p} onClick={agregarAlCarrito} style={{ cursor: 'pointer' }}>Comprar</p>
          </div>
        </article>

        <article className={styles.article2}>
          <h1>{producto.nombre}</h1>
          <p className={styles.precio}>{producto.precio}</p>

          <h2>Características:</h2>
          <p>{producto.descripcion}</p>

          <div className={styles.boton} onClick={agregarAlCarrito} style={{ cursor: 'pointer' }}>
            <img src="/img/carrito.png" alt="carrito" />
            <p>Añadir al carrito</p>
          </div>

          {mensaje && <p className={styles.mensaje}>{mensaje}</p>}
        </article>
      </div>
    </div>
  );
};

export default DetallesProducto;
