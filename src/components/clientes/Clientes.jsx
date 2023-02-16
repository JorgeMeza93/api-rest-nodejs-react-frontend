import React, { useEffect, useState, Fragment, useContext } from 'react'
import clienteAxios from '../../config/axios';
import Cliente from './Cliente';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { Context } from '../../context/Context';

const Clientes = () => {
  const [ clientes, guardarClientes ] = useState([]);
  const navigate = useNavigate();
   // Utilizar valores del context
   const [auth, guardarAuth] = useContext(Context)
  const consultarAPI = async () => {
    try {
      const clientesConsulta = await clienteAxios.get("/clientes", {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
      // Colocar el resultado de la consulta en el state
      guardarClientes(clientesConsulta.data)
    } 
    catch (error) {
      if(error.response.status === 500){
        navigate("/login");
      }
    }
    
  }
  useEffect( () => {
    if(auth.token !== ""){
      consultarAPI();
    }
    else{
      navigate("/login")
    }
  }, [clientes])   // Cuando clientes cambie vuelve a hacer el llamado a la API
  if(!auth.auth){
    navigate("/login");
  }
  if(! clientes.length){
    return <Spinner/>
  }
  return (
    <Fragment>
      <h2>Clientes</h2>
      <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente">
        <i className='fas fa-plus-circle'></i>Nuevo Cliente
      </Link>
      <ul className='listado-clientes'>
        {clientes.map( cliente => {
           return <Cliente key={cliente._id} cliente={cliente} />
        })}
      </ul>
    </Fragment>
  )
}

export default Clientes