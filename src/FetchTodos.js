import { Router } from "express";
import Database from "./Database";
export default () => {
    Router("/todos").get(async function (req, res) {
        const get = Database.getDb("todo");
        get
            .collection("todos")
            .find({})
            .limit(50)
            .toArray(function (err, result) {
                if (err) {
                    res.status(400).send("Error fetching todos...");
                } else {
                    console.log(result);
                    res.json(result);
                }
            });
    });
};