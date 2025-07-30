import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool  from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import errorhandling from "./middlewares/errorHandler.js";
import createUserTable from "./data/createUserTable.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

//routes
app.get("/", async (req, res) => {
    try {
        console.log("start");
        const result = await pool.query("SELECT current_database()");
        console.log(`The database is ${result.rows[0].current_database}`);
        res.send(`The database is ${result.rows[0].current_database}`);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).send("Database connection failed");
    }
});

app.use("/api", userRoutes);

//error handler
app.use(errorhandling);

//create Table before starting server
createUserTable();

// server running
app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
})


// docker run  --name postgres-db -e POSTGRES_PASSWORD=vicky -p 5432:5432 -d postgres
// docker run
// --name postgres-db {it is name of db}
// -e POSTGRES PASSWORD= {password of db}
// -p 5432:5432 {port of db}
// -d postgres