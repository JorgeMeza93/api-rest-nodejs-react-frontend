import React, { Fragment } from "react";
import Header from "./components/layout/Header";
import Navegacion from "./components/layout/Navegacion";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Clientes from "./components/clientes/Clientes";
import Pedidos from "./components/pedidos/pedidos";
import Productos from "./components/productos/productos";
import NuevoCliente from "./components/clientes/NuevoCliente";
import { EditarCliente } from "./components/clientes/EditarCliente";
import EditarProducto from "./components/productos/EditarProducto";
import NuevoProducto from "./components/productos/NuevoProducto";

function App() {
  return (
    <Router>
      <Fragment>
        <Header/>
        <div className="grid contenedor contenido-principal">
          <Navegacion/>
          <main className="caja-contenido col-9">
            <Routes>
              <Route path="/" element={<Clientes/>}/>
              <Route exact path="/clientes/nuevo" element={<NuevoCliente/>} />
              <Route exact path="/clientes/editar/:id" element={ <EditarCliente/>}/>
              <Route path="/pedidos" element={<Pedidos/>}/>
              <Route path="/productos" element={<Productos/>}/>
              <Route exact path="/productos/nuevo" element={<NuevoProducto/>} />
              <Route exact path="/productos/editar/:id" element={ <EditarProducto/> } />
            </Routes>
          </main>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
