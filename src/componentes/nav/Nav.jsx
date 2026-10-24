
import "./nav.css";

import iconTest from "../../assets/componentes/icon test.svg";
import iconBoutique from "../../assets/componentes/icon Boutique.svg";
import iconExplorar from "../../assets/componentes/icon Explorar.svg";
import iconMiArmario from "../../assets/componentes/icon mi armario.svg";
import iconMiCuenta from "../../assets/componentes/icon Mi cuenta.svg";

export default function Nav() {
  return (
    <nav className="Nav" aria-label="Navegación principal">
      <a
        className="Nav__enlace Nav__enlace--logo"
        href="#"
        aria-label="Inicio"
      >
        <svg viewBox="0 0 24 24">
          <rect x="4" y="4" width="16" height="16" rx="1" />
          <path d="m7 16 3.5-4 2.5 2.5 1.5-1.5 2.5 3z" />
          <circle cx="15.5" cy="8.5" r="1" />
        </svg>
      </a>

      <a
        className="Nav__enlace"
        href="#guia-estilo"
        aria-label="Guía de estilo"
        data-label="Guía de estilo"
      >
        <img src={iconTest} alt="" />
      </a>

      <a
        className="Nav__enlace"
        href="#boutique"
        aria-label="Boutique"
        data-label="Boutique"
      >
        <img src={iconBoutique} alt="" />
      </a>

      <a
        className="Nav__enlace"
        href="#explorar"
        aria-label="Explorar"
        data-label="Explorar"
      >
        <img src={iconExplorar} alt="" />
      </a>

      <a
        className="Nav__enlace"
        href="#mi-armario"
        aria-label="Mi armario"
        data-label="Mi armario"
      >
        <img src={iconMiArmario} alt="" />
      </a>

      <a
        className="Nav__enlace"
        href="#mi-cuenta"
        aria-label="Mi cuenta"
        data-label="Mi cuenta"
      >
        <img src={iconMiCuenta} alt="" />
      </a>
    </nav>
  );
}
