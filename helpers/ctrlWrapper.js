// Wraps async controllers so thrown/rejected errors go straight to next(error)
// instead of requiring try/catch in every controller function.
const ctrlWrapper = (ctrl) => {
  return async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = ctrlWrapper;
