//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

//Event listeners
todoButton.addEventListener("click", addTodo);

//Functions
function addTodo(event){
    //Prevent form from submitting
    event.preventDefault();
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newToDo = document.createElement("li"); 
    newToDo.innerText = "hey";
    newToDo.classList.add("todo-item");
    todoDiv.appendChild(newToDo);
    //chekc mark button
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
}