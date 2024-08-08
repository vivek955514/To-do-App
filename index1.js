document.addEventListener('DOMContentLoaded', function () {
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const pendingTasksList = document.getElementById('pending-tasks-list');
    const completedTasksList = document.getElementById('completed-tasks-list');

    addTaskBtn.addEventListener('click', addTask);

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        const currentTime = new Date();
        const taskItem = createTaskItem(taskText, currentTime, null);
        pendingTasksList.appendChild(taskItem);
        taskInput.value = '';
    }

    function createTaskItem(taskText, addedTime, completedTime) {
        const li = document.createElement('li');

        const taskInfo = document.createElement('div');
        taskInfo.classList.add('task-info');

        const span = document.createElement('span');
        span.textContent = taskText;
        taskInfo.appendChild(span);

        const addedTimeSpan = document.createElement('span');
        addedTimeSpan.classList.add('task-datetime');
        addedTimeSpan.textContent = `Added: ${formatDateTime(addedTime)}`;
        taskInfo.appendChild(addedTimeSpan);

        if (completedTime) {
            const completedTimeSpan = document.createElement('span');
            completedTimeSpan.classList.add('task-datetime');
            completedTimeSpan.textContent = `Completed: ${formatDateTime(completedTime)}`;
            taskInfo.appendChild(completedTimeSpan);
        }

        li.appendChild(taskInfo);

        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Complete';
        completeBtn.classList.add('complete-btn');
        completeBtn.addEventListener('click', () => completeTask(li, span, addedTime));
        li.appendChild(completeBtn);

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-btn');
        editBtn.addEventListener('click', () => editTask(li, span, addedTimeSpan));
        li.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => deleteTask(li));
        li.appendChild(deleteBtn);

        return li;
    }

    function completeTask(taskItem, span, addedTime) {
        taskItem.querySelector('.complete-btn').remove();
        const completedTime = new Date();
        const completedTimeSpan = document.createElement('span');
        completedTimeSpan.classList.add('task-datetime');
        completedTimeSpan.textContent = `Completed: ${formatDateTime(completedTime)}`;
        taskItem.querySelector('.task-info').appendChild(completedTimeSpan);
        completedTasksList.appendChild(taskItem);
    }

    function editTask(taskItem, span, addedTimeSpan) {
        const newTaskText = prompt('Edit task:', span.textContent);
        if (newTaskText !== null && newTaskText.trim() !== '') {
            span.textContent = newTaskText.trim();
        }
    }

    function deleteTask(taskItem) {
        taskItem.remove();
    }

    function formatDateTime(date) {
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    }
});
