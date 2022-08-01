import { MongoClient } from "mongodb";
const connectionString = process.env.ATLAS_URI;
const client = new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let connect;

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
}
export default Database;