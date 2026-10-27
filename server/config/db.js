const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/imovies_district';
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500, // Quick timeout to fallback if no Mongo running
    });
    isConnected = true;
    console.log(`[Database] MongoDB Connected successfully: ${conn.connection.host}`);
    return true;
  } catch (error) {
    isConnected = false;
    console.warn(`[Database Notice] MongoDB local connection not active (${error.message}).`);
    console.log(`[Database Notice] Switching to IMovies InMemory/JSON Persistence Engine for seamless zero-config execution!`);
    return false;
  }
};

const getDBStatus = () => isConnected;

module.exports = { connectDB, getDBStatus };
