import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FormGroup, Label, Input } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { registrarCliente } from "../../api/api-auth/api";

const Registro = ({ showRegistroModal, setShowRegistroModal }) => {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    id: "",
    nombre: "",
    telefono: "",
    correo: "",
    clave: "",
});

  const handleClose = () => {
    setShowRegistroModal(false);
    clearFields();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
};

  const handleRegister = async () => {
    if (form.clave !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    const valorNuevo = { ...form };
    console.log(valorNuevo);

        try {
            // Llamado a la función de API para crear un nuevo producto
            await registrarCliente(valorNuevo);
            console.log('Cliente creado exitosamente');
        } catch (error) {
            console.error('Error al crear el cliente:', error);
            // Puedes manejar el error de manera adecuada aquí, como mostrar un mensaje al usuario
            return;
        }

    // aca se puede usar para enviar los datos al backend

    setShowRegistroModal(false);
  };

  const clearFields = () => {
    // setUsername("");
    // setPassword("");
    setForm({
      id : "",
      nombre : "",
      telefono: "",
      correo: "",
      clave : ""
    });
    setConfirmPassword("");
    setError("");
  };

  return (
    <Modal show={showRegistroModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Registrarse</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <p className="error-message">{error}</p>}

        <FormGroup>
          <Label htmlFor="cedula">cedula:</Label>
          <Input
            type="text"
            name="id"
            id="id"
            value={form.id}
            onChange={handleChange}
            placeholder="cedula"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="username">Nombre de usuario:</Label>
          <Input
            type="text"
            name="nombre"
            id="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Nombre de Usuario"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="telefono">Telefono:</Label>
          <Input
            type="text"
            name="telefono"
            id="telefono"
            value={form.telefono}
            onChange={handleChange}
            placeholder="Telefono"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="correo">Correo:</Label>
          <Input
            type="text"
            name="correo"
            id="correo"
            value={form.correo}
            onChange={handleChange}
            placeholder="Correo"
          />
        </FormGroup>


        <FormGroup>
          <Label htmlFor="clave">Contraseña:</Label>
          <Input
            type="password"
            name="clave"
            id="clave"
            value={form.clave}
            onChange={handleChange}
            placeholder="Contraseña"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="confirmPassword">Confirmar Contraseña:</Label>
          <Input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirmar Contraseña"
          />
        </FormGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
        <Button variant="primary" onClick={handleRegister}>Registrarse</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Registro;
