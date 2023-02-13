import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import clienteAxios from "../../config/axios";
import FormBuscarProducto from "./FormBuscarProducto";
import Swal from "sweetalert2";
import FormCantidadProducto from "./FormCantidadProducto";
import { useNavigate } from 'react-router-dom';

function NuevoPedido(){
    const { id } = useParams();
    const [cliente, guardarCliente] = useState({});
    const [busqueda, guardarBusqueda] = useState("manolo");
    const [productos, guardarProductos] = useState([]);
    const [total, guardarTotal] = useState(0);

    const consultarAPI = async () => {
        const resultado = await clienteAxios.get(`/cliente/${id}`)
        guardarCliente(resultado.data);
    }
    useEffect( () => {
        consultarAPI();
        actualizarTotal();
    }, [productos]);
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
    const actualizarTotal = () => {
        if(productos.length === 0){
            guardarTotal(0);
            return
        }
        let nuevoTotal = 0;
        productos.map( producto => {
            return nuevoTotal += (producto.cantidad * producto.precio)
        });
        guardarTotal(nuevoTotal);
    }
    const eliminarProductosPedidos = (id) => {
        const todosProductos = productos.filter( producto => producto.producto !== id );
        guardarProductos(todosProductos);
    }
    const realizarPedido = async (e) => {
        e.preventDefault();
        const pedido = {
            "cliente": id,
            "articulo": productos,
            "total": total
        }
        console.log(pedido);
        const resultado = await clienteAxios.post(`/pedidos/nuevo/${id}`, pedido);
        if(resultado.status === 200){
            Swal.fire({
                icon: "success",
                title: "Correcto",
                text: resultado.data.mensaje
            })
        }
        else{
            Swal.fire({
                icon: "error",
                title: "Ha ocurrido un error",
                text: "Intenta nuevamente"
            })
        }
        navigate("/pedidos", {replace: true})
    }
    const navigate = useNavigate();
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
                    return <FormCantidadProducto key={producto.producto} producto={producto} 
                            restarProductos={restarProductos} sumarProductos={sumarProductos} index={index} eliminarProductosPedidos={eliminarProductosPedidos} />
                })}
            </ul>
            <p className="total">Total a pagar: <span>${total}</span></p>
            { total > 0 ? (
                <form onSubmit={realizarPedido}>
                    <input type="submit" className="btn btn-verde btn-block" value="Realizar" />
                </form>
            ): null}
        </Fragment>
    )
}
export default NuevoPedido;