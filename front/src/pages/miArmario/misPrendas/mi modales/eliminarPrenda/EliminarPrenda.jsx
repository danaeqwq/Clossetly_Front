import Alert from "../../../../../componentes/Alert/Alert";
import "./EliminarPrenda.css";

export default function EliminarPrenda({ onConfirmar, onCancelar }) {
  const cancelar = () => onCancelar?.();
  const confirmar = () => onConfirmar?.();

  return (
    <div className="EliminarPublicacion">
      <Alert
        titulo={(
          <>
            <span className="material-symbols-outlined EliminarPublicacion__icono" aria-hidden="true">delete</span>
            Eliminar prenda
          </>
        )}
        mensaje="¿Estás segura de que querés eliminar esta prenda?"
        textoBoton=""
      />
      <div className="EliminarPublicacion__acciones" aria-label="Confirmar eliminación">
        <button className="EliminarPublicacion__boton EliminarPublicacion__boton--venta" type="button" onClick={confirmar}>
          Eliminar
        </button>
        <button className="EliminarPublicacion__boton EliminarPublicacion__boton--cancelar" type="button" onClick={cancelar}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
