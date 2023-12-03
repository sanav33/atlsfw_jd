import express from "express";
import { posts_db, users_db } from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import tagsList from "../utils/tagsList.mjs";

const router = express.Router();

router.get("/tags", async (req, res) => {
  res.status(200).json(tagsList);
});

router.post("/posts/create", async (req, res) => {
  const { article_title, article_preview_image, article_link, author_id, author_name, author_pfp_link, tags } = req.body;
  if (!article_title || !article_link || !article_preview_image || !author_id || !author_name || !author_pfp_link) {
      return res.status(400).json({ success: false, message: 'Missing article information' });
  }
  try {
    await posts_db.collection('articles').insertOne({
      article_title,
      article_preview_image,
      article_link,
      author_id,
      author_name,
      author_pfp_link,
      tags,
      like_count: 0,
      save_count: 0,
    });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Get a list of 50 posts
router.get("/posts", async (req, res) => {
  try {
    // Extracting the query parameter which is a list of strings
    const tagsQuery = req.query.tags;

    // If the tags query parameter exists, split it by comma to get an array
    const tags = tagsQuery ? tagsQuery.split(",") : [];
    console.log(tags);

    const collection = posts_db.collection('articles');

    // MongoDB query to find articles which contain any of the tags in the 'tags' field
    const query = tags.length > 0 ? { tags: { $in: tags } } : {};

    const articles = await collection.find(query).toArray();

    res.status(200).json(articles);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/posts/top_liked", async (req, res) => {
  try {
    const collection = posts_db.collection('articles');
    const top_liked = await collection.find({})
      .sort({ like_count: -1 }) // Sorting in descending order
      .limit(3) // Limiting to 3 documents
      .toArray();
    res.status(200).json(top_liked);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/posts/top_saved", async (req, res) => {
  try {
    const collection = posts_db.collection('articles');
    const top_saved = await collection.find({})
      .sort({ save_count: -1 }) // Sorting in descending order
      .limit(3) // Limiting to 3 documents
      .toArray();
    res.status(200).json(top_saved);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

router.post('/posts/:user_id/:article_id/', async (req, res) => {
  console.log("trying to like/dislike an article");
  const { user_id, article_id } = req.params;

  if (!user_id) {
      return res.status(404).send({ message: "User not found!" });
  }
  if (!article_id) {
      return res.status(404).send({ message: "Article not found!" });
  }
  let arg;
  let update;
  let articles;
  if (req.query.like) {
    arg = parseInt(req.query.like);
    const { liked_articles } = req.body;
    articles = liked_articles;
    update = { $set: { liked_articles: liked_articles } }
  } else if (req.query.save) {
    arg = parseInt(req.query.save);
    const { saved_articles } = req.body;
    articles = saved_articles;
    update = { $set: { saved_articles: saved_articles }}
  }
  await users_db.collection("customer_info").updateOne({ _id: new ObjectId(user_id) }, update,
    (err, _) => {
      if (err) {
        return res.status(400).send({ success: false, message: "Article update failed!" });
      }
  });
  // Update likes based on the "like" query parameter
  if (req.query.like) {
    let like_count = 0;
    if (arg && (arg === 1 || arg === -1)) {
      await posts_db.collection("articles").updateOne({ _id: new ObjectId(article_id) }, { $inc: { like_count: arg }}, (err, _) => {
        if (err) {
          return res.status(400).send({ success: false, message: "Like action unsuccessful!" });
        }});
    } else {
      return res.status(400).send({ message: "Invalid like query!" });
    }
    return res.status(200).send({ success: true });
  }
  if (req.query.save) {
    console.log("saving");
    let save_count = 0;
    if (arg && (arg === 1 || arg === -1)) {
      await posts_db.collection("articles").updateOne({ _id: new ObjectId(article_id) }, { $inc: { save_count: arg }}, (err, _) => {
        if (err) {
          return res.status(400).send({ success: false, message: "Save action unsuccessful!" });
        }});
    } else {
      return res.status(400).send({ message: "Invalid save query!" });
    }
    return res.status(200).send({ success: true });
  }
});


export default router;
