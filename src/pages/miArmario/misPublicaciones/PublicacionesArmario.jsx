import "./PublicacionesArmario.css";
import TarjetaVentaArmario from "../../../componentes/tarjetaVentaArmario/TarjetaVentaArmario";
import TarjetaIntercambioArmario from "../../../componentes/tarjetaIntercambioArmario/TarjetaIntercambioArmario";

export default function PublicacionesArmario() {
  return (
    <section className="MiArmario__publicaciones" aria-label="Mis publicaciones">
      <div className="MiArmario__panelPublicaciones">
        <header className="MiArmario__encabezadoPublicaciones">
          <h2><span className="material-symbols-outlined" aria-hidden="true">sync</span>Intercambio</h2>
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
    </section>
  );
}
