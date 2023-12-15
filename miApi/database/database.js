const mysql2 = require('mysql2');
require('dotenv').config({
  path: "../.env"
})

/*-------------------------
    CREACION DE LA CONEXION
---------------------------*/

const db = mysql2.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB
}).promise();

/*-------------------------
    IFFE AUTOINVOCADORA PARA TESTEAR: 
    cd database
    node database.js
---------------------------*/

/* (
 async function test(){
  const [resultado] = await db.query(`SELECT * FROM alumnado`);
  await db.end();
  console.log(resultado);
  }
)(); */ 

module.exports=db;