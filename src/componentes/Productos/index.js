import React, { useContext } from "react";

import { DataContext } from "../../context/Dataprovider";
import { ProductoItem } from "./ProductoItem";
// import ProductoDTO from "./ProductoDTO"; // Importar la clase DTO

export const ProductosLista = () => {
  const value = useContext(DataContext);
  const [productos] = value.productos;

  // Mapear la lista de productos y convertirlos en instancias de ProductoDTO Es para implementar con lo de DTO
  // const productosDTO = productos.map((producto) => 
  //   new ProductoDTO(producto.id, producto.title, producto.price, producto.category, producto.cantidad)
  // );

  return (
    <>
      <h1 className="title">PRODUCTOS</h1>
      <div className="productos">
         {/*productosDTO.map((producto) => ( */ /*este es para cuando se use el DTO */} 
        {productos.map((producto) => (
          <ProductoItem
            key={producto.id}
            id={producto.id}
            title={producto.nombreProducto}
            price={producto.precioVenta}
            image={producto.imagen}
            category={producto.nombreCategoria}
            cantidad={producto.cantidad}
          />
        ))}
        {/* <ProductoItem /> */}
      </div>
    </>
  );
};
