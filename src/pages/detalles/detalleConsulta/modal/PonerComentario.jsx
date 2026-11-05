import "./PonerComentario.css";
import "../../../../styles/variables.css";
import "../../../../styles/global.css";
import Modal from "../../../../componentes/modal/Modal";
import Boton from "../../../../componentes/Boton/Boton";

export default function PonerComentario() {
    return (
        <Modal
            titulo="Responder consulta"
            descripcion="Compartí tu idea de combinación con la comunidad. Podés subir hasta 3 fotos y agregar un comentario."
        >
            <div className="PonerComentario">
                <div className="PonerComentario__contenido">
                    <div className="PonerComentario__foto" aria-label="Agregar foto">
                        <span className="material-symbols-outlined" aria-hidden="true">photo_camera</span>
                        <span>Agregar foto</span>
                    </div>

                    <div className="PonerComentario__campo">
                        <label htmlFor="poner-comentario">Tu comentario</label>
                        <textarea id="poner-comentario" placeholder="Escribí tu recomendación..." />
                    </div>
                </div>

                <div className="PonerComentario__acciones">
                    <Boton texto="Enviar" variante="principal" type="button" />
                    <Boton texto="Salir sin guardar" variante="secundario" iconoGoogle="logout" type="button" />
                </div>
            </div>
        </Modal>
    );
}
