import React from "react";
import { Routes, Route } from "react-router-dom";

import { ProductosLista } from "./Productos/index";
import CrudProductos from "./CrudProductos";
import Ganancias from "./Ganancias";
import CantidadProductos from "./CantidadProductos";
import MasVendidos from "./MasVendidos";
import Login from "./Login";


export const Paginas = () => {
  return (
    <section>
      <Routes>
        <Route path="/" element={<ProductosLista />} />
        <Route path="/productos" element={<ProductosLista />} />
        <Route path="/crudProductos" element={<CrudProductos />} />
        <Route path="/ganancias" element={<Ganancias />} />
        <Route path="/cantidadProductos" element={<CantidadProductos />} />
        <Route path="/masVendidos" element={<MasVendidos />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </section>
  );
};
