export function getToDoList() {
    return JSON.parse(localStorage.getItem('tasks')) || [];
}

export function setToDoList(toDoList) {
    localStorage.setItem('tasks', JSON.stringify(toDoList));
}