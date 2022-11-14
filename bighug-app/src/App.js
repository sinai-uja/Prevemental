import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import React, { useState } from "react";
import RegistrarSupervisor from './components/RegistrarSupervisor'
import IniciarSupervisor from './components/IniciarSupervisor'
import Dashboard from './components/Dashboard'
import AddUsuario from './components/AddUsuario'
import PerfilUsuario from './components/PerfilUsuario';
import AddRedSocial from './components/AddRedSocial';
import MiCuenta from './components/MiCuenta';
import CuentaUsuario from './components/CuentaUsuario';
import EditarRedSocial from './components/EditarRedSocial';
import Info from './components/Info';


// --- APP --- //
function App(props) {

  localStorage.clear();
  const [authenticated, setauthenticated] = useState(null);

  // --- FUNCIONES --- //
    return(
      <Router>
        <div className='.p-0'>
          <Routes>
            <Route path="/editarredsocial" element={<EditarRedSocial />}></Route>
            <Route path="/cuentausuario" element={<CuentaUsuario />}></Route>
            <Route path="/micuenta" element={<MiCuenta />}></Route>
            <Route path="/addredsocial" element={<AddRedSocial />}></Route>
            <Route path="/perfilusuario" element={<PerfilUsuario />}></Route>
            <Route path="/addusuario" element={<AddUsuario />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/registrar" element={<RegistrarSupervisor />}></Route>
            <Route path="/info" element={<Info />}></Route>
            <Route path="/" element={<IniciarSupervisor />}></Route>
          </Routes>
        </div>
      </Router>
    )
}

export default App;