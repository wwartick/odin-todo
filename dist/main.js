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

    if(e.target.id === 'edit'){
        editField(e);
    }

}

const editField = function(e) {
    let targetCardIndex;
    let targetCardField;
    let targetCardFieldClass;
   if  (e.target.parentNode.parentNode.classList.contains('title')){
        targetCardIndex = e.target.parentNode.parentNode.parentNode.id;
        targetCardField = e.target.parentNode.parentNode.className
        //console.log(toDoList[targetCardIndex][targetCardField])
   } else{
        targetCardIndex = e.target.parentNode.parentNode.id;
        targetCardField = e.target.parentNode
        targetCardFieldClass = targetCardField.className;

        //console.log(targetCardField.innerHTML)
       //console.log(toDoList[targetCardIndex][targetCardFieldClass])
     if(targetCardFieldClass != 'description' ) {

        let fieldLabel = targetCardField.querySelector('h4').textContent;
        let labelArray = Array.from(fieldLabel);
        let colonSplice = labelArray.indexOf(':');
        let slicedFieldLabel = labelArray.slice(0, colonSplice + 1).join('');
        console.log(slicedFieldLabel);
        
        targetCardField.innerHTML= `<ion-icon id='submit' name="enter-outline"></ion-icon>
        <input style="margin-right: .5rem; width: 8rem;" type="text" id="search" value=${toDoList[targetCardIndex][targetCardFieldClass]}>
        <h4> ${slicedFieldLabel} </h4>`
    }else{
        console.log('poop');
    } 
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
    const createdDateEl = parentCard.querySelector('.createdDate');
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
    const titleDiv = document.createElement('div');
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
    titleDiv.className='title';
    titleSpan.textContent = task.title;
    iconHolderDiv.className = 'icon-holder';
    iconHolderDiv.innerHTML = `<ion-icon id="edit" name="ellipsis-horizontal-outline"></ion-icon>
                                <ion-icon id='minimize'name="remove-outline"></ion-icon>
                                <ion-icon id='delete' name="close-outline"></ion-icon>`

    if(task.priority === 'high') {
        titleDiv.style.backgroundColor = 'firebrick';
    }

    if(task.priority === 'medium') {
        titleDiv.style.backgroundColor = 'orange';
        titleDiv.style.color = 'black';
    }

    if(task.priority === 'low') {
        titleDiv.style.backgroundColor = 'lightblue';
        titleDiv.style.color = 'black';
    }

    titleDiv.appendChild(titleSpan);
    titleDiv.appendChild(iconHolderDiv);
    
    
    dueDateDiv.className= 'dueDate';
    dueDateH4.textContent= 'Due: ' + task.dueDate;
    dueDateDiv.innerHTML= '<ion-icon id="edit" name="ellipsis-horizontal-outline"></ion-icon>';
    dueDateDiv.appendChild(dueDateH4);
  

    createdDateDiv.className= 'createdDate';
    createdDateH4.textContent= 'Created: ' + task.createdDate;
    createdDateDiv.innerHTML= '<ion-icon id="edit" name="ellipsis-horizontal-outline"></ion-icon>';
    createdDateDiv.appendChild(createdDateH4);
    

    projectDiv.className='project';
    projectH4.textContent='Project: ' +  task.project;
    projectDiv.innerHTML= '<ion-icon id="edit" name="ellipsis-horizontal-outline"></ion-icon>';
    projectDiv.appendChild(projectH4);
    

    descriptionDiv.className='description';
    descriptionP.textContent=task.description;
    descriptionDiv.innerHTML= '<ion-icon id="edit" name="ellipsis-horizontal-outline"></ion-icon>';
    descriptionDiv.appendChild(descriptionP);

    toDoCardDiv.appendChild(titleDiv);
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
    let year = dateObject.getFullYear() ;

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