import express from "express";
import { posts_db, users_db } from "../db/conn.mjs";

const router = express.Router();

// Get a list of 50 posts
router.get("/", async (req, res) => {
    let results = "something";

  res.send(results).status(200);
});

export default router;
