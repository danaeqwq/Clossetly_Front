import { useState } from "react";
import "./PrendasArmario.css";
import TarjetaPrenda from "../../../componentes/tarjetaPrenda/TarjetaPrenda";
import Modal from "../../../componentes/modal/Modal";
import ropa from "../../../assets/Ropa__ejemplo.jpg";
import CrearOutfit from "./mi modales/crear oufit/CrearOutfit";
import CrearPrenda from "./mi modales/crear prenda/CrearPrenda";
import CrearPrenda2 from "./mi modales/crear prenda 2/CrearPrenda2";
import CrearPrenda3Venta from "./mi modales/crear prenda 3 venta/CrearPrenda3Venta";
import CrearPrenda3Intercambio from "./mi modales/crear prenda 3 intercambio/CrearPrenda3Intercambio";
import EliminarPrenda from "./mi modales/eliminarPrenda/EliminarPrenda";

const categorias = ["Remeras", "Pantalones", "Cortos", "Camperas", "Accesorios", "Zapatos"];

const prendasIniciales = [
  { id: 1, nombre: "Campera de jean", imagen: ropa, alt: "Campera de jean", categoria: "Camperas" },
  { id: 2, nombre: "Remera blanca", imagen: ropa, alt: "Remera blanca", categoria: "Remeras" },
  { id: 3, nombre: "Pantalón sastrero", imagen: ropa, alt: "Pantalón sastrero", categoria: "Pantalones" },
];

const borradorInicial = {
  tipoPublicacion: "prenda",
  nombre: "",
  descripcion: "",
  imagen: "",
  categoria: "Remeras",
  talle: "M",
  temporada: "PRIMAVERA",
  ocasion: "FORMAL",
  genero: "UNISEX",
  estado: "NUEVA CON ETIQUETA",
  privacidad: true,
  estilos: [],
  colores: [],
  precio: "",
  stock: "",
  tiposAceptados: [],
  estadoMinimo: "TODOS",
  talleBuscado: "M",
};

export default function PrendasArmario({ onPublicacionCreada }) {
  const [prendas, setPrendas] = useState(prendasIniciales);
  const [categoriasAbiertas, setCategoriasAbiertas] = useState(["Remeras"]);
  const [menuAbiertoId, setMenuAbiertoId] = useState(null);
  const [prendaEnEdicion, setPrendaEnEdicion] = useState(null);
  const [prendaAEliminar, setPrendaAEliminar] = useState(null);
  const [crearPrendaAbierto, setCrearPrendaAbierto] = useState(false);
  const [pasoCreacion, setPasoCreacion] = useState(1);
  const [borradorPrenda, setBorradorPrenda] = useState(borradorInicial);
  const [errorCreacion, setErrorCreacion] = useState("");
  const [crearOutfitAbierto, setCrearOutfitAbierto] = useState(false);

  const alternarCategoria = (nombre) => {
    setCategoriasAbiertas((actuales) => (
      actuales.includes(nombre)
        ? actuales.filter((categoria) => categoria !== nombre)
        : [...actuales, nombre]
    ));
  };

  const manejarAccionTarjeta = (evento, prenda) => {
    const botonOpciones = evento.target.closest(".TarjetaPrenda__opciones");
    if (botonOpciones) {
      setMenuAbiertoId((actual) => actual === prenda.id ? null : prenda.id);
      return;
    }

    const opcion = evento.target.closest(".TarjetaPrenda__menu li");
    if (!opcion) return;

    const icono = opcion.querySelector(".material-symbols-outlined")?.textContent.trim();
    setMenuAbiertoId(null);

    if (icono === "edit") {
      setPrendaEnEdicion({ ...prenda });
    } else if (icono === "checkroom") {
      setCrearOutfitAbierto(true);
    } else if (icono === "delete_outline") {
      setPrendaAEliminar(prenda);
    }
  };

  const actualizarCampoEdicion = (campo, valor) => {
    setPrendaEnEdicion((actual) => ({ ...actual, [campo]: valor }));
  };

  const guardarEdicion = () => {
    if (!prendaEnEdicion) return;
    setCategoriasAbiertas((actuales) => actuales.includes(prendaEnEdicion.categoria)
      ? actuales
      : [...actuales, prendaEnEdicion.categoria]);
    setPrendas((actuales) => actuales.map((prenda) => (
      prenda.id === prendaEnEdicion.id ? prendaEnEdicion : prenda
    )));
    setPrendaEnEdicion(null);
  };

  const cambiarDatoPrenda = (campo, valor) => {
    setBorradorPrenda((actual) => ({ ...actual, [campo]: valor }));
    setErrorCreacion("");
  };

  const abrirAltaPrenda = () => {
    setBorradorPrenda({ ...borradorInicial });
    setPasoCreacion(1);
    setCrearPrendaAbierto(true);
    setErrorCreacion("");
  };

  const cerrarAltaPrenda = () => {
    setCrearPrendaAbierto(false);
    setPasoCreacion(1);
    setBorradorPrenda({ ...borradorInicial });
    setErrorCreacion("");
  };

  const continuarDesdeDatos = () => {
    if (!borradorPrenda.nombre.trim() || !borradorPrenda.imagen) {
      setErrorCreacion("Ingresá un nombre y seleccioná una imagen para continuar.");
      return;
    }
    setErrorCreacion("");
    setPasoCreacion(2);
  };

  const continuarDesdeEstilos = () => {
    if (borradorPrenda.estilos.length === 0) {
      setErrorCreacion("Seleccioná al menos un estilo para continuar.");
      return;
    }
    setErrorCreacion("");
    if (borradorPrenda.tipoPublicacion === "prenda") guardarNuevaPrenda();
    else setPasoCreacion(3);
  };

  const guardarVenta = () => {
    if (Number(borradorPrenda.precio) <= 0 || Number(borradorPrenda.stock) <= 0) {
      setErrorCreacion("Ingresá un precio y una cantidad de stock mayores a cero.");
      return;
    }
    guardarNuevaPrenda({ tipoPublicacion: "venta" });
  };

  const guardarIntercambio = () => {
    if (Number(borradorPrenda.precio) <= 0 || Number(borradorPrenda.stock) <= 0 || borradorPrenda.tiposAceptados.length === 0) {
      setErrorCreacion("Completá precio, stock y al menos un tipo de prenda aceptado.");
      return;
    }
    guardarNuevaPrenda({ tipoPublicacion: "intercambio" });
  };

  const guardarNuevaPrenda = (datosAdicionales = {}) => {
    const prendaCompleta = { ...borradorPrenda, ...datosAdicionales };
    const id = prendas.reduce((mayor, prenda) => Math.max(mayor, prenda.id), 0) + 1;
    const nuevaPrenda = {
      ...prendaCompleta,
      id,
      nombre: prendaCompleta.nombre.trim() || "Prenda nueva",
      imagen: prendaCompleta.imagen || ropa,
      alt: prendaCompleta.nombre.trim() || "Prenda nueva",
    };
    setPrendas((actuales) => [
      ...actuales,
      nuevaPrenda,
    ]);
    setCategoriasAbiertas((actuales) => actuales.includes(nuevaPrenda.categoria)
      ? actuales
      : [...actuales, nuevaPrenda.categoria]);
    if (nuevaPrenda.tipoPublicacion === "venta" || nuevaPrenda.tipoPublicacion === "intercambio") {
      onPublicacionCreada?.(nuevaPrenda);
    }
    cerrarAltaPrenda();
  };

  const confirmarEliminacion = () => {
    if (!prendaAEliminar) return;
    setPrendas((actuales) => actuales.filter((prenda) => prenda.id !== prendaAEliminar.id));
    setPrendaAEliminar(null);
  };

  return (
    <>
      <div className="MiArmario__barraAcciones">
        <button className="MiArmario__crearPrenda" type="button" onClick={abrirAltaPrenda}>
          + Agregar prendas
        </button>
      </div>

      <div className="MiArmario__otrasSecciones" aria-label="Categorías de prendas">
        {categorias.map((categoria) => {
          const prendasDeCategoria = prendas.filter((prenda) => prenda.categoria === categoria);
          const abierta = categoriasAbiertas.includes(categoria);

          return (
            <section
              className={abierta ? "MiArmario__seccion" : "MiArmario__seccionCerrada"}
              aria-label={categoria}
              key={categoria}
            >
              <div className={abierta ? "MiArmario__seccionEncabezado" : "MiArmario__seccionCerradaEncabezado"}>
                <h2>{categoria}</h2>
                <span>{prendasDeCategoria.length} {categoria === "Accesorios" ? "Accesorios" : "Prendas"}</span>
                <button
                  className="MiArmario__seccionFlecha"
                  type="button"
                  aria-label={`${abierta ? "Contraer" : "Expandir"} ${categoria}`}
                  aria-expanded={abierta}
                  onClick={() => alternarCategoria(categoria)}
                >
                  <span className="material-symbols-outlined" aria-hidden="true">
                    {abierta ? "keyboard_arrow_up" : "keyboard_arrow_down"}
                  </span>
                </button>
              </div>

              {abierta && (
                <div className="MiArmario__seccionContenido">
                  <div className="MiArmario__grilla">
                    {prendasDeCategoria.map((prenda) => (
                      <div
                        className="MiArmario__tarjetaPrenda"
                        key={prenda.id}
                        onClick={(evento) => manejarAccionTarjeta(evento, prenda)}
                      >
                        <TarjetaPrenda
                          prenda={prenda}
                          mostrarOpciones
                          seleccionada={false}
                          menuAbierto={menuAbiertoId === prenda.id}
                          clickable={false}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          );
        })}
      </div>

      {crearPrendaAbierto && (
        pasoCreacion === 1 ? (
          <CrearPrenda
            datos={borradorPrenda}
            onCambiar={cambiarDatoPrenda}
            mensajeError={errorCreacion}
            onContinuar={continuarDesdeDatos}
            onClose={cerrarAltaPrenda}
          />
        ) : pasoCreacion === 2 ? (
          <CrearPrenda2
            datos={borradorPrenda}
            onCambiar={cambiarDatoPrenda}
            mensajeError={errorCreacion}
            onVolver={() => { setErrorCreacion(""); setPasoCreacion(1); }}
            onSiguiente={continuarDesdeEstilos}
            onClose={cerrarAltaPrenda}
          />
        ) : borradorPrenda.tipoPublicacion === "venta" ? (
          <CrearPrenda3Venta
            datos={borradorPrenda}
            onCambiar={cambiarDatoPrenda}
            mensajeError={errorCreacion}
            onVolver={() => { setErrorCreacion(""); setPasoCreacion(2); }}
            onGuardar={guardarVenta}
            onClose={cerrarAltaPrenda}
          />
        ) : (
          <CrearPrenda3Intercambio
            datos={borradorPrenda}
            onCambiar={cambiarDatoPrenda}
            mensajeError={errorCreacion}
            onVolver={() => { setErrorCreacion(""); setPasoCreacion(2); }}
            onGuardar={guardarIntercambio}
            onClose={cerrarAltaPrenda}
          />
        )
      )}
      {crearOutfitAbierto && <CrearOutfit onClose={() => setCrearOutfitAbierto(false)} />}
      {prendaAEliminar && (
        <EliminarPrenda
          onConfirmar={confirmarEliminacion}
          onCancelar={() => setPrendaAEliminar(null)}
        />
      )}
      {prendaEnEdicion && (
        <Modal
          titulo="Modificar prenda"
          descripcion="Actualizá los datos de la prenda seleccionada."
          confirmar={{ texto: "Guardar cambios", onClick: guardarEdicion }}
          cancelar={{ texto: "Cancelar", onClick: () => setPrendaEnEdicion(null) }}
          onClose={() => setPrendaEnEdicion(null)}
        >
          <div className="MiArmario__editarPrenda">
            <label>
              Nombre
              <input
                type="text"
                value={prendaEnEdicion.nombre}
                onChange={(evento) => actualizarCampoEdicion("nombre", evento.target.value)}
              />
            </label>
            <label>
              Categoría
              <select
                value={prendaEnEdicion.categoria}
                onChange={(evento) => actualizarCampoEdicion("categoria", evento.target.value)}
              >
                {categorias.map((categoria) => <option key={categoria}>{categoria}</option>)}
              </select>
            </label>
          </div>
        </Modal>
      )}
    </>
  );
}
