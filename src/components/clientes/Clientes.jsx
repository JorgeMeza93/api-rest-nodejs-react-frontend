import React, { useEffect, useState, Fragment } from 'react'
import clienteAxios from '../../config/axios'

const Clientes = () => {
  const [ clientes, guardarClientes ] = useState([]);
  const consultarAPI = async () => {
    const clientesConsulta = await clienteAxios.get("/clientes");
    // Colocar el resultado de la consulta en el state
    guardarClientes(clientesConsulta.data)
  }
  useEffect( () => {
    consultarAPI();
  }, [])
  return (
    <Fragment>
      <h2>Clientes</h2>
      <ul className='listado-clientes'>
        {clientes.map( cliente => {
          
        })}
      </ul>
    </Fragment>
  )
}

export default Clientes