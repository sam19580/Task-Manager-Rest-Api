Task Manager API
This Task Manager API provides a RESTful interface to manage tasks. Users can perform various operations such as retrieving all tasks, retrieving a single task by its ID, creating a new task, updating an existing task, and deleting a task.

Endpoints
1. Retrieve all tasks
Method: GET
Endpoint: /tasks
Description: Retrieve a list of all tasks.
2. Retrieve a single task by ID
Method: GET
Endpoint: /tasks/:id
Description: Retrieve information about a specific task identified by its unique ID.
3. Create a new task
Method: POST
Endpoint: /tasks
Description: Create a new task with the provided details.
4. Update an existing task by ID
Method: PUT
Endpoint: /tasks/:id
Description: Update an existing task with the specified ID.
5. Delete a task by ID
Method: DELETE
Endpoint: /tasks/:id
Description: Delete a task identified by its unique ID.
