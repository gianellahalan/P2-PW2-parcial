import { useEffect, useState } from "react";
import { Container, Table, Button, Form, Alert } from "react-bootstrap";
import styles from "../styles/AdminDashboard.module.css";

function AdminDashboard() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ nombre: "", descripcion: "", precio: "", stock: "", imagen: "" });
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");

    useEffect(() => {
    document.title = "Panel de administración";
  }, []);

  const fetchProductos = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/productos", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setProductos(data);
    } catch {
      setError("No se pudieron cargar los productos");
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;
    await fetch(`http://localhost:3000/api/productos/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchProductos();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `http://localhost:3000/api/productos/${editingId}`
      : "http://localhost:3000/api/productos";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    setShowModal(false);
    setForm({ nombre: "", descripcion: "", precio: "", stock: "", imagen: "" });
    setEditingId(null);
    fetchProductos();
  };

  const openEdit = (prod) => {
    setForm(prod);
    setEditingId(prod._id);
    setShowModal(true);
  };

  const openNew = () => {
    setForm({ nombre: "", descripcion: "", precio: "", stock: "", imagen: "" });
    setEditingId(null);
    setShowModal(true);
  };

  return (
    <>
      <Container className={styles.contenedorEntero}>
        <h2>Panel de Administración</h2>
        {error && <Alert variant="danger">{error}</Alert>}

        <Button className={styles.botonAgregarProd} onClick={openNew}>
          Agregar Producto
        </Button>

        <Table striped bordered hover className={styles.tablaAcciones}>
          <thead>
            <tr>
              <th className={styles.thAcciones}>Nombre</th>
              <th className={styles.thAcciones}>Precio</th>
              <th className={styles.thAcciones}>Stock</th>
              <th className={styles.thAcciones}>Acciones</th>
            </tr>
          </thead>
          <tbody className={styles.tbodyDatos}>
            {productos.map(prod => (
              <tr key={prod._id}>
                <td className={styles.tdDatos}>{prod.nombre}</td>
                <td className={styles.tdDatos}>${prod.precio}</td>
                <td className={styles.tdDatos}>{prod.stock}</td>
                <td className={styles.tdBotonesAcciones}>
                  <Button className={styles.botonAcciones} onClick={() => openEdit(prod)}>Editar</Button>{" "}
                  <Button id={styles.botonEliminar} className={styles.botonAcciones} variant="danger" onClick={() => handleDelete(prod._id)}>Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.customModal} onClick={e => e.stopPropagation()}>
            <h3>{editingId ? "Editar Producto" : "Nuevo Producto"}</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className={styles.formGroup}>
                <Form.Label className={styles.formGroupLabels}>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                  className={styles.formGroupData}
                  required
                />
              </Form.Group>
              <Form.Group className={styles.formGroup}>
                <Form.Label className={styles.formGroupLabels}>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  value={form.descripcion}
                  onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                  className={styles.formGroupData}
                />
              </Form.Group>
              <Form.Group className={styles.formGroup}>
                <Form.Label className={styles.formGroupLabels}>Precio</Form.Label>
                <Form.Control
                  type="number"
                  value={form.precio}
                  onChange={(e) => setForm({ ...form, precio: Number(e.target.value) })}
                  required
                  className={styles.formGroupData}
                />
              </Form.Group>
              <Form.Group className={styles.formGroup}>
                <Form.Label className={styles.formGroupLabels}>Stock</Form.Label>
                <Form.Control
                  type="number"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                  className={styles.formGroupData}
                />
              </Form.Group>
              <Form.Group className={styles.formGroup}>
                <Form.Label className={styles.formGroupLabels}>URL Imagen</Form.Label>
                <Form.Control
                  type="text"
                  value={form.imagen}
                  onChange={(e) => setForm({ ...form, imagen: e.target.value })}
                  className={styles.formGroupData}
                />
              </Form.Group>

              <div className={styles.modalFooter}>
                <Button variant="secondary" onClick={() => setShowModal(false)} className={styles.botonCancelar}>
                  Cancelar
                </Button>
                <Button type="submit" variant="primary" className={styles.boton}>
                  {editingId ? "Actualizar" : "Crear"}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminDashboard;
