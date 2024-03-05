let currentEditIndex = -1; // -1 betyder att ingenting editeras

// Hämtar användarnamnet för inloggad användare
function getCurrentUserName() {

    let currentUser = JSON.parse(localStorage.getItem("currentUser")); 
    return currentUser.username; 

}

// Hämtar userdata för inloggade användare
function getLocalStorageUserData() {

    const username = getCurrentUserName(); 
    let users = JSON.parse(localStorage.getItem("currentUser")); // Hämtar objektet från en nyckel
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

    if (userData.todos === undefined || userData.todos === null) {

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

    const todos = getUserTodos();

    const addTodoBtn = document.getElementById("add-todo");
    addTodoBtn.innerText = "Save to-do!";

    if (todos.length > 0) {

        todos.forEach((todo, index) => {
        
            const editTodoBtn = document.getElementById(`editTodo${index}`);
        
            editTodoBtn.addEventListener("click", () => {
    
                //Måste hämta to-do:s värde från inputfälten

                fillInputFields(todo);
                let todoValue = getTodoValues(); 
                
                console.log("todovalue", todoValue);
                // let userData = getLocalStorageUserData();
                // userData.todos = todos; 

                todos.splice(currentEditIndex, 1, todoValue);
                saveCurrentUserData(todoValue);

        
            });
        
        });

        let addTodoBtn = document.getElementById("add-todo");
            
        addTodoBtn.addEventListener("click", () => {

            displayUserTodos(); 

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

// Funktion för att fylla i inputfälten med information från en todo
function fillInputFields(todo) {

    document.getElementById("todo-input-title").value = todo.title;
    document.getElementById("todo-input-description").value = todo.description;
    document.getElementById("todo-status").value = todo.status;
    document.getElementById("todo-time").value = todo.estimatedtime;
    document.getElementById("todo-category").value = todo.category;
    document.getElementById("todo-deadline").value = todo.deadline;

}


function displayUserTodos() {

    const userTodos = getUserTodos(); 
    let todoListUl = document.getElementById("todo-list-ul"); 

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


        // REMOVE TODO
        let removeTodoBtn = document.getElementById(`removeTodo${id}`);

        removeTodoBtn.addEventListener("click", () => {

            removeTodo(id);

        });

        let editTodoBtn = document.getElementById(`editTodo${id}`)

        editTodoBtn.addEventListener("click", () => {

            renderTodoList(); 

        })

        

    });

    scrollBehaviour(); 
    // renderTodoList(); 

}

function getTodoValues() {
    
    let todoInputTitle = document.getElementById("todo-input-title").value;
    let todoInputDescription = document.getElementById("todo-input-description").value;
    let todoInputStatus = document.getElementById("todo-status").value;
    let todoInputEstimatedTime = document.getElementById("todo-time").value;
    let todoInputCategory = document.getElementById("todo-category").value;
    let todoInputDeadline = document.getElementById("todo-deadline").value;

    const todoObject = {
        title: todoInputTitle,
        description: todoInputDescription,
        status: todoInputStatus,
        estimatedtime: todoInputEstimatedTime,
        category: todoInputCategory,
        deadline: todoInputDeadline,
    }
    
    addTodo(todoObject);

    return todoObject; 

}




let addTodoBtn = document.getElementById("add-todo"); 

addTodoBtn.addEventListener("click", () => {

    addTodoBtn.innerText = "Add to-do!"; 

    // Hämta all todo-input och dess värden
    getTodoValues();

    // Rensa inputfälten
    document.getElementById("todo-input-title").value = "";
    document.getElementById("todo-input-description").value = "";
    document.getElementById("todo-status").value = "";
    document.getElementById("todo-time").value = "";
    document.getElementById("todo-category").value = "";
    document.getElementById("todo-deadline").value = "";


    displayUserTodos();


});


displayUserTodos();
// renderTodoList(); 


