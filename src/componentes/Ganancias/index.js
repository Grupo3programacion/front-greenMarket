import React, { useState, useEffect, useContext } from "react"; // Importa useState y useEffect de React
import "bootstrap/dist/css/bootstrap.min.css";
import { DataContext } from "../../context/Dataprovider";
import DatePicker from "react-datepicker"; // Importa el componente DatePicker

import {
  Table,
  Container,
} from "reactstrap";
import { obtenerGananciasVentas } from "../../api/api-venta/api";

const Ganancias = () => {
    //const { productos } = useContext(DataContext); // Obtén el contexto del DataProvider
    const value = useContext(DataContext);
    const productos = value.productos[0];

    const [filteredData, setFilteredData] = useState(productos); // Estado para los productos filtrados
    const [startDate, setStartDate] = useState(null); // Estado para la fecha de inicio del filtro
    const [endDate, setEndDate] = useState(null); // Estado para la fecha de fin del filtro

    const filterByDate = async () => {


        try {
            const productos = await obtenerGananciasVentas(startDate,endDate);

            setFilteredData(productos);
        } catch (error) {

            console.error("Error al obtener productos:", error);
        }
    };
    // useEffect(() => {
    //     setData(productos);
    //   }, [productos]);

      // Calcular la suma total de ganancias
    const totalGanancias = filteredData.reduce((total, producto) => total + producto.ganancia, 0);

    
    
    return (
        <div className="crudProductos">
            <h2 className="carrito__title"> Reporte de Ganancias de los productos vendidos</h2>
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
                            <th>cantidad</th>
                            <th>Fecha Venta</th>
                            <th>Valor unitario adquirido</th>
                            <th>valor unitario venta</th>
                            <th>valor total adquirido</th>
                            <th>valor total venta</th>
                            <th>Ganancia</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((dato) => (
                            <tr key={dato.id}>
                                <td>{dato.id}</td>
                                <td>{dato.nombreProducto}</td>
                                <td>{dato.categoria}</td>
                                <td>{dato.cantidad}</td>
                                <td>{dato.fechaVenta}</td>
                                <td>{dato.valorUnitarioAdquirido}</td>
                                <td>{dato.valorUnitarioVenta}</td>
                                <td>{dato.valorTotalAdquirido}</td>
                                <td>{dato.valorTotalVenta}</td>
                                <td style={{fontWeight: "bold"}}>{dato.ganancia}</td>
                                
                                
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="4" style={{fontWeight: "bold", fontSize: "2rem"}}>Total</td>
                            <td style={{fontWeight: "bold", fontSize: "2rem"}}>{totalGanancias}</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
            
        </div>
    );
    
};

export default Ganancias;
