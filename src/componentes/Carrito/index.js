import React, { useContext, useState } from "react";
import Card from "../../images/img03.jpg";
import { DataContext } from "../../context/Dataprovider";
import jsPDF from "jspdf";
import { hacerVenta } from "../../api/api-venta/api";


export const Carrito = () => {
  const value = useContext(DataContext);
  const [menu, setMenu] = value.menu;
  const [carrito, setCarrito] = value.carrito;
  const [total] = value.total;


  // Función para generar el PDF
  const generarPDF = () => {
    const doc = new jsPDF();
    let yPos = 10;

    doc.text("Este es tu pedido:", 10, yPos);
    yPos += 10;

    carrito.forEach((producto) => {
      const itemText = `${producto.nombreProducto} - Cantidad: ${producto.cantidad} - Precio: $${producto.precioVenta}`;
      //doc.text(`${producto.title}: $${producto.price}`, 10, yPos);
      doc.text(itemText, 10, yPos);
      yPos += 10;
    });

    doc.text(`Total: $${total}`, 10, yPos);

    doc.save("carrito.pdf");


  };

  // State para manejar errores de validación
  const [errorCedula, setErrorCedula] = useState("");
  const [errorTelefono, setErrorTelefono] = useState("");

  // Función para manejar el evento de hacer el pedido
  const hacerPedido = async () => {

    // Validar antes de hacer el pedido
    // if (!cedula || !telefono) {
    //   setErrorCedula("La cédula es obligatoria");
    //   setErrorTelefono("El teléfono es obligatorio");
    //   return;
    // }

    const detalleVenta = carrito.map(producto => ({
      cantidad: producto.cantidad,
      idProducto: producto.id
    }));
  

    const objectVenta = {
      idCliente: value.user[0].id,
      fechaVenta: new Date().toISOString(),
      precioTotal: total,
      detalleVenta
    }
    try {
      // Llamado a la función de API para crear un nuevo producto
      await hacerVenta(objectVenta);
      console.log('Venta realizada exitosamente');
  } catch (error) {
      console.error('Error al crear el producto:', error);
      // Puedes manejar el error de manera adecuada aquí, como mostrar un mensaje al usuario
      return;
  }

    // console.log(carrito);

    // Borra todos los elementos del carrito
    setCarrito([]);
    // Actualiza la cantidad en inventario
    actualizarInventario();

    // Reinicia los campos de cédula y teléfono
    setCedula("");
    setTelefono("");
  };

  // Función para actualizar la cantidad en inventario
  const actualizarInventario = () => {
    
  };

  const [form, setForm] = useState({
    telefono: "",
    cedula: "",
});

  const tooglefalse = () => {
    setMenu(false);
  };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
// };

   // State para almacenar la cédula y el teléfono
   const [cedula, setCedula] = useState("");
   const [telefono, setTelefono] = useState("");




  const show1 = menu ? "carritos show" : "carrito";
  const show2 = menu ? "carrito show" : "carrito";

  const resta = (id) => {
    carrito.forEach((item) => {
      if (item.id === id) {
        item.cantidad === 1 ? (item.cantidad = 1) : (item.cantidad -= 1);
      }
      setCarrito([...carrito]);
    });
  };

  const suma = (id) => {
    carrito.forEach((item) => {
      if (item.id === id) {
        item.cantidad += 1;
      }
      setCarrito([...carrito]);
    });
  };

  const removeProducto = (id) => {
    if (window.confirm("¿Quieres eliminar el producto?")) {
      carrito.forEach((item, index) => {
        if (item.id === id) {
          item.cantidad = 1;
          carrito.splice(index, 1);
        }
      });
      setCarrito([...carrito]);
    }
  };

  return (
    <div className={show1}>
      <div className={show2}>
        <div className="carrito__close" onClick={tooglefalse}>
        <h2 className="carrito__title" >Su carrito</h2>
          <box-icon name="x"></box-icon>
        </div>
        

        <div className="carrito__center">
          {carrito.length == 0 ? (
            <h2
              style={{
                textAling: "center",
                fontSize: "3rem",
              }}
            >
              Carrito Vacio
            </h2>
          ) : (
            <>
              {carrito.map((producto) => (
                <div className="carrito__item" key={producto.id}>
                  <img src={producto.imagen} alt="" />
                  <div>
                    <h3>{producto.title}</h3>
                    <p className="price">${producto.price}</p>
                  </div>
                  <div>
                    <box-icon
                      name="up-arrow"
                      type="solid"
                      onClick={() => suma(producto.id)}
                    ></box-icon>
                    <p className="cantidad">{producto.cantidad}</p>
                    <box-icon
                      name="down-arrow"
                      type="solid"
                      onClick={() => resta(producto.id)}
                    ></box-icon>
                  </div>
                  <div
                    className="remove__item"
                    onClick={() => removeProducto(producto.id)}
                  >
                    <box-icon name="trash"></box-icon>
                  </div>

                </div>
              ))}
            </>
          )}
        </div>
        {/* Campos de ingreso de datos */}
        {/* <div className="input-container">
          <label htmlFor="cedula">Cédula:</label>
          <input
            type="number"
            id="cedula"
            value={cedula}
            onChange={(e) => {setCedula(e.target.value);setErrorCedula("");}}
            className="input-field"
          />
          <p className="error">{errorCedula}</p>
        </div>
        
        <div className="input-container">
          <label htmlFor="telefono">Teléfono:</label>
          <input
            type="number"
            id="telefono"
            value={telefono}
            onChange={(e) => {
              setTelefono(e.target.value);setErrorTelefono("");
            }}
            className="input-field"
          />
          <p className="error">{errorTelefono}</p>
        </div> */}
        {/* Fin */}

        <div className="carrito__footer">
          <h3>Total: ${total}</h3>
          <div>
          <button className="btn" style={{ marginRight: "10px" }} onClick={hacerPedido}>Hacer Pedido</button>
          
          <button className="btn" onClick={generarPDF}> Generar PDF</button>
          </div>
        </div>
      </div>
    </div>
  );
};
