const Bouquet = require("../models/bouquet");

const listBouquets = () => {
  return Bouquet.findAll();
};

const getBouquetById = (id) => {
  return Bouquet.findByPk(id);
};

const createBouquet = (data) => {
  return Bouquet.create(data);
};

const updateBouquetById = async (id, data) => {
  const bouquet = await Bouquet.findByPk(id);
  if (!bouquet) return null;
  return bouquet.update(data);
};

const deleteBouquetById = async (id) => {
  const bouquet = await Bouquet.findByPk(id);
  if (!bouquet) return null;
  await bouquet.destroy();
  return bouquet;
};

module.exports = {
  listBouquets,
  getBouquetById,
  createBouquet,
  updateBouquetById,
  deleteBouquetById,
};
