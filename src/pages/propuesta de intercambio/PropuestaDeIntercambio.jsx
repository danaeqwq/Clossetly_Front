import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";

import "../../styles/variables.css";
import "./propuestaDeIntercambio.css";
import TarjetaPrenda from "../../componentes/tarjetaPrenda/TarjetaPrenda";

export default function PropuestaDeIntercambio() {
  const location = useLocation();
  const navigate = useNavigate();
  const producto = location.state?.producto;

  const [prendasDisponibles, setPrendasDisponibles] = useState([]);
  const [prendaEnVista, setPrendaEnVista] = useState(null);
  const [prendaSeleccionada, setPrendaSeleccionada] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");
  const [propuestaEnviada, setPropuestaEnviada] = useState(false);

  useEffect(() => {
    if (!producto?.id) {
      setError("No se encontró la publicación de intercambio.");
      setCargando(false);
      return;
    }

    const token = localStorage.getItem("token");
    axios.get(
      `http://localhost:3000/api/prendas/disponibles-intercambio?publicacion=${producto.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((respuesta) => {
        setPrendasDisponibles(respuesta.data.prendas || []);
      })
      .catch((error) => {
        console.error("Error al cargar las prendas:", error);

        setError(
          error.response?.data?.mensaje ||
          "No se pudieron cargar tus prendas."
        );
      })
      .finally(() => {
        setCargando(false);
      });
  }, [producto?.id]);

  const seleccionarPrenda = () => {
    setPrendaSeleccionada(prendaEnVista);
    setPrendaEnVista(null);
    setError("");
  };

  const confirmarPropuesta = () => {
    if (!producto?.id || !prendaSeleccionada?.id) {
      setError("Faltan datos para enviar la propuesta.");
      return;
    }
    const token = localStorage.getItem("token");
    setEnviando(true);
    setError("");

    axios.post(
      "http://localhost:3000/api/propuestas",
      {
        publicacion_intercambio: producto.id,
        prenda_ofrecida: prendaSeleccionada.id,
        mensaje: "",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(() => {
        setPropuestaEnviada(true);
      })
      .catch((error) => {
        console.error("Error al enviar la propuesta:", error);
        setError(
          error.response?.data?.mensaje ||
          "No se pudo enviar la propuesta. Intentá nuevamente."
        );
      })
      .finally(() => {
        setEnviando(false);
      });
  };

  const cancelarPropuesta = () => {
    navigate(-1);
  };

  return (
    <main className="Propuesta">
      <section
        className="Propuesta__intercambio"
        aria-label="Tu propuesta de intercambio"
      >
        <div className="Propuesta__seleccion">
          <div className="Propuesta__usuario">
            <span className="Propuesta__avatar">
              {producto?.fotoPerfil && (
                <img
                  src={`http://localhost:3000${producto.fotoPerfil}`}
                  alt=""
                />
              )}
            </span>

            <span>{producto?.usuario || "Usuario"}</span>
          </div>

          <div className="Propuesta__items">
            <TarjetaPrenda
              prenda={{
                nombre: producto?.nombre || "Prenda publicada",
                imagen: producto?.imagen || "",
                alt: producto?.nombre || "Prenda publicada",
              }}
              clickable={false}
            />

            <span
              className={`Propuesta__cambiar material-symbols-outlined ${
                enviando ? "Propuesta__cambiar--girando" : ""
              }`}
              aria-label="Intercambiar prendas"
            >
              autorenew
            </span>

            {prendaSeleccionada ? (
              <TarjetaPrenda
                prenda={prendaSeleccionada}
                clickable={false}
              />
            ) : (
              <button
                className="Propuesta__agregar"
                type="button"
                onClick={() =>
                  document
                    .querySelector(".Propuesta__disponibles")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <span className="material-symbols-outlined">add</span>
                <span>Elegir una prenda</span>
              </button>
            )}
          </div>

          <div className="Propuesta__acciones">
            <button
              className="Propuesta__confirmar"
              type="button"
              onClick={confirmarPropuesta}
              disabled={
                !prendaSeleccionada ||
                enviando ||
                propuestaEnviada
              }
            >
              {enviando
                ? "Enviando propuesta..."
                : propuestaEnviada
                  ? "Propuesta enviada"
                  : "Confirmar propuesta de intercambio"}

              <span className="material-symbols-outlined">
                check_circle
              </span>
            </button>

            <button
              className="Propuesta__cancelar"
              type="button"
              onClick={cancelarPropuesta}
              disabled={enviando}
            >
              Cancelar propuesta

              <span className="material-symbols-outlined">
                delete_outline
              </span>
            </button>

            {error && (
              <p role="alert">
                {error}
              </p>
            )}
          </div>
        </div>

        <section
          className="Propuesta__disponibles"
          aria-labelledby="Propuesta__titulo"
        >
          <header className="Propuesta__encabezado">
            <h1 id="Propuesta__titulo">
              Prendas compatibles para intercambiar
            </h1>

            <p>
              <span className="material-symbols-outlined">checkroom</span>
              {prendasDisponibles.length}{" "}
              {prendasDisponibles.length === 1 ? "prenda" : "prendas"}
            </p>
          </header>

          <div className="Propuesta__lista">
            {cargando ? (
              <p>Cargando tus prendas...</p>
            ) : error && prendasDisponibles.length === 0 ? (
              <p>{error}</p>
            ) : prendasDisponibles.length === 0 ? (
              <p>
                No tenés prendas compatibles con el talle, estado y
                categorías aceptadas para este intercambio.
              </p>
            ) : (
              prendasDisponibles.map((prenda) => (
                <div
                  className={`Propuesta__prenda ${
                    prendaEnVista?.id === prenda.id
                      ? "Propuesta__prenda--activa"
                      : ""
                  }`}
                  key={prenda.id}
                  onClick={() => setPrendaEnVista(prenda)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setPrendaEnVista(prenda);
                    }
                  }}
                >
                  <TarjetaPrenda
                    prenda={prenda}
                    clickable={false}
                    seleccionada={
                      prendaSeleccionada?.id === prenda.id
                    }
                  />

                  {prendaEnVista?.id === prenda.id && (
                    <button
                      className="Propuesta__seleccionar"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        seleccionarPrenda();
                      }}
                    >
                      <span className="material-symbols-outlined">
                        check
                      </span>

                      <span>Seleccionar prenda</span>
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </section>
      </section>
    </main>
  );
}