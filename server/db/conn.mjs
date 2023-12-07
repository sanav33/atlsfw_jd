import { MongoClient } from "mongodb";
import getMongoPasscode from "../password.mjs";

const uri = "mongodb+srv://atlsfw:" + getMongoPasscode() + "@cluster0.tng4t4h.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let posts_db = conn.db("posts");
let users_db = conn.db("users");

export { posts_db, users_db };
