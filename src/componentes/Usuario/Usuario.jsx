import "./Usuario.css";
import Boton from "../Boton/Boton";
import Avatar from "../../assets/userfoto.jpg";
import ojo from "../../assets/ojo.svg";
import Bloqueo from "../../assets/Bloqueo.svg";
import Expulsar from "../../assets/Expulsar.svg";

export default function Usuario({ usuario }) {
  return (
    <tr className="Usuario__fila">
      <td className="Usuario__celda Usuario__celda--identidad" data-label="Usuario">
        <div className="Usuario__identidad">
          <img src={Avatar} alt="" className="Usuario__avatar" />
          <span>{usuario.nombre}</span>
        </div>
      </td>
      <td className="Usuario__celda" data-label="Correo electrónico">
        <span className="Usuario__correo">{usuario.correo}</span>
      </td>
      <td className="Usuario__celda" data-label="Fecha de registro">{usuario.fecha}</td>
      <td className="Usuario__celda Usuario__celda--acciones" data-label="Acciones">
        <div className="Usuario__acciones">
          <Boton texto="Ver" variante="Usuario__boton--ver" icono={ojo} type="button" />
          <Boton texto="Bloquear" variante="Usuario__boton--bloquear" icono={Bloqueo} type="button" />
          <Boton texto="Expulsar" variante="Usuario__boton--expulsar" icono={Expulsar} type="button" />
        </div>
      </td>
    </tr>
  );
}
