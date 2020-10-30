//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
filterOption.addEventListener("click", filterTodo);

//Functions
function addTodo(event){
    //Prevent form from submitting
    event.preventDefault();
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newToDo = document.createElement("li"); 
    newToDo.innerText = todoInput.value;
    newToDo.classList.add("todo-item");
    todoDiv.appendChild(newToDo);
    //check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class ="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class ="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //Append to list
    todoList.appendChild(todoDiv);
    //Add todo to localstorage
    saveLocalTodos(todoInput.value);
    //Clear todo input value
    todoInput.value =""; 
}

function deleteTodo(e) {
    const item = e.target;

    //Delete todo
    if(item.classList[0] === "trash-btn") {
       const todo = item.parentElement;
       //Animation
       todo.classList.add("fall");
       removeLocalTodos(todo);
       todo.addEventListener("transitioned", function(){
        todo.remove();
       });
    }

    //Check mark
    if(item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todos.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo){
    //Check if there are already items in local storage
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    console.log("hello");
      //Check if there are already items in local storage
      let todos;
      if (localStorage.getItem("todos") === null) {
          todos = [];
      }else {
          todos = JSON.parse(localStorage.getItem("todos"));
      }
      todos.forEach(function(todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const newToDo = document.createElement("li"); 
        newToDo.innerText = todo;
        newToDo.classList.add("todo-item");
        todoDiv.appendChild(newToDo);
        //check mark button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class ="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //trash button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class ="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //Append to list
        todoList.appendChild(todoDiv);
      });
}

function removeLocalTodos(todo){
    //Check if there are already items in local storage
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    }else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoindex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoindex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}