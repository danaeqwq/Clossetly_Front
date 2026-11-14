import "./GestionPublicaciones.css";
import "../../../styles/variables.css";
import TarjetaOutfit from "../../../componentes/tarjetaOutfit/TarjetaOutfit";
import TarjetaPrenda from "../../../componentes/tarjetaPrenda/TarjetaPrenda";
import TarjetaConsejo from "../../../componentes/tarjetaConsejo/TarjetaConsejo";
import Select from "../../../componentes/select/Select";
import ropaEjemplo from "../../../assets/Ropa__ejemplo.jpg";

const publicaciones = [
  { tipo: "OUTFIT", tono: "lavanda", menuAbierto: true },
  { tipo: "OUTFIT", tono: "verde" },
  { tipo: "PRENDA", tono: "azul", nombre: "Vestido art", imagen: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=600&q=80" },
  { tipo: "CONSEJO", tono: "verde" },
  { tipo: "CONSEJO", tono: "carbon" },
  { tipo: "PRENDA", tono: "terracota", nombre: "Vestido floral", imagen: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80" },
  { tipo: "PRENDA", tono: "carbon", nombre: "Camisa angel", imagen: ropaEjemplo },
  { tipo: "OUTFIT", tono: "lavanda" },
  { tipo: "CONSEJO", tono: "vino" },
  { tipo: "PRENDA", tono: "terracota", nombre: "Falda bordada", imagen: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=600&q=80" },
];

const filtros = [
  { valor: "todos", texto: "TODOS", icono: "space_dashboard" },
  { valor: "outfits", texto: "OUTFITS", icono: "checkroom" },
  { valor: "prendas", texto: "PRENDAS", icono: "styler" },
  { valor: "consejos", texto: "CONSEJOS", icono: "forum" },
  { valor: "compra", texto: "COMPRA", icono: "shopping_basket" },
  { valor: "intercambio", texto: "INTERCAMBIO", icono: "autorenew" },
];

function TarjetaPublicacion({ publicacion }) {
  return (
    <div className={`GestionPublicaciones__tarjeta GestionPublicaciones__tarjeta--${publicacion.tono}`}>
      {publicacion.tipo === "OUTFIT" && <TarjetaOutfit />}
      {publicacion.tipo === "PRENDA" && (
        <TarjetaPrenda
          nombre={publicacion.nombre}
          imagen={publicacion.imagen}
          descripcionImagen={publicacion.nombre}
          color={publicacion.tono === "terracota" ? "var(--color-naranja)" : "var(--color-azul)"}
        />
      )}
      {publicacion.tipo === "CONSEJO" && <TarjetaConsejo />}
      <span className="TarjetaPrenda__opciones" aria-hidden="true">⋯</span>
      {publicacion.menuAbierto && (
        <ul className="TarjetaPrenda__menu" aria-label="Opciones de moderación">
          <li><span className="material-symbols-outlined" aria-hidden="true">visibility</span>Visible</li>
          <li><span className="material-symbols-outlined" aria-hidden="true">delete_outline</span>Eliminar</li>
        </ul>
      )}
    </div>
  );
}

export default function GestionPublicaciones() {
  return (
    <main className="GestionPublicaciones" aria-labelledby="GestionPublicaciones__titulo">
      <header className="GestionPublicaciones__encabezado">
        <h1 id="GestionPublicaciones__titulo">Gestión de prendas y publicaciones</h1>
        <p>Revisá y moderá las prendas y publicaciones de la comunidad para garantizar un espacio seguro y respetuoso.</p>
      </header>

      <div className="GestionPublicaciones__herramientas" aria-label="Búsqueda y estado de publicaciones">
        <div className="GestionPublicaciones__buscador"><span>Busca por nombre o por usuario</span><span className="material-symbols-outlined" aria-hidden="true">search</span></div>
        <div className="GestionPublicaciones__estado"><strong>ESTADO:</strong><span><i />Bloqueado</span><span><i />Visible</span></div>
      </div>

      <Select
        opciones={filtros}
        seleccionada="consejos"
        ariaLabel="Categorías de publicaciones"
        className="GestionPublicaciones__select"
      />

      <section className="GestionPublicaciones__grilla" aria-label="Publicaciones de la comunidad">
        {publicaciones.map((publicacion, indice) => <TarjetaPublicacion publicacion={publicacion} key={`${publicacion.tipo}-${indice}`} />)}
      </section>
    </main>
  );
}
