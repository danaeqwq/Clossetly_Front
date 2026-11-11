
const router = require("express").Router();

const prendaController = require("../../controllers/prendaController");

router.get("/", prendaController.obtenerPrendas);
router.get("/:id", prendaController.obtenerPrenda);
router.post("/", prendaController.crearPrenda);
router.put("/:id", prendaController.modificarPrenda);
router.delete("/:id", prendaController.eliminarPrenda);

module.exports = router;
