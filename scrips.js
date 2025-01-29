// Selecionando os elementos da interface
const inputElement = document.querySelector('.new-task-input');
const addTaskButton = document.querySelector('.new-task-button');
const tasksContainer = document.querySelector('.tasks-container');
const datePicker = document.getElementById('date-picker');
const loadTasksButton = document.querySelector('.load-tasks-button');
const tituloElement = document.getElementById('titulo');

// Validação do input
const validateInput = () => inputElement.value.trim().length > 0;

// Adiciona nova tarefa
const handleAddTask = () => {
    const inputIsValid = validateInput();

    if (!inputIsValid) {
        inputElement.classList.add("error");
        return;
    }

    // Criar estrutura do item da tarefa
    const taskItemContainer = document.createElement('div');
    taskItemContainer.classList.add('task-item');

    const taskContent = document.createElement('p');
    taskContent.innerText = inputElement.value;
    taskContent.addEventListener('click', () => handleClick(taskContent));

    const deleteItem = document.createElement('i');
    deleteItem.classList.add("fa", "fa-trash-alt");
    deleteItem.addEventListener("click", () => handleDeleteClick(taskItemContainer));

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteItem);
    tasksContainer.appendChild(taskItemContainer);

    inputElement.value = "";
    updateLocalStorage();
};

// Alternar estado de conclusão da tarefa
const handleClick = (taskContent) => {
    taskContent.classList.toggle('completed');
    updateLocalStorage();
};

// Remover tarefa
const handleDeleteClick = (taskItemContainer) => {
    taskItemContainer.remove();
    updateLocalStorage();
};

// Atualizar LocalStorage com as tarefas do dia
const updateLocalStorage = () => {
    const dataAtual = new Date();
    const dia = dataAtual.getDate();
    const mes = dataAtual.toLocaleString('pt-BR', { month: 'short' });
    const dataFormatada = `${dia} de ${mes} de ${dataAtual.getFullYear()}`;

    const tasks = [...tasksContainer.children].map(task => ({
        description: task.firstChild.innerText,
        isCompleted: task.firstChild.classList.contains('completed')
    }));

    localStorage.setItem(dataFormatada, JSON.stringify(tasks));
};

// Carregar tarefas de uma data selecionada
const loadTasksFromSelectedDate = () => {
    const selectedDate = datePicker.value;
    if (!selectedDate) {
        alert("Por favor, selecione uma data.");
        return;
    }

    const [year, month, day] = selectedDate.split("-");
    const formattedDate = `${parseInt(day)} de ${new Date(year, month - 1).toLocaleString("pt-BR", { month: "short" })} de ${year}`;

    const tasksFromLocalStorage = JSON.parse(localStorage.getItem(formattedDate)) || [];
    
    tasksContainer.innerHTML = ""; // Limpa as tarefas atuais antes de carregar

    tasksFromLocalStorage.forEach(task => {
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
        deleteItem.addEventListener("click", () => handleDeleteClick(taskItemContainer));

        taskItemContainer.appendChild(taskContent);
        taskItemContainer.appendChild(deleteItem);
        tasksContainer.appendChild(taskItemContainer);
    });
};

// Atualizar título da página com a data atual
const data = new Date();
const dia = data.getDate();
const mes = data.toLocaleString('pt-BR', { month: 'short' });
tituloElement.innerHTML = `Lista de afazeres do dia: ${dia} de ${mes} de ${data.getFullYear()}`;

// Adicionando os eventos
addTaskButton.addEventListener("click", handleAddTask);
inputElement.addEventListener("input", () => inputElement.classList.remove("error"));
loadTasksButton.addEventListener("click", loadTasksFromSelectedDate);
