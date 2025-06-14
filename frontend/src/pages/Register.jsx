import { useState } from "react";
import { useEffect } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import styles from "../styles/RegisterLogin.module.css";
import { useNavigate } from "react-router-dom";

function Register() {
  useEffect(() => {
  document.title = "Registrarse";
}, []);

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const rol = "cliente"; // valor predeterminado

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password, rol }),
      });

      const text = await res.text();

      try {
        const data = JSON.parse(text);

        if (res.ok) {
          localStorage.setItem("token", data.token);
          navigate("/productos");
        } else {
          setError(data?.mensaje || "❌ No se pudo registrar");
        }
      } catch (err) {
        console.error("Error al parsear JSON:", err);
        setError("❌ Error interno del servidor");
      }
    } catch (err) {
      console.error("Error en el fetch:", err);
      setError("❌ No se pudo conectar con el servidor");
    }
  };

  return (
    <Container className={styles.container}>
      <Row className={styles.registerForm}>
        <Col>
          <h2>Crear Cuenta</h2>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>

            <Form.Group className={styles.labelEinput}>
              <Form.Label className={styles.label}>Nombre completo</Form.Label>
              <Form.Control
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                className={styles.input}
              />
            </Form.Group>

            <Form.Group className={styles.labelEinput}>
              <Form.Label className={styles.labelEinput}>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.input}
              />
            </Form.Group>

            <Form.Group className={styles.labelEinput}>
              <Form.Label className={styles.labelEinput}>Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={styles.input}
              />
            </Form.Group>

            <input type="hidden" value="cliente" name="rol" />

            <Button variant="primary" type="submit" className={styles.button}>
              Registrarse
            </Button>
          </Form>

          <p>¿Ya tienes cuenta?</p>
          <p><a href="/login" className={styles.a}>Inicia sesión</a></p>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
