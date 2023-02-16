import React, { useContext } from "react";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const [auth, guardarAuth] = useContext(Context);
    const navigate = useNavigate();
    const cerrarSesion = () => {
        guardarAuth({
            token: "",
            auth: false
        });
        localStorage.setItem("token", "");
        navigate("/login")
    }
    return(
        <header className="barra">
            <div className="contenedor">
                <div className="contenido-barra">
                    <h1>CRM Administrador de Clientes</h1>
                    { auth.auth ? (
                        <button type="button" className="btn btn-rojo" onClick={cerrarSesion}>
                             <i className="far fa-times-circe"></i>Cerrar Sesión
                        </button>
                    ): null}
                </div>
            </div>
        </header>
    )
}

export default Header;