import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import clienteAxios from "../../config/axios";
import FormBuscarProducto from "./FormBuscarProducto";
import Swal from "sweetalert2";
import FormCantidadProducto from "./FormCantidadProducto";

function NuevoPedido(){
    const { id } = useParams();
    const [cliente, guardarCliente] = useState({});
    const [busqueda, guardarBusqueda] = useState("manolo");
    const [productos, guardarProductos] = useState([]);

    const consultarAPI = async () => {
        const resultado = await clienteAxios.get(`/cliente/${id}`)
        guardarCliente(resultado.data);
    }
    useEffect( () => {
        consultarAPI();
    }, []);
    const buscarProducto = async (e) => {
        e.preventDefault();
        //Obtener los productos de la búsqueda
        const resultado = await clienteAxios.post(`/productos/busqueda/${busqueda}`);
        if(resultado.data[0]){
            let productoResultado = resultado.data[0];
            productoResultado.producto = resultado.data[0]._id;
            productoResultado.cantidad = 0;
            guardarProductos([...productos, productoResultado])
            console.log(productos);
        }
        else{
            Swal.fire({
                icon: "error",
                title: "No encontrado",
                text: "Termino en la búsqueda no encontrado",
                })
        }
    }
    const leerDatosBusqueda = (e) => {
        guardarBusqueda(e.target.value)
    }
    const restarProductos = (i) => {
        const todosProductos = [...productos];
        if(todosProductos[i].cantidad === 0){
            return
        }
        todosProductos[i].cantidad = todosProductos[i].cantidad - 1;
        guardarProductos(todosProductos);
    }
    const sumarProductos = (i) => {
       const todosProductos = [...productos];
       todosProductos[i].cantidad++;
       guardarProductos(todosProductos)
       
    }
    return(
        <Fragment>
            <h2>Nuevo Pedido</h2>
            <div className="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <p>Nombre: {cliente.nombre} {cliente.apellido}</p>
                <p>Email: {cliente.email}</p>
                <p>Teléfono: {cliente.telefono}</p>
            </div>
            <FormBuscarProducto buscarProducto={buscarProducto} leerDatosBusqueda={leerDatosBusqueda} />
            <ul className="resumen">
                {productos.map( (producto, index) => {
                    return <FormCantidadProducto key={producto.producto} producto={producto} restarProductos={restarProductos} sumarProductos={sumarProductos} index={index}/>
                })}
            </ul>
            <div className="campo">
                <label>Total:</label>
                <input type="number" name="precio" placeholder="Precio" readOnly="readonly" />
            </div>
            <div className="enviar">
                <input type="submit" className="btn btn-azul" value="Agregar Pedido" />
            </div>
        </Fragment>
    )
}
export default NuevoPedido;