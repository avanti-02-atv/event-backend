import { prismaClient } from "../database/database.js";
import moment from "moment-timezone";

export class EventosController {
  async getAllEventos(req, res) {
    try {
      const eventos = await prismaClient.eventos.findMany({
        include: {
          Categoria: true,
          Local: true,
        },
      });

      if (eventos.length === 0) {
        return res.status(404).json({ message: "Nenhum evento encontrado" });
      }

      return res.status(200).json(eventos);
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Erro ao buscar eventos: ${err.message}` });
    }
  }

  async getEvento(req, res) {
    const { id } = req.params;
    try {
      const evento = await prismaClient.eventos.findUnique({
        where: { id },
        include: {
          Categoria: true,
          Local: true,
        },
      });

      if (!evento) {
        return res.status(404).json({ message: "Evento não encontrado" });
      }

      return res.status(200).json(evento);
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Erro ao buscar evento: ${err.message}` });
    }
  }

  async createEvento(req, res) {
    const { nome, descricao, data, categoriaId, localId } = req.body;

    if (!nome || !descricao || !data || !categoriaId || !localId) {
      return res.status(400).json({ message: "Campos obrigatórios ausentes" });
    }

    try {
      const checkEvento = await prismaClient.eventos.findFirst({
        where: {
          nome,
          descricao,
          data: new Date(data),
          categoriaId,
          localId,
        },
      });

      if (checkEvento) {
        return res.status(400).json({ message: "Evento já registrado" });
      }

      const dataBrasilia = moment(data).tz("America/Sao_Paulo").format();
      const newEvento = await prismaClient.eventos.create({
        data: {
          nome,
          descricao,
          data: new Date(dataBrasilia),
          categoriaId,
          localId,
        },
      });
      return res.status(201).json(newEvento);
    } catch (err) {
      console.error("Erro ao criar evento:", err);
      return res
        .status(500)
        .json({ message: `Erro ao criar evento: ${err.message}` });
    }
  }

  async updateEvento(req, res) {
    const { id } = req.params;
    const { nome, descricao, data, categoriaId, localId } = req.body;
    try {
      const checkEvento = await prismaClient.eventos.findFirst({
        where: {
          id,
        },
      });

      if (!checkEvento) {
        return res.status(404).json({ message: "Evento não encontrado" });
      }

      const evento = await prismaClient.eventos.update({
        where: {
          id,
        },
        data: {
          nome,
          descricao,
          data: new Date(data),
          categoriaId,
          localId,
        },
      });

      return res.status(200).json(evento);
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Erro ao atualizar evento: ${err.message}` });
    }
  }

  async deleteEvento(req, res) {
    const { id } = req.params;

    try {
      const evento = await prismaClient.eventos.findFirst({
        where: {
          id,
        },
      });

      if (!evento) {
        return res.status(404).json({ message: "Evento não encontrado" });
      }

      await prismaClient.eventos.delete({
        where: {
          id,
        },
      });

      const deletedEvento = await prismaClient.eventos.findFirst({
        where: {
          id,
        },
      });

      if (deletedEvento) {
        return res.status(500).json({ message: "Erro ao deletar evento" });
      }

      return res.status(200).json({ message: "Evento deletado com sucesso" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Erro ao deletar evento: ${error.message}` });
    }
  }

  async search(req, res) {
    try {
      const { evento, categoria, local, dataInicio, dataFim } = req.query;

      let whereClause = {};

      if (evento) {
        whereClause = { ...whereClause, nome: { contains: evento } };
      }
      if (categoria) {
        whereClause = { ...whereClause, Categoria: { nome: categoria } };
      }
      if (local) {
        whereClause = { ...whereClause, Local: { nome: local } };
      }
      if (dataInicio || dataFim) {
        whereClause = {
          ...whereClause,
          data: {
            ...(dataInicio && { gte: new Date(dataInicio) }),
            ...(dataFim && { lte: new Date(dataFim) }),
          },
        };
      }

      const eventos = await prismaClient.eventos.findMany({
        where: whereClause,
      });

      if (eventos.length === 0) {
        return res.status(404).json({ message: "Nenhum evento encontrado." });
      }

      return res.status(200).json(eventos);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Erro ao buscar eventos: ${error.message}` });
    }
  }
}
