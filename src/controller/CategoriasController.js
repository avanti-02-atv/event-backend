import { prismaClient } from "../database/PrismaClient.js";


export class CategoriasController {
    async findAllCategorias(req, res) {
        try {
            const cat = await prismaClient.categorias.findMany();
            res.status(200).json(cat)
        } catch (error) {
            return res.status(500).send(); 
        }     
    }

    async findCategoria(req, res) {
        const { id } = req.params; 
        try {
          const categoria = await prismaClient.categorias.findUnique({
            where: { id }
          });
          return res.status(200).json(categoria);
        } catch (err) {
          return res.status(500).send();
        }
      }

    async createCategorias(req, res) {
        const { nome } = req.body;
        try {
            const checkCategoria = await prismaClient.categorias.findFirst({
                where: {
                  nome
                }
            });
        
            if (checkCategoria) {
                return res.status(409).json("Categoria já registrada");
            }

            const cat = await prismaClient.categorias.create({
                data: {
                    nome,
                }
            });

            res.status(201).json(cat)
        } catch (error) {
            return res.status(500).send();
        }
        
    }

    async updateCategorias(req, res) {
        const { id } = req.params;
        const { nome } = req.body;
        try {
            const checkCategoria = await prismaClient.categorias.findFirst({
                where: {
                  id
                }
            });

            if(!checkCategoria){
                return res.status(409).json("Categoria não registrada");
            }

            const cat = await prismaClient.categorias.update({
                where: {
                    id
                },
                data: {
                    nome,
                }
            });
            res.status(200).json(cat)
        } catch (error) {
            return res.status(500).send();
        }
    
    }

    async deleteCategorias(req, res) {
        const { id } = req.params;

        try {
            const checkCategoria = await prismaClient.categorias.findFirst({
                where: {
                    id
                }
            });
        
            if (!checkCategoria) {
                return res.status(409).json("Categoria não registrada");
            }

            await prismaClient.categorias.delete({
                where: {
                    id
                }
            });
            res.status(200).send();
        } catch (error) {
            return res.status(500).send();
        }
        
    }
}