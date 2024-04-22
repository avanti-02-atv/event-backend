import { Router } from "express";
import { LocaisController } from "../controller/LocaisController.js";

const routes = Router();
const locaisController = new LocaisController();

routes.get("/locais",     locaisController.getLocais);
routes.get("/locais/:id", locaisController.getLocais);
routes.post("/locais",    locaisController.postLocais);

export { routes }
