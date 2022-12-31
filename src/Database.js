import { MongoClient } from "mongodb";

const ATLAS_URI = "mongodb://localhost:27017";
const connectionString = ATLAS_URI;

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
            connect = db.db("vPost");
            console.log(`Connected to ${connect.databaseName} at ${ATLAS_URI}`)
            return callback();
        })
    },
    getDb: function () {
        return connect;
    }
};
export default Database;