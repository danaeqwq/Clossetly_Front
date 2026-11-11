
const router = require("express").Router();

const boutiqueController = require("../controllers/boutiqueController");

// Obtener publicaciones de Boutique
router.get("/publicaciones", boutiqueController.obtenerPublicaciones);

module.exports = router;
