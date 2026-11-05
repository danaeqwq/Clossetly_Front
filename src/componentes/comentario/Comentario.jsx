import "./Comentario.css";
import AvatarDefault from "../../assets/userfoto.jpg";
import Puntos from "../../assets/puntos.svg";

export default function Comentario({
    usuario = "@UWU",
    tiempo = "Hace 67 min",
    texto = "Yo creo que con este outfit te quedarían muy bien. Tiene un estilo único.",
    avatar = AvatarDefault,
    imagen = "",
}) {
    return (
        <article className="Comentario">
            <header className="Comentario__encabezado">
                <img className="Comentario__avatar" src={avatar} alt="" />
                <div className="Comentario__autor">
                    <span className="Comentario__usuario">{usuario}</span>
                    <span className="Comentario__tiempo">{tiempo}</span>
                </div>
                <img className="Comentario__mas" src={Puntos} alt="" />
            </header>
            <p className="Comentario__texto">{texto}</p>
            {imagen && <img className="Comentario__imagen" src={imagen} alt="Imagen adjunta al comentario" />}
        </article>
    );
}
