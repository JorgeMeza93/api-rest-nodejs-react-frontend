import React, { Fragment, useContext } from "react";
import Header from "./components/layout/Header";
import Navegacion from "./components/layout/Navegacion";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Clientes from "./components/clientes/Clientes";
import Pedidos from "./components/pedidos/pedidos";
import Productos from "./components/productos/Productos";
import NuevoCliente from "./components/clientes/NuevoCliente";
import { EditarCliente } from "./components/clientes/EditarCliente";
import EditarProducto from "./components/productos/EditarProducto";
import NuevoProducto from "./components/productos/NuevoProducto";
import NuevoPedido from "./components/pedidos/NuevoPedido";
import Login from "./components/auth/Login";
import { Context, Provider } from "./context/Context";

function App() {
  const [auth, guardarAuth] = useContext(Context);
  return (
    <Router>
      <Fragment>
        <Provider value={[auth, guardarAuth]} >
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
                <Route exact path="/pedidos/nuevo/:id" element={ <NuevoPedido/> } />
                <Route exact path="/login" element={ <Login/>} />
              </Routes>
            </main>
          </div>
          </Provider>
      </Fragment>
    </Router>
  );
}

export default App;
