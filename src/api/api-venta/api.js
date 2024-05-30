import axios from 'axios';

export const hacerVenta = async (nuevaVenta) => {
  try {
    const response = await axios.post("http://54.227.21.85:4000/api/venta/", nuevaVenta);
    return response.data;
  } catch (error) {

    console.error("Error al iniciar sesion", error.response.data.error);
    throw error.response.data.error;
  }
};

export const obtenerVentasByFechasMasVendidos = async (fechaIni, fechaFin) => {

  try {

    const response = await axios.post("http://54.227.21.85:4000/api/venta/fechas", {
      fechaIni,
      fechaFin
    });

    return response.data;
  } catch (error) {

    console.error("Error al obtener la información", error.response.data.error);
    throw error.response.data.error;
  }
}


export const obtenerGananciasVentas = async (fechaIni, fechaFin) => {

  try {

    const response = await axios.post("http://54.227.21.85:4000/api/venta/ganancias", {
      fechaIni,
      fechaFin
    });

    return response.data;
  } catch (error) {

    console.error("Error al obtener la información", error.response.data.error);
    throw error.response.data.error;
  }
}