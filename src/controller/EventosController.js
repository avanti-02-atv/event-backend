import { prismaClient } from "../database/database.js";
import moment from "moment-timezone";

export class EventosController {
  async getAllEventos(req, res) {
    try {
      let eventos = await prismaClient.eventos.findMany();
      eventos = eventos.map((evento) => {
        const datetime = moment(evento.data);
        return {
          ...evento,
          data: datetime.format("DD-MM-YYYY"),
          hora: datetime.format("HH:mm:ss"),
        };
      });
      return res.status(200).json(eventos);
    } catch (err) {
      console.error("Error retrieving eventos:", err);
      return res.status(500).send();
    }
  }

  async getEvento(req, res) {
    const { id } = req.params;
    try {
      let evento = await prismaClient.eventos.findUnique({
        where: { id },
      });
      if (evento) {
        const datetime = moment(evento.data);
        evento = {
          ...evento,
          data: datetime.format("DD-MM-YYYY"),
          hora: datetime.format("HH:mm:ss"),
        };
      }
      return res.status(200).json(evento);
    } catch (err) {
      console.error("Error retrieving evento:", err);
      return res.status(500).send();
    }
  }

  async postEvento(req, res) {
    let { nome, data, hora, localId, descricao, categoriaId } = req.body;

    const datetime = moment.tz(
      `${data}T${hora}`,
      "DD-MM-YYYYTHH:mm:ss",
      "America/Sao_Paulo"
    );

    data = datetime.toISOString();
    try {
      const checkEvento = await prismaClient.eventos.findFirst({
        where: {
          nome,
          descricao,
          data,
          categoriaId,
          localId,
        },
      });

      if (checkEvento) {
        return res.status(409).json("Evento já registrado");
      }

      const evento = await prismaClient.eventos.create({
        data: {
          nome,
          descricao,
          data,
          categoriaId,
          localId,
        },
      });
      return res.status(201).json(evento);
    } catch (error) {
      console.error("Error creating evento:", error);
      return res.status(500).send();
    }
  }

  async putEvento(req, res) {
    const { id } = req.params;
    let { nome, data, hora, localId, descricao, categoriaId } = req.body;

    const datetime = moment.tz(
      `${data}T${hora}`,
      "DD-MM-YYYYTHH:mm:ss",
      "America/Sao_Paulo"
    );

    data = datetime.toISOString();

    try {
      let evento = await prismaClient.eventos.update({
        where: { id },
        data: {
          nome,
          descricao,
          data,
          categoriaId,
          localId,
        },
      });

      if (evento) {
        const datetime = moment(evento.data);
        evento = {
          ...evento,
          data: datetime.format("DD-MM-YYYY"),
          hora: datetime.format("HH:mm:ss"),
        };
      }

      return res.status(200).json(evento);
    } catch (error) {
      console.error("Error updating evento:", error);
      return res.status(500).send();
    }
  }
  
  async deleteEvento(req, res) {
    const { id } = req.params;
    try {
      const evento = await prismaClient.eventos.delete({
        where: { id },
      });
      return res.status(200).json(evento);
    } catch (error) {
      console.error("Error deleting evento:", error);
      return res.status(500).send();
    }
  }

  async search(req, res) {
    try {
      const { evento, categoria, local, dataInicio, dataFim } = req.query;
  
      let whereClause = {};
      
      if (evento) {
        whereClause = { ...whereClause, nome: {contains: evento} };
      }
      if (categoria) {
        whereClause = { ...whereClause, Categoria: { nome: categoria } };
      }
      if (local) {
        whereClause = { ...whereClause, Local: { nome: local } };
      }
      if (dataInicio || dataFim) {
        if(dataInicio && dataFim){
          whereClause = { 
            ...whereClause, 
            data: { 
              gte: new Date(dataInicio),
              lte: new Date(dataFim)
            } 
          };
        }
        if(dataInicio){
          whereClause = { 
            ...whereClause, 
            data: { 
              gte: new Date(dataInicio)
            } 
          };
        }

        if(dataFim){
          whereClause = { 
            ...whereClause, 
            data: { 
              lte: new Date(dataFim)
            } 
          };
        }
      }
  
      const eventos = await prismaClient.eventos.findMany({
        where: whereClause,
        include: {
          Categoria: true,
          Local: true,
        },
      });
  
      res.json(eventos);
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
      res.status(500).json({ error: 'Erro ao buscar eventos' });
    }
  }
}
