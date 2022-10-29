const config = require("../config");
const mongoose = require("mongoose");

const mongodb = {
  Connect: () => {
    mongoose.Promise = global.Promise;
    const connection_string =
      config.mongodb.connection_string ||
      `mongodb://${config.mongodb.username}:${config.mongodb.password}@${config.mongodb.host}:27017/${config.mongodb.database}`;
    mongoose.connect(
      connection_string,
      {
        useNewUrlParser: true,
      },
      (err) => {
        if (!err) {
          console.log("MongoDB Connection Succeeded.");
        } else {
          console.log("Error in DB connection : " + err);
        }
      }
    );

    return connection_string;
  },
};

module.exports = { mongodb };
