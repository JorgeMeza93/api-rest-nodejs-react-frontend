import React, { Fragment } from 'react'

function FormCantidadProducto(props) {
  const { producto, sumarProductos, restarProductos, index, eliminarProductosPedidos } = props;
    return (
    <Fragment>
        <li>
            <div className="texto-producto">
                <p className="nombre">{producto.nombre}</p>
                <p className="precio">{producto.precio}</p>
            </div>
            <div className="acciones">
                <div className="contenedor-cantidad">
                    <i className="fas fa-minus" onClick={ () => restarProductos(index) } ></i>
                    <p>{producto.cantidad}</p>
                    <i className="fas fa-plus" onClick={ () => sumarProductos(index) }></i>
                </div>
                <button type="button" className="btn btn-rojo" onClick={ () => eliminarProductosPedidos(producto._id) }>
                    <i className="fas fa-minus-circle"></i>Eliminar Producto
                </button>
            </div>
        </li>
    </Fragment>
  )
}

export default FormCantidadProducto