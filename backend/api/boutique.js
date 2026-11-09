const express = require("express");
const router = express.Router();

const {
    obtenerPublicaciones
} = require("../controllers/boutiqueController");

// Obtener todas las publicaciones
router.get("/publicaciones", obtenerPublicaciones);

module.exports = router;