// LOG OUT FUNCTION

let logoutUser = () => {
    // Retrieve the current user from localStorage
    const currentUserString = localStorage.getItem(
      "currentUser"
    );
    const currentUser = currentUserString
      ? JSON.parse(currentUserString)
      : null;
  
    if (currentUser) {
      // Retrieve the users array
      const usersString =
        localStorage.getItem("users");
      let users = usersString
        ? JSON.parse(usersString)
        : [];
  
      // Find the current user in the users array and update their loggedIn state
      const userIndex = users.findIndex(
        (user) =>
          user.username === currentUser.username
      );
      users[userIndex] = currentUser;
      if (userIndex !== -1) {
        users[userIndex].loggedIn = false;
        localStorage.setItem(
          "users",
          JSON.stringify(users)
        ); // Update the users array in localStorage
      }
  
      // Clear the currentUser in localStorage
      localStorage.removeItem("currentUser");
  
      // alert("You have been logged out.");
      // Redirect to the login page or home page as required
      window.location.href = "index.html";
    } else {
      alert("No user is currently logged in.");
    }
  };
  
  // Assuming you have a logout button with the ID 'logoutButton'
  const logoutButton = document.querySelector(
    "#LogoutButton"
  );
  logoutButton.addEventListener(
    "click",
    logoutUser
  );


//--------------------------TODOSIDAN--------------------------------------- // 

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

let userTodos = getUserTodos();

function displayUserTodos(list) {

  let todoListUl = document.getElementById(
    "todo-list-ul"
  );

  todoListUl.innerHTML = ""; 

  list.forEach((todo, id) => {
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

  displayUserTodos(todos);
});

displayUserTodos(getUserTodos());

// ----------------------------- FILTRERINGSFUNKTIONEN ---------------------------------------------- // 

// Elementreferenser för kategorifiltrering
let filterHome = document.getElementById("filter-home-checkbox"); 
let filterStudy = document.getElementById("filter-study-checkbox"); 
let filterWork = document.getElementById("filter-work-checkbox"); 
let filterHealth = document.getElementById("filter-health-checkbox"); 

// Elementreferens för statusfiltrering
let filterTodoStatus = document.getElementById("filter-todo-status"); 

// Knapp för att initiera filtrering och sortering
let filterTodosBtn = document.getElementById("filter-todos"); 

// Lägg till händelselyssnare för filtreringsknappen
filterTodosBtn.addEventListener("click", () => {
    console.log("Klickat på filtreringsknappen!"); 
    
    const userTodos = getUserTodos(); // Hämta användarens todos, antar att detta är en funktion som returnerar en lista med todos
    let selectedCategories = [];
    let filteredTodos = []; 

    // Lägg till valda kategorier till en lista baserat på användarens val
    if (filterHome.checked) selectedCategories.push("home");
    if (filterStudy.checked) selectedCategories.push("study");
    if (filterWork.checked) selectedCategories.push("work");
    if (filterHealth.checked) selectedCategories.push("health");

    // Steg 1: Filtrera todos baserat på vald status
    filteredTodos = userTodos.filter(todo => {
        return filterTodoStatus.value === "all" || todo.status === filterTodoStatus.value;
    });

    // Steg 2: Ytterligare filtrering baserat på valda kategorier
    if (selectedCategories.length > 0) {
        filteredTodos = filteredTodos.filter(todo => {
            return selectedCategories.includes(todo.category);
        });
    }

    // Steg 3: Sortera todos efter deadline och status
    filteredTodos.sort((a, b) => {
        const deadlineA = new Date(a.deadline), deadlineB = new Date(b.deadline);
        if (deadlineA - deadlineB !== 0) return deadlineA - deadlineB; // Sortera först efter deadline
        // Sedan efter status (done före not-done)
        return a.status === "done" && b.status === "not-done" ? 1 : a.status === "not-done" && b.status === "done" ? -1 : 0;
    });
    
    // Visa de filtrerade och sorterade todos för användaren
    displayUserTodos(filteredTodos); 
});




// let filterHome = document.getElementById("filter-home-checkbox"); 
// let filterStudy = document.getElementById("filter-study-checkbox"); 
// let filterWork = document.getElementById("filter-work-checkbox"); 
// let filterHealth = document.getElementById("filter-health-checkbox"); 

// let filterTodoStatus = document.getElementById("filter-todo-status"); 

// let filterTodosBtn = document.getElementById("filter-todos"); 


// filterTodosBtn.addEventListener("click", () => {

//     console.log("klickat på knappen!"); 
    
//     const userTodos = getUserTodos();
//     let selectedCategories = [];
//     let filteredTodos = []; 


//     if (filterHome.checked) selectedCategories.push("home");
//     if (filterStudy.checked) selectedCategories.push("study");
//     if (filterWork.checked) selectedCategories.push("work");
//     if (filterHealth.checked) selectedCategories.push("health");

//     // Filtrera todo-uppgifter baserat på statusen
//     filteredTodos = userTodos.filter(todo => {

//         if (filterTodoStatus.value === "all") {

//             return true; 

//         } else {
        
//             return todo.status === filterTodoStatus.value;
          
//         }

//     });

//     console.log(filteredTodos); 

//     filteredTodos = filteredTodos.filter(todo => {

//         return selectedCategories.includes(todo.category);
    
//     });

//     // Sortera todo-uppgifterna efter deadline och sedan efter status
//     filteredTodos.sort((a, b) => {
    
//         // Först sortera efter deadline
//         const deadlineA = new Date(a.deadline);
//         const deadlineB = new Date(b.deadline);
    
//         if (deadlineA.getTime() !== deadlineB.getTime()) {
    
//             return deadlineA - deadlineB; // Sortera efter deadline
    
//         } else {
    
//             // Om deadline är densamma, sortera efter status (done före not-done)
//             if (a.status === "done" && b.status === "not-done") {
    
//                 return 1;
    
//             } else if (a.status === "not-done" && b.status === "done") {
    
//                 return -1;
    
//             } else {
    
//                 return 0; // Behåll befintlig ordning för objekt med samma deadline och status
    
//             }
//         }
//     });
    
//     displayUserTodos(filteredTodos); 

// }); 

// displayUserTodos(); 