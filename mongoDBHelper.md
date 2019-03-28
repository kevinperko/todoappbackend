#API Doc

```hint
## HINT ##
GET calls without parameters (e.g. http://localhost:3000/user) 
return all available documents in the collection
```
##User API
- ```GET: http://localhost:3000/user```
- ```GET: http://localhost:3000/user/:username```
- ```GET: http://localhost:3000/user?username=kevin```

##List API
- ```GET: http://localhost:3000/list```
- ```GET: http://localhost:3000/list/:listId```

####POST: http://localhost:3000/list
- Does an upsert (insert or update)

```json
{
  "id": "1",
  "taskId": 1
  ,"users": [
    {"username": "kevin"},
    {"username": "juergen"}
  ]
}
```

####POST: http://localhost:3000/task
- Does an upsert (insert or update)

```json
{
"id": 1,
"listId": "1",
"title": "Task 1",
"description": "Task 1 Description",
"dueDate": "2019-01-04T23:00:00.000Z",
"isDone": false
}
```

##Task API
- ```GET: http://localhost:3000/task```
- ```GET: http://localhost:3000/list/:taskId```