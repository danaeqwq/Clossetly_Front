import "./Admin.css";
import "../../styles/variables.css";
import { Link } from "react-router";

const secciones = [
  { titulo: "Gestión de usuarios", descripcion: "Administra las cuentas y ayuda a mantener una comunidad segura.", icono: "manage_accounts", ruta: "/admin/usuarios" },
  { titulo: "Gestión de prendas y publicaciones", descripcion: "Revisa el contenido y asegúrate de que cumpla las normas.", icono: "edit_note", ruta: "/admin/gestion-publicaciones" },
  { titulo: "Gestión de denuncias", descripcion: "Atiende los reportes y cuida la convivencia en la comunidad.", icono: "report", ruta: "/admin/denuncias" },
  { titulo: "Gestión de categorías", descripcion: "Organiza las categorías de prendas y colores de Clossetly.", icono: "category", ruta: "/admin/categorias" },
];

export default function Admin() {
  return (
    <main className="Admin" aria-labelledby="Admin__titulo">
      <header className="Admin__bienvenida">
        <h1 id="Admin__titulo">¡Bienvenido al panel de administración!</h1>
        <p>Gestioná Clossetly y mantené organizada una comunidad donde la moda conecta.</p>
      </header>
      <section className="Admin__secciones" aria-label="Secciones de administración">
        {secciones.map((seccion) => (
          <Link className="Admin__tarjeta" to={seccion.ruta} key={seccion.titulo}>
            <span className="Admin__icono material-symbols-outlined" aria-hidden="true">{seccion.icono}</span>
            <span className="Admin__seccionTexto">
              <span className="Admin__seccionTitulo">{seccion.titulo}</span>
              <span className="Admin__seccionDescripcion">{seccion.descripcion}</span>
            </span>
          </Link>
        ))}
      </section>
    </main>
  );
}
