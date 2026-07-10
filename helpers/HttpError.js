const statusMessages = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not found",
  409: "Conflict",
};

class HttpError extends Error {
  constructor(status, message = statusMessages[status] || "Server error") {
    super(message);
    this.status = status;
  }
}

module.exports = HttpError;
