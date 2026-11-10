require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PORT } = process.env;
const apiRouter = require("./api/main");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);
app.use("/archivos", express.static("archivos"));
app.use((req, res) => {
    console.log(`El usuario accedió a ${req.path}`);
    res.status(404).send("Página no encontrada");
});
app.listen(PORT || 3000, (error) => {
    if (error) {
        console.error(error);
        process.exit(1);
    }
    console.log(`Clossetly API funcionando en el puerto ${PORT || 3000}`);
});