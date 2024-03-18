const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT
const API_URL = process.env.API_URL
const NODE_ENV = process.env.NODE_ENV

module.exports = { PORT, API_URL, NODE_ENV };