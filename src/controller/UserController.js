import { prismaClient } from "../database/database.js";
import bcrypt from "bcryptjs";

export class UserController {
  async getUser(req, res) {
    const { id } = req.params;
    try {
      const user = await prismaClient.user.findUnique({
        where: { id },
      });
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      return res.status(200).json(user);
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Erro ao buscar usuário: ${err.message}` });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await prismaClient.user.findMany();
      if (!users) {
        return res.status(404).json({ message: "Nenhum usuário encontrado" });
      }
      return res.status(200).json(users);
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Erro ao buscar usuários: ${err.message}` });
    }
  }

  async createUser(req, res) {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "Campos obrigatórios ausentes" });
    }

    try {
      const userCheck = await prismaClient.user.findFirst({
        where: {
          email,
        },
      });

      if (userCheck) {
        return res.status(409).json({ message: "E-mail já registrado" });
      }

      let passwordHash;
      try {
        passwordHash = bcrypt.hashSync(password, 10);
      } catch (err) {
        console.error("Erro ao criptografar a senha:", err);
        return res
          .status(500)
          .json({ message: "Erro ao criptografar a senha" });
      }

      const user = await prismaClient.user.create({
        data: {
          name,
          email,
          phone,
          password: passwordHash,
        },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          isOrganizer: true,
        },
      });

      return res.status(201).json(user);
    } catch (err) {
      console.error("Erro ao criar usuário:", err);
      return res
        .status(500)
        .json({ message: `Erro ao criar usuário: ${err.message}` });
    }
  }

  async putUser(req, res) {
    const { id } = req.params;
    const { name, email, phone, password, isOrganizer } = req.body;
    try {
      const checkUser = await prismaClient.user.findFirst({
        where: {
          id,
        },
      });
      if (!checkUser) {
        return res.status(409).json("User não registrado");
      }

      const passwordHash = bcrypt.hashSync(password, 10);

      const user = await prismaClient.user.update({
        where: {
          id,
        },
        data: {
          name,
          email,
          phone,
          password: passwordHash,
          isOrganizer,
        },
      });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).send();
    }
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const checkUser = await prismaClient.user.findFirst({
        where: {
          id,
        },
      });
      if (!checkUser) {
        return res.status(409).json("User não registrado");
      }

      await prismaClient.user.delete({
        where: {
          id,
        },
      });
      return res.status(200).send();
    } catch (error) {
      return res.status(500).send();
    }
  }
}
