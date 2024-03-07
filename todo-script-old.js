let currentEditIndex = -1; // -1 betyder att ingenting editeras


// Hämtar användarnamnet för inloggad användare
function getCurrentUserName() {

    let currentUser = JSON.parse(localStorage.getItem("currentUser")); 
    return currentUser.username; 

}


// Hämtar userdata för inloggade användare
function getLocalStorageUserData() {

    const username = getCurrentUserName(); 
    let users = JSON.parse(localStorage.getItem("users")); // Hämtar objektet från en nyckel
    let result = undefined; 

    users.forEach(user => {

        if (user.username === username) {

            if (user.todos === undefined)  {

                user["todos"] = []; 
            
            } // Kan lägga till habits med en tom array och ny if-sats

            result = user; 

        } 

    });

    return result; 
}



// Funktion för att hämta användarens todos från local storage
function getUserTodos() {

    const userData = getLocalStorageUserData();

    if (userData.todos === undefined) {

        return []; 

    } else {

        return userData.todos;

    }
}

function addTodo(todoData) {

    let todos = getUserTodos(); 
    todos.push(todoData); 

    let userData = getLocalStorageUserData();
    userData.todos = todos; 
    saveCurrentUserData(userData); 

}

function renderTodoList() {

    const todos = getUserTodos(); // Hämta användarens todos
    const addTodoBtn = document.getElementById("add-todo");
    addTodoBtn.innerText = "Save to-do!";



    if (todos.length > 0) {

        todos.forEach((todo, index) => {
        
            const editTodoBtn = document.getElementById(`editTodo${index}`);
        
            editTodoBtn.addEventListener("click", () => {
        
                console.log("Klickat på edit!");

                let newTodo = fillInputFields(todo);
                let userData = getLocalStorageUserData(); // Återanvänt från remove-knappen
                userData.todos = todos; 
                // saveCurrentUserData(userData); 

                todos.splice(index, 1, newTodo);

                saveCurrentUserData({ todos });

                // //Uppdaterar DOM:en
                // renderTodoList(); 
        
            });
        
        
        });
        
        scrollBehaviour();
    
    } else {

        const todoListUl = document.getElementById("todo-list-ul");
        todoListUl.innerHTML = "";
        todoListUl.style.overflowY = "hidden";

    }
}

/**
 * 
 * @param {number} id index för todo
 */
function removeTodo(id) {

    const todoToRemove = document.getElementById(`removeTodo${id}`).closest("li");
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

    let currentUserName = getCurrentUserName();
    let allUsers = JSON.parse(localStorage.getItem("users")); 

    console.log("test test test"); 
    console.log(allUsers);


    for(let k=0; k < allUsers.length; k++) {

        if (allUsers[k].username === currentUserName) {

            allUsers[k] = data; 
        }
    }

    console.log(allUsers);
    console.log(JSON.stringify(allUsers)); 
    
    localStorage.setItem("users", JSON.stringify(allUsers));
}

function scrollBehaviour() {

    let todoListUl = document.getElementById("todo-list-ul");
    todoListUl.style.overflowY = "scroll"; 
    let maxListHeight = 200;
    let listHeight = Math.min(todoListUl.scrollHeight, maxListHeight);
    todoListUl.style.maxHeight = listHeight + "px"; 

}

// Funktion för att visa todos på sidan
function displayTodos() {
    
    // Hämta användarens todos från local storage
    const userTodos = getUserTodos();

    // Använd todos för att visa dem på sidan
    let todoListUl = document.getElementById("todo-list-ul");
    todoListUl.innerHTML = "";

    userTodos.forEach((todo, id) => {

        const li = document.createElement("li");
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


        // REMOVE TODO - funkar på första.. 
        let removeTodoBtn = document.getElementById(`removeTodo${id}`);

        removeTodoBtn.addEventListener("click", () => {

            removeTodo(id);


        });

        let editTodoBtn = document.getElementById(`editTodo${id}`);

        editTodoBtn.addEventListener("click", () => {

            currentEditIndex = id; 
            renderTodoList(); 

        });


    });

    // Scrollbeteende för div & ul
    scrollBehaviour(); 

};


// Funktion för att lägga till en ny todo
document.getElementById("add-todo").addEventListener("click", () => {

    // Hämta all todo-input och dess värden
    let todoInputTitle = document.getElementById("todo-input-title").value;
    let todoInputDescription = document.getElementById("todo-input-description").value;
    let todoInputStatus = document.getElementById("todo-status").value;
    let todoInputEstimatedTime = document.getElementById("todo-time").value;
    let todoInputCategory = document.getElementById("todo-category").value;
    let todoInputDeadline = document.getElementById("todo-deadline").value;


    // Lägg till todo
    const todoObject = {
        title: todoInputTitle,
        description: todoInputDescription,
        status: todoInputStatus,
        estimatedtime: todoInputEstimatedTime,
        category: todoInputCategory,
        deadline: todoInputDeadline,
    }

    // Spara användarens uppdaterade todos i local storage
    addTodo(todoObject);

    // Rensa inputfälten
    document.getElementById("todo-input-title").value = "";
    document.getElementById("todo-input-description").value = "";
    document.getElementById("todo-status").value = "";
    document.getElementById("todo-time").value = "";
    document.getElementById("todo-category").value = "";
    document.getElementById("todo-deadline").value = "";

    // Uppdatera listan med todos
    displayTodos();
    renderTodoList();  
});

// Funktion för att fylla i inputfälten med information från en todo
function fillInputFields(todo) {

    document.getElementById("todo-input-title").value = todo.title;
    document.getElementById("todo-input-description").value = todo.description;
    document.getElementById("todo-status").value = todo.status;
    document.getElementById("todo-time").value = todo.estimatedtime;
    document.getElementById("todo-category").value = todo.category;
    document.getElementById("todo-deadline").value = todo.deadline;

}

// Visa todos när sidan laddas
displayTodos();

renderTodoList();



// *FILTRERINGSFUNKTION* ----------------------------------------------------------------------------- // 

let filterHome = document.getElementById("filter-home-checkbox"); 
let filterStudy = document.getElementById("filter-study-checkbox"); 
let filterWork = document.getElementById("filter-work-checkbox"); 
let filterHealth = document.getElementById("filter-health-checkbox"); 

let filterTodoStatus = document.getElementById("filter-todo-status"); 

let filterTodosBtn = document.getElementById("filter-todos"); 


// FILTRERINGSFUNKTION //

function getLocalStorageTodos() {

    const todos = getUserTodos(); // Använd getUserTodos för att hämta användarens todos
    return todos || []; // Returnera todos eller en tom array om inga todos finns

}


function getLocalStorageStringifiedTodos(todos) {

    localStorage.setItem('todos', JSON.stringify(todos));
    return todos; 

}





filterTodosBtn.addEventListener("click", () => {
    
    const userTodos = getUserTodos();
    let selectedCategories = [];

    if (filterHome.checked) selectedCategories.push("home");
    if (filterStudy.checked) selectedCategories.push("study");
    if (filterWork.checked) selectedCategories.push("work");
    if (filterHealth.checked) selectedCategories.push("health");

    // Filtrera todo-uppgifter baserat på statusen

    let filteredTodos = userTodos.filter(todo => {

        return filterTodoStatus.value === "all" || todo.status === filterTodoStatus.value;

    });

    // Filtrera de återstående todo-uppgifterna baserat på kategorierna
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
    
    updateTodoDiv(id);

}); 


function updateTodoDiv(id) {

    let todoListUl = document.getElementById("todo-list-ul");

    // Töm listan på todos
    todoListUl.innerHTML = `<h2>Filtered to-do:s</h2>`;

    let todos = getLocalStorageTodos(); 

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

    // Lyssnare för raderaknappen för varje todo som filtrerats
    let removeTodoBtn = document.getElementById(`removeTodo${id}`);

    removeTodoBtn.addEventListener("click", () => {

        removeTodo(id); 
    
    });

    // REDIGERAKNAPPEN FÖR VARJE TODO SOM FILTRERATS
    renderTodoList();
    
}