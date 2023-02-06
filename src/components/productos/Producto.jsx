import React from 'react';
import { Link } from 'react-router-dom';

const Producto = ({ producto }) => {
  const { _id, nombre, precio, imagen } = producto;
  const eliminarProducto = id => {
    console.log("Eliminando", _id)
  }
  return (
    <li className='producto'>
        <div className='info-producto'>
            <p className='nombre'>{nombre}</p>
            <p className='precio'>${precio}</p>
           { imagen ? (
             <img src={`http://localhost:3300/${imagen}`} />
           ): <div>Imagen no disponible</div>}
        </div>
        <div className='acciones'>
            <Link to={`/productos/editar/${_id}`} className="btn btn-azul" >
                <i className='fas fa-pen-alt'></i>Editar Producto
            </Link>
            <button type='button' className='btn btn-rojo btn-eliminar' onClick={ () => eliminarProducto(_id)}>
                <i className='fas fa-times'></i>Eliminar Cliente
            </button>
        </div>
    </li>
  )
}

export default Producto