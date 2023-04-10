import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://sverma:<passcode>@atlsfw.dgkxf1k.mongodb.net/posts?retryWrites=true&w=majority";

const allArticleClient = new MongoClient(uri);
const singleArticleClient = new MongoClient(uri);

/**
 * This async function finds all the articles in the database and returns their article id, author, preview image, title for previewing the articles in a list format.
 * @returns an async list of articles present in the database
 */
async function pullAllArticlesPreview() {
  try {
    const database = allArticleClient.db("posts");
    const articles = database.collection("articles");
    //Store list of articles
    const allArticles = []
    // Specific filter for the query. If empty, then it finds all.
    const query = {};

    const options = {
      // Include the fields needed for previews in the returned documents
      projection: { _id: 1, author: 1, title: 1, preview_image: 1 },
    };

    const cursor = await articles.find(query, options);

    await cursor.forEach(article => {
      allArticles.push(article)
    });

    return allArticles
  } finally {
    allArticleClient.close()
  }
}

/**
 * 
 * @param {*} id refers to the article id that we are performing a search one.
 * @returns an article object with the corresponding id. -1 if nothing was found.
 */
async function findArticleWithId(id) {
  try {
    const database = singleArticleClient.db("posts");
    const articles = database.collection("articles");

    // Specific filter for the query. If empty, then it finds all.
    const query = { _id : id };

    const options = {
      // Include all fields in the returned document
      projection: { _id: 1, author: 1 ,title: 1, preview_image: 1, content: 1},
    };

    const article = await articles.findOne(query, options);
    if (article == null) {
      return -1;
    }
    return article
  } finally {
    singleArticleClient.close()
  }
}

