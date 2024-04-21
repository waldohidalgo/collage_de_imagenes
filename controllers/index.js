import path from "path";
import { promises as fs } from "fs";

export function renderHome(req, res) {
  res.render("index");
}

export function crearImagen(req, res) {
  const { target_file } = req.files;
  const { posicion } = req.body;

  if (Object.keys(target_file).length === 0) {
    res.status(400).send("Ningun archivo ha sido subido");
    return;
  }
  if (target_file.size > 5 * 1024 * 1024) {
    res.status(413).render("pages/413");
    return;
  }
  target_file.mv(
    path.resolve("assets", "imagenes", `imagen-${posicion}.jpg`),
    (err) => {
      if (err) {
        console.log("Error77", err);
        res.send("Error");
        return;
      }
      console.log("Imagen guardada con exito");
      res.render("pages/collage");
    }
  );
}

export async function deleteImagen(req, res) {
  try {
    const { nombre } = req.params;
    if (nombre) {
      console.log("Eliminada con exito ", nombre);
      await fs.unlink(path.resolve("assets", "imagenes", nombre));

      res
        .status(200)
        .set("Cache-Control", "no-cache, no-store, must-revalidate")
        .send("exito");
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

export function renderCollage(req, res) {
  res.render("pages/collage");
}

export function render404(req, res) {
  res.render("pages/404");
}

export async function resetData(req, res) {
  const carpeta = path.resolve("assets", "imagenes");
  try {
    const archivos = await fs.readdir(carpeta);
    for (const archivo of archivos) {
      const rutaArchivo = path.join(carpeta, archivo);
      await fs.unlink(rutaArchivo);
    }
    console.log("Data reseteada con exito");
    res.send("Data reseteada con exito 😄");
  } catch (error) {
    res.send("Error al resetear la data");
  }
}
