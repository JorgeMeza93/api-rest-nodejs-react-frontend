import React, { Fragment, useState } from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { useNavigate } from 'react-router-dom';

const NuevoProducto = () => {
  const [producto, guardarProducto] = useState({
    nombre: "",
    precio: ""
  });
  const [archivo, guardarArchivo] = useState("pipo");
  const leerInformacionProducto = e => {
    guardarProducto({
      ...producto,
      [e.target.name]: e.target.value
    })
  }
  const leerArchivo = e => {
    guardarArchivo(e.target.files[0]);
  }
  const agregarProducto = async(e) => {
    e.preventDefault();
    //Especificar como form data para que la api acepte este formato de envio de informacion
    const formData = new FormData();
    formData.append("nombre", producto.nombre);
    formData.append("precio", producto.precio);
    formData.append("imagen", archivo);
    try{
      const res = await clienteAxios.post("/productos", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
    }
    catch (error) {
      console.log(error);
      Swal.fire({
        type: "error",
        title: "Ha ocurrido un error",
        text: "Vuelve a intentarlo",
      })
    }
    navigate('/productos', {replace:true});
    console.log(archivo);
  }
  const navigate = useNavigate();
  return (
    <Fragment>
      <h2>Nuevo Producto</h2>
      <form onSubmit={agregarProducto} >
        <legend>Llena todos los cambios</legend>
        <div className='campo'>
          <label>Nombre: </label>
          <input type="text" placeholder='Nombre del producto' name='nombre' onChange={leerInformacionProducto}/>
        </div>
        <div className='campo'>
          <label>Precio: </label>
          <input type="number" placeholder='Precio del producto' name='precio' min="0.00" step="0.10" onChange={leerInformacionProducto}/>
        </div>
        <div className='campo'>
          <label>Imagen: </label>
          <input type="file" id='imagen' name='imagen' onChange={leerArchivo}/>
        </div>
        <div className='enviar'>
          <input type="submit" className='btn-azul btn' value="Agregar Producto" />
        </div>
      </form>
    </Fragment>
  )
}

export default NuevoProducto