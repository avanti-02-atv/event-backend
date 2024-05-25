
import { Router } from "express";
import { CategoriasController } from "../controller/CategoriasController.js";
import { LocaisController } from "../controller/LocaisController.js";
import { EventosController } from "../controller/EventosController.js";
import { UserController } from "../controller/UserController.js";
import { LoginController } from "../controller/LoginController.js";
import authenticate from "../auth/authenticate.js";
import authorization from "../auth/authorization.js";

const routes = Router();

const categoriasController = new CategoriasController();
const locaisController = new LocaisController();
const eventosController = new EventosController();
const userController = new UserController();
const loginController = new LoginController();


routes.post("/login",                            loginController.sign);

routes.get("/users",             authorization,  userController.getAllUsers);
routes.get("/user/:id",          authorization,  userController.getUser);
routes.post("/user",                             userController.createUser);
routes.put("/user/:id",          authenticate,   userController.putUser);
routes.delete("/user/:id",       authenticate,   userController.deleteUser);

routes.get("/search",                           eventosController.search);
routes.get("/eventos",                          eventosController.getAllEventos);
routes.get("/evento/:id",        authenticate,  eventosController.getEvento);
routes.post("/evento",           authorization,  eventosController.createEvento);
routes.put("/evento/:id",        authorization,  eventosController.updateEvento);
routes.delete("/evento/:id",     authorization,  eventosController.deleteEvento);

routes.get("/categorias",        authenticate,  categoriasController.findAllCategorias);
routes.get("/categoria/:id",     authenticate,  categoriasController.findCategoria);
routes.post("/categoria",        authorization,  categoriasController.createCategorias);
routes.put("/categoria/:id",     authorization,  categoriasController.updateCategorias);
routes.delete("/categoria/:id",  authorization,  categoriasController.deleteCategorias);

routes.get("/locais",            authenticate,  locaisController.getAllLocais);
routes.get("/local/:id",         authenticate,  locaisController.getLocal);
routes.post("/local",            authorization,  locaisController.postLocais);
routes.put("/local/:id",         authorization,  locaisController.putLocais);
routes.delete("/local/:id",      authorization,  locaisController.deleteLocais);

export { routes }
