const { MongoClient } = require("mongodb");

// Connection URL
const url = "mongodb://0.0.0.0:27017/";
const client = new MongoClient(url);

// Database Name
const dbName = "Polling-system";

const pool = client.connect();
pool
  .then(console.log("Successfully Connected to database"))
  .catch((error) => {
    console.error("Error in database connection", error);
  })
  .finally(); //() => client.close());

const getDBConn = () => {
  try {
    const db = client.db(dbName);
    return db;
  } catch (error) {
    console.log("Error in fetching connection ", error);
    throw error;
  }
};

module.exports = { getDBConn };
