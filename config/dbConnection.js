import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const isDev = process.argv.includes("--dev");
console.log("isDev", isDev);

let db = isDev ? process.env.DEVDB : process.env.PRODDB;

db = JSON.parse(db);

const pool = mysql.createPool({
  host: db.host, // Seu host do MySQL
  user: db.user, // Seu nome de usuário
  password: db.password, // Sua senha
  database: db.database, // Nome do banco de dados
  waitForConnections: true, // Aguardar se não houver conexões disponíveis na pool
  connectionLimit: 10, // Número máximo de conexões na pool
  queueLimit: 0, // Número máximo de conexões em espera (0 = ilimitado)
});

async function getConnection() {
  return await pool.getConnection();
}

export default getConnection;
