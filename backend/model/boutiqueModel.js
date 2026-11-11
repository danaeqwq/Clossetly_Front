const db = require("../config/db");

const obtenerPublicaciones = () => {

    const consulta = `
        SELECT
            pub.\`id_publicación\` AS id,
            pub.tipo AS tipo,
            pub.precio AS precio,
            pub.talle_buscado AS talleBuscado,
            pub.estadoMA AS estadoMinimoAceptado,

            (
                SELECT JSON_ARRAYAGG(ca_categoria.categoria)
                FROM categorias_aceptadas ca
                INNER JOIN categoria ca_categoria
                    ON ca.categoria_id = ca_categoria.id_categoria
                WHERE ca.id_publicacion = pub.\`id_publicación\`
            ) AS tiposAceptados,

            pr.id_prenda AS idPrenda,
            pr.nombre AS nombre,
            pr.talla AS talle,
            pr.estado AS estado,
            pr.stock AS stock,
            pr.privacidad AS privacidad,
            pr.imagen AS imagen,

            u.Id_usuario AS idUsuario,
            u.nombre AS usuario,

            g.genero AS genero,
            c.categoria AS categoria,
            col.color AS color,
            col.codigo AS codigoColor,
            t.temporada AS temporada,
            pr.ocacion AS ocasion,

            (
                SELECT JSON_ARRAYAGG(LOWER(e.estilo))
                FROM prenda_estilo pe
                INNER JOIN estilo e ON pe.id_estilo = e.id_estilo
                WHERE pe.id_prenda = pr.id_prenda
            ) AS estilo

        FROM \`publicación\` pub

        INNER JOIN prenda pr
            ON pub.id_prenda = pr.id_prenda

        INNER JOIN usuario u
            ON pub.id_usuario = u.Id_usuario

        LEFT JOIN genero g
            ON pr.id_genero = g.id

        LEFT JOIN categoria c
            ON pr.id_categoria = c.id_categoria

        LEFT JOIN color col
            ON pr.id_color = col.id_color

        LEFT JOIN temporada t
            ON pr.id_temporada = t.Id

        ORDER BY pub.\`id_publicación\` DESC;
    `;

    return new Promise((resolve, reject) => {
        db.query(consulta, (error, publicaciones) => {

            if (error) {
                return reject(error);
            }

            resolve(publicaciones);
        });
    });
};

module.exports = {
    obtenerPublicaciones
};