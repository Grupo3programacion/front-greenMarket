import React, { createContext, useState, useEffect } from "react";
import Data from "../Data.js";
import { obtenerCategoriasApi, obtenerProductosApi } from "../api/api-producto/api.js";

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [productos, setProductos] = useState([]);
  const [menu, setMenu] = useState(false);
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);
  const [categorias, setCategorias] = useState([]);
  const [user, setUser] = useState({

    token: "",
    rol: "",
    email: "",
    id: ""
  });
  const [sesion, setSesion] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const rol = localStorage.getItem('role');
    const email = localStorage.getItem('email');
    const id = localStorage.getItem('idUser');

    if (token && rol) {
      setUser({ token, rol, email, id });
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('token', userData.token);
    localStorage.setItem('role', userData.rol);
    localStorage.setItem('email', userData.email);
    localStorage.setItem('idUser', userData.id);
    window.location.href = '/';
    setUser(userData);
    setSesion(true);
  };

  const verificarSesion = () => {

    if(localStorage.getItem('token')){
      setSesion(true);
    }
    else
    setSesion(false);
  }

  const logout = () => {

    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setSesion(false);
    setUser({
      token: "",
      rol: "",
      email: "",
      id: ""
    });
    setCarrito([]);
    window.location.href = '/';
  };



  useEffect(() => {


    const obtenerCategorias = async () => {
      try {
        const categorias = await obtenerCategoriasApi();
        setCategorias(categorias);
      } catch (error) {
        console.error("Error al obtener categorias:", error);
      }
    };

    obtenerCategorias();
    // Llama a tu función de API para obtener las categorías    

  }, []);

  useEffect(() => {
    // const producto = Data.items;
    // if (producto) {
    //   setProductos(producto);
    // } else {
    //   setProductos([]);
    // }

    const obtenerProductos = async () => {
      try {
        const productos = await obtenerProductosApi();
        setProductos(productos);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    obtenerProductos();
  }, []);



  const addCarrito = (id) => {
    const check = carrito.every((item) => {
      return item.id !== id;
    });
    if (check) {
      const data = productos.filter((producto) => {
        return producto.id === id;
      });
      setCarrito([...carrito, ...data]);
    } else {
      alert("El producto ya se ha añadido al carrito");
    }
  };

  useEffect(() => {
    const dataCarrito = JSON.parse(localStorage.getItem("dataCarrito"));
    if (dataCarrito) {
      setCarrito(dataCarrito);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("dataCarrito", JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    const getTotal = () => {
      const res = carrito.reduce((prev, item) => {
        return prev + item.precioVenta * item.cantidad;
      }, 0);
      setTotal(res);
    };
    getTotal();
  }, [carrito]);

  const value = {
    productos: [productos],
    categorias: [categorias],
    menu: [menu, setMenu],
    addCarrito: addCarrito,
    carrito: [carrito, setCarrito],
    total: [total, setTotal],
    user: [user, setUser],
    sesion: [sesion, setSesion],
    login: login,
    logout: logout,
    verificar: verificarSesion,

  };

  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  );
};
