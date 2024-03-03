/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sidebar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sidebar */ \"./src/sidebar.js\");\n/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todo */ \"./src/todo.js\");\n\r\n\r\n\r\n\r\n(0,_todo__WEBPACK_IMPORTED_MODULE_1__.initToDoApp)();\r\n(0,_sidebar__WEBPACK_IMPORTED_MODULE_0__.initSidebar)();\n\n//# sourceURL=webpack://odin-todo/./src/index.js?");

/***/ }),

/***/ "./src/sidebar.js":
/*!************************!*\
  !*** ./src/sidebar.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getProjectList: () => (/* binding */ getProjectList),\n/* harmony export */   initSidebar: () => (/* binding */ initSidebar),\n/* harmony export */   showProjects: () => (/* binding */ showProjects),\n/* harmony export */   sortCards: () => (/* binding */ sortCards)\n/* harmony export */ });\n/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo */ \"./src/todo.js\");\n/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage */ \"./src/storage.js\");\n\r\n\r\n\r\nconst sidebarDiv = document.querySelector('#sidebar');\r\nconst projectList = new Set();\r\nlet reverse;\r\nlet toDoList = (0,_storage__WEBPACK_IMPORTED_MODULE_1__.getToDoList)();\r\n\r\nfunction getProjectList() {\r\n    return projectList;\r\n}\r\n\r\nfunction showProjects(project) {\r\n    const projectContainerDiv = document.querySelector('.project-list-container');\r\n    const projectH3 = document.createElement('h3');\r\n\r\n    projectH3.textContent=project;\r\n    projectH3.id = `${project}Sorter`\r\n    projectContainerDiv.appendChild(projectH3);\r\n}\r\n\r\nfunction sortCards(sortSpec){\r\n\r\n    if(sortSpec === 'All Projects') {\r\n        (0,_todo__WEBPACK_IMPORTED_MODULE_0__.clearBoard)();\r\n        toDoList.forEach((task) => {\r\n           // const index = toDoList.findIndex((item) => item === task);\r\n          //  console.log(index);\r\n            //console.log(toDoList)\r\n            //console.log(task)\r\n            //console.log(toDoList.indexOf(task));\r\n            (0,_todo__WEBPACK_IMPORTED_MODULE_0__.showTasks)(task)\r\n        });\r\n\r\n    } else if(sortSpec === 'Due Date'){\r\n        reverse ? toDoList = toDoList.sort((a, b) => a.dueDate.localeCompare(b.dueDate)):\r\n                  toDoList = toDoList.sort((a, b) => b.dueDate.localeCompare(a.dueDate));\r\n                  console.log(toDoList);\r\n        reverse = !reverse;\r\n        (0,_todo__WEBPACK_IMPORTED_MODULE_0__.clearBoard)();\r\n        toDoList.forEach((task) => (0,_todo__WEBPACK_IMPORTED_MODULE_0__.showTasks)(task));\r\n\r\n    }else if(sortSpec === 'Priority'){\r\n        const priorityWeights = {high: 3, medium: 2, low: 1};\r\n        reverse ? toDoList.sort((a,b) => priorityWeights[a.priority] - priorityWeights[b.priority]):\r\n                  toDoList.sort((a,b) => priorityWeights[b.priority] - priorityWeights[a.priority]);\r\n        reverse = !reverse;\r\n        (0,_todo__WEBPACK_IMPORTED_MODULE_0__.clearBoard)();\r\n        toDoList.forEach((task) => (0,_todo__WEBPACK_IMPORTED_MODULE_0__.showTasks)(task)); \r\n\r\n    } else{\r\n        let testArray = toDoList.filter(task => task.project === sortSpec);\r\n        (0,_todo__WEBPACK_IMPORTED_MODULE_0__.clearBoard)();\r\n        testArray.forEach((task) => (0,_todo__WEBPACK_IMPORTED_MODULE_0__.showTasks)(task)); \r\n    }\r\n\r\n}\r\n\r\nconst sidebarClickHandler = function(e){\r\n    const target = e.target;\r\n    const targetContent = target.textContent;\r\n    if(target.tagName === 'H3'){\r\n        sortCards(targetContent)\r\n    }\r\n}\r\n\r\nfunction initSidebar(){\r\n\r\n    toDoList.forEach((task)=> projectList.add(task.project));\r\n    projectList.forEach((project) => showProjects(project)) \r\n    sidebarDiv.addEventListener('click', sidebarClickHandler)\r\n\r\n}\n\n//# sourceURL=webpack://odin-todo/./src/sidebar.js?");

/***/ }),

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getToDoList: () => (/* binding */ getToDoList),\n/* harmony export */   setToDoList: () => (/* binding */ setToDoList)\n/* harmony export */ });\nfunction getToDoList() {\r\n    const storedData = localStorage.getItem('tasks');\r\n    \r\n    if (storedData && storedData !== \"undefined\") {\r\n        return JSON.parse(storedData);\r\n    } else {\r\n        return [];\r\n    }\r\n}\r\n\r\nfunction setToDoList(toDoList) {\r\n    localStorage.setItem('tasks', JSON.stringify(toDoList));\r\n}\n\n//# sourceURL=webpack://odin-todo/./src/storage.js?");

/***/ }),

/***/ "./src/todo.js":
/*!*********************!*\
  !*** ./src/todo.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   clearBoard: () => (/* binding */ clearBoard),\n/* harmony export */   initToDoApp: () => (/* binding */ initToDoApp),\n/* harmony export */   showTasks: () => (/* binding */ showTasks)\n/* harmony export */ });\n/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage */ \"./src/storage.js\");\n/* harmony import */ var _sidebar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sidebar */ \"./src/sidebar.js\");\n\r\n\r\n\r\nconst addTaskBtn = document.getElementById('add-tasks');\r\nconst dialog = document.querySelector('dialog');\r\nconst closeBtn = dialog.querySelector('.close-button');\r\nconst submitBtn = dialog.querySelector('.submit-button');\r\nconst priority = document.getElementById('priority');\r\nconst taskContainerDiv = document.querySelector('#task-container');\r\nlet toDoList = (0,_storage__WEBPACK_IMPORTED_MODULE_0__.getToDoList)();\r\n\r\n\r\nclass ToDoItem {\r\n    constructor(title, priority,  dueDate, project, description, id){\r\n        this.title=title;\r\n        this.priority=priority;\r\n        this.dueDate= dueDate;\r\n        this.project=project;    \r\n        this.description=description;\r\n        this.id = id;\r\n    }\r\n}\r\n\r\nconst cardClickHandler = function(e){\r\n    if(e.target.id === 'minimize'){\r\n        minimizeCard(e);\r\n    }\r\n\r\n    if(e.target.id === 'delete'){\r\n        deleteCard(e);\r\n    }\r\n\r\n    if(e.target.id === 'edit'){\r\n        editField(e);\r\n    }\r\n\r\n    if(e.target.id === 'submit'){\r\n        submitEdit(e);\r\n    }\r\n}\r\n\r\nfunction clearBoard(){\r\n    taskContainerDiv.textContent = '';\r\n}\r\n\r\nconst submitEdit = function(e) {\r\n    let targetField = e.target.parentNode;\r\n    if (targetField.classList.contains('icon-holder')) {\r\n        targetField = targetField.parentNode\r\n    }\r\n    const targetCard = targetField.parentNode;\r\n    const targetCardId = targetCard.id;\r\n    const targetInput = targetCard.querySelector('input');\r\n    const targetInputValue = targetInput.value;\r\n    const targetInputId = targetInput.id;\r\n    const slicedId = targetInputId.slice(0, -4);\r\n\r\n    if(targetField.classList.contains('title')){\r\n        if(targetInputValue === ''){\r\n            targetInput.placeholder='REQUIRED FIELD'\r\n            targetInput.style.backgroundColor='white'\r\n            return;\r\n        }\r\n        targetField.innerHTML = `<span>${targetInputValue}</span>\r\n                                 <div class=\"icon-holder\">\r\n                                 <ion-icon id=\"edit\" name=\"ellipsis-horizontal-outline\" role=\"img\" class=\"md hydrated\"></ion-icon>\r\n                                 <ion-icon id=\"minimize\" name=\"remove-outline\" role=\"img\" class=\"md hydrated\"></ion-icon>\r\n                                 <ion-icon id=\"delete\" name=\"close-outline\" role=\"img\" class=\"md hydrated\"></ion-icon>\r\n                                 </div>`\r\n        toDoList[targetCardId].title = targetInputValue;\r\n        (0,_storage__WEBPACK_IMPORTED_MODULE_0__.setToDoList)(toDoList)\r\n    }\r\n\r\n    if(targetField.classList.contains('project') || targetField.classList.contains('dueDate')){\r\n        const targetFieldH4= targetField.querySelector('h4');\r\n        if(targetInputValue === '') {\r\n            targetInput.placeholder='REQUIRED FIELD'\r\n            targetInput.style.backgroundColor='firebrick'\r\n            return;\r\n        }\r\n\r\n        targetField.innerHTML = `<ion-icon id=\"edit\" name=\"ellipsis-horizontal-outline\"></ion-icon>\r\n                                    <h4> ${targetFieldH4.innerHTML} ${targetInputValue}  </h4>`\r\n        \r\n        toDoList[targetCardId][slicedId] = targetInputValue;\r\n        (0,_storage__WEBPACK_IMPORTED_MODULE_0__.setToDoList)(toDoList)\r\n\r\n}\r\n    if(targetField.classList.contains('ikashjndloahjs')){\r\n        const cardOfDescription = e.target.parentNode.parentNode;\r\n        const descriptionField = e.target.parentNode;\r\n        const cardIdOfDescription= cardOfDescription.id;\r\n        const descriptionFieldInput = cardOfDescription.querySelector('textarea')\r\n        const descriptionInputValue = descriptionFieldInput.value\r\n\r\n        if(descriptionInputValue === '') {\r\n            descriptionFieldInput.placeholder='REQUIRED FIELD'\r\n            descriptionFieldInput.style.backgroundColor='firebrick'\r\n            return;\r\n        }\r\n        descriptionField.innerHTML = `<ion-icon id=\"edit\" name=\"ellipsis-horizontal-outline\" role=\"img\" class=\"md hydrated\"></ion-icon>\r\n                                        <p>${descriptionInputValue}</p>`\r\n        toDoList[cardIdOfDescription].description = descriptionInputValue;\r\n        (0,_storage__WEBPACK_IMPORTED_MODULE_0__.setToDoList)(toDoList)\r\n}\r\n}\r\n\r\nconst editField = function(e) {\r\n    let targetCardIndex;\r\n    let targetCardField;\r\n    let targetCardFieldClass;\r\n    let inputType;\r\n\r\n\r\n   if  (e.target.parentNode.parentNode.classList.contains('title')){\r\n        targetCardIndex = e.target.parentNode.parentNode.parentNode.id;\r\n        targetCardField = e.target.parentNode.parentNode\r\n\r\n        targetCardField.innerHTML =`<input type='text' style='width: 8rem; height: 80%; align-self: center' \r\n                                    id=titleEdit value='${toDoList[targetCardIndex].title}'>\r\n        <div class=\"icon-holder\">\r\n        <ion-icon id='submit' name=\"enter-outline\"></ion-icon>\r\n        <ion-icon id=\"minimize\" name=\"remove-outline\" role=\"img\" class=\"md hydrated\"></ion-icon>\r\n        <ion-icon id=\"delete\" name=\"close-outline\" role=\"img\" class=\"md hydrated\"></ion-icon>\r\n        </div>`\r\n   } else{\r\n        targetCardIndex = e.target.parentNode.parentNode.id;\r\n        targetCardField = e.target.parentNode\r\n        targetCardFieldClass = targetCardField.className;\r\n     if(targetCardFieldClass !== 'description') {\r\n        \r\n        targetCardFieldClass === 'project' ? inputType = 'text' : inputType = 'date';\r\n\r\n        let fieldLabel = targetCardField.querySelector('h4').textContent;\r\n        let labelArray = Array.from(fieldLabel);\r\n        let colonSplice = labelArray.indexOf(':');\r\n        let slicedFieldLabel = labelArray.slice(0, colonSplice + 1).join('');\r\n        let initialInputValue = toDoList[targetCardIndex][targetCardFieldClass];\r\n\r\n\r\n        targetCardField.innerHTML= `<ion-icon id='submit' name=\"enter-outline\"></ion-icon>\r\n        <input style=\"margin-right: .55rem; width: 7rem;\" type=${inputType} id=\"${targetCardFieldClass}Edit\" value='${initialInputValue}'>\r\n        <h4> ${slicedFieldLabel} </h4>`\r\n\r\n    }else{\r\n        targetCardField.innerHTML= `<ion-icon id='submit' name=\"enter-outline\"></ion-icon>\r\n        <textarea id=\"descriptionEdit\" name=\"descriptionEdit\" rows=\"9\" cols=\"30\">${toDoList[targetCardIndex].description}</textarea>`\r\n    } \r\n}\r\n}\r\n\r\nconst deleteCard = function(e){\r\n    \r\n    let selectedCard = e.target.parentNode.parentNode.parentNode\r\n    let cardIndex = selectedCard.id;\r\n    selectedCard.classList.add('hide-display');\r\n    toDoList.splice(cardIndex, 1);\r\n    (0,_storage__WEBPACK_IMPORTED_MODULE_0__.setToDoList)(toDoList)\r\n}\r\n\r\nconst minimizeCard = function(e){\r\n\r\n    const iconName = e.target.name;\r\n    const parentCard = e.target.parentNode.parentNode.parentNode;\r\n    const descriptionEl = parentCard.querySelector('.description');\r\n\r\n    descriptionEl.classList.toggle('hide-display');\r\n    parentCard.classList.toggle('fit-content');\r\n    iconName === 'remove-outline' ? e.target.name = 'browsers-outline' : e.target.name = 'remove-outline'\r\n\r\n}\r\n\r\nconst changePriority = function(e) {\r\n    const priorityLevel = e.target.value;\r\n    const priorityColorDiv = document.querySelectorAll('.priority-color')\r\n\r\n    if(priorityLevel === 'high') {\r\n        priorityColorDiv.forEach((divBox) => divBox.style.backgroundColor='firebrick')\r\n    }\r\n\r\n    if(priorityLevel === 'medium') {\r\n        priorityColorDiv.forEach((divBox) => divBox.style.backgroundColor='orange')\r\n    }\r\n\r\n    if(priorityLevel === 'low') {\r\n        priorityColorDiv.forEach((divBox) => divBox.style.backgroundColor='lightblue')\r\n    }\r\n}\r\n\r\nfunction showTasks(task) {\r\n    const toDoCardDiv = document.createElement('div');\r\n    const titleDiv = document.createElement('div');\r\n    const titleSpan = document.createElement('span')\r\n    const iconHolderDiv = document.createElement('div');\r\n\r\n    const dueDateDiv = document.createElement('div');\r\n    const dueDateH4 = document.createElement('h4');\r\n    \r\n    const projectDiv = document.createElement('div');\r\n    const projectH4 = document.createElement('h4');\r\n\r\n    const descriptionDiv = document.createElement('div');\r\n    const descriptionP = document.createElement('p');\r\n\r\n    toDoCardDiv.className='todo-card';\r\n    toDoCardDiv.id=toDoList.indexOf(task);\r\n    titleDiv.className='title';\r\n    titleSpan.textContent = task.title;\r\n    iconHolderDiv.className = 'icon-holder';\r\n    iconHolderDiv.innerHTML = `<ion-icon id=\"edit\" name=\"ellipsis-horizontal-outline\"></ion-icon>\r\n                               <ion-icon id='minimize'name=\"remove-outline\"></ion-icon>\r\n                                <ion-icon id='delete' name=\"close-outline\"></ion-icon>`\r\n\r\n    if(task.priority === 'high') {\r\n        titleDiv.style.backgroundColor = 'firebrick';\r\n    }\r\n\r\n    if(task.priority === 'medium') {\r\n        titleDiv.style.backgroundColor = 'orange';\r\n        titleDiv.style.color = 'black';\r\n    }\r\n\r\n    if(task.priority === 'low') {\r\n        titleDiv.style.backgroundColor = 'lightblue';\r\n        titleDiv.style.color = 'black';\r\n    }\r\n\r\n    titleDiv.appendChild(titleSpan);\r\n    titleDiv.appendChild(iconHolderDiv);\r\n    \r\n    \r\n    dueDateDiv.className= 'dueDate';\r\n    dueDateH4.textContent= 'Due: ' + task.dueDate;\r\n    dueDateDiv.innerHTML= '<ion-icon id=\"edit\" name=\"ellipsis-horizontal-outline\"></ion-icon>';\r\n    dueDateDiv.appendChild(dueDateH4);\r\n\r\n    projectDiv.className='project';\r\n    projectH4.textContent='Project: ' +  task.project;\r\n    projectDiv.innerHTML= '<ion-icon id=\"edit\" name=\"ellipsis-horizontal-outline\"></ion-icon>';\r\n    projectDiv.appendChild(projectH4);\r\n    \r\n\r\n    descriptionDiv.className='description';\r\n    descriptionP.textContent=task.description;\r\n    descriptionDiv.innerHTML= '<ion-icon id=\"edit\" name=\"ellipsis-horizontal-outline\"></ion-icon>';\r\n    descriptionDiv.appendChild(descriptionP);\r\n\r\n    toDoCardDiv.appendChild(titleDiv);\r\n    toDoCardDiv.appendChild(dueDateDiv);\r\n    toDoCardDiv.appendChild(projectDiv);\r\n    toDoCardDiv.appendChild(descriptionDiv);\r\n\r\n    taskContainerDiv.appendChild(toDoCardDiv);\r\n}\r\n\r\nconst createTask = function(e) {\r\n    let titleInput=dialog.querySelector('#title');\r\n    let dueDateInput= dialog.querySelector('#dueDateForm');\r\n    let projectNameInput=dialog.querySelector('#projectName');\r\n    let descriptionInput=dialog.querySelector('#description');\r\n    let priorityInput=dialog.querySelector('#priority');\r\n    let cardId = toDoList.length;\r\n\r\n    let dueDateValue = dueDateInput.value;\r\n    let dateObject = new Date(dueDateValue);\r\n    let month = (dateObject.getMonth() + 1).toString().padStart(2, '0');\r\n    let day = dateObject.getDate().toString().padStart(2, '0');\r\n    let year = dateObject.getFullYear() ;\r\n\r\n    let formattedDueDate = `${year}-${month}-${day}`;\r\n\r\n    if(titleInput.value === '' || projectNameInput.value === '' || dueDateInput.value === '' || \r\n        descriptionInput.value === '') return;\r\n    e.preventDefault();\r\n    let newToDo = new ToDoItem(\r\n        titleInput.value,\r\n         priorityInput.value,\r\n          formattedDueDate,\r\n            projectNameInput.value,\r\n             descriptionInput.value,\r\n             cardId\r\n        );\r\n    toDoList.push(newToDo);\r\n    dialog.close();\r\n    showTasks(newToDo);\r\n    if(!(0,_sidebar__WEBPACK_IMPORTED_MODULE_1__.getProjectList)().has(projectNameInput.value)) {\r\n        (0,_sidebar__WEBPACK_IMPORTED_MODULE_1__.showProjects)(projectNameInput.value)\r\n    }\r\n    (0,_storage__WEBPACK_IMPORTED_MODULE_0__.setToDoList)(toDoList);\r\n    console.log(toDoList);\r\n}\r\n\r\nfunction initToDoApp(){\r\n\r\n    toDoList.forEach((task) => showTasks(task));\r\n    priority.addEventListener('change', changePriority)\r\n    closeBtn.addEventListener(\"click\", () => {dialog.close();});\r\n    addTaskBtn.addEventListener('click', () => {dialog.showModal();});\r\n    taskContainerDiv.addEventListener('click', cardClickHandler) \r\n    submitBtn.addEventListener('click', createTask);\r\n\r\n}\n\n//# sourceURL=webpack://odin-todo/./src/todo.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;