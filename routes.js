import { Router } from "express";
import Database from "./conn";
const routes = Router();
routes.route("/todos").get(async function (req, res) {
    const get = Database.getDb();
    get
        .collection("todos")
        .find({})
        .limit(50)
        .toArray(function (err, result) {
            if (err) {
                res.status(400).send("Error fetching todos...");
            } else {
                res.json(result);
            }
        });
});