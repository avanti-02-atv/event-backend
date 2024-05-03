import { prismaClient } from "../database/database.js";

export class CategoriasController {
  async findAllCategorias(req, res) {
    try {
      const cat = await prismaClient.categorias.findMany();

      if (!cat || cat.length === 0) {
        return res
          .status(404)
          .json({ message: "Nenhuma categoria encontrada" });
      }

      res.status(200).json(cat);
    } catch (error) {
      console.error(`Erro ao buscar categorias: ${error.message}`);
      return res.status(500).json({ message: "Erro ao buscar categorias" });
    }
  }

  async findCategoria(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID de categoria inválido" });
    }

    try {
      const categoria = await prismaClient.categorias.findUnique({
        where: { id },
      });

      if (!categoria) {
        return res.status(404).json({ message: "Categoria não encontrada" });
      }

      return res.status(200).json(categoria);
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Erro ao buscar categoria: ${err.message}` });
    }
  }

  async createCategorias(req, res) {
    const { nome } = req.body;
    try {
      const checkCategoria = await prismaClient.categorias.findFirst({
        where: {
          nome,
        },
      });

      if (checkCategoria) {
        return res.status(400).json({ message: "Categoria já registrada" });
      }

      const cat = await prismaClient.categorias.create({
        data: {
          nome,
        },
      });

      res.status(201).json(cat);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao criar categoria" });
    }
  }

  async updateCategorias(req, res) {
    const { id } = req.params;
    const { nome } = req.body;

    try {
      const categoria = await prismaClient.categorias.findFirst({
        where: {
          id,
        },
      });

      if (!categoria) {
        return res.status(404).json({ message: "Categoria não encontrada" });
      }

      const updatedCategoria = await prismaClient.categorias.update({
        where: {
          id,
        },
        data: {
          nome,
        },
      });

      return res.json(updatedCategoria);
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Erro ao atualizar categoria: ${error.message}` });
    }
  }

  async deleteCategorias(req, res) {
    const { id } = req.params;

    try {
      const categoria = await prismaClient.categorias.findFirst({
        where: {
          id,
        },
      });

      if (!categoria) {
        return res.status(404).json({ message: "Categoria não encontrada" });
      }

      await prismaClient.categorias.delete({
        where: {
          id,
        },
      });

      const deletedCategoria = await prismaClient.categorias.findFirst({
        where: {
          id,
        },
      });

      if (deletedCategoria) {
        return res.status(500).json({ message: "Erro ao deletar categoria" });
      }

      return res
        .status(200)
        .json({ message: "Categoria deletada com sucesso" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: `Erro ao deletar categoria: ${error.message}` });
    }
  }
}