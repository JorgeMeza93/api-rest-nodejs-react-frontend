import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import clienteAxios from "../../config/axios";
import FormBuscarProducto from "./FormBuscarProducto";

function NuevoPedido(){
    const { id } = useParams();
    const [cliente, guardarCliente] = useState({});
    const consultarAPI = async () => {
        const resultado = await clienteAxios.get(`/cliente/${id}`)
        guardarCliente(resultado.data);
    }
    useEffect( () => {
        consultarAPI();
    }, []);
    const buscarProducto = () => {

    }
    const leerDatosBusqueda = () => {

    }
    return(
        <Fragment>
            <h2>Nuevo Producto</h2>
            <div className="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <p>Nombre: {cliente.nombre} {cliente.apellido}</p>
                <p>Email: {cliente.email}</p>
                <p>Teléfono: {cliente.telefono}</p>
            </div>
            <FormBuscarProducto buscarProducto={buscarProducto} leetDatosBusqueda={leerDatosBusqueda} />
            <ul className="resumen">
                <li>
                    <div className="texto-producto">
                        <p className="nombre">Macbook pro</p>
                        <p className="precio">230</p>
                    </div>
                    <div className="acciones">
                        <div className="contenedor-cantidad">
                            <i className="fas fa-minus"></i>
                            <input type="text" name="cantidad" />
                            <i className="fas fa-plus"></i>
                        </div>
                        <button type="button" className="btn btn-rojo">
                            <i className="fas fa-minus-circle"></i>Eliminar Producto
                        </button>
                    </div>
                </li>
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