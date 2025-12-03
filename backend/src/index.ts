import express from "express";
import cors from "cors";
import { connectDB } from "./database";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend Express fonctionne !");
});

app.get("/test-db", async (req, res) => {
    try {
        const pool = await connectDB();
        const result = await pool.request().query("SELECT GETDATE() AS currentDate");
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: "Erreur DB" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("🚀 Backend lancé sur http://localhost:" + PORT);
});
