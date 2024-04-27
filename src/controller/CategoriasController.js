import { prismaClient } from "../database/PrismaClient.js";


export class CategoriasController {
    async findAllCategorias(request, response) {
        const cat = await prismaClient.categorias.findMany();
        response.status(200).json(cat)
    }

    async createCategorias(request, response) {
        const { nome } = request.body;
        const cat = await prismaClient.categorias.create({
            data: {
                nome,
            }
        });
        response.status(201).json(cat)
    }

    async updateCategorias(request, response) {
        const { id } = request.params;
        const { nome } = request.body;
        const cat = await prismaClient.categorias.update({
            where: {
                id
            },
            data: {
                nome,
            }
        });
        response.status(200).json(cat)
    }

    async deleteCategorias(request, response) {
        const { id } = request.params;
        const cat = await prismaClient.categorias.delete({
            where: {
                id
            }
        });
        response.status(204).send();
    }
}