import { MongoClient } from "mongodb";

const uri =  process.env.MONGO_URI;
const client  = new MongoClient(uri, {maxPoolSize: 20});

let db;

export async function getDB() {
    if(!db){
        await client.connect();
        db = client.db('ClaseSemana11');
        console.log("Conectado a Mongo")
    }
    return db;
}
export async function closeDB() {
    await client.close();
}