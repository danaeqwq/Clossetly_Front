<<<<<<< Updated upstream
=======

import { useLocation } from "react-router";
>>>>>>> Stashed changes
import "./DetalleOutfit.css";
import "../../../styles/variables.css";
import "../../../styles/global.css";
import Boton from "../../../componentes/Boton/Boton";
import LineaM from "../../../componentes/LineaM/LineaM";
import Outfit from "../../../assets/Ropa__ejemplo.jpg";
<<<<<<< Updated upstream
import Ropa1 from "../../../assets/ropa1.jpg";
import Ropa2 from "../../../assets/ropa2.jpg";

export default function DetalleOutfit() {
  return (
    <main className="DetalleOutfit">
      <section className="DetalleOutfit__principal" aria-label="Detalle del outfit">
        <article className="DetalleOutfit__ficha">
          <div className="DetalleOutfit__imagenMarco">
            <img src={Outfit} alt="Outfit de vestido y accesorios" />
=======

export default function DetalleOutfit() {
  const location = useLocation();
  const outfit = location.state?.outfit;

  const obtenerImagen = (imagen) => {
    if (!imagen) return Outfit;

    if (
      imagen.startsWith("http") ||
      imagen.startsWith("data:") ||
      imagen.startsWith("blob:")
    ) {
      return imagen;
    }

    return `http://localhost:3000${imagen}`;
  };

  if (!outfit) {
    return (
      <main className="DetalleOutfit">
        <p>No se encontraron los datos del outfit.</p>
      </main>
    );
  }

  const prendas = outfit.prendas || [];

  const imagenPrincipal = prendas.find((prenda) => prenda.imagen)?.imagen;

  return (
    <main className="DetalleOutfit">
      <section
        className="DetalleOutfit__principal"
        aria-label="Detalle del outfit"
      >
        <article className="DetalleOutfit__ficha">
          <div className="DetalleOutfit__imagenMarco">
            <img
              src={obtenerImagen(imagenPrincipal)}
              alt={outfit.nombre}
            />
>>>>>>> Stashed changes
          </div>

          <div className="DetalleOutfit__informacion">
            <span className="DetalleOutfit__insignia">
<<<<<<< Updated upstream
              <span className="material-symbols-outlined" aria-hidden="true">styler</span>
              OUTFIT
            </span>
            <h1>Outfit Primavera</h1>
            <p className="DetalleOutfit__descripcion">
              Tengo estos jeans y esta remera, ¿qué calzado me recomiendan? ¿Botas, zapatillas o mocasines? ¿Alguna idea?
=======
              <span className="material-symbols-outlined" aria-hidden="true">
                styler
              </span>
              OUTFIT
            </span>

            <h1>{outfit.nombre}</h1>

            <p className="DetalleOutfit__descripcion">
              {outfit.descripcion || "Este outfit no tiene descripción."}
>>>>>>> Stashed changes
            </p>

            <div className="DetalleOutfit__privacidad">
              <strong>Privacidad</strong>
<<<<<<< Updated upstream
              <span>Pública</span>
              <span className="DetalleOutfit__interruptor" aria-label="Pública" />
=======

              <span>
                {Number(outfit.privacidad) === 1 ? "Pública" : "Privada"}
              </span>

              <span
                className="DetalleOutfit__interruptor"
                aria-label="Privacidad"
              />
>>>>>>> Stashed changes
            </div>

            <dl className="DetalleOutfit__datos">
              <div>
<<<<<<< Updated upstream
                <dt><span className="material-symbols-outlined" aria-hidden="true">calendar_today</span>Temporada</dt>
                <dd>otoño / invierno</dd>
              </div>
              <div>
                <dt><span className="material-symbols-outlined" aria-hidden="true">person</span>Género</dt>
                <dd>Mujer</dd>
=======
                <dt>
                  <span className="material-symbols-outlined" aria-hidden="true">
                    calendar_today
                  </span>
                  Temporada
                </dt>
                <dd>{outfit.temporada || "Sin especificar"}</dd>
              </div>

              <div>
                <dt>
                  <span className="material-symbols-outlined" aria-hidden="true">
                    person
                  </span>
                  Género
                </dt>
                <dd>{outfit.genero || "Sin especificar"}</dd>
              </div>

              <div>
                <dt>
                  <span className="material-symbols-outlined" aria-hidden="true">
                    event
                  </span>
                  Ocasión
                </dt>
                <dd>{outfit.ocasion || "Sin especificar"}</dd>
>>>>>>> Stashed changes
              </div>
            </dl>

            <div className="DetalleOutfit__linea" aria-hidden="true">
              <LineaM lado="izquierdo" />
            </div>

<<<<<<< Updated upstream
            <div className="DetalleOutfit__galeria" aria-label="Prendas del outfit">
              <img src={Ropa1} alt="Mochila amarilla con parches" />
              <img src={Ropa2} alt="Pantalón estampado" />
=======
            <div
              className="DetalleOutfit__galeria"
              aria-label="Prendas del outfit"
            >
              {prendas
                .filter((prenda) => prenda.imagen)
                .map((prenda) => (
                  <img
                    key={prenda.id}
                    src={obtenerImagen(prenda.imagen)}
                    alt={prenda.nombre}
                  />
                ))}
>>>>>>> Stashed changes
            </div>
          </div>
        </article>

<<<<<<< Updated upstream
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
=======
        <aside
          className="DetalleOutfit__panel"
          aria-label="Datos y opciones del outfit"
        >
          <h2>Datos del Outfit</h2>

          <section className="DetalleOutfit__prendas">
            <h3>Prendas que lleva:</h3>

            <div className="DetalleOutfit__etiquetas">
              {prendas.length > 0 ? (
                prendas.map((prenda) => (
                  <span key={prenda.id}>
                    {prenda.nombre}
                  </span>
                ))
              ) : (
                <span>Sin prendas</span>
              )}
            </div>
          </section>

          <Boton
            texto="Modificar Outfit"
            variante="secundario"
            iconoGoogle="edit_square"
            type="button"
          />

          <Boton
            texto="Eliminar outfit"
            variante="secundario eliminar"
            iconoGoogle="delete"
            type="button"
          />
>>>>>>> Stashed changes
        </aside>
      </section>
    </main>
  );
}
