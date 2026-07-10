const HttpError = require("../helpers/HttpError");

// Generic Joi body validator. Used for POST and PUT.
const validateBody = (schema) => {
  return (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
      return next(new HttpError(400, "Body must not be empty"));
    }

    const { error } = schema.validate(req.body);
    if (error) {
      return next(new HttpError(400, error.message));
    }

    next();
  };
};

module.exports = validateBody;
