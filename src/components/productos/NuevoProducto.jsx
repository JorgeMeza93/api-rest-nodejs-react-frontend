import React, { Fragment, useState } from 'react'

const NuevoProducto = () => {
  const [producto, guardarProducto] = useState({
    nombre: "",
    precio: ""
  })
  const [archivo, guardarArchivo] = useState("");
  return (
    <Fragment>
      <h2>Nuevo Producto</h2>
      <form>
        <legend>Lena todos los cambios</legend>
        <div className='campo'>
          <label>Nombre: </label>
          <input type="text" placeholder='Nombre del producto' name='nombre' />
        </div>
        <div className='campo'>
          <label>Precio: </label>
          <input type="number" placeholder='Precio del producto' name='precio' min="0.00" step="0.10" />
        </div>
        <div className='campo'>
          <label>Imagen: </label>
          <input type="file" name='imagen' />
        </div>
        <div className='enviar'>
          <input type="submoit" className='btn-azul btn' value="Agregar Producto" />
        </div>
      </form>
    </Fragment>
  )
}

export default NuevoProducto