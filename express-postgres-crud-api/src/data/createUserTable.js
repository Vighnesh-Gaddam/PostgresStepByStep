import pool from "../config/db.js";

const createUserTable = async () => {
    const queryText = `
        CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    
        `;

    try {
        pool.query(queryText);
        console.log("Table created successfully If not exist");
    } catch (error) {
        console.log("Error creating users table:", error);
    }
}


export default createUserTable