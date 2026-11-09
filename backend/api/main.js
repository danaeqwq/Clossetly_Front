const express = require("express");
const router = express.Router();

const boutiqueRouter = require("./boutique");

router.use("/boutique", boutiqueRouter);

module.exports = router;