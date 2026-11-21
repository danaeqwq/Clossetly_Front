import "./BloquearUsuario.css";
import "../../../../../styles/global.css";
import "../../../../../styles/variables.css";
import Modal from "../../../../../componentes/modal/Modal";
import Boton from "../../../../../componentes/Boton/Boton";
import Avatar from "../../../../../assets/userfoto.jpg";

export default function BloquearUsuario() {
    return (
        <Modal
            titulo="Bloquear usuario"
            descripcion="Seleccioná por cuánto tiempo deseas bloquear a este usuario. Durante el período establecido, su acceso a la plataforma estará restringido hasta que finalice la sanción."
        >
            <div className="BloquearUsuario__contenido">
                <img className="BloquearUsuario__avatar" src={Avatar} alt="Foto de perfil de User67" />

                <section className="BloquearUsuario__detalle" aria-labelledby="BloquearUsuario__pregunta">
                    <h3 id="BloquearUsuario__pregunta">¿Por cuánto tiempo deseas bloquear a User67?</h3>
                    <p>
                        Durante este período, el usuario User67 no podrá interactuar con la plataforma.
                        <span> Aviso: podrás desbloquearlo antes de que finalice el período.</span>
                    </p>
                </section>

                <p className="BloquearUsuario__motivo">
                    <strong>Motivo del bloqueo:</strong> Lenguaje inapropiado en los comentarios.
                </p>

                <div className="BloquearUsuario__duraciones" aria-label="Duraciones de ejemplo">
                    <span className="BloquearUsuario__duracion"><i aria-hidden="true" />3 días</span>
                    <span className="BloquearUsuario__duracion BloquearUsuario__duracion--actual"><i aria-hidden="true" />7 días</span>
                    <span className="BloquearUsuario__duracion"><i aria-hidden="true" />14 días</span>
                    <span className="BloquearUsuario__duracion"><i aria-hidden="true" />30 días</span>
                </div>

                <div className="BloquearUsuario__acciones">
                    <Boton texto="Bloquear" variante="principal BloquearUsuario__confirmar" type="button" />
                    <Boton texto="Cancelar" variante="secundario BloquearUsuario__cancelar" type="button" />
                </div>
            </div>
        </Modal>
    );
}
