
const router = require("express").Router();

const usuariosRouter = require("./usuarios/main");
const usuariosLoginRouter = require("./usuarios/login");
const prendasRouter = require("./prendas/main");
const outfitsRouter = require("./outfits/main");
const carritoRouter = require("./carrito/main");
const intercambiosRouter = require("./intercambios/main");

// Usuarios
router.use("/usuarios/login", usuariosLoginRouter);
router.use("/usuarios", usuariosRouter);

// Prendas
router.use("/prendas", prendasRouter);

// Outfits
router.use("/outfits", outfitsRouter);

// Carrito
router.use("/carrito", carritoRouter);

// Propuestas de intercambio
router.use("/intercambios", intercambiosRouter);

module.exports = router;
