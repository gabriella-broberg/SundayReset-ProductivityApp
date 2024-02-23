todoArray = []; 


let addTodo = document.getElementById("add-todo"); 

addTodo.addEventListener("click", () => {

    // ALL todo-input och dess värden
    let todoInputTitle = document.getElementById("todo-input-title").value; 
    let todoInputDescription = document.getElementById("todo-input-description").value; 
    let todoInputStatus = document.getElementById("todo-status").value; 
    let todoInputEstimatedTime = document.getElementById("todo-time").value; 
    let todoInputCategory = document.getElementById("todo-category").value;
    let todoInputDeadline = document.getElementById("todo-deadline").value; 

    todoArray.push ({

        title: todoInputTitle,
        description: todoInputDescription,
        status: todoInputStatus,
        estimatedtime: todoInputEstimatedTime, 
        category: todoInputCategory, 
        deadline: todoInputDeadline,  

    });

    // Rensar inputfälten
    document.getElementById("todo-input-title").value = ""; 
    document.getElementById("todo-input-description").value = ""; 
    document.getElementById("todo-status").value = ""; 
    document.getElementById("todo-time").value = ""; 
    document.getElementById("todo-category").value = "";
    document.getElementById("todo-deadline").value = ""; 

    displayTodos(); 

})


// Funktion för att lägga till todos i DOM:en 
let displayTodos = () => {

    let todoListUl = document.getElementById("todo-list-ul"); 
    let todoListDiv = document.getElementsByClassName("todo-list-div")

    todoArray.forEach(todo => {

        const li = document.createElement("li");
        li.innerHTML = `
            <h2>Title: ${todo.title}</h2>
            <p>Description: ${todo.description}<br>
            Status: ${todo.status}<br>
            Estimated time: ${todo.estimatedtime}<br>
            Category: ${todo.category}<br>
            Deadline: ${todo.deadline}<br>
            <button class="removeTodo" style="background-color: #eba08b">Remove to-do!</button>
            <button class="editTodo" style="background-color: #cfdf83">Edit to-do!</button>
        `;

        todoListUl.appendChild(li);


        // Scrollbeteende för div & ul
        todoListUl.style.overflowY = "scroll"; 

        let maxListHeight = 170;
        let listHeight = Math.min(todoListUl.scrollHeight, maxListHeight);

        todoListUl.style.maxHeight = listHeight + "px"; 


    });
}

// Hämtar värdet för de uppskapade knapparna i DOM:en 
let removeTodo = document.getElementById("removeTodo"); 
let editTodo = document.getElementById("editTodo"); 