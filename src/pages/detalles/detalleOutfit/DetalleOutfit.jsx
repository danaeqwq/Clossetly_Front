import "./DetalleOutfit.css";
import "../../../styles/variables.css";
import "../../../styles/global.css";
import Boton from "../../../componentes/Boton/Boton";
import LineaM from "../../../componentes/LineaM/LineaM";
import Outfit from "../../../assets/Ropa__ejemplo.jpg";
import Ropa1 from "../../../assets/ropa1.jpg";
import Ropa2 from "../../../assets/ropa2.jpg";

export default function DetalleOutfit() {
  return (
    <main className="DetalleOutfit">
      <section className="DetalleOutfit__principal" aria-label="Detalle del outfit">
        <article className="DetalleOutfit__ficha">
          <div className="DetalleOutfit__imagenMarco">
            <img src={Outfit} alt="Outfit de vestido y accesorios" />
          </div>

          <div className="DetalleOutfit__informacion">
            <span className="DetalleOutfit__insignia">
              <span className="material-symbols-outlined" aria-hidden="true">styler</span>
              OUTFIT
            </span>
            <h1>Outfit Primavera</h1>
            <p className="DetalleOutfit__descripcion">
              Tengo estos jeans y esta remera, ¿qué calzado me recomiendan? ¿Botas, zapatillas o mocasines? ¿Alguna idea?
            </p>

            <div className="DetalleOutfit__privacidad">
              <strong>Privacidad</strong>
              <span>Pública</span>
              <span className="DetalleOutfit__interruptor" aria-label="Pública" />
            </div>

            <dl className="DetalleOutfit__datos">
              <div>
                <dt><span className="material-symbols-outlined" aria-hidden="true">calendar_today</span>Temporada</dt>
                <dd>otoño / invierno</dd>
              </div>
              <div>
                <dt><span className="material-symbols-outlined" aria-hidden="true">person</span>Género</dt>
                <dd>Mujer</dd>
              </div>
            </dl>

            <div className="DetalleOutfit__linea" aria-hidden="true">
              <LineaM lado="izquierdo" />
            </div>

            <div className="DetalleOutfit__galeria" aria-label="Prendas del outfit">
              <img src={Ropa1} alt="Mochila amarilla con parches" />
              <img src={Ropa2} alt="Pantalón estampado" />
            </div>
          </div>
        </article>

        <aside className="DetalleOutfit__panel" aria-label="Datos y opciones del outfit">
          <h2>Datos del Outfit</h2>
          <section className="DetalleOutfit__prendas">
            <h3>Prendas que lleva:</h3>
            <div className="DetalleOutfit__etiquetas">
              <span>VESTIDO</span>
              <span>MOCHILA</span>
              <span>PANTALÓN</span>
            </div>
          </section>

          <fieldset className="DetalleOutfit__coloresOutfit">
            <legend>Colores:</legend>
            <span aria-label="Bordó" />
            <span aria-label="Amarillo" />
            <span aria-label="Azul" />
          </fieldset>

          <h2 className="DetalleOutfit__tituloPrenda">Datos de prenda</h2>
          <fieldset className="DetalleOutfit__coloresPrenda">
            <legend>Colores:</legend>
            <span aria-label="Bordó" />
          </fieldset>
          <fieldset className="DetalleOutfit__talles">
            <legend>Talles:</legend>
            <span>M</span>
          </fieldset>

          <Boton texto="Modificar Outfit" variante="secundario" iconoGoogle="edit_square" type="button" />
          <Boton texto="Eliminar outfit" variante="secundario eliminar" iconoGoogle="delete" type="button" />
        </aside>
      </section>
    </main>
  );
}
