import React, { Fragment } from 'react'

const Login = () => {
    const leerDatos = () => {
        
    }
    return (
    <Fragment>
        <div className='login'>
            <h2>Iniciar Sesión</h2>
            <div className='contenedor-formulario'>
                <form>
                    <div className="campo">
                        <label>Email</label>
                        <input type="" name='email' placeholder='Email para iniciar sesión' required onChange={leerDatos}/>
                    </div>
                    <div className="campo">
                        <label>Password</label>
                        <input type="password" name='password' placeholder='Password para iniciar sesión' required onChange={leerDatos}/>
                    </div>
                    <input type="submit" value="Iniciar Sesión" className='btn btn-verde btn-block'/>
                </form>
            </div>
        </div>
    </Fragment>
  )
}

export default Login