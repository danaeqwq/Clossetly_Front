import "./Usuario.css";
import Boton from "../Boton/Boton";
import Avatar from "../../assets/userfoto.jpg";
import ojo from "../../assets/ojo.svg";
import Bloqueo from "../../assets/Bloqueo.svg";
import Expulsar from "../../assets/Expulsar.svg";

export default function Usuario({
    usuario,
    onVer,
    onBloquear,
    onExpulsar
}) {

    const fotoPerfil = usuario.foto_perfil
        ? (usuario.foto_perfil.startsWith("http")
            ? usuario.foto_perfil
            : `http://localhost:3000/${usuario.foto_perfil.replace(/^\/+/, "")}`)
        : Avatar;

    return (
        <tr className="Usuario__fila">

            <td
                className="Usuario__celda Usuario__celda--identidad"
                data-label="Usuario"
            >
                <div className="Usuario__identidad">
                    <img
                        src={fotoPerfil}
                        alt=""
                        className="Usuario__avatar"
                        onError={(e) => {
                            e.currentTarget.src = Avatar;
                        }}
                    />

                    <span>{usuario.nombre}</span>
                </div>
            </td>

            <td
                className="Usuario__celda"
                data-label="Correo electrónico"
            >
                <span className="Usuario__correo">
                    {usuario.correo}
                </span>
            </td>

            <td
                className="Usuario__celda"
                data-label="Fecha de registro"
            >
                {usuario.fecha
                    ? new Date(usuario.fecha).toLocaleDateString("es-AR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        timeZone: "UTC"
                    })
                    : "Sin fecha"}
            </td>

            <td
                className="Usuario__celda Usuario__celda--acciones"
                data-label="Acciones"
            >
                <div className="Usuario__acciones">
                  <Boton
                      texto="Ver"
                      variante="Usuario__boton--ver"
                      icono={ojo}
                      type="button"
                      onClick={() => onVer()}
                  />

                  <Boton
                      texto="Bloquear"
                      variante="Usuario__boton--bloquear"
                      icono={Bloqueo}
                      type="button"
                      onClick={() => onBloquear()}
                  />

                  <Boton
                      texto="Expulsar"
                      variante="Usuario__boton--expulsar"
                      icono={Expulsar}
                      type="button"
                      onClick={() => onExpulsar()}
                  />
                </div>
            </td>

        </tr>
    );
}