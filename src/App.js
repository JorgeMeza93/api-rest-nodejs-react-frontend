import React, { Fragment } from "react";
import Header from "./components/layout/Header";
import Navegacion from "./components/layout/Navegacion";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Clientes from "./components/clientes/Clientes";

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
            </Routes>
          </main>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
