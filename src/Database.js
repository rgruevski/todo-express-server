import { env } from 'process';
import { MongoClient } from "mongodb";

const connectionString = "mongodb://localhost:27017";

let connect;

const client = new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Database = {
    connectToServer: function (callback) {
        client.connect(function (err, db) {
            if (err || !db) {
                return callback(err);
            }
            connect = db.db("todo");
            console.log(`Connected to ${connect.databaseName}`)
            return callback();
        })
    },
    getDb: function () {
        return connect;
    }
};
export default Database;