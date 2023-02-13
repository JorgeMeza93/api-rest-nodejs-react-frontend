import React from 'react'

const DetallesPedido = ({ pedido }) => {
  const { cliente } = pedido;
  return (
    <li className='pedido'>
        <div className='info-pedido'>
            <p className='id'></p>
            <p className='nombre'>Cliente: {cliente.nombre} {cliente.apellido}</p>
            <div className='articulos-pedido'>
                <p className='productos'>Artículos Pedido: </p>
                <ul>
                    {pedido.articulo.map( art => {
                        return <li key={pedido._id + art.producto._id}>
                            <p>{art.producto.nombre}</p>
                            <p>Precio: ${art.producto.precio}</p>
                            <p>Cantidad: {art.cantidad}</p>
                        </li>
                    })}
                </ul>
            </div>
            <p className='total'>Total: ${pedido.total}</p>
        </div>
        <div className='acciones'>
            <button type='button' className='btn btn-rojo btn-eliminar'>
                <i className='fas fa-times' ></i>Eliminar Producto
            </button>
        </div>
    </li>
  )
}

export default DetallesPedido