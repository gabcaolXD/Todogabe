const inputElement = document.querySelector('.new-task-input');
const addTaskButton = document.querySelector('.new-task-button');
const tasksContainer = document.querySelector('.tasks-container');
const datePicker = document.getElementById('date-picker');
const loadTasksButton = document.querySelector('.load-tasks-button');
const tituloElement = document.querySelector('.titulo'); // Se necessário

const validateInput = () => inputElement.value.trim().length > 0;

const handleAddTask  = () => {
    const inputIsValid  = validateInput();

    if (!inputIsValid) {
        return inputElement.classList.add("error");
    }

    const taskItemContainer = document.createElement('div');
    taskItemContainer.classList.add('task-item');

    const taskContent = document.createElement('p');
    taskContent.innerText = inputElement.value;

    taskContent.addEventListener('click', () => handleClick(taskContent)); 

    const deleteItem = document.createElement('i');
    deleteItem.classList.add("fa", "fa-trash-alt");

    deleteItem.addEventListener("click", () =>
        handleDeleteClick(taskItemContainer, taskContent));

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);
    tasksContainer.appendChild(taskItemContainer);

    inputElement.value = "";
    updateLocalStorage();
};
    
const handleClick = (taskContent) => {
    const tasks = tasksContainer.childNodes;  
    for (const task of tasks) {
        if (task.firstChild.isSameNode(taskContent)) {
            task.firstChild.classList.toggle("completed");
        }
    }

    updateLocalStorage();
};

const handleDeleteClick = (taskItemContainer, taskContent) => {
    const tasks = tasksContainer.childNodes;
    for (const task of tasks) {
        if (task.firstChild.isSameNode(taskContent)) {
            taskItemContainer.remove();
        }
    }
    updateLocalStorage();
};

const handleInputChange = () => {
    const inputIsValid = validateInput();

    if (inputIsValid) {
        return inputElement.classList.remove("error");
    }
};

const updateLocalStorage = () => {
    const tasks = tasksContainer.childNodes;
    const dataAtual = new Date();
    const dia = dataAtual.getDate();
    const mes = dataAtual.toLocaleString('pt-BR', { month: 'short' });
    const dataFormatada = `${dia} de ${mes} de ${dataAtual.getFullYear()}`;

    const localStorageTasks = [...tasks].map(task => {
        const content = task.firstChild;
        const isCompleted = content.classList.contains('completed');
        return { description: content.innerText, isCompleted: isCompleted };
    });

    localStorage.setItem(dataFormatada, JSON.stringify(localStorageTasks));
};

const LoadTasksFromSelectedDate = () => {
    const selectedDate = datePicker.value;
    if (!selectedDate) {
        alert("Por favor, selecione uma data.");
        return;
    }

    const [year, month, day] = selectedDate.split("-");
    const formattedDate = `${parseInt(day)} de ${new Date(year, month - 1).toLocaleString("pt-BR", { month: "short" })} de ${year}`;
    const tasksFromLocalStorage = JSON.parse(localStorage.getItem(formattedDate)) || [];

    tasksContainer.innerHTML = "";
    for (const task of tasksFromLocalStorage) {
        const taskItemContainer = document.createElement('div');
        taskItemContainer.classList.add('task-item');

        const taskContent = document.createElement('p');
        taskContent.innerText = task.description;

        if (task.isCompleted) {
            taskContent.classList.add('completed');
        }

        taskContent.addEventListener('click', () => handleClick(taskContent));

        const deleteItem = document.createElement('i');
        deleteItem.classList.add("fa", "fa-trash-alt");

        deleteItem.addEventListener("click", () =>
            handleDeleteClick(taskItemContainer, taskContent));

        taskItemContainer.appendChild(taskContent);
        taskItemContainer.appendChild(deleteItem);
        tasksContainer.appendChild(taskItemContainer);
    }
};

loadTasksButton.addEventListener("click", LoadTasksFromSelectedDate);
addTaskButton.addEventListener("click", handleAddTask);
inputElement.addEventListener("change", handleInputChange);

