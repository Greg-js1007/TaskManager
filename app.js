const taskForm = document.getElementById("form_container");

const taskList = document.getElementById("list_task"); 

const buttonEdit = document.getElementsByClassName("button-edit");

const buttonDelete = document.getElementsByClassName("button-delete");

const footer = document.getElementsByClassName("footer_container");


loadTask(); 

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const taskInput = document.getElementById("input-task"); 
    const task = taskInput.value;
    console.log(task);

    if(task) {
        taskList.append(createTaskElement(task));
        storeTaskInLocalStorage(task);
        taskInput.value = "";
    }

})

function createTaskElement(task) {
    const li = document.createElement("li");
    li.textContent = task
    li.append(createButton("❌", "delete-btn"), createButton("✏️", "edit-btn"));
    li.className = "itemTask"
    return li
}

/*
Div 
function createDivButton(){
    const divButton = document.createElement("div");
    divButton.textContent = ""
    divButton.append(createButton('delete','material-symbols-outlined', 'button-delete'), createButton('edit','material-symbols-outlined', 'button-edit'))
    divButton.className = "button-modificated"
    return divButton
}*/

function createButton(text, className1, className2) {
    const btn = document.createElement('span');
    btn.textContent = text;
    btn.classList.add(className1, className2)
    return btn
}


taskList.addEventListener("click", (event) => {
    event.preventDefault();

    if(event.target.classList.contains("delete-btn")){
        deleteTask(event.target.parentElement)
    }
    else if(event.target.classList.contains("edit-btn")){
        editTask(event.target.parentElement)
    }
});

function deleteTask(taskItem){
    if(confirm("Estas seguro de borrar este elemento?")){
        removeLocalStorage(taskItem.firstChild.textContent)
        taskItem.remove();
        updateLocalStorage();
    }
}

function editTask(taskItem){
    const newTask = prompt("Edita la tarea: ", taskItem.firstChild.textContent);
    if(newTask !== null){
        taskItem.firstChild.textContent = newTask; 
    }
    updateLocalStorage();
}

function storeTaskInLocalStorage(task){
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]")

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTask(){
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    tasks.forEach((task) => {
        taskList.appendChild(createTaskElement(task))
    });
}

function updateLocalStorage(){
    const tasks = Array.from(taskList.querySelectorAll("li")).map((li) => li.firstChild.textContent)

    localStorage.setItem("tasks", JSON.stringify(tasks))
}

function removeLocalStorage(taskContent){
    const tasks = JSON.parse(localStorage.getItem("tasks") || [])
    const updateTask = tasks.filter((task) => task !== taskContent)

    localStorage.setItem("tasks", JSON.stringify(tasks))
}

const themeToggleButton = document.getElementById("toggle_container");
const currentTheme = localStorage.getItem("theme"); 

themeToggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    const theme = document.body.classList.contains("dark-theme") ? "dark" : "light";

    localStorage.setItem("theme", theme); 

});

if(currentTheme == "dark"){
    document.body.classList.add("dark-theme")
    footer.classList.add("dark-theme")
}