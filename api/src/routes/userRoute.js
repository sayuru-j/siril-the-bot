const express = require("express");
const UserController = require("../controllers/userController");

const router = express.Router();

router.get("/:userId", UserController.getUser);
router.post("/new-user", UserController.addUser);

module.exports = router;
