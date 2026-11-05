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
              <span className="Propuesta__avatar" aria-hidden="true">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=96&h=96&q=80"
                  alt=""
                />
              </span>
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
                <span className="material-symbols-outlined" aria-hidden="true">check_circle</span>
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
              <p><span className="material-symbols-outlined" aria-hidden="true">checkroom</span> 12 prendas</p>
            </header>
            <div className="Propuesta__lista">
              {prendasDisponibles.map((prenda, indice) => (
                <div className="Propuesta__prenda" key={prenda.id}>
                  <TarjetaPrenda nombre={prenda.nombre} descripcionImagen={prenda.nombre} />
                  {indice === 0 && (
                    <button className="Propuesta__seleccionar" type="button">
                      <span className="material-symbols-outlined" aria-hidden="true">add</span>
                      <span>Seleccionar prenda</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>
        </section>
      </main>
  );
}
