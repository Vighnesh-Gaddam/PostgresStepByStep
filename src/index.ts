// //write a function to create a users table in your database
// import { Client } from 'pg'

// const client = new Client({
//     //   host: 'my.database-server.com',
//     //   port: 5334,
//     //   database: 'database-name',
//     //   user: 'database-user',
//     //   password: 'secretpassword!!',
//     connectionString: 'postgresql://neondb_owner:npg_2cMA9zqLtDYi@ep-empty-hat-a12xt0su-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
// })


// async function createUsersTable() {

//     await client.connect()
//     const result = await client.query(`
        
//         CREATE TABLE users (
//             id SERIAL PRIMARY KEY,
//             username VARCHAR(50) UNIQUE NOT NULL,
//             email VARCHAR(255) UNIQUE NOT NULL,
//             password VARCHAR(255) NOT NULL,
//             created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//         );
        
//     `)
//     console.log(result)
// }

// async function enterDataIntoUsersTable() {

//     // await client.connect()
//     const result = await client.query(`

//         INSERT INTO users (username, email, password) VALUES
//         ('user1', 'a0m8e@example.com', 'password1'),
//         ('user2', 'b0tL1@example.com', 'password2'),
        
//     `)
//     console.log(result)
// }


// createUsersTable()
// enterDataIntoUsersTable()




import { Client } from 'pg';

// Async function to insert data into a table
async function insertData() {
  const client = new Client({
     connectionString: 'postgresql://neondb_owner:npg_2cMA9zqLtDYi@ep-empty-hat-a12xt0su-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
  });

  try {
    await client.connect(); // Ensure client connection is established
    const insertQuery = "INSERT INTO users (username, email, password) VALUES ('username2', 'user3@example.com', 'user_password');";
    const res = await client.query(insertQuery);
    console.log('Insertion success:', res); // Output insertion result
  } catch (err) {
    console.error('Error during the insertion:', err);
  } finally {
    await client.end(); // Close the client connection
  }
}

insertData();