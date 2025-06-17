import { useEffect, useState } from "react";
import { Container, Table, Form, Alert, Button } from "react-bootstrap";
import styles from "../styles/AdminPedidosyUsuario.module.css";

function AdminPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState("");
  const [estadoEditado, setEstadoEditado] = useState({});

  const token = localStorage.getItem("token");

    useEffect(() => {
    document.title = "Pedidos";
  }, []);

  const fetchPedidos = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/pedidos/admin", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setPedidos(data);
    } catch (err) {
      setError("No se pudieron cargar los pedidos.");
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  const handleSelectChange = (pedidoId, nuevoEstado) => {
    setEstadoEditado((prev) => ({ ...prev, [pedidoId]: nuevoEstado }));
  };

  const confirmarCambioEstado = async (id) => {
    const nuevoEstado = estadoEditado[id];
    if (!nuevoEstado) return;

    try {
      await fetch(`http://localhost:3000/api/pedidos/estado/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ estado: nuevoEstado }),
      });

      fetchPedidos();
      setEstadoEditado((prev) => {
        const copia = { ...prev };
        delete copia[id];
        return copia;
      });
    } catch (err) {
      alert("Error al actualizar el estado del pedido.");
    }
  };

  return (
    <Container className={styles.contenedor}>
      <h2>Gestión de Pedidos</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      {pedidos.length === 0 ? (
        <Alert variant="info">
          No hay ningún pedido.
        </Alert>
      ) : (
        <Table className={styles.tabla}>
          <thead className={styles.thead}>
            <tr className={styles.tr}>
              <th className={styles.th}>Usuario</th>
              <th className={styles.th}>Productos</th>
              <th className={styles.th}>Total</th>
              <th className={styles.th}>Fecha</th>
              <th className={styles.th}>Estado</th>
              <th className={styles.th}>Modificar</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {pedidos.map((pedido) => (
              <tr key={pedido._id} className={styles.tr}>
                <td className={styles.td}>{pedido.user?.email || "Sin email"}</td>
                <td className={styles.td}>
                  {pedido.productos.map((p, i) => (
                    <div key={i}>{p.product?.nombre} x{p.cantidad}</div>
                  ))}
                </td>
                <td className={styles.td}>${pedido.total}</td>
                <td className={styles.td}>
                  {new Date(pedido.createdAt).toLocaleDateString()}
                </td>
                <td className={styles.td2}>
                  <Form.Select
                    value={estadoEditado[pedido._id] || pedido.estado}
                    onChange={(e) => handleSelectChange(pedido._id, e.target.value)}
                    className={styles.select}
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="entregado">Entregado</option>
                    <option value="cancelado">Cancelado</option>
                  </Form.Select>
                </td>
                <td className={styles.td2}>
                  <Button
                    variant="primary"
                    onClick={() => confirmarCambioEstado(pedido._id)}
                    disabled={
                      !estadoEditado[pedido._id] ||
                      estadoEditado[pedido._id] === pedido.estado
                    }
                    className={styles.boton}
                  >
                    Confirmar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default AdminPedidos;
