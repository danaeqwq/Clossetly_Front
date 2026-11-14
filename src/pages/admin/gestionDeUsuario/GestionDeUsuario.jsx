import "./GestionDeUsuario.css";
import "../../../styles/global.css";
import "../../../styles/variables.css";
import Usuario from "../../../componentes/Usuario/Usuario";
import VerUsuario from "./modales/verUsuario/VerUsuario";

const usuarios = [
  { id: 1, nombre: "User67", correo: "danaealcocer667@gmail.com", fecha: "14/06/2024" },
  { id: 2, nombre: "User67", correo: "danaealcocer667@gmail.com", fecha: "22/08/2024" },
  { id: 3, nombre: "User67", correo: "danaealcocer667@gmail.com", fecha: "03/11/2024" },
  { id: 4, nombre: "User67", correo: "danaealcocer667@gmail.com", fecha: "17/01/2025" },
  { id: 5, nombre: "User67", correo: "Ñdanaealcocer667@gmail.com", fecha: "06/03/2025" },
];

const resumen = [
  { titulo: "Total de usuarios", valor: "67.676", icono: "groups" },
  { titulo: "Usuarios bloqueados", valor: "67.676", icono: "block" },
  { titulo: "Usuarios expulsados", valor: "67.676", icono: "person_remove" },
];

export default function GestionDeUsuario() {
  return (
    <main className="GestionDeUsuario">
      <header className="GestionDeUsuario__encabezado">
        <h1>Gestión de usuarios</h1>
        <p>Administra las cuentas de la comunidad para mantener un entorno seguro.</p>
      </header>

      <section className="GestionDeUsuario__resumen" aria-label="Resumen de usuarios">
        {resumen.map((dato) => (
          <article className="GestionDeUsuario__indicador" key={dato.titulo}>
            <span className="GestionDeUsuario__indicadorIcono material-symbols-outlined" aria-hidden="true">
              {dato.icono}
            </span>
            <span className="GestionDeUsuario__indicadorTexto">
              <span>{dato.titulo}</span>
              <strong>{dato.valor}</strong>
            </span>
          </article>
        ))}
      </section>

      <div className="GestionDeUsuario__tablaContenedor">
        <table className="GestionDeUsuario__tabla">
          <thead>
            <tr>
              <th scope="col">Usuario</th>
              <th scope="col">Correo electrónico</th>
              <th scope="col">Fecha de registro</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <Usuario key={usuario.id} usuario={usuario} />
            ))}
          </tbody>
        </table>
      </div>

     <VerUsuario></VerUsuario>
    </main>
  );
}
