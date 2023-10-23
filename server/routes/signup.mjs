import express from "express";
import { posts_db, users_db } from "../db/conn.mjs";

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
    const {hashed_email, encrypted_email, hashed_password, first_name, last_name, account_type, username, birthday, gender, phone_number, subscribed_to_news } = req.body;
    console.log(hashed_email, hashed_password);
    if (!hashed_email || !hashed_password) {
        return res.status(400).json({ success: false, message: 'Missing email or password' });
    }
    const existingUser = await users_db.collection('user_login').findOne({ hashed_email: hashed_email });
    if (existingUser) {
        return res.status(400).json({ success: false, message: 'Email already registered' });
    }
    if (encrypted_email == null || first_name == null || last_name == null || account_type == null || username == null || birthday == null || gender == null || phone_number == null || subscribed_to_news == null) {
        return res.status(400).json({success: false, message: "Missing certain attributes"})
    }
    await users_db.collection('user_login').insertOne({ hashed_password: hashed_password, account_type: 3, hashed_email: hashed_email });
    await users_db.collection('customer_info').insertOne({
        hashed_email: hashed_email,
        encrypted_email: encrypted_email,
        first_name: first_name,
        account_type: account_type,
        last_name: last_name,
        username: username,
        gender: gender,
        phone_number: phone_number,
        subscribed_to_news: subscribed_to_news,
        birthday: birthday,
        liked_articles: []
    });

    const userInfo = await users_db.collection("customer_info").findOne({hashed_email: hashed_email});
    userInfo._id = userInfo._id.toString();

    res.status(200).json({ success: true, user: userInfo });
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