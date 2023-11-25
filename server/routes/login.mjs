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

router.get("/", async (req, res) => {
    console.log("getting login");
    res.json({ success: true });
});

router.post("/", async (req, res) => {
    console.log("got a login request");
    const { hashed_email, hashed_password } = req.body;
    console.log(hashed_email, hashed_password);
    if (!hashed_email || !hashed_password) {
        return res.status(400).json({ success: false, message: 'Missing email or password' });
    }
    const existingUser = await users_db.collection('user_login').findOne({ hashed_email: hashed_email, hashed_password: hashed_password });
    if (!existingUser) {
        console.log(hashed_email);
        console.log(hashed_password);
        return res.status(400).json({ success: false, message: 'The email-password combination is incorrect' });
    }
    const userInfo = await users_db.collection('customer_info').findOne({ hashed_email });
    if (existingUser.account_type == 2) {
        const vendor_info = await users_db.collection("vendor_info").findOne({ vendor_id: userInfo._id });
        if (vendor_info == null) {
            res.status(500).json({ success: false, message: "Vendor does not exist" });
        } else if (vendor_info.vendor_account_initialized == false) {
            userInfo.vendor_account_initialized = false;
        } else {
            userInfo.brand_name = vendor_info.brand_name;
            userInfo.title = vendor_info.title;
            userInfo.intro = vendor_info.intro;
            userInfo.shop_now_link = vendor_info.shop_now_link;
            userInfo.vendor_account_initialized = true;
        }
    }
    res.status(200).json({ success: true, account_type: existingUser.account_type, user: userInfo});
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