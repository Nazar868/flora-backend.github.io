const Joi = require("joi");

// Used for POST /api/bouquets
const bouquetCreateSchema = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(2).max(500).required(),
  price: Joi.number().positive().required(),
  photoURL: Joi.string().uri().optional(),
  favorite: Joi.boolean().optional(),
});

// Used for PUT /api/bouquets/:id — no field is individually required,
// but validateBody already rejects an empty body with 400.
const bouquetUpdateSchema = Joi.object({
  title: Joi.string().min(2).max(100),
  description: Joi.string().min(2).max(500),
  price: Joi.number().positive(),
  photoURL: Joi.string().uri(),
  favorite: Joi.boolean(),
}).min(1);

// Used for PATCH /api/bouquets/:id/favorite
const favoriteUpdateSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  bouquetCreateSchema,
  bouquetUpdateSchema,
  favoriteUpdateSchema,
};
