import React, { useContext, useState } from "react";
import { Modal, Button } from "react-bootstrap"; // Importa los componentes de modal y botón de react-bootstrap
import { useNavigate } from "react-router-dom";
import { FormGroup, Label, Input } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Registro from "../Registro"; //componente Registro
import { DataContext } from "../../context/Dataprovider";
import { loginCliente } from "../../api/api-auth/api";
import { jwtDecode } from "jwt-decode";

const Login = ({ onLogin, showModal, setShowModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showRegistroModal, setShowRegistroModal] = useState(false); // Estado para el modal de registro

  const value = useContext(DataContext);

  const navigate = useNavigate();

  const handleClose = () => setShowModal(false); // Función para cerrar el modal

  const clearFields = () => {
    setEmail("");
    setPassword("");
    setError("");
  };


  const handleLogin = async () => {

    console.log("Entre por aqui");
    try {
      const response = await loginCliente({ email, password });
      const { user, token } = response;

      console.log("Log1");
      const decodedToken = jwtDecode(token);
      console.log("Role: " + decodedToken.rol )
      // Llamar a la función login del contexto
      value.login({ token, rol: decodedToken.rol, email:user.correo, id: user.id });

      onLogin(email);
      // Redirige a la página principal
      navigate("/");


      clearFields();
      // Cierra el modal
      setShowModal(false);

    } catch (error) {

      setError(error);
      console.error(error);
      return;
    }

    
  };
// Función para limpiar los campos del formulario



  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <p className="error-message">{error}</p>}
          <FormGroup>
            <Label htmlFor="email">Correo:</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo usuario"
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Contraseña:</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
            />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=> {handleClose();clearFields();}}>Cerrar</Button> {/* Botón para cerrar el modal */}
          <Button variant="primary" onClick={handleLogin}>Ingresar</Button> {/* Botón para iniciar sesión */}
          
          <Button variant="link" onClick={() => setShowRegistroModal(true)}>Registrarse</Button> {/* Botón para abrir el modal de registro */}
        </Modal.Footer>
      </Modal>
      <Registro showRegistroModal={showRegistroModal} setShowRegistroModal={setShowRegistroModal} />
    </>
  );
};

export default Login;
