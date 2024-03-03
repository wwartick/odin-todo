export function getToDoList() {
    const storedData = localStorage.getItem('tasks');
    
    if (storedData && storedData !== "undefined") {
        return JSON.parse(storedData);
    } else {
        return [];
    }
}

export function setToDoList(toDoList) {
    localStorage.setItem('tasks', JSON.stringify(toDoList));
}