import { Router } from "express";
import { LocaisController } from "../controller/LocaisController.js";

const routes = Router();
const locaisController = new LocaisController();

routes.get("/locais",        locaisController.getAllLocais);
routes.get("/locais/:id",    locaisController.getLocal);
routes.post("/locais",       locaisController.postLocais);
routes.put("/locais/:id",    locaisController.putLocais);
routes.delete("/locais/:id", locaisController.deleteLocais);

export { routes }
