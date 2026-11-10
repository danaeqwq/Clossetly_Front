
const { obtenerPublicaciones: obtenerPublicacionesModel } =
    require("../model/boutiqueModel");

const obtenerPublicaciones = (req, res) => {
    obtenerPublicacionesModel()
        .then((publicaciones) => {
            if (publicaciones.length === 0) {
                return res.status(404).json({
                    mensaje: "No hay publicaciones disponibles"
                });
            }
            res.status(200).json({
                mensaje: "Publicaciones obtenidas correctamente",
                total: publicaciones.length,
                publicaciones: publicaciones
            });

        })
        .catch((error) => {
            console.error("Error al obtener publicaciones:", error);
            res.status(500).json({
                mensaje: "Error al obtener las publicaciones"
            });
        });

};

module.exports = {
    obtenerPublicaciones
};
