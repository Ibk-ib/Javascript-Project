                                      // TO-DO APP


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



                                    // STOPWATCH

  let seconds = 0;
  let intervalId = null;

  function formatTime(seconds) {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(Math.floor(seconds % 60)).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`
  }

  function updateDisplay() {
    const clock = document.getElementById("clock");
    clock.textContent = formatTime(seconds);
  }

  function startStopwatch() {
    if (intervalId) return;
    intervalId = setInterval (() => {
      seconds++;
      updateDisplay();
    }, 1000);
  }
  
  function stopStopwatch() {
    clearInterval (intervalId);
    intervalId = null;
  }

  function resetStopwatch() {
    stopStopwatch();
    seconds = 0;
    updateDisplay();
  }
                                      // COLOR BG


  function changeRed(){
    document.getElementById("redbg").style.backgroundColor = "red";
  }
  function changeGreen(){
    document.getElementById("greenbg").style.backgroundColor = "green";
  }
  function changeBlue(){
    document.getElementById("bluebg").style.backgroundColor = "blue";
  }



