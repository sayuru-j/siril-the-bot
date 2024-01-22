const OpenAICredentials = require("../config/models/OpenAICredentials");

class OpenAIConfigService {
  static async CreateAKey(apiKey, description) {
    const newKey = {
      apiKey,
      description,
    };

    return await OpenAICredentials.create(newKey);
  }

  static async GetActiveKey() {
    return await OpenAICredentials.findOne({ isActive: true });
  }

  static async GetKeys() {
    return await OpenAICredentials.find({});
  }

  static async ActivateKey(id) {
    await OpenAICredentials.updateMany({}, { isActive: false });

    return await OpenAICredentials.findOneAndUpdate(
      { _id: id },
      { isActive: true }
    );
  }

  static async DeleteKey(id) {
    return await OpenAICredentials.deleteOne({ _id: id });
  }
}

module.exports = OpenAIConfigService;
