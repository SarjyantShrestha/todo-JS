let addBtn = document.getElementById("btn-add");
let todoInput = document.getElementById("todo-input");
let container = document.querySelector(".container");
let todoList;

window.onload = function () {
  todoInput.value = "";
  searchInput.value = "";
};

function saveTodo() {
  let todos = [];
  document.querySelectorAll(".todo-list").forEach((todo) => {
    todos.push(todo.innerText);
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

function createTodo(todoText) {
  let newTodo = document.createElement("div");
  newTodo.classList.add("todo-list");

  let todoParagraph = document.createElement("p");
  todoParagraph.id = "todo";
  todoParagraph.textContent = todoText;

  let delBtn = document.createElement("button");
  let editBtn = document.createElement("button");

  let delIcon = document.createElement("i");
  delIcon.classList.add("fa-regular", "fa-trash-can");
  delBtn.appendChild(delIcon);
  delBtn.id = "btn-del";

  let editIcon = document.createElement("i");
  editIcon.classList.add("fa-regular", "fa-pen-to-square");
  editBtn.appendChild(editIcon);
  editBtn.id = "btn-edit";

  // Delete function
  delBtn.addEventListener("click", () => {
    container.removeChild(newTodo);
    saveTodo();
  });

  // Edit function
  editBtn.addEventListener("click", () => {
    let editInput = document.createElement("input");
    editInput.classList.add("edit-input");
    editInput.type = "text";
    editInput.value = todoParagraph.textContent;

    //replace paragraph with input
    newTodo.replaceChild(editInput, todoParagraph);
    saveTodo();

    //Enter to set new todo edit
    editInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        todoParagraph.textContent = editInput.value;
        newTodo.replaceChild(todoParagraph, editInput);
        saveTodo();
      }
    });

    //also set new todo edit if out of focus.
    editInput.addEventListener("blur", () => {
      todoParagraph.textContent = editInput.value;
      newTodo.replaceChild(todoParagraph, editInput);
      saveTodo();
    });
  });

  newTodo.appendChild(todoParagraph);
  newTodo.appendChild(delBtn);
  newTodo.appendChild(editBtn);

  // Reset input field
  container.appendChild(newTodo);
  todoInput.value = "";
}

function addTodo() {
  let todoText = todoInput.value.trim();

  if (todoText === "") {
    alert("Please enter a todo.");
    return;
  }

  createTodo(todoText);
  saveTodo();

  //for Search
  todoList = document.querySelectorAll(".todo-list");
}

// Hit enter to add to the todo
todoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});

addBtn.addEventListener("click", addTodo);

let searchInput = document.getElementById("todo-search");
let searchText;

searchInput.addEventListener("keyup", () => {
  searchText = searchInput.value.toLowerCase();
  todoList.forEach((item) => {
    if (item.textContent.toLowerCase().includes(searchText)) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
});
