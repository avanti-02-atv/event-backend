
import { Router } from "express";
import { CategoriasController } from "../controller/CategoriasController.js";
import { LocaisController } from "../controller/LocaisController.js";
import { EventosController } from "../controller/EventosController.js";
import { UserController } from "../controller/UserController.js";
import { LoginController } from "../controller/LoginController.js";


const routes = Router();

const categoriasController = new CategoriasController();
const locaisController = new LocaisController();
const eventosController = new EventosController();
const userController = new UserController();
const loginController = new LoginController();

routes.post("/login", loginController.sign);

routes.get("/users",              userController.getAllUser);
routes.get("/user/:id",           userController.getUser);
routes.post("/user",              userController.createUser);
routes.put("/user/:id",           userController.putUser);
routes.delete("/user/:id",        userController.deleteUser);

routes.get("/eventos",            eventosController.getAllEventos);
routes.get("/evento/:id",         eventosController.getEvento);
routes.post("/evento",            eventosController.postEvento);
routes.put("/evento/:id",         eventosController.putEvento);
routes.delete("/evento/:id",      eventosController.deleteEvento);

routes.get("/categorias",         categoriasController.findAllCategorias);
routes.get("/categoria/:id",      categoriasController.findCategoria);
routes.post("/categoria",         categoriasController.createCategorias);
routes.put("/categoria/:id",      categoriasController.updateCategorias);
routes.delete("/categoria/:id",   categoriasController.deleteCategorias);

routes.get("/locais",             locaisController.getAllLocais);
routes.get("/local/:id",          locaisController.getLocal);
routes.post("/local",             locaisController.postLocais);
routes.put("/local/:id",          locaisController.putLocais);
routes.delete("/local/:id",       locaisController.deleteLocais);

export { routes }
