let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");

function getTodosFromLocalStorage() {
    let stringifiedTodos = localStorage.getItem("todoList");
    let parsedTodos = JSON.parse(stringifiedTodos);

    if (parsedTodos === null) {
        return [];
    } else {
        return parsedTodos;
    }
}

let todoList = getTodosFromLocalStorage()
let todoCount = todoList.length

saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

addTodoButton.onclick = function() {
    todoCount = todoCount + 1

    let todoUserInput = document.getElementById("todoUserInput")
    let todoUserInputValue = todoUserInput.value

    if (todoUserInputValue === "") {
        alert("Enter a valid Input");
        return;
    }

    let newTodo = {
        text: todoUserInputValue,
        uniqueNo: todoCount,
        isChecked: false
    }

    createAndAppendTodo(newTodo)
    todoList.push(newTodo);
    console.log(todoList);
    todoUserInput.value = ""
}

function onTodoStatusChange(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");

    let todoObjectIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo

        if (eachTodoId === todoId) {
            return true;
        } else {
            return false
        }
    })
    let todoObject = todoList[todoObjectIndex]

    if (todoObject.isChecked === true) {
        todoObject.isChecked = false
    } else {
        todoObject.isChecked = true;
    }
}

function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);
    // console.log(todoId);
    // console.log(todoList);
    let deleteElementIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    })
    todoList.splice(deleteElementIndex, 1);
}

function createAndAppendTodo(todo) {
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoElement.id = todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId)
    }
    inputElement.checked = todo.isChecked
    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("label-container", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    labelElement.id = labelId
    if (todo.isChecked === true) {
        labelElement.classList.add("checked")
    }
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function() {
        onDeleteTodo(todoId)
    }
    deleteIconContainer.appendChild(deleteIcon);
}

for (let todo of todoList) {
    createAndAppendTodo(todo);
}