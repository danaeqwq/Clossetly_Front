import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import Header from "./componentes/header/Header";
import Footer from "./componentes/footer/Footer";
import NavBar from "./componentes/nav/Nav";

import Admin from "./pages/admin/Admin";
import Boutique from "./pages/boutique/Boutique";
import Explorar from "./pages/explorar/Explorar";
import MiCuenta from "./pages/miCuenta/MiCuenta";
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
export default function App() {
    const [panelActivo, setPanelActivo] = useState(null);
    return (
        <BrowserRouter>
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
                <main>
                    <Routes>
                        <Route path="/" element={<Navigate to="/boutique" replace />} />

                        <Route path="/admin" element={<Admin />} />

                        <Route
                            path="/boutique"
                            element={
                                <Boutique
                                    filtrosAbiertos={panelActivo === "filtros"}
                                    carritoAbierto={panelActivo === "carrito"}
                                    onCerrarFiltros={() => setPanelActivo(null)}
                                    onCerrarCarrito={() => setPanelActivo(null)}
                                />
                            }
                        />
                        <Route path="/explorar" element={<Explorar />} />
                        <Route path="/perfil" element={<MiCuenta />} />
                        <Route path="/guia-talle" element={<GuiaTalle />} />
                        <Route path="/armario" element={<MiArmario />} />
                        <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />
                        <Route path="/propuesta-intercambio" element={<PropuestaDeIntercambio />} />
                        <Route path="/terminos-y-condiciones" element={<Terminos />} />
                        <Route path="/registro" element={<Registro />} />

                        <Route path="/detalles/prenda/:id" element={<DetallePrenda />} />
                        <Route path="/detalles/outfit/:id" element={<DetalleOutfit />} />
                        <Route path="/detalles/venta/:id" element={<DetalleVenta />} />
                        <Route path="/detalles/intercambio/:id" element={<DetalleInter />} />
                    </Routes>
                </main>

                <Footer />
            </>
        </BrowserRouter>
    );
}