require("dotenv").config();

const app = require("./app");
const { connectDB } = require("./config/sequelize");
const { syncModels } = require("./models");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();
  await syncModels();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
