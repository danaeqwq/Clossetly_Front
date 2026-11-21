
import { NavLink } from "react-router";

import "./nav.css";
import "../../styles/global.css";

import iconTest from "../../assets/componentes/icon test.svg";
import iconBoutique from "../../assets/componentes/icon Boutique.svg";
import iconExplorar from "../../assets/componentes/icon Explorar.svg";
import iconMiArmario from "../../assets/componentes/icon mi armario.svg";
import iconMiCuenta from "../../assets/componentes/icon Mi cuenta.svg";

function NavAdmin() {
  return (
    <NavLink
      to="/admin"
      className={({ isActive }) =>
        `Nav__enlace Nav__enlace--admin ${isActive ? "Nav__enlace--activo" : ""}`
      }
      aria-label="Administración"
    >
      <span className="material-symbols-outlined" aria-hidden="true">
        admin_panel_settings
      </span>
      <span className="Nav__adminEtiqueta">Admin</span>
    </NavLink>
  );
}

export default function Nav() {
  let usuario = null;
  try {
    usuario = JSON.parse(localStorage.getItem("usuario") || "null");
  } catch {
    usuario = null;
  }
  const esAdmin = ["admin", "administrador"].includes(
    String(usuario?.rol || "").trim().toLowerCase()
  );

  return (
    <nav className="Nav" aria-label="Navegación principal">

      <NavLink
        to="/boutique"
        className="Nav__enlace Nav__enlace--logo"
        aria-label="Inicio"
      >
        <svg viewBox="0 0 24 24">
          <rect x="4" y="4" width="16" height="16" rx="1" />
          <path d="m7 16 3.5-4 2.5 2.5 1.5-1.5 2.5 3z" />
          <circle cx="15.5" cy="8.5" r="1" />
        </svg>
      </NavLink>

      <NavLink
        to="/guia-talle"
        className={({ isActive }) =>
          `Nav__enlace ${isActive ? "Nav__enlace--activo" : ""}`
        }
        aria-label="Guía de estilo"
        data-label="Guía de estilo"
      >
        <img src={iconTest} alt="" />
      </NavLink>

      <NavLink
        to="/boutique"
        className={({ isActive }) =>
          `Nav__enlace ${isActive ? "Nav__enlace--activo" : ""}`
        }
        aria-label="Boutique"
        data-label="Boutique"
      >
        <img src={iconBoutique} alt="" />
      </NavLink>

      <NavLink
        to="/explorar"
        className={({ isActive }) =>
          `Nav__enlace ${isActive ? "Nav__enlace--activo" : ""}`
        }
        aria-label="Explorar"
        data-label="Explorar"
      >
        <img src={iconExplorar} alt="" />
      </NavLink>

      <NavLink
        to="/armario"
        className={({ isActive }) =>
          `Nav__enlace ${isActive ? "Nav__enlace--activo" : ""}`
        }
        aria-label="Mi armario"
        data-label="Mi armario"
      >
        <img src={iconMiArmario} alt="" />
      </NavLink>

      <NavLink
        to="/mi-cuenta"
        className={({ isActive }) =>
          `Nav__enlace ${isActive ? "Nav__enlace--activo" : ""}`
        }
        aria-label="Mi cuenta"
        data-label="Mi cuenta"
      >
        <img src={iconMiCuenta} alt="" />
      </NavLink>

      {esAdmin && <NavAdmin />}

    </nav>
  );
}
