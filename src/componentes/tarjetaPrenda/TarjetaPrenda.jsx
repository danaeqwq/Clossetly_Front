import "./tarjetaPrenda.css";

const imagenPorDefecto = "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=600&q=85";

export default function TarjetaPrenda({
  imagen = imagenPorDefecto,
  descripcionImagen = "Vestido color oscuro",
  nombre = "Vestido art",
  color,
  mostrarOpciones = false,
  seleccionada = false,
  menuAbierto = false,
}) {
  const clases = [
    "TarjetaPrenda",
    mostrarOpciones && "TarjetaPrenda--armario",
    seleccionada && "TarjetaPrenda--seleccionada",
  ].filter(Boolean).join(" ");

  return (
    <article className={clases} style={color ? { "--TarjetaPrenda-color": color } : undefined}>
      <img className="TarjetaPrenda__imagen" src={imagen} alt={descripcionImagen} />
      {mostrarOpciones && (
        <>
          <button className="TarjetaPrenda__opciones" type="button" aria-label={`Opciones para ${nombre}`}>
            <span aria-hidden="true">⋯</span>
          </button>
          {menuAbierto && (
            <ul className="TarjetaPrenda__menu" aria-label={`Opciones para ${nombre}`}>
              <li><span className="material-symbols-outlined" aria-hidden="true">edit</span>Modificar</li>
              <li><span className="material-symbols-outlined" aria-hidden="true">checkroom</span>Armar outfit</li>
              <li><span className="material-symbols-outlined" aria-hidden="true">delete_outline</span>Eliminar</li>
            </ul>
          )}
        </>
      )}
      <span className="TarjetaPrenda__favorito material-symbols-outlined">favorite</span>
      <span className="TarjetaPrenda__etiqueta">{nombre}</span>
    </article>
  );
}
