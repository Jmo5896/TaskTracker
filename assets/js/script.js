// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || false;

// Todo: create a function to generate a unique task id
function generateTaskId() {
  const pool = "1234567890abcdefghijklomnpqrstuvwxyz-_".split("");

  let id = [];
  for (let i = 0; i < 21; i++) {
    const randI = Math.floor(Math.random() * pool.length);
    id.push(pool[randI]);
  }
  return id.join("");
}

// Todo: create a function to create a task card
function createTaskCard(task) {}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  const taskObj = {
    title: title.val(),
    deadline: deadline.val(),
    description: description.val(),
    state: 0,
    id: generateTaskId(),
  };
  console.log("handleAddTask: ", taskObj);
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  $("#deadline").datepicker();
  addTaskBtnEL.on("click", handleAddTask);
});
