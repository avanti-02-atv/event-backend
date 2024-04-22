import { prismaClient } from "../database/database.js";

export class LocaisController {
  async getLocais(req, res) {
    const { id } = req.params; 
    try {
      const locais = id 
      ? await prismaClient.locais.findUnique({
        where: { id }
      })
      : await prismaClient.locais.findMany;

      if(!locais) {
        return res.status(404).json({ message: 'Local not found' });
      }
      return res.status(200).json(locais);
    } catch (err) {
      return res.status(500).send();
    }
  }
}

