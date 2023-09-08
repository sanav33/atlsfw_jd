import express from "express";
import { posts_db, users_db } from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get a list of 50 posts
router.get("/posts", async (req, res) => {
  let collection = await posts_db.collection("articles");
    const options = {
        // Include the fields needed for previews in the returned documents
      projection: { _id: 1, author: 1, title: 1, preview_image: 1, content: 1, likes: 1 },
    };

  let results = await collection.find({}, options)
    .limit(50)
    .toArray();
  console.log(results);

  res.send(results).status(200);
});

router.get("/posts/:id", async (req, res) => {
  let collection = await posts_db.collection("articles");
  const query = { _id: new ObjectId(req.params.id) };
  console.log(req.params.id  + " hi stupid");
  const options = {
    // Include all fields in the returned document
    projection: { _id: 1, author: 1, title: 1, preview_image: 1, content: 1, likes: 1},
  };
  let result = await collection.findOne(query, options);
  console.log(result);
  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
})


// // Fetches the latest posts
// router.get("/latest", async (req, res) => {
//   let collection = await db.collection("posts");
//   let results = await collection.aggregate([
//     {"$project": {"author": 1, "title": 1, "tags": 1, "date": 1}},
//     {"$sort": {"date": -1}},
//     {"$limit": 3}
//   ]).toArray();
//   res.send(results).status(200);
// });

// // Get a single post
// router.get("/:id", async (req, res) => {
//   let collection = await db.collection("posts");
//   let query = {_id: ObjectId(req.params.id)};
//   let result = await collection.findOne(query);

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });

// // Add a new document to the collection
// router.post("/", async (req, res) => {
//   let collection = await db.collection("posts");
//   let newDocument = req.body;
//   newDocument.date = new Date();
//   let result = await collection.insertOne(newDocument);
//   res.send(result).status(204);
// });

// // Update the post with a new comment
// router.patch("/comment/:id", async (req, res) => {
//   const query = { _id: ObjectId(req.params.id) };
//   const updates = {
//     $push: { comments: req.body }
//   };

//   let collection = await db.collection("posts");
//   let result = await collection.updateOne(query, updates);

//   res.send(result).status(200);
// });

// // Delete an entry
// router.delete("/:id", async (req, res) => {
//   const query = { _id: ObjectId(req.params.id) };

//   const collection = db.collection("posts");
//   let result = await collection.deleteOne(query);

//   res.send(result).status(200);
// });

export default router;
