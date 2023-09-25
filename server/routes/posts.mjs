import express from "express";
import { posts_db, users_db } from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get a list of 50 posts
router.get("/posts", async (req, res) => {
  let collection = await posts_db.collection("articles");
  let results = await collection.find({})
    .toArray();
  console.log(results);

  res.send(results).status(200);
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

  console.log("user_id: ", user_id, "article_id: ", article_id, "like: ", like, "liked_articles: ", liked_articles);
  if (!user_id) {
      return res.status(404).send({ message: "User not found!" });
  }
  if (!article_id) {
      return res.status(404).send({ message: "Article not found!" });
  }

  const result = await users_db.collection("customer_info").updateOne({ _id: new ObjectId(user_id) }, { $set: { liked_articles: liked_articles }});
  console.log(result);

  const options = {
    // Include all fields in the returned document
    projection: { like_count: 1 },
  };

  // Update likes based on the "like" query parameter
  let like_count = 0;
  if (like && (like === 1 || like === -1)) {
      like_count = await posts_db.collection("articles").updateOne({ _id: new ObjectId(article_id) }, { $inc: { like_count: like }});
  } else {
      return res.status(400).send({ message: "Invalid like query!" });
  }
  console.log(like_count);

  return res.send({ like_count: like_count });
});


export default router;
