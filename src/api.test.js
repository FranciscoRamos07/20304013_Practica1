const request = require("supertest");
const app = require("./api");

test("GET /tasks returns all tasks", async () => {
  const response = await request(app).get("/tasks");
  expect(response.status).toBe(200);
  expect(response.body).toHaveLength(2); // Assuming there are 2 tasks initially
});

test("POST /tasks creates a new task", async () => {
  // Arrange
  const newTask = { title: "New Task", completed: false };

  // Act
  const response = await request(app).post("/tasks").send(newTask);

  // Assert
  expect(response.status).toBe(201); // Assuming you return 201 for successful creation
  expect(response.body.title).toBe(newTask.title);
  expect(response.body.completed).toBe(newTask.completed);
  expect(response.body).toHaveProperty("id"); // Assuming the response includes the newly created task's id

  // Verify that the total number of tasks has increased
  const allTasksResponse = await request(app).get("/tasks");
  expect(allTasksResponse.body).toHaveLength(3); // Assuming there were initially 2 tasks
});

test("PUT /tasks/:id updates an existing task", async () => {
  // Arrange
  const taskIdToUpdate = 1; // Assuming there is a task with ID 1
  const updatedTaskData = { title: "Updated Task", completed: true };

  // Act
  const response = await request(app)
    .put(`/tasks/${taskIdToUpdate}`)
    .send(updatedTaskData);

  // Assert
  expect(response.status).toBe(200); // Assuming you return 200 for successful update
  expect(response.body.title).toBe(updatedTaskData.title);
  expect(response.body.completed).toBe(updatedTaskData.completed);

  // Verify that the task was actually updated in the database
  const updatedTaskResponse = await request(app).get(
    `/tasks/${taskIdToUpdate}`
  );
  expect(updatedTaskResponse.body.title).toBe(updatedTaskData.title);
  expect(updatedTaskResponse.body.completed).toBe(updatedTaskData.completed);
});

test("GET /tasks/:id returns a specific task", async () => {
  // Arrange
  const taskIdToRetrieve = 1; // Assuming there is a task with ID 1

  // Act
  const response = await request(app).get(`/tasks/${taskIdToRetrieve}`);

  // Assert
  expect(response.status).toBe(200); // Assuming you return 200 for successful retrieval
  expect(response.body.id).toBe(taskIdToRetrieve);

  // Optionally, you can check other properties of the retrieved task
  expect(response.body).toHaveProperty("title");
  expect(response.body).toHaveProperty("completed");
});

test("DELETE /tasks/:id deletes an existing task", async () => {
  // Arrange
  const taskIdToDelete = 1; // Assuming there is a task with ID 1

  // Act
  const response = await request(app).delete(`/tasks/${taskIdToDelete}`);

  // Assert
  expect(response.status).toBe(204); // Assuming you return 204 for successful deletion

  // Verify that the task was actually deleted by attempting to retrieve it
  const deletedTaskResponse = await request(app).get(
    `/tasks/${taskIdToDelete}`
  );
  expect(deletedTaskResponse.status).toBe(404); // Assuming you return 404 for not found
});
