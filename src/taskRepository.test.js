const tasksRepository = require("./taskRepository");

describe("pruebas", () => {
  //pruebas unitarias
  test("Get all tasks", () => {
    //arrange
    let tasks = [];

    //act
    tasks = tasksRepository.getAll();

    //assert
    expect(tasks.length).toBe(2);
    expect(tasks.length == 2).toBe(true);
  });
  test("Get one by id", () => {
    //arrange
    let tasks = {};

    //act
    tasks = tasksRepository.getById(1);

    //assert

    expect(tasks.title == "Task 1").toBe(true);
  });
  test("Create task", () => {
    //Arrange
    let tasks = [];

    //Act
    tasksRepository.createTask({
      id: 3,
      description: "description",
      title: "title",
    });

    //Assert
    expect(tasksRepository.getAll().length).toBe(3);
  });
  test("Delete task", () => {
    //Arrange
    let tasks = [];
    //Act
    tasksRepository.deleteTask(2);

    //Assert
    expect(tasksRepository.getAll().length).toBe(2);
  });
  test("Update a task", () => {
    // Arrage
    let tasks = [];
    // Act
    tasks = tasksRepository.updateTask(3, {
      id: 3,
      title: "title",
      description: "description",
    });
    // Assert
    expect(tasks.title == "title").toBe(true);
  });
});
