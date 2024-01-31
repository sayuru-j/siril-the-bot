class NullUserIdError extends Error {
  constructor(message) {
    super(message || "User Id cannot be null and must contain a unique value.");
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

const ChatError = {
  NullUserIdError,
};

module.exports = ChatError;
