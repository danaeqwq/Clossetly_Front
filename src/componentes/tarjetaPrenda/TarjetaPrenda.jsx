import "./tarjetaPrenda.css";
export default function TarjetaPrenda() {
  return <article className="TarjetaPrenda">
    <img className="TarjetaPrenda__imagen" src="https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=600&q=85" alt="Vestido color oscuro" />
    <span className="TarjetaPrenda__favorito material-symbols-outlined">favorite</span>
    <span className="TarjetaPrenda__etiqueta">Vestido art</span>
  </article>;
}
