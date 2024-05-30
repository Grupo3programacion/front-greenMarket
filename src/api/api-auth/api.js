import axios from 'axios';

export const registrarCliente = async (nuevoCliente) => {

    try {
      const response = await axios.post("http://54.227.21.85:4000/api/cliente/", nuevoCliente);
      return response.data;
    } catch (error) {
      console.error("Error creating producto:", error);
      throw error;
    }
  };


  export const loginCliente = async (loginCliente) => {

    try {
      const response = await axios.post("http://54.227.21.85:4000/api/auth/login", loginCliente);
      return response.data;
    } catch (error) {
      console.error("Error al iniciar sesion", error.response.data.error);
      throw error.response.data.error;
    }
  };