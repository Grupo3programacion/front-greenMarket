import axios from 'axios';

export const obtenerProductosApi = async () => {

  try {
    const response = await axios.get("http://54.227.21.85:4000/api/producto/");
    return response.data;
  } catch (error) {
    console.error("Error fetching productos:", error);
    throw error;
  }
};

export const obtenerProductoById = async (id) => {
    try {
      const response = await axios.get(`http://54.227.21.85:4000/api/producto/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching producto:", error);
      throw error;
    }
  };


  export const crearProducto = async (nuevoProducto) => {
    try {
      const response = await axios.post("http://54.227.21.85:4000/api/producto/", nuevoProducto);
      return response.data;
    } catch (error) {
      console.error("Error creating producto:", error);
      throw error;
    }
  };

  export const actualizarProducto = async (id, productoActualizado) => {
    try {
      const response = await axios.put(`http://54.227.21.85:4000/api/producto/${id}`, productoActualizado);
      return response.data;
    } catch (error) {
      console.error("Error updating producto:", error);
      throw error;
    }
  };

  export const eliminarProducto = async (id) => {
    try {
      const response = await axios.delete(`http://54.227.21.85:4000/api/producto/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting producto:", error);
      throw error;
    }
  };

  export const obtenerCategoriasApi = async () => {

    try {
      const response = await axios.get("http://54.227.21.85:4000/api/categoria/");
      return response.data;
    } catch (error) {
      console.error("Error fetching categorias:", error);
      throw error;
    }
  }

  export const obtenerVentasByFechas = async (fechaIni, fechaFin) => {

    try {
  
      const response = await axios.post("http://54.227.21.85:4000/api/producto/filtrarByFechas", {
        fechaIni,
        fechaFin
      });

      return response.data;
    } catch (error) {
  
      console.error("Error al obtener la información", error.response.data.error);
      throw error.response.data.error;
    }
  }