
// Array för att lagra todos
let todoArray = []; 

// Hämtar userdata för inloggade användare - STEG 2
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

// Hämtar användarnamnet för inloggad användare - STEG 1
function getCurrentUserName() {

    let currentUser = JSON.parse(localStorage.getItem("currentUser")); 
    return currentUser.username; 

}

// Funktion för att spara användardata till local storage
function saveLocalStorageUserData(userData) {

    localStorage.setItem(userData.username, JSON.stringify(userData));
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

function updateTodo(indexToUpdate, todoData) {
    
    // Hämta alla todos
    // Hämta userdata, ersätter rad 78 med logiken för att uppdatera todos.push(todoData); 
    // Använd ID

}

function removeTodo(indexToRemove) {

    // Ha ett index som matchar med det item som ska tas bort
    // Hämta userdata, ersätter rad 78 med logiken för att uppdatera todos.push(todoData); 
    // Använd ID

}

// Används i ovanstående funktioner 
function saveCurrentUserData(data) {

    let currentUserName = getCurrentUserName();
    let allUsers = JSON.parse(localStorage.getItem("users")); 

    for(let k=0; k < allUsers.length; k++) {

        if (allUsers[k].username === currentUserName) {

            allUsers[k] = data; 
        }
    }
    
    localStorage.setItem("users", JSON.stringify(allUsers));
}

// Funktion för att visa todos på sidan
function displayTodos() {
    
    // Hämta användarens todos från local storage
    const username = "username"; // Ersätt med inloggad användares användarnamn
    const todos = getUserTodos(username);

    // Använd todos för att visa dem på sidan
    let todoListUl = document.getElementById("todo-list-ul");
    todoListUl.innerHTML = "";

    todos.forEach((todo, id) => {

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

            const todoToRemove = document.getElementById(`removeTodo${id}`).closest("li");
            todoToRemove.remove();
            todoArray.splice(id, 1); // Tar bort todo:s från arrayen så de inte upprepar sig när man lägger till nya todo:s 

            // Tar bort scrollbaren när arrayen är tom
            if (todoArray.length === 0) {

                todoListUl.style.overflowY = "hidden";
            }

        });
    });

    // Redigeringsknapp
    addEditButtonListeners();

    // Scrollbeteende för div & ul
    todoListUl.style.overflowY = "scroll"; 
    let maxListHeight = 200;
    let listHeight = Math.min(todoListUl.scrollHeight, maxListHeight);
    todoListUl.style.maxHeight = listHeight + "px"; 

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

// Funktion för att lägga till todos i DOM:en 
function addEditButtonListeners() {

    let userTodos = getUserTodos(); 

    userTodos.forEach((todo, id) => {

        const editTodoBtn = document.getElementById(`editTodo${id}`);
        editTodoBtn.addEventListener("click", () => {
        
            fillInputFields(todo);
        
        });
    });
}

// Visa todos när sidan laddas
displayTodos();



// *FILTRERINGSFUNKTION* // 

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

    function updateTodoDiv() {

        let todoListUl = document.getElementById("todo-list-ul");

        // Töm listan på todos
        todoListUl.innerHTML = `<h2>Filtered to-do:s</h2>`;

        let todos = getLocalStorageTodos(); 

        console.log(todos);

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

                const todoToRemove = document.getElementById(`removeTodo${id}`).closest("li");
                todoToRemove.remove();
                tempTodoArray.splice(id, 1);

        
            });

        let editTodoBtn = document.getElementById(`editTodo${id}`);
    
        // REDIGERAKNAPPEN FÖR VARJE TODO SOM FILTRERATS
        editTodoBtn.addEventListener("click", () => {

            fillInputFields(todos);

        });

            // Ser till att gömma scrollbaren när arrayen är tom samt rensa HTML för rubriken 
            if (tempTodoArray.length === 0) {

                todoListUl.innerHTML = "";
                todoListUl.style.overflowY = "hidden";

            } else {

                todoListUl.style.overflowY = "scroll"; 
                let maxListHeight = 200;
                let listHeight = Math.min(todoListUl.scrollHeight, maxListHeight);
                todoListUl.style.maxHeight = listHeight + "px";
        
            }
        }
        updateTodoDiv();
    }); 



    // Skapa metod för att ta bort ett item 

    // Skapa metod för att fixa scrollbeteendet