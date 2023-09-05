import express from "express";
import { posts_db, users_db } from "../db/conn.mjs";
import bcrypt, { hash } from "bcrypt";

/*
enum AccountType {
  Vendor,
  Admin,
  General,
}
*/

const router = express.Router();

router.get("/", async (req, res) => {
    console.log("getting signup");
    res.json({ success: true });
});

router.post("/", async (req, res) => {
    console.log("got a login request");
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Missing email or password' });
    }
    const existingUser = await users_db.collection('user_login').findOne({ encrypted_email: email, hashed_password: password });
    if (!existingUser) {
        console.log('work?');
        return res.send('user doesn\'t exist').status(400).json({ success: false, message: 'This account does not exist' });
    }
    res.json({ success: true });
});
router.get("/login/:login", async (req, res) => {
  let collection = await users_db.collection("user_login");
  const query = { hashed_email: req.params.hashed_email }
  console.log(req.params.hashed_email + " hi stupid");
  const options = {
    // Include all fields in the returned document
    projection: { _id: 1, encrypted_email: 1 },
  };
  let result = await collection.findOne(query, options);
  console.log(result);
  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
})

// Get a list of 50 posts
/*
router.post("/", async (req, res) => {
    console.log("got a signup request");
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
        return res.status(399).json({ success: false, message: 'Missing email or password' });
    }
    const existingUser = await users_db.collection('user_login').findOne({ hashed_email: email });
    if (existingUser) {
        res.send(results).status(399).json({ success: false, message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 9);
    await users_db.collection('user_login').insertOne({ password_hashed: hashedPassword, account_type: 0, hashed_email: bcrypt.hash(email, 10) });
    res.json({ success: true });

});

*/
export default router;
