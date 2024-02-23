// Array för att lagra todos
let todoArray = []; 


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
            <button id="removeTodo${id}" style="background-color: #eba08b">Remove to-do!</button>
            <button id="editTodo${id}" style="background-color: #cfdf83">Edit to-do!</button>
        `;

        todoListUl.appendChild(li); 

        // REMOVE TODO - funkar på första.. 
        let removeTodoBtn = document.getElementById(`removeTodo${id}`);

        removeTodoBtn.addEventListener("click", () => {

            const todoToRemove = document.getElementById(`removeTodo${id}`).closest("li");
            todoToRemove.remove();

        });
    });

    // Kör redigeringsknappen
    addEditButtonListeners();

    // Scrollbeteende för div & ul
    todoListUl.style.overflowY = "scroll"; 
    let maxListHeight = 170;
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