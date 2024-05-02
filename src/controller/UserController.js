import { prismaClient } from "../database/database.js";
import bcrypt from "bcryptjs"

export class UserController {
  async getUser(req, res) {
    const { id } = req.params; 
    try {
      const user = await prismaClient.user.findUnique({
        where: { id }
      });
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).send();
    }
  }

  async getAllUser(req, res) {
    try {
      const users = await prismaClient.user.findMany();
      if(!users) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(users);
    } catch (err) {
      return res.status(500).send();
    }
  }

  async createUser (req, res) {
    const { name, email, phone, password, isOrganizer } = req.body;
    try {
        const userCheck = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        });

        if (userCheck) {
            return response.status(409).json("E-mail already registered");
        }

        const passwordHash = bcrypt.hashSync(password, 10);

        const user = await prismaClient.user.create({
            data: {
                name,
                email,
                phone,
                password: passwordHash,
                isOrganizer
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                isOrganizer: true
            }
        });
        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).send();
    }
  }

  async putUser(req, res) {
    const { id } = req.params; 
    const {name, email, phone, password, isOrganizer} = req.body;
    try {
      const checkUser = await prismaClient.user.findFirst({
        where: {
          id
        }
      });
      if(!checkUser){
        return res.status(409).json("User não registrado");
      }

      const passwordHash = bcrypt.hashSync(password, 10);

      const user = await prismaClient.user.update({
        where: {
          id
        },
        data: {
          name,
          email,
          phone,
          password: passwordHash,
          isOrganizer
        }
      });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).send();
    }
  }

  async deleteUser(req, res){
    const { id } = req.params; 
    try {
      const checkUser = await prismaClient.user.findFirst({
        where: {
          id
        }
      });
      if(!checkUser){
        return res.status(409).json("User não registrado");
      }
      
      await prismaClient.user.delete({
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