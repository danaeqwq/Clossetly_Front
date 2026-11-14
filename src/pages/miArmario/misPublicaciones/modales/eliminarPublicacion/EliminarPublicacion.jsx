import { useState } from "react";
import Alert from "../../../../../componentes/Alert/Alert";
import "./EliminarPublicacion.css";

export default function EliminarPublicacion({
  onConfirmar,
  onEliminarVenta,
  onEliminarIntercambio,
  onCancelar,
}) {
  const [abierto, setAbierto] = useState(true);

  const cancelar = () => {
    setAbierto(false);
    onCancelar?.();
  };

  const confirmar = (tipo) => {
    const accionEspecifica = tipo === "venta" ? onEliminarVenta : onEliminarIntercambio;
    if (accionEspecifica) accionEspecifica();
    else onConfirmar?.(tipo);
    setAbierto(false);
  };

  if (!abierto) return null;

  return (
    <div className="EliminarPublicacion">
      <Alert
        titulo={(
          <>
            <span className="material-symbols-outlined EliminarPublicacion__icono" aria-hidden="true">delete</span>
            Eliminar publicación
          </>
        )}
        mensaje="¿Estás segura de que querés eliminar esta publicación?"
        textoBoton=""
      />
      <div className="EliminarPublicacion__acciones" aria-label="Confirmar eliminación">
        <button className="EliminarPublicacion__boton EliminarPublicacion__boton--venta" type="button" onClick={() => confirmar("venta")}>
          Eliminar
        </button>
        <button className="EliminarPublicacion__boton EliminarPublicacion__boton--cancelar" type="button" onClick={cancelar}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
