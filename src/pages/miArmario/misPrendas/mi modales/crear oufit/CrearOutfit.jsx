import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../../../../../componentes/modal/Modal";
import "./crearOutfit.css";

const clavePrenda = (prenda) => prenda.claveArmario || prenda.id;

const prendasSinDuplicados = (lista = []) => (
  [...new Map(lista.map((prenda) => [clavePrenda(prenda), prenda])).values()]
);

const obtenerImagen = (imagen) => {
  if (!imagen) return "";
  if (imagen.startsWith("http")) return imagen;
  return `http://localhost:3000${imagen}`;
};

export default function CrearOutfit({
  prendas = [],
  outfit,
  onGuardar,
  onClose
}) {
  const [nombre, setNombre] = useState(outfit?.nombre || "");
  const [descripcion, setDescripcion] = useState(outfit?.descripcion || "");
  const [privacidad, setPrivacidad] = useState(outfit?.privacidad ?? true);

  const [temporada, setTemporada] = useState(outfit?.temporada || "");
  const [ocasion, setOcasion] = useState(outfit?.ocasion || "");
  const [genero, setGenero] = useState(outfit?.genero || "");

  const [temporadas, setTemporadas] = useState([]);
  const [ocasiones, setOcasiones] = useState([]);
  const [generos, setGeneros] = useState([]);

  const prendasOutfit = prendasSinDuplicados(
    outfit?.prendas ?? prendas
  );

  const [prendaPrincipalId, setPrendaPrincipalId] = useState(() => {
    const iniciales = prendasSinDuplicados(outfit?.prendas ?? prendas);
    return iniciales[0] ? clavePrenda(iniciales[0]) : null;
  });

  const prendaPrincipal = prendasOutfit.find(
    (prenda) => clavePrenda(prenda) === prendaPrincipalId
  ) || prendasOutfit[0];

  const miniaturas = prendasOutfit.filter(
    (prenda) => prenda !== prendaPrincipal
  );

  // Cargar opciones desde la base de datos
  useEffect(() => {
    const obtenerFiltros = async () => {
      const token = localStorage.getItem("token");

      try {
        const respuesta = await axios.get(
          "http://localhost:3000/api/filtros",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("FILTROS RECIBIDOS:", respuesta.data);

        setTemporadas(respuesta.data.temporadas || []);
        setOcasiones(respuesta.data.ocasiones || []);
        setGeneros(respuesta.data.generos || []);

      } catch (error) {
        console.error(
          "Error al cargar los filtros:",
          error.response?.data || error
        );
      }
    };

    obtenerFiltros();
  }, []);

  // Obtener el texto de cada opción
  const obtenerValorOpcion = (opcion, campo) => {
    if (typeof opcion !== "object" || opcion === null) {
      return opcion;
    }

    return (
      opcion[campo] ||
      opcion.ocacion ||
      opcion.temporada ||
      opcion.genero ||
      opcion.nombre ||
      opcion.valor ||
      ""
    );
  };

  // Guardar el outfit
  const guardar = () => {
    onGuardar?.({
      nombre,
      descripcion,
      privacidad,
      temporada,
      ocasion,
      genero,
      fotos: outfit?.fotos || [],
      prendas: prendasOutfit
    });
  };

  return (
    <Modal
      titulo={outfit ? "Modificar Outfit" : "Crear Outfit"}
      descripcion="Combiná tus prendas y creá tu look."
      confirmar={{ texto: "Guardar  →", onClick: guardar }}
      cancelar={{
        texto: "Salir sin guardar",
        icono: "logout",
        onClick: onClose
      }}
      onClose={onClose}
    >
      <div className="CrearOutfit">
        <div
          className="CrearOutfit__composicion"
          aria-label="Vista previa del outfit"
        >
          <div
            className="CrearOutfit__seleccionadas"
            aria-label="Prendas seleccionadas"
          >
            {prendaPrincipal && (
              <div className="CrearOutfit__prendaPrincipal">
                <img
                  src={obtenerImagen(prendaPrincipal.imagen)}
                  alt={
                    prendaPrincipal.alt ||
                    prendaPrincipal.nombre ||
                    "Prenda seleccionada"
                  }
                />
              </div>
            )}

            {miniaturas.length > 0 && (
              <div
                className="CrearOutfit__miniaturas"
                aria-label="Elegir prenda para vista previa"
              >
                {miniaturas.map((prenda, indice) => (
                  <button
                    className="CrearOutfit__miniatura"
                    type="button"
                    key={clavePrenda(prenda) ?? `${prenda.nombre}-${indice}`}
                    onClick={() => setPrendaPrincipalId(clavePrenda(prenda))}
                    aria-label={`Ver ${prenda.nombre || "prenda"}`}
                    aria-pressed={
                      clavePrenda(prenda) === clavePrenda(prendaPrincipal)
                    }
                  >
                    <img
                      src={obtenerImagen(prenda.imagen)}
                      alt={prenda.nombre || "Prenda del outfit"}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="CrearOutfit__formulario">
          <div className="CrearOutfit__campo">
            <label htmlFor="crear-outfit-nombre">Nombre</label>
            <input
              id="crear-outfit-nombre"
              value={nombre}
              maxLength={40}
              onChange={(evento) => setNombre(evento.target.value)}
              placeholder="Ej: outfit para salir"
            />
            <span className="CrearOutfit__contador">
              {nombre.length}/40
            </span>
          </div>

          <div className="CrearOutfit__campo">
            <label htmlFor="crear-outfit-descripcion">Descripción</label>
            <input
              id="crear-outfit-descripcion"
              value={descripcion}
              onChange={(evento) => setDescripcion(evento.target.value)}
              placeholder="Contá algo sobre el outfit..."
            />
          </div>

          <div className="CrearOutfit__privacidad">
            <span>Privacidad</span>

            <span className="CrearOutfit__publica">
              {privacidad ? "Pública" : "Privada"}
            </span>

            <button
              className={`CrearOutfit__switch${privacidad ? " CrearOutfit__switch--activa" : ""
                }`}
              type="button"
              aria-label="Cambiar privacidad"
              aria-pressed={privacidad}
              onClick={() => setPrivacidad((actual) => !actual)}
            >
              <span />
            </button>
          </div>

          <div className="CrearOutfit__etiquetas">
            {[
              {
                etiqueta: "Temporada",
                valor: temporada,
                cambiar: setTemporada,
                opciones: temporadas,
                campo: "temporada"
              },
              {
                etiqueta: "Ocasión",
                valor: ocasion,
                cambiar: setOcasion,
                opciones: ocasiones,
                campo: "ocasion"
              },
              {
                etiqueta: "Género",
                valor: genero,
                cambiar: setGenero,
                opciones: generos,
                campo: "genero"
              }
            ].map(({ etiqueta, valor, cambiar, opciones, campo }) => (
              <label
                className={`CrearOutfit__etiqueta${etiqueta === "Género"
                    ? " CrearOutfit__etiqueta--genero"
                    : ""
                  }`}
                key={etiqueta}
              >
                <span>{etiqueta}</span>

                <select
                  value={valor}
                  onChange={(evento) => cambiar(evento.target.value)}
                  aria-label={etiqueta}
                >
                  <option value="">
                    Seleccionar {etiqueta.toLowerCase()}
                  </option>

                  {opciones.map((opcion) => {
                    const valorOpcion = obtenerValorOpcion(opcion, campo);

                    if (!valorOpcion) return null;

                    return (
                      <option key={valorOpcion} value={valorOpcion}>
                        {valorOpcion}
                      </option>
                    );
                  })}
                </select>

                <b aria-hidden="true">{valor}</b>

                <i
                  className="material-symbols-outlined"
                  aria-hidden="true"
                >
                  keyboard_arrow_down
                </i>
              </label>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
