const inputElement = document.querySelector('.new-task-input');
const addTaskButton = document.querySelector('.new-task-button');

const tasksContainer = document.querySelector('.tasks-container');


const validateInput = () => inputElement.value.trim().length > 0;

const handleAddTask  = () => {
    const inputIsValid  = validateInput();

    if(!inputIsValid) {
        return inputElement.classList.add("error");
    }

        const taskItemContainer = document.createElement('div');
        taskItemContainer.classList.add('task-item');

        const taskContent = document.createElement('p');
        taskContent.innerText = inputElement.value;

        taskContent.addEventListener('click', () => handleClick(taskContent)); 

        

        const deleteItem= document.createElement('i');
        deleteItem.classList.add("fa");
        deleteItem.classList.add('fa-trash-alt');

        deleteItem.addEventListener("click", () =>
             handleDeleteClick(taskItemContainer, taskContent))

        taskItemContainer.appendChild(taskContent);
        taskItemContainer.appendChild(deleteItem);
        tasksContainer.appendChild(taskItemContainer)

        inputElement.value = "";

        updateLocalStorage()

}
    
const handleClick = (taskContent) => {
    const tasks = tasksContainer.childNodes;  
    for (const task of tasks) {
        if (task.firstChild.isSameNode(taskContent)) {
            task.firstChild.classList.toggle("completed");
        }
    }

    updateLocalStorage()
}
const handleDeleteClick = (taskItemContainer, taskContent) => {
  const tasks = tasksContainer.childNodes;
  for (const task of tasks) {
    if (task.firstChild.isSameNode(taskContent)) {
        taskItemContainer.remove();
    }
  }
updateLocalStorage()
}
    



const handleInputChange = () => {
    const inputIsValid = validateInput ();

    if(inputIsValid) {
        return inputElement.classList.remove("error");
    }

    }

    const updateLocalStorage = () => {
        const tasks = tasksContainer.childNodes;

        const localStorageTasks = [...tasks].map( task => {
            const content = task.firstChild;
            const isCompleted = content.classList.contains('completed')


            return {descripition: content.innerText, isCompleted:isCompleted}


        })

        localStorage.setItem('tasks', JSON.stringify(localStorageTasks))
    };

    const refreshTaskUsingLocalStorage = () => {
        // Tenta obter os dados do localStorage
        const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks')) || [];
    
        // Verifica se é realmente um array
        if (!Array.isArray(tasksFromLocalStorage)) {
            console.error("O conteúdo de localStorage não é um array válido.");
            return;
        }
    
        // Itera pelas tarefas salvas
        for (const task of tasksFromLocalStorage) {
            const taskItemContainer = document.createElement('div');
            taskItemContainer.classList.add('task-item');
    
            const taskContent = document.createElement('p');
            taskContent.innerText = task.descripition;
    
            if (task.isCompleted) {
                taskContent.classList.add('completed');
            }
    
            taskContent.addEventListener('click', () => handleClick(taskContent));
    
            const deleteItem = document.createElement('i');
            deleteItem.classList.add("fa");
            deleteItem.classList.add('fa-trash-alt');
    
            deleteItem.addEventListener("click", () =>
                handleDeleteClick(taskItemContainer, taskContent));
    
            taskItemContainer.appendChild(taskContent);
            taskItemContainer.appendChild(deleteItem);
            tasksContainer.appendChild(taskItemContainer);
        }
    };
        

    refreshTaskUsingLocalStorage();




addTaskButton.addEventListener("click", () => handleAddTask());

inputElement.addEventListener("change",() => handleInputChange());

const data = new Date();
const dia = data.getDate();
const mes = data.toLocaleString('pt-BR',{month: 'short'});
const tituloElement = document.getElementById('titulo');
tituloElement.innerHTML = `Lista de afazeres do dia: ${dia} de ${mes} de 2025`;

