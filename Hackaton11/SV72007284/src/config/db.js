const { MongoClient} = require('mongodb');
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {maxPoolSize:20});

let db;

async function getDB() {
    if(!db){
        await client.connect();
        db= client.db(process.env.DB_NAME)
        console.log(`Base de datos "${process.env.DB_NAME}" conectada`)
    }
    return db;
}

async function closeDB() {
    await  client.close();
    db = null;
    console.log("Conexión cerrada");
}

module.exports={getDB, closeDB}