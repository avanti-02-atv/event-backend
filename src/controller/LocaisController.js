import { prismaClient } from "../database/database.js";

export class LocaisController {
  async getLocais(req, res) {
    const { id } = req.params; 
    try {
      const locais = id 
      ? await prismaClient.locais.findUnique({
        where: { id }
      })
      : await prismaClient.locais.findMany();

      if(!locais) {
        return res.status(404).json({ message: 'Local not found' });
      }
      return res.status(200).json(locais);
    } catch (err) {
      return res.status(500).send();
    }
  }

  async postLocais(req, res) {
    const {nome, CEP, cidade, numero, rua} = req.body;
    try {
      const checkLocal = await prismaClient.locais.findFirst({
        where: {
          nome,
          CEP,
          cidade,
          numero,
          rua
        }
      });

      if (checkLocal) {
        return res.status(409).json("Local já registrado");
      }

      const local = await prismaClient.locais.create({
        data: {
          nome,
          CEP,
          cidade,
          numero,
          rua
        }
      });
      return res.status(201).json(local);
    } catch (error) {
      return res.status(500).send();
    }
  }

  async putLocais(req, res) {
    const { id } = req.params; 
    const {nome, CEP, cidade, numero, rua} = req.body;
    try {
      const checkLocal = await prismaClient.locais.findFirst({
        where: {
          id
        }
      });
      if(!checkLocal){
        return res.status(409).json("Local não registrado");
      }
      const local = await prismaClient.locais.update({
        where: {
          id
        },
        data: {
          nome,
          CEP,
          cidade,
          numero,
          rua
        }
      });
      return res.status(200).json(local);
    } catch (error) {
      return res.status(500).send();
    }
  }

  async deleteLocais(req, res){
    const { id } = req.params; 
    try {
      const checkLocal = await prismaClient.locais.findFirst({
        where: {
          id
        }
      });
      if(!checkLocal){
        return res.status(409).json("Local não registrado");
      }
      
      await prismaClient.locais.delete({
        where: {
          id
        }
      });
      return res.status(200).send();
    } catch (error) {
      return res.status(500).send();
    }
  }
}

