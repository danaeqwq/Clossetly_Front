const db = require("../config/db");

const obtenerPublicaciones = async () => {
    const consulta = `
        SELECT
            pub.ID AS id,
            pub.Tipo AS tipo,
            pub.Precio AS precio,
            pub.Talle_buscado AS talleBuscado,

            pr.ID AS prenda_id,
            pr.Nombre AS nombre,
            pr.Talla AS talle,
            pr.Estado AS estado,
            pr.Stock AS stock,
            pr.Ocasión AS ocasion,

            u.ID AS usuario_id,
            u.Nombre AS usuario,

            g.Genero AS genero,
            c.Categoria AS categoria,
            col.Color AS color,
            t.Temporada AS temporada,

            e.Estado AS estadoNombre,

            (
                SELECT pi.Imagen
                FROM Prenda_Img pi
                WHERE pi.Id_prenda = pr.ID
                ORDER BY pi.ID ASC
                LIMIT 1
            ) AS imagen,

            (
                SELECT GROUP_CONCAT(DISTINCT es.Estilos)
                FROM Prenda_Estilo pe
                INNER JOIN Estilo es
                    ON es.ID = pe.ID_estilo
                WHERE pe.ID_prenda = pr.ID
            ) AS estilos,

            (
                SELECT GROUP_CONCAT(DISTINCT ta.tiposAceptamos)
                FROM Publicación_tiposA pta
                INNER JOIN TiposAceptamos ta
                    ON ta.ID = pta.Id_tipoA
                WHERE pta.Id_publicación = pub.ID
            ) AS tiposAceptados

        FROM Publicación pub

        INNER JOIN Prenda pr
            ON pr.ID = pub.ID_prenda

        INNER JOIN Usuario u
            ON u.ID = pub.ID_usuario

        LEFT JOIN Géneros g
            ON g.ID = pr.ID_genero

        LEFT JOIN Categorías c
            ON c.ID = pr.ID_categoria

        LEFT JOIN Color col
            ON col.ID = pr.ID_color

        LEFT JOIN Temporadas t
            ON t.ID = pr.ID_temporada

        LEFT JOIN Estado e
            ON e.ID = pr.ID_estado

        ORDER BY pub.ID DESC;
    `;

    const [publicaciones] = await db.query(consulta);
    return publicaciones;
};

module.exports = {
    obtenerPublicaciones
};