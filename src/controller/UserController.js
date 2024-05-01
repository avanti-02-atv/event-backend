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
}