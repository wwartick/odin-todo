import { getToDoList, setToDoList } from "./storage";

const addTaskBtn = document.getElementById('add-tasks');
const dialog = document.querySelector('dialog');
const closeBtn = dialog.querySelector('.close-button');
const submitBtn = dialog.querySelector('.submit-button');
const priority = document.getElementById('priority');
const taskContainerDiv = document.querySelector('#task-container');
let toDoList = getToDoList();


class ToDoItem {
    constructor(title, priority,  dueDate, project, description){
        this.title=title;
        this.priority=priority;
        this.dueDate= dueDate;
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

    if(e.target.id === 'submit'){
        submitEdit(e);
    }
}

export function clearBoard(){
    taskContainerDiv.textContent = '';
}

const submitEdit = function(e) {
   
    if(e.target.parentNode.parentNode.className === 'title'){
        const cardOfTitle = e.target.parentNode.parentNode.parentNode;
        const titleField = e.target.parentNode.parentNode;
        const cardIdOfTitle= cardOfTitle.id;
        const titleFieldInput = cardOfTitle.querySelector('input')
        const titleInputValue = titleFieldInput.value
        
        if(titleInputValue === ''){
            titleFieldInput.placeholder='REQUIRED FIELD'
            titleFieldInput.style.backgroundColor='white'
            return;
        }

        titleField.innerHTML = `<span>${titleInputValue}</span>
        <div class="icon-holder">
        <ion-icon id="edit" name="ellipsis-horizontal-outline" role="img" class="md hydrated"></ion-icon>
        <ion-icon id="minimize" name="remove-outline" role="img" class="md hydrated"></ion-icon>
        <ion-icon id="delete" name="close-outline" role="img" class="md hydrated"></ion-icon>
        </div>`

        toDoList[cardIdOfTitle].title = titleInputValue;
        setToDoList(toDoList)

    } else if(!e.target.parentNode.classList.contains('description')){
    const targetCard=e.target.parentNode.parentNode
    const targetCardId=targetCard.id
    const targetField = e.target.parentNode;
    const targetFieldH4= targetField.querySelector('h4');
    const targetFieldInput = targetField.querySelector('input')
    const targetFieldEdit = targetFieldInput.value
    const targetFieldId = targetFieldInput.id;
    const slicedId = targetFieldId.slice(0, -4);

    if(targetFieldEdit === '') {
        targetFieldInput.placeholder='REQUIRED FIELD'
        targetFieldInput.style.backgroundColor='firebrick'
        return;
    }

    targetField.innerHTML = `<ion-icon id="edit" name="ellipsis-horizontal-outline"></ion-icon>
                                <h4> ${targetFieldH4.innerHTML} ${targetFieldEdit}  </h4>`
    
    toDoList[targetCardId][slicedId] = targetFieldEdit;
    setToDoList(toDoList)

} else{
        const cardOfDescription = e.target.parentNode.parentNode;
        const descriptionField = e.target.parentNode;
        const cardIdOfDescription= cardOfDescription.id;
        const descriptionFieldInput = cardOfDescription.querySelector('textarea')
        const descriptionInputValue = descriptionFieldInput.value

        if(descriptionInputValue === '') {
            descriptionFieldInput.placeholder='REQUIRED FIELD'
            descriptionFieldInput.style.backgroundColor='firebrick'
            return;
        }

        descriptionField.innerHTML = `<ion-icon id="edit" name="ellipsis-horizontal-outline" role="img" class="md hydrated"></ion-icon>
                                        <p>${descriptionInputValue}</p>`

        toDoList[cardIdOfDescription].description = descriptionInputValue;
        setToDoList(toDoList)
}
}

const editField = function(e) {
    let targetCardIndex;
    let targetCardField;
    let targetCardFieldClass;
    let inputType;

   if  (e.target.parentNode.parentNode.classList.contains('title')){
        targetCardIndex = e.target.parentNode.parentNode.parentNode.id;
        targetCardField = e.target.parentNode.parentNode

        targetCardField.innerHTML =`<input type='text' style='width: 8rem; height: 80%; align-self: center' 
                                    id=titleEdit value=${toDoList[targetCardIndex].title}>
        <div class="icon-holder">
        <ion-icon id='submit' name="enter-outline"></ion-icon>
        <ion-icon id="minimize" name="remove-outline" role="img" class="md hydrated"></ion-icon>
        <ion-icon id="delete" name="close-outline" role="img" class="md hydrated"></ion-icon>
        </div>`

   } else{
        targetCardIndex = e.target.parentNode.parentNode.id;
        targetCardField = e.target.parentNode
        targetCardFieldClass = targetCardField.className;

     if(targetCardFieldClass !== 'description') {
        
        targetCardFieldClass === 'project' ? inputType = 'text' : inputType = 'date';

        let fieldLabel = targetCardField.querySelector('h4').textContent;
        let labelArray = Array.from(fieldLabel);
        let colonSplice = labelArray.indexOf(':');
        let slicedFieldLabel = labelArray.slice(0, colonSplice + 1).join('');

        targetCardField.innerHTML= `<ion-icon id='submit' name="enter-outline"></ion-icon>
        <input style="margin-right: .55rem; width: 7rem;" type=${inputType} id="${targetCardFieldClass}Edit" value=${toDoList[targetCardIndex][targetCardFieldClass]}>
        <h4> ${slicedFieldLabel} </h4>`

    }else{
        targetCardField.innerHTML= `<ion-icon id='submit' name="enter-outline"></ion-icon>
        <textarea id="descriptionEdit" name="descriptionEdit" rows="9" cols="30">${toDoList[targetCardIndex].description}</textarea>`
    } 
}
}

const deleteCard = function(e){
    
    let selectedCard = e.target.parentNode.parentNode.parentNode
    let cardIndex = selectedCard.id;
    selectedCard.classList.add('hide-display');
    toDoList.splice(cardIndex, 1);
    setToDoList(toDoList)
}

const minimizeCard = function(e){

    const iconName = e.target.name;
    const parentCard = e.target.parentNode.parentNode.parentNode;
    const descriptionEl = parentCard.querySelector('.description');

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

export function showTasks(task) {
    const toDoCardDiv = document.createElement('div');
    const titleDiv = document.createElement('div');
    const titleSpan = document.createElement('span')
    const iconHolderDiv = document.createElement('div');

    const dueDateDiv = document.createElement('div');
    const dueDateH4 = document.createElement('h4');
    
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
    toDoCardDiv.appendChild(projectDiv);
    toDoCardDiv.appendChild(descriptionDiv);

    taskContainerDiv.appendChild(toDoCardDiv);
}

const createTask = function(e) {
    let titleInput=dialog.querySelector('#title');
    let dueDateInput= dialog.querySelector('#dueDateForm');
    let projectNameInput=dialog.querySelector('#projectName');
    let descriptionInput=dialog.querySelector('#description');
    let priorityInput=dialog.querySelector('#priority');

    let dueDateValue = dueDateInput.value;
    let dateObject = new Date(dueDateValue);
    let month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    let day = dateObject.getDate().toString().padStart(2, '0');
    let year = dateObject.getFullYear() ;

    let formattedDueDate = `${year}-${month}-${day}`;

    if(titleInput.value === '' || projectNameInput.value === '' || dueDateInput.value === '' || 
        descriptionInput.value === '') return;
    e.preventDefault();
    let newToDo = new ToDoItem(
        titleInput.value,
         priorityInput.value,
          formattedDueDate,
            projectNameInput.value,
             descriptionInput.value
        );
    toDoList.push(newToDo);
    dialog.close();
    showTasks(newToDo);
    if(!projectList.has(projectNameInput.value)) {
        showProjects(projectNameInput.value)
    }
    setToDoList(toDoList)
}

export function initToDoApp(){

    toDoList.forEach((task) => showTasks(task));
    priority.addEventListener('change', changePriority)
    closeBtn.addEventListener("click", () => {dialog.close();});
    addTaskBtn.addEventListener('click', () => {dialog.showModal();});
    taskContainerDiv.addEventListener('click', cardClickHandler) 
    submitBtn.addEventListener('click', createTask);

}