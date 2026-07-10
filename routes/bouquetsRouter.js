const express = require("express");

const ctrl = require("../controllers/bouquetsControllers");
const validateBody = require("../middlewares/validateBody");
const isValidId = require("../middlewares/isValidId");
const upload = require("../middlewares/upload");
const {
  bouquetCreateSchema,
  bouquetUpdateSchema,
  favoriteUpdateSchema,
} = require("../schemas/bouquetSchemas");

const router = express.Router();

router.get("/", ctrl.getAllBouquets);

router.get("/:id", isValidId, ctrl.getBouquetById);

router.post("/", validateBody(bouquetCreateSchema), ctrl.createBouquet);

router.put(
  "/:id",
  isValidId,
  validateBody(bouquetUpdateSchema),
  ctrl.updateBouquetById
);

router.delete("/:id", isValidId, ctrl.deleteBouquetById);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(favoriteUpdateSchema),
  ctrl.updateFavorite
);

router.patch(
  "/:id/photo",
  isValidId,
  upload.single("photo"),
  ctrl.updatePhoto
);

module.exports = router;
