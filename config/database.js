const mongoose = require("mongoose");

require("dotenv").config();
const databaseConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((con) => console.log(con.connection.host))
    .catch((error) => console.log(error));
};
module.exports = databaseConnection;
