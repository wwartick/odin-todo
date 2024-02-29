const minimizeBtn = document.getElementById('minimize');
const addTaskBtn = document.getElementById('add-tasks');
const dialog = document.querySelector('dialog');
const closeBtn = dialog.querySelector('.close-button');
const submitBtn = dialog.querySelector('.submit-button');
const priority = document.getElementById('priority');

const minimizeCard = function(e){

    const iconName = e.target.name;
    const parentCard = e.target.parentNode.parentNode.parentNode;
    const createdDateEl = parentCard.querySelector('.created-date');
    const mainContentEl = parentCard.querySelector('.main-content');

    createdDateEl.classList.toggle('hide-display');
    mainContentEl.classList.toggle('hide-display');
    parentCard.classList.toggle('fit-content');
    iconName === 'remove-outline' ? e.target.name = 'browsers-outline' : e.target.name = 'remove-outline'

}

const changePriority = function(e) {
    const priorityLevel = e.target.value;
    const priorityColor = document.querySelectorAll('.priority-color')

    if(priorityLevel === 'high') {
        priorityColor.forEach((divBox) =>divBox.style.backgroundColor='firebrick')
    }

    if(priorityLevel === 'medium') {
        priorityColor.forEach((divBox) =>divBox.style.backgroundColor='orange')
    }

    if(priorityLevel === 'low') {
        priorityColor.forEach((divBox) =>divBox.style.backgroundColor='lightblue')
    }
}

const createTask = function() {
    
}


priority.addEventListener('change', changePriority)
closeBtn.addEventListener("click", () => {dialog.close();});
addTaskBtn.addEventListener('click', () => {dialog.showModal();});
minimizeBtn.addEventListener('click', minimizeCard) 
submitBtn.addEventListener('click', createTask);