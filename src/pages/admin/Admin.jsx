import "./Admin.css";
import "../../styles/variables.css";

const secciones = [
  { titulo: "Gestión de usuarios", descripcion: "Administra las cuentas y ayuda a mantener una comunidad segura.", icono: "manage_accounts" },
  { titulo: "Gestión de prendas y publicaciones", descripcion: "Revisa el contenido y asegúrate de que cumpla las normas.", icono: "edit_note" },
  { titulo: "Gestión de denuncias", descripcion: "Atiende los reportes y cuida la convivencia en la comunidad.", icono: "report" },
  { titulo: "Gestión de categorías", descripcion: "Organiza las categorías de prendas y colores de Clossetly.", icono: "category" },
];

export default function Admin() {
  return (
    <main className="Admin" aria-labelledby="Admin__titulo">
      <header className="Admin__bienvenida">
        <h1 id="Admin__titulo">¡Bienvenido al panel de administración!</h1>
        <p>Gestioná Clossetly y mantené organizada una comunidad donde la moda conecta.</p>
      </header>
      <section className="Admin__secciones" aria-label="Secciones de administración">
        {secciones.map((seccion) => {
          const contenido = (
            <>
              <span className="Admin__icono material-symbols-outlined" aria-hidden="true">{seccion.icono}</span>
              <span className="Admin__seccionTexto">
                <span className="Admin__seccionTitulo">{seccion.titulo}</span>
                <span className="Admin__seccionDescripcion">{seccion.descripcion}</span>
              </span>
            </>
          );
          return (
            <article className="Admin__tarjeta" key={seccion.titulo}>
              {contenido}
            </article>
          );
        })}
      </section>
    </main>
  );
}
