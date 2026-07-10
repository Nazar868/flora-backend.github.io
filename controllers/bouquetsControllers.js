const path = require("path");
const fs = require("fs/promises");
const crypto = require("crypto");
const gravatar = require("gravatar");

const HttpError = require("../helpers/HttpError");
const ctrlWrapper = require("../helpers/ctrlWrapper");
const bouquetsServices = require("../services/bouquetsServices");

const publicPhotosDir = path.resolve(__dirname, "../public/photos");

const getAllBouquets = async (req, res) => {
  const bouquets = await bouquetsServices.listBouquets();
  res.status(200).json(bouquets);
};

const getBouquetById = async (req, res) => {
  const { id } = req.params;
  const bouquet = await bouquetsServices.getBouquetById(id);
  if (!bouquet) {
    throw new HttpError(404, "Not found");
  }
  res.status(200).json(bouquet);
};

const createBouquet = async (req, res) => {
  // If no photoURL was supplied on creation, generate a placeholder via gravatar
  // (identicon based on a random hash, since bouquets have no email of their own).
  const photoURL =
    req.body.photoURL ||
    gravatar.url(crypto.randomBytes(16).toString("hex"), {
      s: "250",
      d: "identicon",
    });

  const bouquet = await bouquetsServices.createBouquet({
    ...req.body,
    photoURL: photoURL.startsWith("//") ? `https:${photoURL}` : photoURL,
  });

  res.status(201).json(bouquet);
};

const updateBouquetById = async (req, res) => {
  const { id } = req.params;
  const bouquet = await bouquetsServices.updateBouquetById(id, req.body);
  if (!bouquet) {
    throw new HttpError(404, "Not found");
  }
  res.status(200).json(bouquet);
};

const deleteBouquetById = async (req, res) => {
  const { id } = req.params;
  const bouquet = await bouquetsServices.deleteBouquetById(id);
  if (!bouquet) {
    throw new HttpError(404, "Not found");
  }
  res.status(200).json(bouquet);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const bouquet = await bouquetsServices.updateBouquetById(id, { favorite });
  if (!bouquet) {
    throw new HttpError(404, "Not found");
  }
  res.status(200).json(bouquet);
};

const updatePhoto = async (req, res) => {
  const { id } = req.params;

  if (!req.file) {
    throw new HttpError(400, "Photo file is required");
  }

  const bouquet = await bouquetsServices.getBouquetById(id);
  if (!bouquet) {
    // Clean up the orphaned temp file before failing.
    await fs.unlink(req.file.path).catch(() => {});
    throw new HttpError(404, "Not found");
  }

  const uniqueName = `${id}_${Date.now()}${path.extname(req.file.originalname)}`;
  const targetPath = path.join(publicPhotosDir, uniqueName);

  await fs.rename(req.file.path, targetPath);

  const photoURL = `/public/photos/${uniqueName}`;
  const updated = await bouquetsServices.updateBouquetById(id, { photoURL });

  res.status(200).json(updated);
};

module.exports = {
  getAllBouquets: ctrlWrapper(getAllBouquets),
  getBouquetById: ctrlWrapper(getBouquetById),
  createBouquet: ctrlWrapper(createBouquet),
  updateBouquetById: ctrlWrapper(updateBouquetById),
  deleteBouquetById: ctrlWrapper(deleteBouquetById),
  updateFavorite: ctrlWrapper(updateFavorite),
  updatePhoto: ctrlWrapper(updatePhoto),
};
