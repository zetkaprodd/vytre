import sql, { ConnectionPool } from "mssql";
import dotenv from "dotenv";
dotenv.config();

let pool: ConnectionPool | null = null;

export const connectDB = async (): Promise<ConnectionPool> => {
    if (pool) return pool; // si déjà connecté → réutiliser

    const dbConfig = {
        server: process.env.DB_SERVER!,
        user: process.env.DB_USER!,
        password: process.env.DB_PASSWORD!,
        database: process.env.DB_NAME!,
        
        options: {
            encrypt: true
        }
    };

    try {
        pool = await sql.connect(dbConfig);
        console.log("✔️ Connecté à SQL Server");
        return pool;
    } catch (err) {
        console.error("❌ Erreur connexion SQL:", err);
        throw err;
    }
};
