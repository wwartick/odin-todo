const sidebarDiv = document.querySelector('#sidebar');
const addTaskBtn = document.getElementById('add-tasks');
const dialog = document.querySelector('dialog');
const closeBtn = dialog.querySelector('.close-button');
const submitBtn = dialog.querySelector('.submit-button');
const priority = document.getElementById('priority');
const projectContainerDiv = document.querySelector('.project-list-container');
const taskContainerDiv = document.querySelector('#task-container');
const projectList = new Set();
let toDoList = JSON.parse(localStorage.getItem('tasks')) || [];
let reverse;
let isOpen = false;

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

    if(e.target.id === 'edit' && isOpen){
        window.alert("Please submit previous edit")
    }else if(!isOpen){
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
    let targetField = e.target.parentNode;
    if (targetField.classList.contains('icon-holder')) {
        targetField = targetField.parentNode
    }

    const targetCard = targetField.parentNode;
    const targetCardId = targetCard.id;

    let targetInput = targetCard.querySelector('input');
    if(targetField.classList.contains('description')){
        targetInput=targetCard.querySelector('textarea')
    }

    const targetInputValue = targetInput.value;
    const targetInputId = targetInput.id;
    const slicedId = targetInputId.slice(0, -4);

    if(targetField.classList.contains('title')){
        if(targetInputValue === ''){
            targetInput.placeholder='REQUIRED FIELD'
            targetInput.style.backgroundColor='white'
            return;
        }
        targetField.innerHTML = `<span>${targetInputValue}</span>
                                 <div class="icon-holder">
                                 <ion-icon id="edit" name="ellipsis-horizontal-outline" role="img" class="md hydrated"></ion-icon>
                                 <ion-icon id="minimize" name="remove-outline" role="img" class="md hydrated"></ion-icon>
                                 <ion-icon id="delete" name="close-outline" role="img" class="md hydrated"></ion-icon>
                                 </div>`
        toDoList[targetCardId].title = targetInputValue;
        localStorage.setItem('tasks', JSON.stringify(toDoList));
       
    }

    if(targetField.classList.contains('project') || targetField.classList.contains('dueDate')){
        const targetFieldH4= targetField.querySelector('h4');
        if(targetInputValue === '') {
            targetInput.placeholder='REQUIRED FIELD'
            targetInput.style.backgroundColor='firebrick'
            return;
        }

        targetField.innerHTML = `<ion-icon id="edit" name="ellipsis-horizontal-outline"></ion-icon>
                                    <h4> ${targetFieldH4.innerHTML} ${targetInputValue}  </h4>`
        toDoList[targetCardId][slicedId] = targetInputValue;
        localStorage.setItem('tasks', JSON.stringify(toDoList));
        
        if(targetField.classList.contains('project')){
            projectContainerDiv.textContent='';
            projectList.clear();
            toDoList.forEach((task)=> projectList.add(task.project));
            projectList.forEach((project) => showProjects(project)) ;
        }
    }

    if(targetField.classList.contains('description')){
        if(targetInputValue === '') {
            targetInput.placeholder='REQUIRED FIELD'
            targetInput.style.backgroundColor='firebrick'
            return;
        }
        targetField.innerHTML = `<ion-icon id="edit" name="ellipsis-horizontal-outline" role="img" class="md hydrated"></ion-icon>
                                        <p>${targetInputValue}</p>`
        toDoList[targetCardId].description = targetInputValue;
        localStorage.setItem('tasks', JSON.stringify(toDoList));
        
}
    isOpen=false;
}

const editField = function(e) {
    let clickTarget = e.target.parentNode;
    if (clickTarget.classList.contains('icon-holder')){
        clickTarget = clickTarget.parentNode;
    }
    let targetCard = clickTarget.parentNode;
    let targetCardId = targetCard.id;
    
    
    if  (clickTarget.classList.contains('title')){
        clickTarget.innerHTML =`<input type='text' style='width: 8rem; height: 80%; align-self: center' 
                                    id=titleEdit value='${toDoList[targetCardId].title}'>
                                    <div class="icon-holder">
                                    <ion-icon id='submit' name="enter-outline"></ion-icon>
                                    <ion-icon id="minimize" name="remove-outline" role="img" class="md hydrated"></ion-icon>
                                    <ion-icon id="delete" name="close-outline" role="img" class="md hydrated"></ion-icon>
                                    </div>`
                                    
        isOpen=true;             
    } 

    if(clickTarget.classList.contains('project') || clickTarget.classList.contains('dueDate')) {
        let inputType;
        clickTarget.classList.contains('project') ? inputType = 'text' : inputType = 'date';
        let fieldLabel = clickTarget.querySelector('h4').textContent;
        let labelArray = Array.from(fieldLabel);
        let colonSplice = labelArray.indexOf(':');
        let slicedFieldLabel = labelArray.slice(0, colonSplice + 1).join('');
      
        clickTarget.innerHTML= `<ion-icon id='submit' name="enter-outline"></ion-icon>
        <input style="margin-right: .55rem; width: 7rem;" type=${inputType} id="${clickTarget.className}Edit" value='${toDoList[targetCardId][clickTarget.className]}'>
        <h4> ${slicedFieldLabel} </h4>`
        isOpen=true;
    }

    if(clickTarget.classList.contains('description')){
        clickTarget.innerHTML= `<ion-icon id='submit' name="enter-outline"></ion-icon>
        <textarea id="descriptionEdit" name="descriptionEdit" rows="9" cols="30">${toDoList[targetCardId].description}</textarea>`
        isOpen=true;
    } 


}


const deleteCard = function(e){
    let selectedCard = e.target.parentNode.parentNode.parentNode
    let cardIndex = selectedCard.id;

    selectedCard.classList.add('shrink-card')
    setTimeout(() => {selectedCard.classList.add('hide-display');}, 260);
    toDoList.splice(cardIndex, 1);
    localStorage.setItem('tasks', JSON.stringify(toDoList));
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
             descriptionInput.value,
        );

    toDoList.push(newToDo);
    dialog.close();
    showTasks(newToDo);
    if(!projectList.has(projectNameInput.value)) {
        showProjects(projectNameInput.value)
    }
    localStorage.setItem('tasks', JSON.stringify(toDoList));
}

export function showProjects(project) {
    const projectH3 = document.createElement('h3');

    projectH3.textContent=project;
    projectH3.id = `${project}Sorter`
    projectContainerDiv.appendChild(projectH3);
}

export function sortCards(sortSpec){
    reverse = !reverse;
    if(sortSpec === 'All Projects') {
        clearBoard();
        toDoList.forEach((task) => {showTasks(task)});
    } 

    else if(sortSpec === 'Due Date'){
        reverse ? toDoList = toDoList.sort((a, b) => a.dueDate.localeCompare(b.dueDate)):
                  toDoList = toDoList.sort((a, b) => b.dueDate.localeCompare(a.dueDate));
        clearBoard();
        localStorage.setItem('tasks', JSON.stringify(toDoList));
        toDoList.forEach((task) => showTasks(task));
    }

    else if(sortSpec === 'Priority'){
        const priorityWeights = {high: 3, medium: 2, low: 1};
        reverse ? toDoList.sort((a,b) => priorityWeights[a.priority] - priorityWeights[b.priority]):
                  toDoList.sort((a,b) => priorityWeights[b.priority] - priorityWeights[a.priority]);
        clearBoard();
        localStorage.setItem('tasks', JSON.stringify(toDoList));
        toDoList.forEach((task) => showTasks(task)); 
    } 
    else{
        let testArray = toDoList.filter(task => task.project === sortSpec);
        clearBoard();
        testArray.forEach((task) => showTasks(task)); 
    }
}

const sidebarClickHandler = function(e){
    const target = e.target;
    const targetContent = target.textContent;
    if(target.tagName === 'H3'){
        sortCards(targetContent)
    }
}

toDoList.forEach((task) => showTasks(task));
toDoList.forEach((task)=> projectList.add(task.project));

closeBtn.addEventListener("click", () => {dialog.close();});
addTaskBtn.addEventListener('click', () => {dialog.showModal();});
priority.addEventListener('change', changePriority)
taskContainerDiv.addEventListener('click', cardClickHandler) 
submitBtn.addEventListener('click', createTask);
projectList.forEach((project) => showProjects(project)) 
sidebarDiv.addEventListener('click', sidebarClickHandler)