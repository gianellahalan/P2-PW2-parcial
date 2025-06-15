import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import styles from "../styles/RegisterLogin.module.css";
import useAuthStore from "../store/authStore";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setUserAndToken } = useAuthStore();

  useEffect(() => {
    document.title = "Iniciar sesión";
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Respuesta del login:", data);
      console.log("Usuario:", data.user);
      console.log("Rol:", data.user?.rol);

      if (!response.ok) throw new Error(data.message || "Error al iniciar sesión");

      setUserAndToken(data.user, data.token);
      localStorage.setItem("token", data.token);

      // Validación segura del rol
      if (data.user?.rol === "admin") {
        navigate("/admin");
      } else {
        navigate("/productos");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className={styles.container}>
      <Row className={styles.registerForm}>
        <Col>
          <h2>Iniciar Sesión</h2>

          <Form onSubmit={handleLogin}>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form.Group className={styles.labelEinput}>
              <Form.Label className={styles.label}>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.input}
              />
            </Form.Group>

            <Form.Group className={styles.labelEinput}>
              <Form.Label className={styles.label}>Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={styles.input}
              />
            </Form.Group>

            <Button type="submit" variant="primary" className={styles.button}>
              Ingresar
            </Button>
          </Form>

          <p>¿No tienes cuenta?</p>
          <p><a href="/register" className={styles.a}>Registrate</a></p>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
