//selectors
//obj.map(x => newObj.filter(a => a.label == x.label).length > 0 ? null : newObj.push(x));
const todoinput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todolist = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
//eventlisteners
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener("click",addTodo);
todolist.addEventListener("click",deleteTodo)
filterOption.addEventListener('click',filterTodo)
//functions

function addTodo(event){

    //prevent form from submitting
    event.preventDefault();

    // create toDoDiv

    const todoDiv =  document.createElement('div');
    todoDiv.classList.add('todo')



    //create li

    const newTodo =  document.createElement('li');

    newTodo.innerHTML=todoinput.value;
    newTodo.classList.add('todo-item')

    todoDiv.appendChild(newTodo);

    //adding the data tolocal storage

    saveLocalTodo(todoinput.value);

    //check Mark button

    const completedButton = document.createElement('button');
    completedButton.classList.add('complete-btn');
    completedButton.innerHTML='<i class="fas fa-check"></i>'
    todoDiv.appendChild(completedButton);

    //check trash button

    const tashButton = document.createElement('button');
    tashButton.classList.add('trash-btn');
    tashButton.innerHTML='<i class="fas fa-trash"></i>'
    todoDiv.appendChild(tashButton);

    //append to todo list

    todolist.appendChild(todoDiv);

    //clear todo input value

    todoinput.value='';
  
}

function deleteTodo(e){
  const item = e.target
  if(item.classList[0] === 'trash-btn'){
      const todo = item.parentElement;

      //animatioin
      todo.classList.add('fall');

      //remove from local storage
      
      removeLocalTodos(todo);
      //remove

      todo.addEventListener('transitionend',function(){
          todo.remove();
      })

  }

  if(item.classList[0] === 'complete-btn'){
      const todo = item.parentElement;
      todo.classList.toggle("completed");
  }
}

function filterTodo(e){
    const todos = todolist.childNodes;
    console.log(todos)
    todos.forEach(function(todo){
        console.log(todo);
        switch(e.target.value){
            case "all":
                todo.style.display='flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display='flex'
                }  else{
                    todo.style.display='none';
                } 
                break;
            case 'uncompleted':
                if(!todo.classList.contains('completed')){
                    todo.style.display="flex";
                } else{
                    todo.style.display="none"
                }    
                break;
        }
    });
}

function saveLocalTodo(todo){
    //CHECK Do I already have things in there

    let todos;

    if(localStorage.getItem('todos') === null){
        todos = [];
        
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));     
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
    
}

function getTodos(){

    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
        
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));     
    }

    todos.forEach(function(todo){
        
          // create toDoDiv

   // create toDoDiv

   const todoDiv =  document.createElement('div');
   todoDiv.classList.add('todo')



   //create li

   const newTodo =  document.createElement('li');

   newTodo.innerHTML=todo;
   newTodo.classList.add('todo-item')

   todoDiv.appendChild(newTodo);

  
 

   //check Mark button

   const completedButton = document.createElement('button');
   completedButton.classList.add('complete-btn');
   completedButton.innerHTML='<i class="fas fa-check"></i>'
   todoDiv.appendChild(completedButton);

   //check trash button

   const tashButton = document.createElement('button');
   tashButton.classList.add('trash-btn');
   tashButton.innerHTML='<i class="fas fa-trash"></i>'
   todoDiv.appendChild(tashButton);

   //append to todo list

   todolist.appendChild(todoDiv);


    })
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
        
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));     
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem('todos',JSON.stringify(todos));
}