import "./LineaM.css"
import Mariposa from "../../assets/Mariposa.svg"

export default function LineaM({ lado }) {
  return (
    <div className={`LineaM LineaM--${lado}`} aria-hidden="true">
      <img className="LineaM__mariposa" src={Mariposa} alt="" />
      <img className="LineaM__mariposa" src={Mariposa} alt="" />
    </div>
  )
}
