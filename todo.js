let currentEditIndex = -1; // -1 betyder att ingenting editeras

// Hämtar användarnamnet för inloggad användare
function getCurrentUserName() {
  let currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );
  return currentUser.username;
}

// Hämtar userdata för inloggade användare
function getLocalStorageUserData() {

  let user = JSON.parse(
    localStorage.getItem("currentUser")
  ); // Hämtar objektet från en nyckel

  if (user.todos === undefined) {
    user["todos"] = [];
  }

  return user;
}

// Funktion för att hämta användarens todos från local storage
function getUserTodos() {
  const userData = getLocalStorageUserData();

  if (
    userData.todos === undefined ||
    userData.todos === null
  ) {
    userData["todos"] = [];
    return [];
  } else {
    return userData.todos;
  }
}

function addTodo(todoData) {
  let todos = getUserTodos();
  todos.push(todoData);

  // let userData = getLocalStorageUserData();
  // userData.todos = todos;
  saveCurrentUserData(todos);
}

function renderInputFields(index) {
  let todos = getUserTodos();
  let todo = todos[index];

  fillInputFields(todo);

  //saveCurrentUserData(todos);
}

// function renderTodoList() {

//     const todos = getUserTodos();

//     const addTodoBtn = document.getElementById("add-todo");
//     addTodoBtn.innerText = "Save to-do!";

//     if (todos.length > 0) {

//         todos.forEach((todo, index) => {

//             const editTodoBtn = document.getElementById(`editTodo${index}`);

//             editTodoBtn.addEventListener("click", () => {

//                 //Måste hämta to-do:s värde från inputfälten

//                 fillInputFields(todo);
//                 let todoValue = getTodoValues();

//                 console.log("todovalue", todoValue);
//                 // let userData = getLocalStorageUserData();
//                 // userData.todos = todos;

//                 todos.splice(currentEditIndex, 1, todoValue);
//                 saveCurrentUserData(todoValue);

//             });

//         });

//         let addTodoBtn = document.getElementById("add-todo");

//         addTodoBtn.addEventListener("click", () => {

//             displayUserTodos();

//         });

//         scrollBehaviour();

//     } else {

//         const todoListUl = document.getElementById("todo-list-ul");
//         todoListUl.innerHTML = "";
//         todoListUl.style.overflowY = "hidden";

//     }
// }

/**
 *
 * @param {number} id index för todo
 */
function removeTodo(id) {
  const todoToRemove = document
    .getElementById(`removeTodo${id}`)
    .closest("li");
  todoToRemove.remove();

  let todos = getUserTodos();
  todos.splice(id, 1);

  let userData = getLocalStorageUserData(); // Återanvänd till redigeraknappen
  userData.todos = todos;
  saveCurrentUserData(userData);

  // Tar bort scrollbaren när arrayen är tom
  if (todos.length === 0) {
    todoListUl.style.overflowY = "hidden";
  } else {
    scrollBehaviour();
  }
}

// Används i ovanstående funktioner
function saveCurrentUserData(data) {
  // let currentUserName = getCurrentUserName();
  let user = JSON.parse(
    localStorage.getItem("currentUser")
  );

  if (
    user.todos === undefined ||
    user.todos === null
  ) {
    user["todos"] = data;
  } else {
    user.todos = data;
  }

  console.log(data);
  console.log(JSON.stringify(user));

  localStorage.setItem(
    "currentUser",
    JSON.stringify(user)
  );
}

function scrollBehaviour() {
  let todoListUl = document.getElementById(
    "todo-list-ul"
  );
  todoListUl.style.overflowY = "scroll";
  let maxListHeight = 200;
  let listHeight = Math.min(
    todoListUl.scrollHeight,
    maxListHeight
  );
  todoListUl.style.maxHeight = listHeight + "px";
}

// Funktion för att fylla i inputfälten med information från en todo
function fillInputFields(todo) {
  document.getElementById(
    "todo-input-title"
  ).value = todo.title;
  document.getElementById(
    "todo-input-description"
  ).value = todo.description;
  document.getElementById("todo-status").value =
    todo.status;
  document.getElementById("todo-time").value =
    todo.estimatedtime;
  document.getElementById("todo-category").value =
    todo.category;
  document.getElementById("todo-deadline").value =
    todo.deadline;
}

function displayUserTodos() {
  let userTodos = getUserTodos();
  let todoListUl = document.getElementById(
    "todo-list-ul"
  );

  userTodos.forEach((todo, id) => {
    let li = document.createElement("li");
    li.innerHTML = `
                <h2>Title: ${todo.title}</h2>
                <p>Description: ${todo.description}<br>
                Status: ${todo.status}<br>
                Estimated time: ${todo.estimatedtime}<br>
                Category: ${todo.category}<br>
                Deadline: ${todo.deadline}<br>
                <button class="fa-solid fa-trash todo-remove" id="removeTodo${id}"></button>
                <button class="fa-solid fa-pen todo-edit" id="editTodo${id}"></button>
            `;
    
        todoListUl.appendChild(li);

    // REMOVE TODO
    let removeTodoBtn = document.getElementById(
      `removeTodo${id}`
    );

    removeTodoBtn.addEventListener(
      "click",
      () => {
        removeTodo(id);
      }
    );

    let editTodoBtn = document.getElementById(
      `editTodo${id}`
    );

    editTodoBtn.addEventListener("click", () => {
      renderInputFields(id);
      editIndex = id;

    });

  });


  scrollBehaviour();
  // renderTodoList();
}

function getTodoValues() {
  let todoInputTitle = document.getElementById(
    "todo-input-title"
  ).value;
  let todoInputDescription =
    document.getElementById(
      "todo-input-description"
    ).value;
  let todoInputStatus = document.getElementById(
    "todo-status"
  ).value;
  let todoInputEstimatedTime =
    document.getElementById("todo-time").value;
  let todoInputCategory = document.getElementById(
    "todo-category"
  ).value;
  let todoInputDeadline = document.getElementById(
    "todo-deadline"
  ).value;

  const todoObject = {
    title: todoInputTitle,
    description: todoInputDescription,
    status: todoInputStatus,
    estimatedtime: todoInputEstimatedTime,
    category: todoInputCategory,
    deadline: todoInputDeadline,
  };

  // addTodo(todoObject);

  return todoObject;
}

let editIndex = -1;

let addTodoBtn =
  document.getElementById("add-todo");

addTodoBtn.addEventListener("click", () => {
  addTodoBtn.innerText = "Add to-do!";

  if (editIndex > -1) {
    let todos = getUserTodos();
    let editedTodo = getTodoValues();

    todos[editIndex] = editedTodo;

    saveCurrentUserData(todos);
  } else {
    let todos = getUserTodos();
    let editedTodo = getTodoValues();

    todos.push(editedTodo);

    saveCurrentUserData(todos);
  }

  let reloadDone = false;

  // Uppdaterar sidans div och fönster när något läggs till i listan. 
  if (!reloadDone) {  
      window.location.reload();
      reloadDone = true; 
  }

  // Rensa inputfälten
  document.getElementById(
    "todo-input-title"
  ).value = "";
  document.getElementById(
    "todo-input-description"
  ).value = "";
  document.getElementById("todo-status").value =
    "";
  document.getElementById("todo-time").value = "";
  document.getElementById("todo-category").value =
    "";
  document.getElementById("todo-deadline").value =
    "";

  displayUserTodos();
});

displayUserTodos();


// ----------------------------- FILTRERINGSFUNKTIONEN ---------------------------------------------- // 

let filterHome = document.getElementById("filter-home-checkbox"); 
let filterStudy = document.getElementById("filter-study-checkbox"); 
let filterWork = document.getElementById("filter-work-checkbox"); 
let filterHealth = document.getElementById("filter-health-checkbox"); 

let filterTodoStatus = document.getElementById("filter-todo-status"); 

let filterTodosBtn = document.getElementById("filter-todos"); 


filterTodosBtn.addEventListener("click", () => {
    
    const userTodos = getUserTodos();
    let selectedCategories = [];

    if (filterHome.checked) selectedCategories.push("home");
    if (filterStudy.checked) selectedCategories.push("study");
    if (filterWork.checked) selectedCategories.push("work");
    if (filterHealth.checked) selectedCategories.push("health");

    // Filtrera todo-uppgifter baserat på statusen
    let filteredTodos = userTodos.filter(todo => {

        if (filterTodoStatus.value === "all") {
            
            return true; 

        } else {
        
            return todo.status === filterTodoStatus.value;
        
        }

    });

    filteredTodos = filteredTodos.filter(todo => {

        return selectedCategories.includes(todo.category);
    
    });

    // Sortera todo-uppgifterna efter deadline och sedan efter status

    filteredTodos.sort((a, b) => {
    
        // Först sortera efter deadline
        const deadlineA = new Date(a.deadline);
        const deadlineB = new Date(b.deadline);
    
        if (deadlineA.getTime() !== deadlineB.getTime()) {
    
            return deadlineA - deadlineB; // Sortera efter deadline
    
        } else {
    
            // Om deadline är densamma, sortera efter status (done före not-done)
            if (a.status === "done" && b.status === "not-done") {
    
                return 1;
    
            } else if (a.status === "not-done" && b.status === "done") {
    
                return -1;
    
            } else {
    
                return 0; // Behåll befintlig ordning för objekt med samma deadline och status
    
            }
        }
    });
    
    updateTodoDiv(filteredTodos);

}); 


function updateTodoDiv(id) {

    let todoListUl = document.getElementById("todo-list-ul");

    // Töm listan på todos
    todoListUl.innerHTML = `<h2>Filtered to-do:s</h2>`;

    let todos = getUserTodos(); 

    // Loopa igenom filtrerade todos och lägg till dem i listan
    todos.forEach((todo, id) => {

        const li = document.createElement("li");
        li.innerHTML = `
            <h3>Title: ${todo.title}</h3>
            <p>Description: ${todo.description}<br>
            Status: ${todo.status}<br>
            Estimated time: ${todo.estimatedtime}<br>
            Category: ${todo.category}<br>
            Deadline: ${todo.deadline}<br>
            <button class="fa-solid fa-trash todo-remove" id="removeTodo${id}"></button>
            <button class="fa-solid fa-pen todo-edit" id="editTodo${id}"></button>
        `;

        todoListUl.appendChild(li);

    }); 

    let removeTodoBtn = document.getElementById(`removeTodo${id}`);

    removeTodoBtn.addEventListener("click", () => {

        removeTodo(id);
        editIndex = id; // La till detta men vet inte om det fungerar?  
    
    });

    let editTodoBtn = document.getElementById(`editTodo${id}`); 

    editTodoBtn.addEventListener("click", () => {

        renderInputFields(id);
        editIndex = id;

    });
    
}