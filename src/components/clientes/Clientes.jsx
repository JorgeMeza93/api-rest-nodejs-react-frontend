import React, { useEffect, useState, Fragment, useContext } from 'react'
import clienteAxios from '../../config/axios';
import Cliente from './Cliente';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { Context } from '../../context/Context';

const Clientes = () => {
  const [ clientes, guardarClientes ] = useState([]);
   // Utilizar valores del context
   const [auth, guardarAuth] = useContext(Context)
   console.log(auth);
  const consultarAPI = async () => {
    const clientesConsulta = await clienteAxios.get("/clientes");
    // Colocar el resultado de la consulta en el state
    guardarClientes(clientesConsulta.data)
  }
  useEffect( () => {
    consultarAPI();
  }, [clientes])   // Cuando clientes cambie vuelve a hacer el llamado a la API
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