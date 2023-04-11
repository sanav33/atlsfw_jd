import { MongoClient } from "mongodb";
import { getMongoPasscode } from "../password.mjs"
const password = getMongoPasscode();
const uri = "mongodb+srv://sverma:"+ password + "@atlsfw.dgkxf1k.mongodb.net/posts?retryWrites=true&w=majority";

const client = new MongoClient(uri);

let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("posts");

export default db;