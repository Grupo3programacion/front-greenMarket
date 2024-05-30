import React, { useState, useEffect, useContext } from "react"; // Importa useState y useEffect de React
import "bootstrap/dist/css/bootstrap.min.css";
import { DataContext } from "../../context/Dataprovider";
import DatePicker from "react-datepicker"; // Importa el componente DatePicker
import "react-datepicker/dist/react-datepicker.css";

import {
  Table,
  Container,
} from "reactstrap";
import { obtenerVentasByFechasMasVendidos } from "../../api/api-venta/api";

const CantidadProductos = () => {
    //const { productos } = useContext(DataContext); // Obtén el contexto del DataProvider
    const value = useContext(DataContext);
    const productos = value.productos[0];
    // const [data, setData] = useState(productos); // inicializa la data
    const [filteredData, setFilteredData] = useState(productos); // Estado para los productos filtrados
    const [startDate, setStartDate] = useState(null); // Estado para la fecha de inicio del filtro
    const [endDate, setEndDate] = useState(null); // Estado para la fecha de fin del filtro

    // useEffect(() => {
    //     setData(productos);
    //     setFilteredData(productos); // Inicializa los productos filtrados con todos los productos
    // }, [productos]);

    const filterByDate = async () => {

        try {
            const productos = await obtenerVentasByFechasMasVendidos(startDate,endDate);

            setFilteredData(productos);
        } catch (error) {

            console.error("Error al obtener productos:", error);
        }


        // if (startDate && endDate) {
        //     const filtered = data.filter((producto) => {
        //         const date = new Date(producto.fechaAdquirido);
        //         return date >= startDate && date <= endDate;
        //     });
        //     setFilteredData(filtered);
        // } else {
        //     setFilteredData(data);
        // }
    };


    // useEffect(() => {
    //     setData(productos);
    //   }, [productos]);

      // Calcular la suma total de ganancias
    const totalGanancias = filteredData.reduce((cantidad, producto) => cantidad + producto.cantidad, 0);

 
    
    return (
        <div className="crudProductos">
            <h2 className="carrito__title"> Reporte de Productos mas vendidos por Fecha</h2>
            <br></br>
            <br></br>
            <div>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Fecha de inicio"
                    dateFormat="dd/MM/yyyy" // Formato día/mes/año
                />
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    placeholderText="Fecha de fin"
                    dateFormat="dd/MM/yyyy" // Formato día/mes/año
                />
                <button onClick={filterByDate}>Filtrar por fecha</button>
            </div>
            <Container>


                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre Producto</th>
                            <th>Categoria</th>
                            <th>Fecha de Venta</th>
                            <th>Cantidad Vendida</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((dato) => (
                            <tr key={dato.id}>
                                <td>{dato.id}</td>
                                <td>{dato.nombreProducto}</td>
                                <td>{dato.categoria}</td>
                                <td>{dato.fechaVenta}</td>
                                <td>{dato.cantidad}</td>                                
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="4" style={{fontWeight: "bold", fontSize: "2rem"}}>Total Productos</td>
                            <td style={{fontWeight: "bold", fontSize: "2rem"}}>{totalGanancias}</td>
                        </tr>
                        <tr>
                            <td colSpan="4" style={{fontWeight: "bold", fontSize: "2rem"}}>Total Items</td>
                            <td style={{fontWeight: "bold", fontSize: "2rem"}}>{totalGanancias}</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
            
        </div>
    );
    
};

export default CantidadProductos;
