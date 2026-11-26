import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import Header from "./componentes/header/Header";
import Footer from "./componentes/footer/Footer";
import NavBar from "./componentes/nav/Nav";
import Carrito from "./componentes/carrito/Carrito";

import Admin from "./pages/admin/Admin";
import Boutique from "./pages/boutique/Boutique";
import Explorar from "./pages/explorar/Explorar";
import MiCuenta from "./pages/miCuenta/Micuenta";
import GuiaTalle from "./pages/guiaTalle/GuiaTalle";
import MiArmario from "./pages/miArmario/MiArmario";
import PropuestaDeIntercambio from "./pages/propuesta de intercambio/PropuestaDeIntercambio";
import Terminos from "./pages/terminos/Terminos";
import PreguntasFrecuentes from "./pages/preguntasFrecuentes/preguntaAbierta/PreguntaAbierta";
import Registro from "./pages/registro/Registro";
import DetallePrenda from "./pages/detalles/DetallePrenda";
import DetalleVenta from "./pages/detalles/detalleVenta/DetalleVenta";
import DetalleInter from "./pages/detalles/detalleInter/DetalleInter";
import DetalleOutfit from "./pages/detalles/detalleOutfit/DetalleOutfit";
import Login from "./pages/login/Login";
import OlvidarContraseña from "./pages/olvidarContraseña/olvidarContraseña";
import VerificarCodigo from "./pages/verificarCode/verificarCode";
import TestInicial from "./pages/testInicial/testInicial";
import GestionDeUsuario from "./pages/admin/gestionDeUsuario/GestionDeUsuario";
import GestionPublicaciones from "./pages/admin/gestionPublicaciones/GestionPublicaciones";
import GestionSeccionPendiente from "./pages/admin/GestionSeccionPendiente";
import EditarPerfil from "./pages/miCuenta/editarPerfil/EditarPerfil";
import EditarEstilos from "./pages/miCuenta/editarEstilos/EditarEstilos";

export default function App() {
    const [panelActivo, setPanelActivo] = useState(null);
    const [usuario, setUsuario] = useState(() => {
        const usuarioGuardado = localStorage.getItem("usuario");
        const token = localStorage.getItem("token");
        return usuarioGuardado && token
            ? JSON.parse(usuarioGuardado)
            : null;
    });
    return (
        <BrowserRouter>
            <>
                {usuario && (
                    <>
                        <Header
                            onAbrirFiltros={() =>
                                setPanelActivo(panelActivo === "filtros" ? null : "filtros")
                            }
                            onAlternarCarrito={() =>
                                setPanelActivo(panelActivo === "carrito" ? null : "carrito")
                            }
                        />
                        <NavBar />
                    </>
                )}
                <main>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                usuario ? <Navigate to="/boutique" replace />: <Login setUsuario={setUsuario} />
                            }
                        />
                        <Route path="/registro" element={usuario? <Navigate to="/boutique" replace />: <Registro />}/>
                        <Route path="/olvidar-contraseña"element={<OlvidarContraseña />}/>
                        <Route path="/verificar-codigo"element={<VerificarCodigo />}/>
                        <Route path="/test-preferencias" element={<TestInicial />} />

                        {usuario ? (
                            <>
                                <Route path="/admin" element={<Admin />} />
                                <Route path="/admin/usuarios" element={<GestionDeUsuario />} />
                                <Route path="/admin/gestion-publicaciones" element={<GestionPublicaciones />} />
                                <Route path="/admin/:seccion" element={<GestionSeccionPendiente />} />
                                <Route
                                    path="/boutique"
                                    element={
                                        <Boutique
                                            filtrosAbiertos={panelActivo === "filtros"}
                                            onCerrarFiltros={() => setPanelActivo(null)}
                                        />
                                    }
                                />

                                <Route path="/explorar" element={<Explorar />} />
                                <Route path="/mi-cuenta" element={<MiCuenta />} />
                                <Route path="/guia-talle" element={<GuiaTalle />} />
                                <Route path="/armario" element={<MiArmario />} />
                                <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />
                                <Route path="/propuesta-intercambio" element={<PropuestaDeIntercambio />} />
                                <Route path="/terminos-y-condiciones" element={<Terminos />} />
                                <Route path="/detalles/prenda" element={<DetallePrenda />} />
                                <Route path="/detalles/outfit/:id" element={<DetalleOutfit />} />
                                <Route path="/detalles/venta/:id" element={<DetalleVenta />} />
                                <Route path="/detalles/intercambio/:id" element={<DetalleInter />} />
                                <Route path="/editar-perfil" element={<EditarPerfil setUsuario={setUsuario} />}/>
                                <Route path="/editar-estilos" element={<EditarEstilos />} />
                                <Route path="*" element={<Navigate to="/boutique" replace />} />
                            </>
                        ) : (
                            <Route path="*" element={<Navigate to="/" replace />} />
                        )}
                    </Routes>
                </main>
                {usuario && panelActivo === "carrito" && (
                    <Carrito onCerrar={() => setPanelActivo(null)} />
                )}
                {usuario && <Footer />}
            </>
        </BrowserRouter>
    );
}
