const db = require("../config/db");

const obtenerPublicaciones = () => {

    const consulta = `
        SELECT
            pub.ID AS id,
            pub.Tipo AS tipo,
            pub.Precio AS precio,
            pub.Talle_buscado AS talleBuscado,

            pr.Nombre AS nombre,
            pr.Talla AS talle,
            pr.Estado AS estado,
            pr.Stock AS stock,

            u.Nombre AS usuario,

            g.Genero AS genero,
            c.Categoria AS categoria,
            col.Color AS color,
            t.Temporada AS temporada

        FROM Publicación pub

        INNER JOIN Prenda pr
            ON pub.ID_prenda = pr.ID

        INNER JOIN Usuario u
            ON pub.ID_usuario = u.ID

        LEFT JOIN Géneros g
            ON pr.ID_genero = g.ID

        LEFT JOIN Categorías c
            ON pr.ID_categoria = c.ID

        LEFT JOIN Color col
            ON pr.ID_color = col.ID

        LEFT JOIN Temporadas t
            ON pr.ID_temporada = t.ID

        ORDER BY pub.ID DESC;
    `;

    return db.query(consulta)
        .then(([publicaciones]) => {
            return publicaciones;
        });
};

module.exports = {
    obtenerPublicaciones
};