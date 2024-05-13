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
function createTaskCard({ title, deadline, description, id }) {
  // Task (change to "Task in Progress..." or "Task Completed!")
  let status = "PLACEHOLDER";
  let state = "";
  const now = dayjs();
  const dDate = dayjs(deadline).diff(now) / 1000 / 60 / 60 / 24;

  //   console.log(dDate);

  if (dDate <= 1 && dDate >= 0) {
    status = "Deadline is Coming Up";
    state = "warning-card";
  } else if (dDate < 0) {
    status = "Task is OverDue";
    state = "overdue-card";
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
  for (const task of taskList.sort((a, b) => a.order - b.order)) {
    // console.log(task);
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
    order: taskList.length
      ? taskList.filter((obj) => obj.column === "#todo-cards").length
      : 0,
    column: "#todo-cards",
    // column: "#in-progress-cards",
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
  //   console.log(taskId);
  taskList = taskList.filter((tasks) => tasks.id !== taskId);
  localStorage.setItem("tasks", JSON.stringify(taskList));
  renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  //   console.log("handleDrop: ");
  //   console.log(event.target);
  //   console.log(taskList);
  if (event.target) {
    const newCol = `#${event.target.id}`;

    const items = $(newCol).children();
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const id = $(item).find(".btn-remove").attr("id");
      const taskIndex = taskList.findIndex((obj) => obj.id === id);
      taskList[taskIndex] = {
        ...taskList[taskIndex],
        column: newCol,
        order: i,
      };
      localStorage.setItem("tasks", JSON.stringify(taskList));
      //   console.log();
    }
  }
  //   console.log(items);
  //   console.log(ui);
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  $("#deadline").datepicker();

  $("#todo-cards, #in-progress-cards, #done-cards").sortable({
    connectWith: ".column",
    dropOnEmpty: true,
    update: handleDrop,
  });
  // .disableSelection();

  addTaskBtnEL.on("click", handleAddTask);
  columnsEL.on("click", ".btn-remove", handleDeleteTask);
  renderTaskList();
});
