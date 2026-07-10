const { Sequelize } = require("sequelize");
require("dotenv").config();

const { DB_URL, DB_SSL } = process.env;

if (!DB_URL) {
  console.error("Missing DB_URL environment variable. Check your .env file.");
  process.exit(1);
}

const sequelize = new Sequelize(DB_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions:
    DB_SSL === "true"
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : {},
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection successful");
  } catch (error) {
    console.error(`Database connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
