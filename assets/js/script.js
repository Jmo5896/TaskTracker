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
function createTaskCard({ title, deadline, description, state, id }) {
  // Task (change to "Task in Progress..." or "Task Completed!")
  let status = "PLACEHOLDER";

  if (state === "warning-card") {
    status = "Deadline is Coming Up";
  } else if (state === "overdue-card") {
    status = "Task is OverDue";
  } else {
    status = "Task";
  }
  return `
              <div class="card task-card ${state}">
                <div class="card-header">
                ${status} | Deadline: ${deadline}
                </div>
                <div class="card-body">
                  <h5 class="card-title">${title}</h5>
                  <p class="card-text">${description}</p>
                  <button id="${id}" class="btn btn-danger btn-remove">Remove Task</button>
                </div>
              </div>
`;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  $("#todo-cards").empty();
  $("#in-progress-cards").empty();
  $("#done-cards").empty();
  for (const task of taskList) {
    console.log(task);
    $(task.column).append(createTaskCard(task));
  }
}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();
  const taskObj = {
    title: title.val(),
    deadline: deadline.val(),
    description: description.val(),
    state: "",
    column: "#todo-cards",
    id: generateTaskId(),
  };
  if (taskObj.title && taskObj.deadline && taskObj.description) {
    taskList.push(taskObj);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    renderTaskList();
    title.val(null);
    deadline.val(null);
    description.val(null);
  }
  //   console.log("handleAddTask: ", taskObj);
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  const taskId = event.target.id;
  console.log(taskId);
  taskList = taskList.filter((tasks) => tasks.id !== taskId);
  localStorage.setItem("tasks", JSON.stringify(taskList));
  renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  $("#deadline").datepicker();

  $("#todo-cards").sortable({
    connectWith: "#in-progress-cards",
  });
  $("#in-progress-cards").sortable();
  $("#done-cards").sortable();

  //   $(".task-card").draggable({ opacity: 0.5, scope: "drop" });

  //   $("#todo-cards").droppable({ accept: ".task-card", scope: "drop" });
  //   .droppable({
  //     drop: function () {
  //       alert("I am dropped");
  //     },
  //   });
  //   $("#in-progress-cards").draggable();
  //   $("#in-progress-cards").droppable({ accept: ".task-card", scope: "drop" });
  //   .droppable({
  //     drop: function () {
  //       alert("I am dropped");
  //     },
  //   });
  //   $("#done-cards").draggable();
  //   $("#done-cards").droppable({ accept: ".task-card", scope: "drop" });
  //   .droppable({
  //     drop: function () {
  //       alert("I am dropped");
  //     },
  //   });
  addTaskBtnEL.on("click", handleAddTask);
  columnsEL.on("click", ".btn-remove", handleDeleteTask);
  renderTaskList();
});
