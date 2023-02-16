import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Producto from './Producto';
import Spinner from '../layout/Spinner';
import { Context } from '../../context/Context';

const Productos = () => {
  const [productos, guardarProductos] = useState([]);
  const [auth, guardarAuth] = useContext(Context);
  const navigate = useNavigate();
  const consultarAPI = async () => {
    try {
      const productosConsulta = await clienteAxios.get("/productos", {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
     });
     guardarProductos(productosConsulta.data);
    }
    catch (error) {
      if(error.response.status === 500){
        navigate("/login")
      }
    }
  }
  useEffect( () => {
    if(auth.token !== ""){
      consultarAPI();
    }
    else{
      navigate("/login");
    }
  }, [productos]);
  if(!auth.auth){
    navigate("/login")
  }
  if(!productos.length){
    return <Spinner/>
  }
  return (
    <Fragment>
      <h2>Productos</h2>
      <Link to={"/productos/nuevo"} className='btn btn-verde nvo-cliente'>
        <i className='fas fa-plus-circle'></i>Nuevo Producto
      </Link>
      <ul className='listado-productos'>
        {productos.map( (producto) => {
           return <Producto 
            key={producto._id}
            producto={producto}
           />
        })}
      </ul>
    </Fragment>
  )
}

export default Productos