const express = require("express");
const OpenAIConfigController = require("../controllers/openaiConfigController");

const router = express.Router();

router.post("/keys/add", OpenAIConfigController.AddNewKey);
router.get("/keys/active", OpenAIConfigController.GetActiveKey);
router.get("/keys", OpenAIConfigController.GetKeys);
router.patch("/keys/activate", OpenAIConfigController.ActivateKey);
router.delete("/keys/delete", OpenAIConfigController.DeleteKey);

module.exports = router;
