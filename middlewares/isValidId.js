const HttpError = require("../helpers/HttpError");

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Guards :id route params — returns 404 (not 500) for malformed ids
// instead of letting Sequelize throw a raw DB error.
const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!UUID_REGEX.test(id)) {
    return next(new HttpError(404, "Not found"));
  }
  next();
};

module.exports = isValidId;
