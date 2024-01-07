const User = require("../models/User");

class UserService {
  static async getUserById(userId) {
    return await User.findById(userId);
  }
  static async addNewUser(userDetails) {
    return await User.create(userDetails);
  }
}

module.exports = UserService;
