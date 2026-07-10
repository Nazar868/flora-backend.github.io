const errorHandler = (error, req, res, next) => {
  const { status = 500, message = "Server error" } = error;
  if (status === 500) {
    // Log unexpected errors server-side for debugging; don't leak internals to the client.
    console.error(error);
  }
  res.status(status).json({ message });
};

module.exports = errorHandler;
