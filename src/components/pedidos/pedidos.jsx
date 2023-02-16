import React, { useEffect, useState, Fragment, useContext } from 'react'
import clienteAxios from '../../config/axios';
import DetallesPedido from './DetallesPedido';
import { Context } from '../../context/Context';
import { useNavigate } from 'react-router-dom';

const Pedidos = () => {
  const [pedidos, guardarPedidos] = useState([]);
  const [auth, guardarAuth] = useContext(Context);
  const navigate = useNavigate();
  const consultarAPI = async () => {
    try{
      const resultado = await clienteAxios.get("/pedidos", {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
      guardarPedidos(resultado.data)
    }
    catch(error){
      if(error.response.status === 500){
        navigate("/login")
      }
    }
  }
  useEffect( () => {
    consultarAPI();
  }, [])
  if(!auth.auth){
    navigate("/login")
  }
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