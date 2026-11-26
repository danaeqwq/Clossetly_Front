import { useEffect,  useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "./GestionPublicaciones.css";
import "../../../styles/variables.css";
import "../../../styles/global.css";
import Select from "../../../componentes/select/Select";
import TarjetaIntercambio from "../../../componentes/tarjetaIntercambio/TarjetaIntercambio";
import TarjetaVenta from "../../../componentes/tarjetaVenta/TarjetaVenta";
import Alert from "../../../componentes/Alert/Alert";

const filtros = [
  { valor: "todos", texto: "TODOS", icono: "space_dashboard" },
  { valor: "compra", texto: "COMPRA", icono: "shopping_basket" },
  { valor: "intercambio", texto: "INTERCAMBIO", icono: "autorenew" },
];

function TarjetaPublicacion({
  publicacion,
  menuAbierto,
  onAbrirMenu,
  onEliminar,
  navigate,
}) {
  const color = publicacion.codigoColor || "#A87975";

  const colorTexto =
    publicacion.color?.toLowerCase() === "blanco"
      ? "#332D37"
      : "#FFFFFF";

  const colorAccion =
    colorTexto === "#332D37"
      ? "#332D37"
      : color;

  return (
    <div
      className="GestionPublicaciones__tarjeta"
      style={{
        "--tarjeta-color": color,
        "--tarjeta-texto": colorTexto,
      }}
    >
      {publicacion.tipo === "intercambio" ? (
        <TarjetaIntercambio
          producto={publicacion}
          color={color}
          colorTexto={colorTexto}
          colorAccion={colorAccion}
          onClick={() => navigate(`/detalles/intercambio/${publicacion.id}`)}
        />
      ) : (
        <TarjetaVenta
          producto={publicacion}
          color={color}
          colorTexto={colorTexto}
          colorAccion={colorAccion}
          onClick={() => navigate(`/detalles/venta/${publicacion.id}`)}
        />
      )}

      <span
        className="TarjetaPrenda__opciones"
        role="button"
        tabIndex={0}
        aria-label="Opciones de moderación"
        aria-expanded={menuAbierto}
        onClick={onAbrirMenu}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onAbrirMenu();
          }
        }}
      >
        ⋯
      </span>

      {menuAbierto && (
        <ul
          className="TarjetaPrenda__menu"
          aria-label="Opciones de moderación"
        >
          <li onClick={onEliminar}>
            <span className="material-symbols-outlined" aria-hidden="true">
              delete
            </span>
            Eliminar
          </li>
        </ul>
      )}
    </div>
  );
}

export default function GestionPublicaciones() {
  const navigate = useNavigate();

  const [publicaciones, setPublicaciones] = useState([]);
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const [menuAbierto, setMenuAbierto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [publicacionSeleccionada, setPublicacionSeleccionada] = useState(null);
  const [motivo, setMotivo] = useState("");
  const [errorMotivo, setErrorMotivo] = useState("");
  const [eliminando, setEliminando] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
  setError("");

  axios.get(
    "http://localhost:3000/api/admin/publicaciones",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((respuesta) => {
      setPublicaciones(respuesta.data.publicaciones || []);
    })
    .catch((error) => {
      console.error("Error al obtener publicaciones:", error);
      setError("No se pudieron cargar las publicaciones.");
    })
    .finally(() => {
      setCargando(false);
    });

  }, []);

  const buscar = (evento) => {
    evento.preventDefault();
  };

 const publicacionesFiltradas = publicaciones.filter((publicacion) => {
  const coincideTipo =
    filtroTipo === "todos" ||
    publicacion.tipo === filtroTipo;

  const texto = busqueda.trim().toLowerCase();

  const coincideBusqueda =
    (publicacion.nombre || "").toLowerCase().includes(texto) ||
    (publicacion.usuario || "").toLowerCase().includes(texto);

  return coincideTipo && coincideBusqueda;
});

  const eliminarPublicacion = (publicacion) => {
    setMenuAbierto(null);
    setPublicacionSeleccionada(publicacion);
    setMotivo("");
    setErrorMotivo("");
  };

  const cerrarAlert = () => {
    if (eliminando) return;
    setPublicacionSeleccionada(null);
    setMotivo("");
    setErrorMotivo("");
  };

  const confirmarEliminacion = () => {
    if (!motivo.trim()) {
      setErrorMotivo("Tenés que indicar el motivo de eliminación.");
      return;
    }
    if (!publicacionSeleccionada) return;
    setEliminando(true);
    setErrorMotivo("");
    axios.delete(
      `http://localhost:3000/api/admin/publicaciones/${publicacionSeleccionada.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          tipo: publicacionSeleccionada.tipo,
          motivo: motivo.trim(),
        },
      }
    )
      .then(() => {
        setPublicaciones((actuales) =>
          actuales.filter(
            (publicacion) =>
              !(
                publicacion.id === publicacionSeleccionada.id &&
                publicacion.tipo === publicacionSeleccionada.tipo
              )
          )
        );
        setPublicacionSeleccionada(null);
        setMotivo("");
      })
      .catch((error) => {
        console.error("Error al eliminar publicación:", error);
        setErrorMotivo(
          error.response?.data?.mensaje ||
          "No se pudo eliminar la publicación. Intentá nuevamente."
        );
      })
      .finally(() => {
        setEliminando(false);
      });
  };
  return (
    <main
      className="GestionPublicaciones"
      aria-labelledby="GestionPublicaciones__titulo"
    >
      <header className="GestionPublicaciones__encabezado">
        <h1 id="GestionPublicaciones__titulo">
          Gestión de prendas y publicaciones
        </h1>

        <p>
          Revisá y moderá las prendas y publicaciones de la comunidad
          para garantizar un espacio seguro y respetuoso.
        </p>
      </header>

      <div className="GestionPublicaciones__herramientas">
        <form
          className="GestionPublicaciones__buscador"
          onSubmit={buscar}
        >
          <input
            type="search"
            placeholder="Buscar por nombre o usuario..."
            value={busqueda}
            onChange={(evento) => setBusqueda(evento.target.value)}
          />

          <button
            type="submit"
            className="GestionPublicaciones__buscadorIcono material-symbols-outlined"
            aria-label="Buscar"
          >
            search
          </button>
        </form>
      </div>

      <Select
        opciones={filtros}
        seleccionada={filtroTipo}
        onChange={setFiltroTipo}
        ariaLabel="Categorías de publicaciones"
        className="GestionPublicaciones__select"
      />

      {cargando ? (
        <p>Cargando publicaciones...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <section
          className="GestionPublicaciones__grilla"
          aria-label="Publicaciones de la comunidad"
        >
          {publicacionesFiltradas.length > 0 ? (
            publicacionesFiltradas.map((publicacion) => {
              const clave = `${publicacion.tipo}-${publicacion.id}`;

              return (
                <TarjetaPublicacion
                  key={clave}
                  publicacion={publicacion}
                  menuAbierto={menuAbierto === clave}
                  onAbrirMenu={() =>
                    setMenuAbierto((actual) =>
                      actual === clave ? null : clave
                    )
                  }
                  onEliminar={() => eliminarPublicacion(publicacion)}
                  navigate={navigate}
                />
              );
            })
          ) : (
            <p>No se encontraron publicaciones.</p>
          )}
        </section>
      )}

      {publicacionSeleccionada && (
        <Alert
          titulo="Eliminar publicación"
          icono="delete"
          tipoIcono="google"
          mensaje={
            errorMotivo ||
            "Esta publicación dejará de estar disponible para la comunidad. Para continuar, indicá el motivo de eliminación."
          }
          tipoInput="text"
          valorInput={motivo}
          onChangeInput={(e) => {
            setMotivo(e.target.value);
            setErrorMotivo("");
          }}
          placeholderInput="¿Por qué se elimina esta publicación?"
          textoBoton="Eliminar publicación"
          onClick={confirmarEliminacion}
          onClickSecundario={cerrarAlert}
        />
      )}
    </main>
  );
}