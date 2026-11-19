import { useParams } from "react-router";
import "./Admin.css";
import "../../styles/variables.css";

const secciones = {
  denuncias: {
    titulo: "Gestión de denuncias",
    descripcion: "Esta vista de gestión todavía no está implementada.",
  },
  categorias: {
    titulo: "Gestión de categorías",
    descripcion: "Esta vista de gestión todavía no está implementada.",
  },
};

export default function GestionSeccionPendiente() {
  const { seccion } = useParams();
  const contenido = secciones[seccion];

  if (!contenido) return null;

  return (
    <main className="Admin" aria-labelledby="Admin__tituloSeccion">
      <header className="Admin__bienvenida">
        <h1 id="Admin__tituloSeccion">{contenido.titulo}</h1>
        <p>{contenido.descripcion}</p>
      </header>
    </main>
  );
}
