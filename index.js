import express from "express";
import router from "./routes/routes.js";
import path from "path";
import fileUpload from "express-fileupload";
import exphbs from "express-handlebars";
import { promises as fs } from "fs";
import nocache from "nocache";

const app = express();
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`El servidor está inicializado en el puerto ${PORT}`);
});

app.engine(
  ".hbs",
  exphbs.engine({
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");
app.set("views", path.resolve("views"));

app.use(
  fileUpload({
    useTempFiles: false,
  })
);

app.use(express.json());
app.use(nocache());

app.use(express.static(path.resolve("assets"), { etag: false }));

app.use("/", router);

setInterval(async () => {
  const carpeta = path.resolve("assets", "imagenes");
  try {
    const archivos = await fs.readdir(carpeta);
    if (archivos.length > 0) {
      for (const archivo of archivos) {
        const rutaArchivo = path.join(carpeta, archivo);
        await fs.unlink(rutaArchivo);
      }
      console.log("Data reseteada con exito");
    }
  } catch (error) {
    console.log("Error al resetear la data");
  }
}, 900000);
