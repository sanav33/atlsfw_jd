import express from "express";
import { users_db } from "../db/conn.mjs";

/*
enum AccountType {
  Vendor,
  Admin,
  General,
}
*/

const router = express.Router();

router.post("/vendor", async (req, res) => {
    try {
        // Assuming you're passing the hashed_email in the request body
        const { hashed_email } = req.body;
        console.log(hashed_email);

        if (!hashed_email) {
            return res.status(400).send("hashed_email is required");
        }

        const collection = users_db.collection('user_login');  // replace YOUR_DB_NAME_HERE with your database name

        // Use the $set operator to update the account_type field, and upsert: false ensures we're only updating existing documents
        const result = await collection.updateOne({ hashed_email }, { $set: { account_type: 2 } });

        if (result.matchedCount === 0) {
            res.status(404).send("Account associated with email does not exist");
        } else {
            res.status(200).send("Updated successfully");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

export default router;