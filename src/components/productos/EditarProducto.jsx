import React, { useState, useEffect, Fragment} from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../layout/Spinner';

const EditarProducto = (props) => {
  const { id } = useParams();
  const [producto, guardarProducto] = useState({
    nombre: "",
    precio: "",
    imagen: ""
  });
  const [archivo, guardarArchivo] = useState("pipo")

  //Consultar API
  const consultarAPI = async () => {
    const productoConsulta = await clienteAxios.get(`/productos/${id}`);
    guardarProducto(productoConsulta.data);
    console.log(productoConsulta.data);
  }
  // Cuando el componente carga
  useEffect( () => {
    consultarAPI()
  }, []);

  const leerInformacionProducto = e => {
    guardarProducto({
      ...producto,
      [e.target.name]: e.target.value
    })
  }
  const leerArchivo = e => {
    guardarArchivo(e.target.files[0]);
  }
  const editarProducto = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("nombre", producto.nombre);
    formData.append("precio", producto.precio);
    formData.append("imagen", archivo);
    try{
      const res = await clienteAxios.put(`/productos/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      if(res.status === 200){
        Swal.fire("Editado correctamente", res.data.mensaje, "success");
      }
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
  }
  
  const navigate = useNavigate();
  //Extraer los valores del state
  const { nombre, precio, imagen } = producto;
  if(!nombre) return <Spinner/>
  return (
    <Fragment>
      <h2>Editar Producto</h2>
      <form onSubmit={editarProducto}>
      <legend>Llena todos los cambios</legend>
        <div className='campo'>
          <label>Nombre: </label>
          <input type="text" placeholder='Nombre del producto' name='nombre' onChange={leerInformacionProducto} defaultValue={nombre}/>
        </div>
        <div className='campo'>
          <label>Precio: </label>
          <input type="number" placeholder='Precio del producto' name='precio' min="0.00" step="0.10" onChange={leerInformacionProducto} defaultValue={precio}/>
        </div>
        <div className='campo'>
          <label>Imagen: </label>
          { imagen ? (<img src={`http://localhost:3300/${imagen}`} alt="imagen" width="300"/>) : null }
          <input type="file" id='imagen' name='imagen' onChange={leerArchivo}/>
        </div>
        <div className='enviar'>
          <input type="submit" className='btn-azul btn' value="Editar Producto" />
        </div>
      </form>
    </Fragment>
  )
}

export default EditarProducto