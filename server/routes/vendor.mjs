import express from "express";
import { users_db } from "../db/conn.mjs";
import { ObjectId } from "mongodb";

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

        if (!hashed_email) {
            return res.status(400).send("hashed_email is required");
        }

        const collection = users_db.collection('user_login');  // replace YOUR_DB_NAME_HERE with your database name

        // Use the $set operator to update the account_type field, and upsert: false ensures we're only updating existing documents
        const result = await collection.updateOne({ hashed_email }, { $set: { account_type: 2 } });
        const customer = await users_db.collection('customer_info').findOne({ hashed_email });

        if (result.matchedCount === 0) {
            res.status(404).send("Account associated with email does not exist");
        } else {
            const vendor_init = await users_db.collection('vendor_info').findOne({ vendor_id: customer._id });
            if (!vendor_init) {
                await users_db.collection('vendor_info').insertOne({ vendor_id: customer._id, vendor_account_initialized: false })
            }
            res.status(200).send("Updated successfully");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.post("/discover/create/:vendor_id", async (req, res) => {
    try {
        // Assuming you're passing the hashed_email in the request body
        const { vendor_id } = req.params;
        const { brand_name, shop_now_link, title, intro } = req.body;

        if (!brand_name || !shop_now_link || !title || !intro) {
            return res.status(400).send("Incomplete discovery information");
        }

        const collection = users_db.collection('vendor_info');  // replace YOUR_DB_NAME_HERE with your database name
        const result = await collection.updateOne({ vendor_id: new ObjectId(vendor_id) }, { $set: { vendor_account_initialized: true, brand_name, shop_now_link, title, intro }});
        if (result.matchedCount === 0) {
            res.status(400).send("Vendor does not exist");
        } else {
            res.status(200).send("Discovery page created successfully");
        }

    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/discover/:vendor_id", async (req, res) => {
    try {
        const { vendor_id } = req.params;
        const collection = users_db.collection('vendor_info');
        const result = await collection.findOne({ vendor_id: new ObjectId(vendor_id) });
        if (!result) {
            res.status(400).send("Vendor does not exist");
        } else {
            res.status(200).send(result);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

export default router;