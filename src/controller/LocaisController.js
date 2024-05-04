import { prismaClient } from "../database/database.js";

export class LocaisController {
  async getLocal(req, res) {
    const { id } = req.params;
    try {
      const local = await prismaClient.locais.findUnique({
        where: { id },
      });

      if (!local) {
        return res.status(404).json({ message: "Local não encontrado" });
      }

      return res.status(200).json(local);
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Erro ao buscar local: ${err.message}` });
    }
  }

  async getAllLocais(req, res) {
    try {
      const locais = await prismaClient.locais.findMany();

      if (locais.length === 0) {
        return res.status(404).json({ message: "Nenhum local encontrado" });
      }

      return res.status(200).json(locais);
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Erro ao buscar locais: ${err.message}` });
    }
  }

  async postLocais(req, res) {
    const { nome, CEP, cidade, numero, rua } = req.body;
    try {
      const checkLocal = await prismaClient.locais.findFirst({
        where: {
          nome,
          CEP,
          cidade,
          numero,
          rua,
        },
      });

      if (checkLocal) {
        return res.status(400).json({ message: "Local já registrado" });
      }

      const local = await prismaClient.locais.create({
        data: {
          nome,
          CEP,
          cidade,
          numero,
          rua,
        },
      });

      return res.status(201).json(local);
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Erro ao criar local: ${err.message}` });
    }
  }

  async putLocais(req, res) {
    const { id } = req.params;
    const { nome, CEP, cidade, numero, rua } = req.body;
    try {
      const checkLocal = await prismaClient.locais.findFirst({
        where: {
          id,
        },
      });

      if (!checkLocal) {
        return res.status(404).json({ message: "Local não encontrado" });
      }

      const local = await prismaClient.locais.update({
        where: {
          id,
        },
        data: {
          nome,
          CEP,
          cidade,
          numero,
          rua,
        },
      });

      return res.status(200).json(local);
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Erro ao atualizar local: ${err.message}` });
    }
  }

  async deleteLocais(req, res) {
    const { id } = req.params;
    try {
      const checkLocal = await prismaClient.locais.findFirst({
        where: {
          id,
        },
      });

      if (!checkLocal) {
        return res.status(404).json({ message: "Local não encontrado" });
      }

      await prismaClient.locais.delete({
        where: {
          id,
        },
      });

      return res.status(200).json({ message: "Local deletado com sucesso" });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Erro ao deletar local: ${err.message}` });
    }
  }
}
