
const router = require("express").Router();

const boutiqueRouter = require("./boutique");

// Boutique
router.use("/boutique", boutiqueRouter);

module.exports = router;
