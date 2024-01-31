const OpenAIConfigService = require("../services/openaiConfigService");

class OpenAIConfigController {
  static async AddNewKey(req, res) {
    try {
      const { apiKey, description } = req.body;

      const response = await OpenAIConfigService.CreateAKey(
        apiKey,
        description
      );
      return res.status(200).json({
        message: "New key added !",
        data: response,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  static async GetActiveKey(req, res) {
    try {
      const response = await OpenAIConfigService.GetActiveKey();
      return res.status(200).json({
        message: !response
          ? "Active key is unavailable!"
          : "Active key is available!",
        data: response,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: error.message,
      });
    }
  }
  static async GetKeys(req, res) {
    try {
      const response = await OpenAIConfigService.GetKeys();

      return res.status(200).json({
        message: "Available keys",
        data: response,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: error.message,
      });
    }
  }
  static async ActivateKey(req, res) {
    try {
      const { keyId } = req.query;

      const response = await OpenAIConfigService.ActivateKey(keyId);

      return res.status(200).json({
        message: "Key activated!",
        data: response,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: error.message,
      });
    }
  }
  static async DeleteKey() {
    try {
      const { keyId } = req.query;

      const response = await OpenAIConfigService.DeleteKey(keyId);

      return res.status(200).json({
        message: "Key deleted!",
        data: response,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: error.message,
      });
    }
  }
}

module.exports = OpenAIConfigController;
