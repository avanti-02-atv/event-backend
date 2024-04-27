
import { Router } from "express";
import { CategoriasController } from "../controller/CategoriasController.js";


const routes = Router();

const categoriasController = new CategoriasController();

routes.get("/", categoriasController.findAllCategorias)

routes.post("/categorias", categoriasController.createCategorias)

routes.put("/categorias/:id", categoriasController.updateCategorias)

routes.delete("/categorias/:id", categoriasController.deleteCategorias)


export { routes };

