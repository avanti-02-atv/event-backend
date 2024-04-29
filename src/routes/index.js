
import { Router } from "express";
import { CategoriasController } from "../controller/CategoriasController.js";
import { LocaisController } from "../controller/LocaisController.js";


const routes = Router();

const categoriasController = new CategoriasController();
const locaisController = new LocaisController();

routes.get("/categorias",           categoriasController.findAllCategorias);
routes.get("/categorias/:id",       categoriasController.findCategoria);
routes.post("/categorias",         categoriasController.createCategorias);
routes.put("/categorias/:id",      categoriasController.updateCategorias);
routes.delete("/categorias/:id",   categoriasController.deleteCategorias);

routes.get("/locais",              locaisController.getAllLocais);
routes.get("/locais/:id",          locaisController.getLocal);
routes.post("/locais",             locaisController.postLocais);
routes.put("/locais/:id",          locaisController.putLocais);
routes.delete("/locais/:id",       locaisController.deleteLocais);

export { routes }
