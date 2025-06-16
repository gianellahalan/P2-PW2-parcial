import { useEffect, useState } from 'react';
import styles from '../styles/MisPedidos.module.css';

const MisPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  const obtenerPedidos = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/pedidos', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al obtener pedidos');
      setPedidos(data);
    } catch (err) {
      console.error(err);
      setError('No se pudieron cargar tus pedidos');
    }
  };

  const cancelarPedido = async (id) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const res = await fetch(`http://localhost:3000/api/pedidos/${id}/cancelar`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data?.error || "Error al cancelar el pedido");

    alert('Pedido cancelado correctamente');
      obtenerPedidos();
    } catch (err) {
      console.error(err);
      alert('No se pudo cancelar el pedido');
    }
  };

  useEffect(() => {
    obtenerPedidos();
  }, []);

  return (
    <div className={styles.contenedor}>
      <h2>Mis Pedidos</h2>
      {error && <p className={styles.error}>{error}</p>}

      {pedidos.length === 0 ? (
        <p>No tienes pedidos.</p>
      ) : (
        pedidos.map((pedido) => (
          <div key={pedido._id} className={styles.pedido}>
            <h3>Pedido #{pedido._id.slice(-6)}</h3>
            <p><strong>Fecha:</strong> {new Date(pedido.createdAt).toLocaleString()}</p>
            <p><strong>Estado:</strong> <span className={styles[pedido.estado]}>{pedido.estado}</span></p>
            <p><strong>Total:</strong> ${pedido.total}</p>

            <ul>
              {pedido.productos.map((item, i) => (
                <li key={i}>
                  Producto: {item.product.nombre} - Cantidad: {item.cantidad}
                </li>
              ))}
            </ul>

            {pedido.estado === 'pendiente' && (
              <button onClick={() => cancelarPedido(pedido._id)} className={styles.cancelar}>
                Cancelar pedido
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default MisPedidos;
