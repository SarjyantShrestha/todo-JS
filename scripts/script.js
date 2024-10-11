let addBtn = document.getElementById("btn-add");
let todoInput = document.getElementById("todo-input");
let todoList;

window.onload = function () {
  todoInput.value = "";
  searchInput.value = "";
  todoInput.focus();
  loadTodo(); //load Todo first then update todoList. For search functionality to work.
  todoList = document.querySelectorAll(".todo-list");
};

function loadTodo() {
  let todos = JSON.parse(localStorage.getItem("todos"));
  todos.forEach((todo) => {
    createTodo(todo.text, todo.completed);
  });
}

function saveTodo() {
  // Necessary to define todos inside this function otherwise the todos will stack up.
  let todos = [];
  document.querySelectorAll(".todo-list").forEach((todo) => {
    todos.push({
      text: todo.querySelector("p").innerText,
      completed: todo.classList.contains("todo-list-finish"),
    });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

function createTodo(todoText, isCompleted = false) {
  let newTodo = document.createElement("div");
  newTodo.classList.add("todo-list");

  let delBtn = document.createElement("button");
  let editBtn = document.createElement("button");

  let todoParagraph = document.createElement("p");
  todoParagraph.id = "todo";
  todoParagraph.textContent = todoText;

  todoParagraph.addEventListener("click", () => {
    //Animation
    newTodo.classList.add("scale-animation");
    // Remove the animation class after the animation ends
    setTimeout(() => {
      newTodo.classList.remove("scale-animation");
    }, 200); // Duration should match the CSS animation time

    newTodo.classList.toggle("todo-list-finish");

    if (newTodo.classList.contains("todo-list-finish")) {
      todoParagraph.innerHTML = `<s>${todoParagraph.innerText}</s>`;
      editBtn.disabled = true;
    } else {
      todoParagraph.innerHTML = todoParagraph.innerText;
      editBtn.disabled = false;
    }

    saveTodo();
  });

  if (isCompleted) {
    newTodo.classList.add("todo-list-finish");
    todoParagraph.innerHTML = `<s>${todoParagraph.innerText}</s>`;
    editBtn.disabled = true;
  }
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
    document.body.removeChild(newTodo);
    saveTodo();
  });

  // Edit function
  editBtn.addEventListener("click", () => {
    let editInput = document.createElement("input");
    editInput.classList.add("edit-input");
    editInput.type = "text";
    editInput.value = todoParagraph.innerText;
    newTodo.replaceChild(editInput, todoParagraph); //replace paragraph with input
    editInput.focus(); // this also fixed a bug where the todo gets blank when clicking on edit then refreshing the page

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

  document.body.appendChild(newTodo);
  // Reset input field
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
