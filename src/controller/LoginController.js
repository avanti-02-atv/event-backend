import jwt from "jsonwebtoken";
import { prismaClient } from "../database/database.js";
import bcrypt from "bcryptjs"

export class LoginController {
    async sign(req, res){
        const { email, password } = req.body;
        try {
          const user = await prismaClient.user.findFirst({
            where: {
              email: email
            }
          });
  
          if (!user) {
            return res.status(401).json({"message": "User Unauthorized"});
          }
  
          const verifyPass = bcrypt.compareSync(password, user.password);
  
          if (!verifyPass) {
            return res.status(401).json({"message": "User Unauthorized"});
          }
  
          const token =  jwt.sign({"userId": user.id, "isOrganizer": user.isOrganizer}, process.env.SECRET_KEY_JWT, { expiresIn: '2h' });
          
          return res.status(200).json({"id": user.id, "name": user.name, "token": token});
        } catch (error) {
          return res.status(500).json({"message": "Server error"});
        }
              
    }
}