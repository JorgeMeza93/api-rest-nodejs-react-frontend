import React, { Fragment } from 'react'
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { useNavigate, useParams } from 'react-router-dom';

export const EditarCliente = (props) => {
   const { id } = useParams();
    const [cliente, datosCliente] = useState({
        nombre: "",
        apellido: "",
        empresa: "",
        email: "",
        telefono: ""
    });
    const navigate = useNavigate();
    const consultarAPI = async () => {
        const clienteConsulta = await clienteAxios.get(`/cliente/${id}`);
        datosCliente(clienteConsulta.data)
    }
    useEffect( () => {
        consultarAPI();
    }, [])
    const actualizarState = e => {
        datosCliente({
            ...cliente,
            [e.target.name]: e.target.value
        })
      }
      const validarCliente = () => {
        const { nombre, apellido, empresa, email, telefono } = cliente;
        let valido = !nombre.length || !apellido.length || !empresa.length || !email.length || !telefono.length;
        return valido;
      }
      // Envia una petición por axios para actualizar el cliente
      const actualizarCliente = e => {
        e.preventDefault();
        clienteAxios.put(`/cliente/${cliente._id}`, cliente)
            .then( res => {
                if(res.data.code === 11000){
                    Swal.fire({
                        type: "error",
                        title: "Ha ocurrido un error",
                        text: "Ese cliente"
                    })
                }
                else{
                    Swal.fire(
                        "Correcto", 
                        "Se ha actualizado correctamente",
                        "success"
                    )
                }
                navigate('/', {replace:true});
            })
      }
    return (
        <Fragment>
            <h2>Editar Cliente</h2>
            <form onSubmit={actualizarCliente} >
                <legend>Llena todos los campos</legend>
                <div className='campo'>
                    <label>Nombre: </label>
                    <input type="text" placeholder='Nombre Cliente' name='nombre' onChange={actualizarState} value={cliente.nombre}/>
                </div>
                <div className='campo'>
                    <label>Apellido: </label>
                    <input type="text" placeholder='Apellido Cliente' name='apellido' onChange={actualizarState} value={cliente.apellido} />
                </div>
                <div className='campo'>
                    <label>Email: </label>
                    <input type="email" placeholder='Email Cliente' name='email' onChange={actualizarState} value={cliente.email} />
                </div>
                <div className='campo'>
                    <label>Teléfono: </label>
                    <input type="tel" placeholder='Número telefónico cliente' name='telefono' onChange={actualizarState} value={cliente.telefono} />
                </div>
                <div className='campo'>
                    <label>Empresa: </label>
                    <input type="text" placeholder='Empresa Cliente' name='empresa' onChange={actualizarState} value={cliente.empresa} />
                </div>
                <div className='enviar'>
                    <input type="submit" className='btn btn-azul' value={"Guardar Cambios"} disabled={validarCliente()}/>
                </div>
            </form>
        </Fragment>
  )
}

export default EditarCliente;