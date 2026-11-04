import "./PublicacionesArmario.css";
import TarjetaVentaArmario from "../../../componentes/tarjetaVentaArmario/TarjetaVentaArmario";
import TarjetaIntercambioArmario from "../../../componentes/tarjetaIntercambioArmario/TarjetaIntercambioArmario";
import GestionarVentas from "./modales/Gestionar ventas/GestionarVentas"
import PropuestasDeIntercambio from "./modales/Propuestas de intercambio/PropuestasDeIntercambio"
export default function PublicacionesArmario() {
  return (
    <section className="MiArmario__publicaciones" aria-label="Mis publicaciones">
      <div className="MiArmario__panelPublicaciones">
        <header className="MiArmario__encabezadoPublicaciones">
          <h2><span className="material-symbols-outlined" aria-hidden="true">autorenew</span>Intercambio</h2>
          <span>23 Publicaciones</span>
        </header>
        <div className="MiArmario__listaPublicaciones">
          <TarjetaIntercambioArmario nombre="Abrigo Nocturne" />
        </div>
      </div>
      <div className="MiArmario__panelPublicaciones">
        <header className="MiArmario__encabezadoPublicaciones">
          <h2><span className="material-symbols-outlined" aria-hidden="true">shopping_basket</span>Venta</h2>
          <span>23 Publicaciones</span>
        </header>
        <div className="MiArmario__listaPublicaciones">
          <TarjetaVentaArmario nombre="Abrigo Nocturne" />
        </div>
      </div>
      <GestionarVentas />
    </section>
  );
}
