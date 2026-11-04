import "../../styles/variables.css";
import "./propuestaDeIntercambio.css";
import TarjetaPrenda from "../../componentes/tarjetaPrenda/TarjetaPrenda";

const prendasDisponibles = Array.from({ length: 8 }, (_, indice) => ({
  id: indice + 1,
  nombre: "Camisa angel",
}));

export default function PropuestaDeIntercambio() {
  return (
      <main className="Propuesta">
        <section className="Propuesta__intercambio" aria-label="Tu propuesta de intercambio">
          <div className="Propuesta__seleccion">
            <div className="Propuesta__usuario">
              <span className="Propuesta__avatar" aria-hidden="true">♧</span>
              <span>@user67</span>
            </div>

            <div className="Propuesta__items">
              <TarjetaPrenda
                nombre="Camisa a rayas"
                descripcionImagen="Camisa a rayas"
              />
              <span className="Propuesta__cambiar material-symbols-outlined" aria-label="Intercambiar prendas">
                autorenew
              </span>
              <button className="Propuesta__agregar" type="button">
                <span className="material-symbols-outlined" aria-hidden="true">add</span>
                <span>Agregar prenda</span>
              </button>
            </div>

            <div className="Propuesta__acciones">
              <button className="Propuesta__confirmar" type="button">
                Confirmar propuesta de intercambio
                <span className="material-symbols-outlined" aria-hidden="true">favorite</span>
              </button>
              <button className="Propuesta__cancelar" type="button">
                Cancelar propuesta
                <span className="material-symbols-outlined" aria-hidden="true">delete_outline</span>
              </button>
            </div>
          </div>

          <section className="Propuesta__disponibles" aria-labelledby="Propuesta__titulo">
            <header className="Propuesta__encabezado">
              <h1 id="Propuesta__titulo">Prendas disponibles para intercambiar</h1>
              <p><span aria-hidden="true">♧</span> 12 prendas</p>
            </header>
            <div className="Propuesta__lista">
              {prendasDisponibles.map((prenda) => (
                <TarjetaPrenda key={prenda.id} nombre={prenda.nombre} descripcionImagen={prenda.nombre} />
              ))}
            </div>
            <button className="Propuesta__seleccionar" type="button">
              <span aria-hidden="true">＋</span> Seleccionar prenda
            </button>
          </section>
        </section>
      </main>
  );
}
