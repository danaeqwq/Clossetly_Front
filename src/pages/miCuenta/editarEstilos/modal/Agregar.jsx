import "./Agregar.css";
import "../../../../styles/global.css";
import "../../../../styles/variables.css";
import Modal from "../../../../componentes/modal/Modal";
import Boton from "../../../../componentes/Boton/Boton";

export default function Agregar() {
  return (
    <Modal titulo="Agregar estilos">
      <div className="Agregar__contenido">
        <div className="Agregar__busqueda" aria-label="Buscar estilo">
          <span>Buscar estilo...</span>
          <span className="material-symbols-outlined" aria-hidden="true">search</span>
        </div>

        <div className="Agregar__lista" aria-label="Estilos disponibles">
          <span className="Agregar__estilo Agregar__estilo--resaltado">Coquette</span>
          <span className="Agregar__estilo">Old Money</span>
          <span className="Agregar__estilo">Minimalista</span>
          <span className="Agregar__estilo Agregar__estilo--resaltado">Streetwear</span>
          <span className="Agregar__estilo">Vintage</span>
          <span className="Agregar__estilo Agregar__estilo--resaltado">Y2K</span>
          <span className="Agregar__estilo Agregar__estilo--resaltado">Clean Girl</span>
          <span className="Agregar__estilo">Boho</span>
          <span className="Agregar__estilo">Preppy</span>
          <span className="Agregar__estilo">Dark Academia</span>
          <span className="Agregar__estilo">Grunge</span>
          <span className="Agregar__estilo">Soft Grunge</span>
          <span className="Agregar__estilo">Kawaii</span>
          <span className="Agregar__estilo">Gyaru</span>
          <span className="Agregar__estilo">Romántico</span>
          <span className="Agregar__estilo">Clásico</span>
          <span className="Agregar__estilo">Casual</span>
          <span className="Agregar__estilo">Sporty</span>
          <span className="Agregar__estilo">Indie</span>
          <span className="Agregar__estilo">Retro</span>
          <span className="Agregar__estilo">Cottagecore</span>
          <span className="Agregar__estilo">Boho Chic</span>
          <span className="Agregar__estilo">Minimal Chic</span>
          <span className="Agregar__estilo">Preppy</span>
          <span className="Agregar__estilo">Dark Academia</span>
          <span className="Agregar__estilo">Streetwear</span>
          <span className="Agregar__estilo">Vintage</span>
          <span className="Agregar__estilo">Coquette</span>
          <span className="Agregar__estilo">Old Money</span>
          <span className="Agregar__estilo">Y2K</span>
          <span className="Agregar__estilo">Clean Girl</span>
          <span className="Agregar__estilo">Boho</span>
          <span className="Agregar__estilo">Grunge</span>
          <span className="Agregar__estilo">Soft Grunge</span>
          <span className="Agregar__estilo">Kawaii</span>
          <span className="Agregar__estilo">Gyaru</span>
          <span className="Agregar__estilo">Romántico</span>
          <span className="Agregar__estilo">Clásico</span>
          <span className="Agregar__estilo">Casual</span>
          <span className="Agregar__estilo">Sporty</span>
          <span className="Agregar__estilo">Indie</span>
          <span className="Agregar__estilo">Retro</span>
          <span className="Agregar__estilo">Cottagecore</span>
          <span className="Agregar__estilo">Boho Chic</span>
          <span className="Agregar__estilo">Minimal Chic</span>
        </div>

        <div className="Agregar__acciones">
          <Boton texto="Agregar estilos" variante="principal" type="button" />
        </div>
      </div>
    </Modal>
  );
}
