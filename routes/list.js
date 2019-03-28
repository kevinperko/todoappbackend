const express = require('express');
const router = express.Router();

const MongoClient = require("mongodb").MongoClient;
const CONNECTION_URL = "mongodb+srv://app:app@todoapp-qmtbk.mongodb.net/test?retryWrites=true";
const DATABASE_NAME = "tododb";

router.get('/', getList);
router.get('/:id', getList);
router.post('/', addUpdateList);

function getList(request, response) {
    let listId = request.params.id;

    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        userCollection = database.collection("list");

        if (listId !== undefined) {
            userCollection.findOne({id: listId},(function(err, lists) {
                if (err) throw err;
                client.close();
                response.json(lists);
            }));
        } else {
            userCollection.find({}).toArray(function(err, lists) {
                if (err) throw err;
                client.close();
                response.json(lists);
            });
        }
    });
}

function addUpdateList(request, response) {
    let listId = request.body.id;
    let taskId = request.body.taskId;
    let users = request.body.users;

    let queryFilter = {id: listId};


    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            response.json(error);
        }
        database = client.db(DATABASE_NAME);
        userCollection = database.collection("list");

        userCollection.findOne(queryFilter).then(res => {
            let currList = res;
            console.log(currList);

            if (currList === null) {
                currList = {
                    id: listId,
                    taskId: taskId,
                    users:users
                };
            } else {
                currList.taskId = taskId;
                currList.users = users;
            }

            console.log(currList);

            userCollection.updateOne(
                queryFilter,
                {$set: currList},
                {upsert: true}
            ).then(res => {
                client.close();
            });
        });
        response.status(200).end();
    });
}

module.exports = router;
