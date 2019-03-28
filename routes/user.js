const express = require('express');
const router = express.Router();

const MongoClient = require("mongodb").MongoClient;
const CONNECTION_URL = "mongodb+srv://app:app@todoapp-qmtbk.mongodb.net/test?retryWrites=true";
const DATABASE_NAME = "tododb";

router.get('/', getUser);
router.get('/:username', getUser);


function getUser(request, response) {
    let username = request.params.username;

    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            response.json(error);
        }
        database = client.db(DATABASE_NAME);
        userCollection = database.collection("user");
        console.log("Connected to `" + DATABASE_NAME + "`!");
        //console.log(userCollection.find({}));
        if (username !== undefined) {
            userCollection.findOne({username: username},(function(err, users) {
                if (err) throw err;
                client.close();
                response.json(users);
            }));
        } else {
            userCollection.find({}).toArray(function(err, users) {
                if (err) throw err;
                client.close();
                response.json(users);
            });
        }
    });
}

module.exports = router;
