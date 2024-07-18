import { MongoClient } from "mongodb";

const clientDb  = new MongoClient(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const connectDB = async () => {
    try {
      await clientDb.connect();
      console.log('MongoDB connected');

    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  };

const getDB = (db) => {
    return clientDb.db(db);
  };

export default { connectDB, getDB };