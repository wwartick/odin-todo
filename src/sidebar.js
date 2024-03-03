import { showTasks, clearBoard } from "./todo";
const sidebarDiv = document.querySelector('#sidebar');
const projectList = new Set();
let reverse;


const showProjects = function(project) {
    const projectContainerDiv = document.querySelector('.project-list-container');
    const projectH3 = document.createElement('h3');

    projectH3.textContent=project;
    projectH3.id = `${project}Sorter`
    projectContainerDiv.appendChild(projectH3);
}

const sortCards = function(sortSpec){

    if(sortSpec === 'All Projects') {
        clearBoard();
        toDoList.forEach((task) => showTasks(task));
    } else if(sortSpec === 'Due Date'){
        reverse ? toDoList.sort((a, b) => a.dueDate.localeCompare(b.dueDate)) :
                  toDoList.sort((a, b) => b.dueDate.localeCompare(a.dueDate));
                   
        reverse = !reverse;
        clearBoard();
        toDoList.forEach((task) => showTasks(task));
        localStorage.setItem('tasks', JSON.stringify(toDoList));
    }else if(sortSpec === 'Priority'){
        const priorityWeights = {high: 3, medium: 2, low: 1};
        reverse ? toDoList.sort((a,b) => priorityWeights[a.priority] - priorityWeights[b.priority]):
                  toDoList.sort((a,b) => priorityWeights[b.priority] - priorityWeights[a.priority]);
        reverse = !reverse;
        clearBoard();
        toDoList.forEach((task) => showTasks(task)); 
        localStorage.setItem('tasks', JSON.stringify(toDoList));

    } else{
        testArray = toDoList.filter(task => task.project === sortSpec);
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

export function initSidebar(){

}