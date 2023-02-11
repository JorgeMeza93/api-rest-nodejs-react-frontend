import React, { Fragment, useState, useEffect } from "react";

function NuevoPedido(){
    return(
        <Fragment>
            <h2>Nuevo Producto</h2>
            <div className="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <p></p>
            </div>
            <form>
                <legend>Busca un Producto y agrega una cantidad</legend>
                <div className="campo">
                    <label>Productos: </label>
                    <input type="text" placeholder="Nombre del Producto" name="productos" />
                </div>
                <ul className="resumen">
                    <li>
                        <div className="texto-producto">
                            <p className="nombre">Macbook pro</p>
                            <p className="precio">230</p>
                        </div>
                        <div className="acciones">
                            <div className="contenedor-cantidad">
                                <i className="fas fa-minus"></i>
                                <input type="text" name="cantidad" />
                                <i className="fas fa-plus"></i>
                            </div>
                        </div>
                    </li>
                </ul>
            </form>
        </Fragment>
    )
}
export default NuevoPedido;