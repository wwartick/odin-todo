import { showTasks, clearBoard } from "./todo";
import { getToDoList, setToDoList } from './storage';

const sidebarDiv = document.querySelector('#sidebar');
const projectList = new Set();
let reverse;
let toDoList = getToDoList();

export function getProjectList() {
    return projectList;
}

export function showProjects(project) {
    const projectContainerDiv = document.querySelector('.project-list-container');
    const projectH3 = document.createElement('h3');

    projectH3.textContent=project;
    projectH3.id = `${project}Sorter`
    projectContainerDiv.appendChild(projectH3);
}

export function sortCards(sortSpec){

    if(sortSpec === 'All Projects') {
        clearBoard();
        toDoList.forEach((task) => {
           // const index = toDoList.findIndex((item) => item === task);
          //  console.log(index);
            //console.log(toDoList)
            //console.log(task)
            //console.log(toDoList.indexOf(task));
            showTasks(task)
        });

    } else if(sortSpec === 'Due Date'){
        reverse ? toDoList = toDoList.sort((a, b) => a.dueDate.localeCompare(b.dueDate)):
                  toDoList = toDoList.sort((a, b) => b.dueDate.localeCompare(a.dueDate));
                  console.log(toDoList);
        reverse = !reverse;
        clearBoard();
        toDoList.forEach((task) => showTasks(task));

    }else if(sortSpec === 'Priority'){
        const priorityWeights = {high: 3, medium: 2, low: 1};
        reverse ? toDoList.sort((a,b) => priorityWeights[a.priority] - priorityWeights[b.priority]):
                  toDoList.sort((a,b) => priorityWeights[b.priority] - priorityWeights[a.priority]);
        reverse = !reverse;
        clearBoard();
        toDoList.forEach((task) => showTasks(task)); 

    } else{
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

export function initSidebar(){

    toDoList.forEach((task)=> projectList.add(task.project));
    projectList.forEach((project) => showProjects(project)) 
    sidebarDiv.addEventListener('click', sidebarClickHandler)

}