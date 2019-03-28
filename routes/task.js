const express = require('express');
const router = express.Router();

const MongoClient = require("mongodb").MongoClient;
const CONNECTION_URL = "mongodb+srv://app:app@todoapp-qmtbk.mongodb.net/test?retryWrites=true";
const DATABASE_NAME = "tododb";

router.get('/', getTask);
router.get('/:id', getTask);
router.post('/', addUpdateTask);

function getTask(request, response) {
    let taskId = request.params.id;

    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            response.json(error);
        }
        database = client.db(DATABASE_NAME);
        userCollection = database.collection("task");
        
        if (taskId !== undefined) {
            userCollection.findOne({id: taskId},(function(err, tasks) {
                if (err) throw err;
                client.close();
                response.json(tasks);
            }));
        } else {
            userCollection.find({}).toArray(function(err, tasks) {
                if (err) throw err;
                client.close();
                response.json(tasks);
            });
        }
    });
}

function addUpdateTask(request, response) {
    let taskId = request.body.id;
    let listId = request.body.listId;
    let title = request.body.title;
    let description = request.body.description;
    let dueDate = request.body.dueDate;
    let isDone = request.body.isDone;

    let queryFilter = {id: taskId};

    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            response.json(error);
        }
        database = client.db(DATABASE_NAME);
        userCollection = database.collection("task");

        userCollection.findOne(queryFilter).then(res => {
            let currTask = res;
            console.log(currTask);

            if (currTask === null) {
                currTask = {
                    id: taskId,
                    listId: listId,
                    title: title,
                    description: description,
                    dueDate: dueDate,
                    isDone: isDone
                };
            } else {
                currTask.listId = listId;
                currTask.title = title;
                currTask.description = description;
                currTask.dueDate = dueDate;
                currTask.isDone = isDone;
            }

            console.log(currTask);

            userCollection.updateOne(
                queryFilter,
                {$set: currTask},
                {upsert: true}
            ).then(res => {
                client.close();
            });
        });
        response.status(200).end();
    });
}

module.exports = router;
