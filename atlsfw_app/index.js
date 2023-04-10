import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://sverma:<passcode>@atlsfw.dgkxf1k.mongodb.net/posts?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("posts");
    const articles = database.collection("articles");

    // Query for a movie that has the title 'The Room'
    const query = {};

    const options = {
      // sort matched documents in descending order by rating
      // Include only the `title` and `imdb` fields in the returned document
      projection: { _id: 0, author: 1 },
    };

    const article = await articles.findOne(query, options);

    // since this method returns the matched document, not a cursor, print it directly
    console.log(article);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
