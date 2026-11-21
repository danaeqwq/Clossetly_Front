import "./tarjetaConsejo.css";
export default function TarjetaConsejo() {
  return <article className="TarjetaConsejo">
    <span className="TarjetaConsejo__tipo"><span className="material-symbols-outlined">forum</span> CONSEJO</span>
    <img className="TarjetaConsejo__imagen" src="https://images.unsplash.com/photo-1548126032-079a0fb0099d?auto=format&fit=crop&w=600&q=85" alt="Consulta de moda" />
    <div className="TarjetaConsejo__pie"><p>¿Qué calzado va mejor en este sweater?</p>
      <div className="TarjetaConsejo__usuario">
        <span className="TarjetaConsejo__avatar">✿</span><span>@euse67</span>
        <span className="TarjetaConsejo__comentarios">
          <span className="material-symbols-outlined">chat_bubble_outline</span> 
        67</span>
      </div>
    </div>
  </article>;
}
