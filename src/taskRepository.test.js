const tasksRepository = require("./taskRepository.js");

describe("pruebas", () => {
  // prueba unitaria
  test("Get all tasks", () => {
    // Arrage
    let tasks = [];

    // Act
    tasks = tasksRepository.getAll();

    // Assert
    expect(tasks.length).toBe(2);
    expect(tasks.length == 2).toBe(true);
    expect(typeof task == "array");
  });

  //Create
  test("Create a task", () => {
    // Arrange
    const newTask = { id: 3, title: "New Task", completed: false };

    // Act
    tasksRepository.create(newTask);
    const tasks = tasksRepository.getAll();

    // Assert
    expect(tasks.length).toBe(3);
    expect(tasks).toContainEqual(newTask);
  });

  //update

  test("Update a task", () => {
    // Arrange
    const taskIdToUpdate = 1;
    const updatedTaskData = { title: "Updated Task", completed: true };

    // Act
    tasksRepository.update(taskIdToUpdate, updatedTaskData);
    const tasks = tasksRepository.getAll();

    // Assert
    const updatedTask = tasks.find((task) => task.id === taskIdToUpdate);
    expect(updatedTask.title).toBe(updatedTaskData.title);
    expect(updatedTask.completed).toBe(updatedTaskData.completed);
  });

  //delete
  test("Delete a task", () => {
    // Arrange
    const taskIdToDelete = 1;

    // Act
    tasksRepository.delete(taskIdToDelete);
    const tasks = tasksRepository.getAll();

    // Assert
    expect(tasks.length).toBe(2);
    expect(tasks.find((task) => task.id === taskIdToDelete)).toBeUndefined();
  });
});
