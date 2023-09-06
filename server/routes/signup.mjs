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

router.get("/signup", async (req, res) => {
    console.log("getting signup");
    res.json({ success: true });
});

router.post("/signup", async (req, res) => {
    console.log("got a signup request");
    const { email, password, first_name, last_name, username, birthday, gender, phone_number, subscribed_to_news } = req.body;
    console.log(email, password);
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Missing email or password' });
    }
    const hashed_email = bcrypt.hash(email, 10);
    const existingUser = await users_db.collection('user_login').findOne({ encrypted_email: email });
    if (existingUser) {
        return res.status(400).json({ success: false, message: 'Email already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    await users_db.collection('user_login').insertOne({ password_hashed: hashedPassword, account_type: 2, hashed_email: hashed_email, encrypted_email: email });
    await users_db.collection('customer_info').insertOne({
        first_name: first_name,
        account_type: AccountType.General,
        hashed_email: hashed_email,
        encrypted_email: "",
        last_name: last_name,
        username: username,
        gender: gender,
        phone_number: phone_number,
        subscribed_to_news: subscribed_to_news,
        birthday: birthday
    });
    res.json({ success: true });
});
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
