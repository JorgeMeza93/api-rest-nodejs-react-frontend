import React, { Fragment, useContext, useState } from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { Context } from '../../context/Context';

const Login = () => {
    const [credenciales, guardarCredenciales] = useState({
        email: "",
        password: ""
    });
    const [auth, guardarAuth] = useContext( Context )
    const leerDatos = (e) => {
        guardarCredenciales({
            ...credenciales,
            [e.target.name]: e.target.value
        })
    }
    const iniciarSesion = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await clienteAxios.post("/login", credenciales);
            //Extraer token y almacenarlo en localstorage
            const { token } = respuesta.data;
            localStorage.setItem("token", token);
            guardarAuth({
                token,
                auth: true
            })
            Swal.fire("Login Exitoso", "Has Iniciado Sesión", "success");
        } catch (error) {
            console.log(error);
            if(error.response){
                Swal.fire({
                    icon: "error",
                    title: "Ha ocurrido un error",
                    text: error.response.data.mensaje
                })
            }
            else{
                Swal.fire({
                    icon: "error",
                    title: "Ha ocurrido un error",
                    text: "Ha ocurrido un error"
                })
            }
        }
    }
    return (
    <Fragment>
        <div className='login'>
            <h2>Iniciar Sesión</h2>
            <div className='contenedor-formulario'>
                <form onSubmit={iniciarSesion}>
                    <div className="campo">
                        <label>Email</label>
                        <input type="" name='email' placeholder='Email para iniciar sesión' required onChange={leerDatos}/>
                    </div>
                    <div className="campo">
                        <label>Password</label>
                        <input type="password" name='password' placeholder='Password para iniciar sesión' required onChange={leerDatos}/>
                    </div>
                    <input type="submit" value="Iniciar Sesión" className='btn btn-verde btn-block'/>
                </form>
            </div>
        </div>
    </Fragment>
  )
}

export default Login