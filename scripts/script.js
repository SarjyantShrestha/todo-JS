let addBtn = document.getElementById("btn-add");
let todoInput = document.getElementById("todo-input");

function addTodo() {
  let todoText = todoInput.value;

  if (todoText === "") {
    alert("Please enter a todo.");
    return;
  }

  let newTodo = document.createElement("div");
  newTodo.classList.add("todo-list");

  const todoParagraph = document.createElement("p");
  todoParagraph.id = "todo";
  todoParagraph.textContent = todoText;

  const delBtn = document.createElement("button");
  const editBtn = document.createElement("button");
  delBtn.id = "btn-del";
  delBtn.textContent = "-";
  editBtn.id = "btn-edit";
  editBtn.textContent = "=";

  delBtn.addEventListener("click", () => {
    document.body.removeChild(newTodo);
  });

  newTodo.appendChild(todoParagraph);
  newTodo.appendChild(delBtn);
  newTodo.appendChild(editBtn);

  document.body.appendChild(newTodo);
  todoInput.value = "";
}

todoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});

addBtn.addEventListener("click", addTodo);
