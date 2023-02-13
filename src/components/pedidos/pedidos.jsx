import React, { useEffect, useState, Fragment } from 'react'
import clienteAxios from '../../config/axios';
import DetallesPedido from './DetallesPedido';

const Pedidos = () => {
  const [pedidos, guardarPedidos] = useState([]);
  const consultarAPI = async () => {
    const resultado = await clienteAxios.get("/pedidos");
    guardarPedidos(resultado.data)
  }
  useEffect( () => {
    consultarAPI();
  }, [])
  return (
    <Fragment>
      <ul className='listado-pedidos'>
        {pedidos.map( pedido => {
          return <DetallesPedido key={pedido._id} pedido={pedido}/>
        })}
      </ul>
    </Fragment>
  )
}

export default Pedidos