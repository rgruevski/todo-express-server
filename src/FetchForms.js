import { Router } from "express";
import Database from "./Database";
export default () => {
    Router("/forms").get(async function (req, res) {
        const get = Database.getDb("form");
        get
            .collection("forms")
            .find({})
            .limit(50)
            .toArray(function (err, result) {
                if (err) {
                    res.status(400).send("Error fetching forms...");
                } else {
                    console.log(result);
                    res.json(result);
                }
            });
    });
};