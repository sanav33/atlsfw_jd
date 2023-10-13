import express from "express";
import { posts_db, users_db } from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

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

// router.get("/posts/:id", async (req, res) => {
//   let collection = await posts_db.collection("articles");
//   const query = { _id: new ObjectId(req.params.id) };
//   console.log(req.params.id  + " hi stupid");
//   const options = {
//     // Include all fields in the returned document
//     projection: { _id: 1, author_id: 1, author_name: 1, like_count: 1, author_pfp_link: 1, article_title: 1, article_preview_image: 1, article_link: 1 },
//   };
//   let result = await collection.findOne(query, options);
//   console.log(result);
//   if (!result) res.send("Not found").status(404);
//   else {
//     res.redirect(result.article_link);
//   };
// })

router.post('/posts/:user_id/:article_id/', async (req, res) => {
  console.log("trying to like/dislike an article");
  const { user_id, article_id } = req.params;
  const like = parseInt(req.query.like);
  const { liked_articles } = req.body;

  if (!user_id) {
      return res.status(404).send({ message: "User not found!" });
  }
  if (!article_id) {
      return res.status(404).send({ message: "Article not found!" });
  }

  await users_db.collection("customer_info").updateOne({ _id: new ObjectId(user_id) }, { $set: { liked_articles: liked_articles }},
    (err, _) => {
      if (err) {
        return res.status(400).send({ success: false, message: "Liked article update failed!" });
      }
  });

  // Update likes based on the "like" query parameter
  let like_count = 0;
  if (like && (like === 1 || like === -1)) {
      await posts_db.collection("articles").updateOne({ _id: new ObjectId(article_id) }, { $inc: { like_count: like }}, (err, _) => {
      if (err) {
        return res.status(400).send({ success: false, message: "Like action unsuccessful!" });
      }});
  } else {
      return res.status(400).send({ message: "Invalid like query!" });
  }

  return res.status(200).send({ success: true });
});


export default router;
