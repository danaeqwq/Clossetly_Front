
import { NavLink } from "react-router";

import "./nav.css";
import "../../styles/global.css";

import iconTest from "../../assets/componentes/icon test.svg";
import iconBoutique from "../../assets/componentes/icon Boutique.svg";
import iconExplorar from "../../assets/componentes/icon Explorar.svg";
import iconMiArmario from "../../assets/componentes/icon mi armario.svg";
import iconMiCuenta from "../../assets/componentes/icon Mi cuenta.svg";
import logo from "../../assets/logo nav.svg";

function NavAdmin() {
  return (
    <NavLink
      to="/admin"
      className={({ isActive }) =>
        `Nav__enlace Nav__enlace--admin ${isActive ? "Nav__enlace--activo" : ""}`
      }
      data-label="Administración"
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
    <nav className="Nav">

      <NavLink
        to="/boutique"
        className="Nav__enlace Nav__enlace--logo"
      >
        <img src={logo} alt="Clossetly" />
      </NavLink>

      <NavLink
        to="/guia-talle"
        className="Nav__enlace Nav__enlace--deshabilitado"
        data-label="Guía de estilo"
        onClick={(e) => e.preventDefault()}
        aria-disabled="true"
        tabIndex={-1}
    >
        <img src={iconTest} alt="" />
    </NavLink>

      <NavLink
        to="/boutique"
        className={({ isActive }) =>
          `Nav__enlace ${isActive ? "Nav__enlace--activo" : ""}`
        }
        data-label="Boutique"
      >
        <img src={iconBoutique} alt="" />
      </NavLink>

      <NavLink
        to="/explorar"
        className="Nav__enlace Nav__enlace--deshabilitado"
        data-label="Explorar"
        onClick={(e) => e.preventDefault()}
        aria-disabled="true"
        tabIndex={-1}
    >
        <img src={iconExplorar} alt="" />
    </NavLink>

      <NavLink
        to="/armario"
        className={({ isActive }) =>
          `Nav__enlace ${isActive ? "Nav__enlace--activo" : ""}`
        }
        data-label="Mi armario"
      >
        <img src={iconMiArmario} alt="" />
      </NavLink>

      <NavLink
        to="/mi-cuenta"
        className={({ isActive }) =>
          `Nav__enlace ${isActive ? "Nav__enlace--activo" : ""}`
        }
        data-label="Mi cuenta"
      >
        <img src={iconMiCuenta} alt="" />
      </NavLink>

      {esAdmin && <NavAdmin />}

    </nav>
  );
}
