import { Router } from "express";
import {
  renderHome,
  crearImagen,
  deleteImagen,
  renderCollage,
  render404,
  resetData,
} from "../controllers/index.js";

const router = Router();

router.get("/", renderHome);

router.post("/imagen", crearImagen);

router.delete("/imagen/:nombre", deleteImagen);

router.get("/imagen", renderCollage);

router.get("/reset", resetData);

router.get("/*", render404);

export default router;
