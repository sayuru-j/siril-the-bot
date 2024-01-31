const UserService = require("../services/userService");

const field = "User Controller";

class UserController {
  static async getUser(req, res) {
    const { userId } = req.query;

    try {
      const user = await UserService.getUserById(userId);

      if (!user) throw new Error("User not found");

      return res.status(200).json(user);
    } catch (error) {
      console.error("User service: " + error.message);
      res.status(500).json({ field, error: "Internal Server Error" });
    }
  }
  static async addUser(req, res) {
    const { username, email, password } = req.body;

    try {
      const userDetails = {
        username,
        email,
        password,
      };

      const addedUser = await UserService.addNewUser(userDetails);

      if (!addedUser) throw new Error("User cannot be added");

      return res.send(addedUser);
    } catch (error) {
      console.error("User service: " + error.message);
      res.status(500).json({ field, error: error.message });
    }
  }
}

module.exports = UserController;
