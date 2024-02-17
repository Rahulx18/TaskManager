document.getElementById('addTaskBtn').addEventListener('click', function () {
    addTask();
});

document.getElementById('taskList').addEventListener('click', function (event) {
    const target = event.target;

    if (target.classList.contains('removeTaskBtn')) {
        removeTask(target);
    } else if (target.classList.contains('detailsBtn')) {
        viewDetails(target);
    }
});

function addTask() {
    let taskName = document.getElementById('taskInput').value.trim();
    let deadline = document.getElementById('deadlineInput').value;

    if (taskName) {
        let taskItem = createTaskElement(taskName, deadline);
        let taskList = document.getElementById('taskList');
        
       
        let firstChild = taskList.firstElementChild;

        if (firstChild) {
            taskList.insertBefore(taskItem, firstChild);
        } else {
            taskList.appendChild(taskItem); 
        }

        // Clear input fields
        document.getElementById('taskInput').value = '';
        document.getElementById('deadlineInput').value = '';
    }
}

function createTaskElement(taskName, deadline) {
    let taskItem = document.createElement('li');
    taskItem.innerHTML = `
        <span>Task: ${taskName}</span>
        <span class="deadline">Deadline: ${deadline}</span>
        <button class="detailsBtn">View Details</button>
        <button class="removeTaskBtn">Remove</button>
    `;
    return taskItem;
}

function removeTask(button) {
    let listItem = button.parentNode;
    listItem.parentNode.removeChild(listItem);
}

function viewDetails(button) {
    // Redirect to tasks.html
    window.location.href = 'tasks.html';
}


