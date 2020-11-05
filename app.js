const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

document.addEventListener('DOMContentLoaded', getTodos);
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


function addTodo (event) {
  event.preventDefault();
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;

  saveLocalTodos(todoInput.value);

  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  todoInput.value = "";

  const completeBtn = document.createElement('button');
  completeBtn.innerHTML = '<i class="fas fa-check"></i>';
  completeBtn.classList.add('complete-btn');
  todoDiv.appendChild(completeBtn);

  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  deleteBtn.classList.add('delete-btn');
  todoDiv.appendChild(deleteBtn);

  todoList.appendChild(todoDiv);
}

function deleteCheck (e) {
  const item = e.target;
  if(item.classList[0] === 'delete-btn') {
    const todo = item.parentElement;
    todo.classList.add('fall');
    removeLocalTodos(todo);
    todo.addEventListener('transitionend', e => {
      todo.remove();
    })
  }

  if(item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
    console.log(todo);
  }
}

function filterTodo (e) {
  const todos =todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = 'flex'
        break;
      case "completed":
        if(todo.classList.contains("completed")) {
          todo.style.display = 'flex'
        } else {
          todo.style.display = 'none'
        }
        break;
      case "uncompleted":
        if(!todo.classList.contains("completed")) {
          todo.style.display = 'flex'
        } else {
          todo.style.display = 'none'
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function removeLocalTodos (todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos () {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    const completeBtn = document.createElement('button');
    completeBtn.innerHTML = '<i class="fas fa-check"></i>';
    completeBtn.classList.add('complete-btn');
    todoDiv.appendChild(completeBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.classList.add('delete-btn');
    todoDiv.appendChild(deleteBtn);

    todoList.appendChild(todoDiv);
  });
}

