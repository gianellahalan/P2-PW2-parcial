import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Alert, Button } from "react-bootstrap";
import styles from "../styles/Carrito.module.css";

function Carrito() {
  useEffect(() => {
  document.title = "Mi Carrito";
  }, []);

  const [productos, setProductos] = useState([]);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const cargarCarrito = () => {
    fetch("http://localhost:3000/api/carrito", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data || !Array.isArray(data.productos)) {
          setError(<p className={"styles.error"}>"No se pudo obtener el carrito."</p>);
        } else {
          setProductos(data.productos);
        }
      })
      .catch(() => setError("Error al conectar con el servidor."));
  };

  useEffect(() => {
    if (!token) {
      setError("Debes iniciar sesión para ver tu carrito.");
      return;
    }
    cargarCarrito();
  }, []);

  const eliminarProducto = async (productId) => {
    try {
      await fetch(`http://localhost:3000/api/carrito/eliminar/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      cargarCarrito();
    } catch {
      setError("No se pudo eliminar el producto.");
    }
  };

  const vaciarCarrito = async () => {
    try {
      await fetch("http://localhost:3000/api/carrito/vaciar", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      cargarCarrito();
    } catch {
      setError("No se pudo vaciar el carrito.");
    }
  };

  const confirmarPedido = async () => {
  try {
    const token = localStorage.getItem("token");
    const resCarrito = await fetch("http://localhost:3000/api/carrito", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const carrito = await resCarrito.json();

    if (!carrito.productos || carrito.productos.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    const resPedido = await fetch("http://localhost:3000/api/pedidos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productos: carrito.productos,
        total: carrito.total,
      }),
    });

    if (resPedido.ok) {
      alert("Pedido confirmado. ¡Gracias por tu compra!");
      await vaciarCarrito();
    } else {
      alert("Hubo un problema al confirmar el pedido.");
    }
  } catch (error) {
    console.error("Error al confirmar pedido:", error);
    alert("Error al confirmar el pedido.");
  }
};

  const total = productos.reduce((acc, prod) => {
    return acc + (prod.product?.precio || 0) * prod.cantidad;
  }, 0);

  return (
    <Container className={styles.containerG}>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        {productos.length === 0 && !error && <p className={styles.pNoHay}>No hay productos en tu carrito.</p>}

        {productos.map((prod) =>
          prod.product ? (
            <Col key={prod._id} className={styles.containerC}>
              <Card className={styles.card}>
                <Card.Img className={styles.imgCard} variant="top" src={prod.product.imagen || "/placeholder.png"} />
                <Card.Body className={styles.cardBody}>
                  <Card.Title>{prod.product.nombre}</Card.Title>
                  <Card.Text>Precio: ${prod.product.precio}</Card.Text>
                  <Card.Text>Cantidad: {prod.cantidad}</Card.Text>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => eliminarProducto(prod.product._id)}
                    className={styles.button}
                  >
                    Eliminar
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ) : null
        )}
      </Row>

      {productos.length > 0 && (
        <div className={styles.divTotal}>
          <h2 className={styles.h2}>Tu Carrito</h2>
          <h4>Total: ${total}</h4>
          <Button variant="secondary" onClick={vaciarCarrito} id={styles.buttonVaciar} className={styles.button2}>
            Vaciar carrito
          </Button>
          <Button variant="success" onClick={confirmarPedido} className={styles.button2}>
            Confirmar pedido
          </Button>
        </div>
      )}
    </Container>
  );
}

export default Carrito;
