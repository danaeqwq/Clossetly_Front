import "./EditarPerfil.css";
import "../../../styles/global.css";
import "../../../styles/variables.css";
import Boton from "../../../componentes/Boton/Boton";
import LineaM from "../../../componentes/LineaM/LineaM";
import Avatar from "../../../assets/userfoto.jpg";

export default function EditarPerfil() {
  return (
    <main className="EditarPerfil">
      <section className="EditarPerfil__panel" aria-label="Editar perfil">
        <header className="EditarPerfil__cabecera">
          <div className="EditarPerfil__foto">
            <img src={Avatar} alt="Foto de perfil de Dany" />
            <span className="EditarPerfil__editarFoto material-symbols-outlined" aria-hidden="true">edit</span>
          </div>

          <div className="EditarPerfil__identidad">
            <h1>Dany</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <div className="EditarPerfil__estadisticas">
              <span><strong>10</strong> Publicaciones</span>
              <span><strong>5</strong> Ventas</span>
              <span><strong>8</strong> Intercambios</span>
            </div>
          </div>

          <div className="EditarPerfil__accionesCabecera">
            <Boton texto="Editar perfil" variante="principal" type="button" />
            <Boton texto="Editar mis estilos" variante="principal" type="button" />
          </div>
        </header>

        <div className="EditarPerfil__contenido">
          <section className="EditarPerfil__formulario" aria-labelledby="EditarPerfil__tituloDatos">
            <h2 id="EditarPerfil__tituloDatos">Datos personales</h2>

            <div className="EditarPerfil__campo">
              <label htmlFor="editar-perfil-usuario">User</label>
              <input id="editar-perfil-usuario" type="text" defaultValue="Dany" />
            </div>

            <div className="EditarPerfil__campo">
              <label htmlFor="editar-perfil-telefono">Teléfono</label>
              <input id="editar-perfil-telefono" type="tel" defaultValue="+54 9201 650809" />
            </div>

            <div className="EditarPerfil__campo EditarPerfil__campo--descripcion">
              <label htmlFor="editar-perfil-descripcion">Descripción</label>
              <textarea id="editar-perfil-descripcion" defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
            </div>
          </section>

          <div className="EditarPerfil__divisor" aria-hidden="true">
            <LineaM lado="izquierdo" />
          </div>

          <section className="EditarPerfil__preferencias" aria-label="Notificaciones y acciones de cuenta">
            <div className="EditarPerfil__notificaciones">
              <div className="EditarPerfil__notificacionesTitulo">
                <span className="material-symbols-outlined" aria-hidden="true">notifications_active</span>
                <h2>Notificaciones</h2>
                <span className="EditarPerfil__interruptor" aria-label="Notificaciones activadas" />
              </div>
              <p>Recibí avisos sobre compras, ventas, intercambios, consultas y novedades importantes.</p>
            </div>

            <div className="EditarPerfil__acciones">
              <Boton texto="Guardar cambios" variante="principal EditarPerfil__boton--guardar" type="button" />
              <Boton texto="Cerrar sesión" variante="principal EditarPerfil__boton--cerrarSesion" iconoGoogle="logout" type="button" />
              <Boton texto="Eliminar cuenta" variante="secundario EditarPerfil__boton--eliminar" iconoGoogle="delete_outline" type="button" />
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
