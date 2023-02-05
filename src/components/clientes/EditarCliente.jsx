import React, { Fragment } from 'react'
import { useState } from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { useNavigate } from 'react-router-dom';

export const EditarCliente = () => {
    const [cliente, guardarCliente] = useState({
        nombre: "",
        apellido: "",
        empresa: "",
        email: "",
        telefono: ""
    });
    const navigate = useNavigate();
    const actualizarState = e => {
        guardarCliente({
            ...cliente,
            [e.target.name]: e.target.value
        })
      }
      const validarCliente = () => {
        const { nombre, apellido, empresa, email, telefono } = cliente;
        let valido = !nombre.length || !apellido.length || !empresa.length || !email.length || !telefono.length;
        return valido;
      }
    return (
        <Fragment>
            <h2>Nuevo Cliente</h2>
            <form>
                <legend>Llena todos los campos</legend>
                <div className='campo'>
                    <label>Nombre: </label>
                    <input type="text" placeholder='Nombre Cliente' name='nombre' onChange={actualizarState}/>
                </div>
                <div className='campo'>
                    <label>Apellido: </label>
                    <input type="text" placeholder='Apellido Cliente' name='apellido' onChange={actualizarState}/>
                </div>
                <div className='campo'>
                    <label>Email: </label>
                    <input type="email" placeholder='Email Cliente' name='email' onChange={actualizarState}/>
                </div>
                <div className='campo'>
                    <label>Teléfono: </label>
                    <input type="tel" placeholder='Número telefónico cliente' name='telefono' onChange={actualizarState} />
                </div>
                <div className='campo'>
                    <label>Empresa: </label>
                    <input type="text" placeholder='Empresa Cliente' name='empresa' onChange={actualizarState}/>
                </div>
                
            </form>
        </Fragment>
  )
}

export default EditarCliente;