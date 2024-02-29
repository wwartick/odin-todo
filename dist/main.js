const addTaskBtn = document.getElementById('add-tasks');
const dialog = document.querySelector('dialog');
const closeBtn = dialog.querySelector('.close-button');
const submitBtn = dialog.querySelector('.submit-button');
const priority = document.getElementById('priority');
const taskContainerDiv = document.querySelector('#task-container');
const toDoList = JSON.parse(localStorage.getItem('tasks')) || [];
let priorityColor='';

class ToDoItem {
    constructor(title, priority,  dueDate, createdDate, project, description){
        this.title=title;
        this.priority=priority;
        this.dueDate= dueDate;
        this.createdDate=createdDate;
        this.project=project;    
        this.description=description;
    }
}

const cardClickHandler = function(e){
    if(e.target.id === 'minimize'){
        minimizeCard(e);
    }

    if(e.target.id === 'delete'){
        deleteCard(e);
    }

}

const deleteCard = function(e){
    let index = e.target.parentNode.parentNode.parentNode.id;
    toDoList.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(toDoList));
    location.reload();
}


const minimizeCard = function(e){

    const iconName = e.target.name;
    const parentCard = e.target.parentNode.parentNode.parentNode;
    const createdDateEl = parentCard.querySelector('.created-date');
    const descriptionEl = parentCard.querySelector('.description');

    createdDateEl.classList.toggle('hide-display');
    descriptionEl.classList.toggle('hide-display');
    parentCard.classList.toggle('fit-content');
    iconName === 'remove-outline' ? e.target.name = 'browsers-outline' : e.target.name = 'remove-outline'

}

const changePriority = function(e) {
    const priorityLevel = e.target.value;
    const priorityColorDiv = document.querySelectorAll('.priority-color')

    if(priorityLevel === 'high') {
        priorityColorDiv.forEach((divBox) => divBox.style.backgroundColor='firebrick')
    }

    if(priorityLevel === 'medium') {
        priorityColorDiv.forEach((divBox) => divBox.style.backgroundColor='orange')
    }

    if(priorityLevel === 'low') {
        priorityColorDiv.forEach((divBox) => divBox.style.backgroundColor='lightblue')
    }
}

const showTasks = function(task) {
    const toDoCardDiv = document.createElement('div');
    const headerDiv = document.createElement('div');
    const titleSpan = document.createElement('span')
    const iconHolderDiv = document.createElement('div');

    const dueDateDiv = document.createElement('div');
    const dueDateH4 = document.createElement('h4');

    const createdDateDiv = document.createElement('div');
    const createdDateH4 = document.createElement('h4');
    
    const projectDiv = document.createElement('div');
    const projectH4 = document.createElement('h4');

    const descriptionDiv = document.createElement('div');
    const descriptionP = document.createElement('p');



    toDoCardDiv.className='todo-card';
    toDoCardDiv.id=toDoList.indexOf(task);
    headerDiv.className='header';
    titleSpan.textContent = task.title;
    iconHolderDiv.className = 'icon-holder';
    iconHolderDiv.innerHTML = `<ion-icon id='minimize'name="remove-outline"></ion-icon>
                                <ion-icon id='delete' name="close-outline"></ion-icon>`

    if(task.priority === 'high') {
        headerDiv.style.backgroundColor = 'firebrick';
    }

    if(task.priority === 'medium') {
        headerDiv.style.backgroundColor = 'orange';
        headerDiv.style.color = 'black';
    }

    if(task.priority === 'low') {
        headerDiv.style.backgroundColor = 'lightblue';
        headerDiv.style.color = 'black';
    }

    headerDiv.appendChild(titleSpan);
    headerDiv.appendChild(iconHolderDiv);
    
    
    dueDateDiv.className= 'due-date';
    dueDateH4.textContent= 'Due on: ' + task.dueDate;
    dueDateDiv.appendChild(dueDateH4);
  

    createdDateDiv.className= 'created-date';
    createdDateH4.textContent= 'Created on: ' + task.createdDate;
    createdDateDiv.appendChild(createdDateH4);
    

    projectDiv.className='project';
    projectH4.textContent='Project: ' +  task.project;
    projectDiv.appendChild(projectH4);
    

    descriptionDiv.className='description';
    descriptionP.textContent=task.description;
    descriptionDiv.appendChild(descriptionP);

    toDoCardDiv.appendChild(headerDiv);
    toDoCardDiv.appendChild(dueDateDiv);
    toDoCardDiv.appendChild(createdDateDiv);
    toDoCardDiv.appendChild(projectDiv);
    toDoCardDiv.appendChild(descriptionDiv);

    taskContainerDiv.appendChild(toDoCardDiv);
}

const createTask = function(e) {
    let titleInput=dialog.querySelector('#title');
    let dueDateInput= dialog.querySelector('#dueDate');
    let createdDate=new Date().toLocaleDateString(('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }));
    let projectNameInput=dialog.querySelector('#projectName');
    let descriptionInput=dialog.querySelector('#description');
    let priorityInput=dialog.querySelector('#priority');

    let dueDateValue = dueDateInput.value;

    let dateObject = new Date(dueDateValue);

    let month=dateObject.getMonth() + 1;
    let day = dateObject.getDate();
    let year = dateObject.getFullYear() %100;

    let formattedDueDate = `${month}/${day}/${year}`;

    e.preventDefault();
    let newToDo = new ToDoItem(
        titleInput.value,
         priorityInput.value,
          formattedDueDate,
           createdDate,
            projectNameInput.value,
             descriptionInput.value
        );
    toDoList.push(newToDo);
    dialog.close();
    showTasks(newToDo);
    localStorage.setItem('tasks', JSON.stringify(toDoList));
}

toDoList.forEach((task) => showTasks(task));
priority.addEventListener('change', changePriority)
closeBtn.addEventListener("click", () => {dialog.close();});
addTaskBtn.addEventListener('click', () => {dialog.showModal();});
taskContainerDiv.addEventListener('click', cardClickHandler) 
submitBtn.addEventListener('click', createTask);