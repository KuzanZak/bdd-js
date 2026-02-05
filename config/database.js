import "dotenv/config";
import mariadb from "mariadb";

const connectionPool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_NAME,
  connectionLimit: 5,
});

export const getConnection = async () => {
  try {
    const connection = await connectionPool.getConnection();
    return connection;
  } catch (error) {
    console.error("Erreur de connexion à la base de données:", error);
    throw error;
  }
};

export default connectionPool;
