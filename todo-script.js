// Array för att lagra todos
let todoArray = []; 


// Användarspecifik array med todo:s kopplade till den inloggade användaren
let userArray = [{

    username: "username", // Mejladress
    password: "password", 
    loggedIn: false,
    todos: todoArray,
    habits: "Gabbys array", 

}]; 


// LOCAL STORAGE-FUNKTION KOMMER HÄR: ska vara användarspecifik.

function getLocalStorageData (key) {

    const getData = localStorage.getItem(key);
    return JSON.parse(getData);

}

// Hämta todos från local storage
// let todos = getLocalStorageData('todos');
// console.log(todos);

// Hämta användarinställningar från local storage
// let settings = getLocalStorageData('userSettings');
// console.log(settings);

// Hämta arrayen från local storage med nyckeln 'myArray'
// let myArray = getLocalStorageData('myArray');


// ---------------------------------- //



// FUNKTION FÖR EDIT
function addEditButtonListeners() {

    todoArray.forEach((todo, id) => {

        const editTodoBtn = document.getElementById(`editTodo${id}`);

        editTodoBtn.addEventListener("click", () => {

            fillInputFields(todo);

        });
    });
}

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
let displayTodos = () => {

    let todoListUl = document.getElementById("todo-list-ul");
    todoListUl.innerHTML = "";

    todoArray.forEach((todo, id) => {

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


// För att lägga till to-do:s 
document.getElementById("add-todo").addEventListener("click", () => {

    // Hämta all todo-input och dess värden
    let todoInputTitle = document.getElementById("todo-input-title").value; 
    let todoInputDescription = document.getElementById("todo-input-description").value; 
    let todoInputStatus = document.getElementById("todo-status").value; 
    let todoInputEstimatedTime = document.getElementById("todo-time").value; 
    let todoInputCategory = document.getElementById("todo-category").value;
    let todoInputDeadline = document.getElementById("todo-deadline").value; 

    // Lägg till todo i todoArray
    todoArray.push ({

        title: todoInputTitle,
        description: todoInputDescription,
        status: todoInputStatus,
        estimatedtime: todoInputEstimatedTime, 
        category: todoInputCategory, 
        deadline: todoInputDeadline,  
    
    });

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

addEditButtonListeners();


// Användare ska kunna filtrera och sortera listan på följande sätt:
// Filtrering ska kunna ske baserat på:
// Status
// Kategorier (man ska kunna välja vilka kategorier som man vill kunna se m.h.a checkboxar)

// Sortering - ska kunna sorteras baserat på (stigande och fallande):
// Deadline
// Tidsestimat

// *FILTRERINGSFUNKTION* // 

let filterHome = document.getElementById("filter-home-checkbox"); 
let filterStudy = document.getElementById("filter-study-checkbox"); 
let filterWork = document.getElementById("filter-work-checkbox"); 
let filterHealth = document.getElementById("filter-health-checkbox"); 

let filterTodoStatus = document.getElementById("filter-todo-status"); 

let filterTodosBtn = document.getElementById("filter-todos"); 

// Hårdkoda en array för att se att filterfunktionen fungerar. 

let tempTodoArray = [{

    title: "Tvätta kläder",
    description: "Jag behöver tvätta mina smutsiga kläder",
    status: "done",
    estimatedtime: 1, 
    category: "home", 
    deadline: "2024-02-25",  
}, 
{

    title: "Laga mat",
    description: "Jag är hungrig!", 
    status: "not-done", 
    estimatedtime: 2, 
    category: "home", 
    deadline: "2024-02-26",

},

{
    title: "Städa toaletten",
    description: "Den ser skitig ut",
    status: "not-done", 
    estimatedtime: 3, 
    category: "home", 
    deadline: "2024-03-05", 

},
{
    title: "Städa köket",
    description: "Köket är kaos",
    status: "done",
    estimatedtime: 3,
    category: "home",
    deadline: "2024-03-05", 

}
];

filterTodosBtn.addEventListener("click", () => {

    let selectedCategories = [];

    if (filterHome.checked) selectedCategories.push("home");
    if (filterStudy.checked) selectedCategories.push("study");
    if (filterWork.checked) selectedCategories.push("work");
    if (filterHealth.checked) selectedCategories.push("health");

    // Filtrera todo-uppgifter baserat på statusen

    let filteredTodos = tempTodoArray.filter(todo => {

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
    
    let todoListUl = document.getElementById("todo-list-ul");


    filteredTodos.forEach((todo, id) => {

        const li = document.createElement("li");

        li.innerHTML =
             `
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
    
        let removeTodoBtn = document.getElementById(`removeTodo${id}`);
        let editTodoBtn = document.getElementById(`editTodo${id}`);
    
        // RADERAKNAPPEN FÖR VARJE TODO SOM FILTRERATS
        removeTodoBtn.addEventListener("click", () => {

            const todoToRemove = document.getElementById(`removeTodo${id}`).closest("li");
            todoToRemove.remove();
            tempTodoArray.splice(id, 1);

        });
    
        // REDIGERAKNAPPEN FÖR VARJE TODO SOM FILTRERATS
        editTodoBtn.addEventListener("click", () => {

            fillInputFields(todo);

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
        
}); 

}); 