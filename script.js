// function addTask() {
//   const input = document.getElementById("taskInput");
//   const task = input.value.trim();

//   if (task === "") {
//     alert("Please enter a task.");
//     return;
//   }

//   const li = document.createElement("li");
//   li.textContent = task;

//   const delBtn = document.createElement("button");
//   delBtn.textContent = "X";
//   delBtn.onclick = function () {
//     li.remove();
//   };

//   li.appendChild(delBtn);
//   document.getElementById("taskList").appendChild(li);

//   input.value = ""; // clear input
// }


window.onload = function(){
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => displayTask(task));
};

function addTask(){
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (text === ""){
    alert("Please enter a task")
    return;
  }
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  //  Check for duplicates
  const duplicate = tasks.some(task => task.text.toLowerCase() === text.toLowerCase());
  if (duplicate) {
    alert("Task already exists boss!");
    return;
  }
  
  const task = {text, completed: false};
  saveTask(task);
  displayTask(task);
  input.value = "";
}
function saveTask (task){
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTask(task){
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;

  checkbox.onchange = function (){
    task.completed = checkbox.checked;
    updateTask(task);
    li.classList.toggle("completed", task.completed);
  }

  const span = document.createElement("span");
  span.textContent = task.text;
  span.style.flexGrow = "1";

  const delbtn = document.createElement("button");
  delbtn.textContent = "X";
  delbtn.onclick = function(){
    li.remove();
    deleteTask(task);
  };

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(delbtn);
  li.classList.toggle("completed", task.completed);
  document.getElementById("taskList").appendChild(li);
}

  function updateTask(updatedTask){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.map(task => 
      task.text === updatedTask.text ? updatedTask : task
     );
    
    tasks = localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function deleteTask(taskToDelete) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.text !== taskToDelete.text);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function changeRed(){
    document.getElementById("redbg").style.backgroundColor = "red";
  }
  function changeGreen(){
    document.getElementById("greenbg").style.backgroundColor = "green";
  }
  function changeBlue(){
    document.getElementById("bluebg").style.backgroundColor = "blue";
  }