// Add event listener to the "Add Task" button
document.getElementById('addTaskBtn').addEventListener('click', function () {
    addTask();
    updateOverview(); // Call updateOverview after adding a task
});

// Add event listener to the task list for removing tasks and viewing details
document.getElementById('taskList').addEventListener('click', function (event) {
    const target = event.target;

    if (target.classList.contains('removeTaskBtn')) {
        removeTask(target);
        updateOverview(); // Call updateOverview after removing a task
    } else if (target.classList.contains('detailsBtn')) {
        viewDetails(target);
    }
});

// Function to add a new task to the task list
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

// Function to create a task element
function createTaskElement(taskName, deadline) {
    let taskItem = document.createElement('li');
    let deadlineText = deadline ? `Deadline: ${deadline}` : 'No deadline specified';

    taskItem.innerHTML = `
        <span>Task: ${taskName}</span>
        <span class="deadline">${deadlineText}</span>
        <input type="text" class="dateEditor" value="${deadline}" readonly disabled style="display: none;">
        <button class="detailsBtn">View Details</button>
        <button class="removeTaskBtn">Remove</button>
    `;
    return taskItem;
}



// Function to remove a task from the task list
function removeTask(button) {
    let listItem = button.parentNode;
    listItem.parentNode.removeChild(listItem);
}

// Function to update the overview section based on the tasks
function updateOverview() {
    console.log("Updating.");
    let totalTasks = document.getElementById('taskList').children.length;
    let overdueTasks = calculateOverdueTasks();
    let upcomingDeadlines = calculateUpcomingDeadlines();

    document.getElementById('totalTasks').textContent = totalTasks;
    document.getElementById('overdueTasks').textContent = overdueTasks;
    document.getElementById('upcomingDeadlines').textContent = upcomingDeadlines;
    console.log("Overview updated.");
}

// Helper function to calculate the number of overdue tasks
function calculateOverdueTasks() {
    console.log("Calculating overdue tasks...");
    let today = new Date();
    let overdueTasks = 0;
    let tasks = Array.from(document.getElementById('taskList').children);
    tasks.forEach(task => {
        let deadline = task.querySelector('.dateEditor')?.value; //? for undefined values
        console.log("Deadline:", deadline);
        if (deadline) {
            deadline = new Date(deadline);
            if (deadline < today) {
                overdueTasks++;
            }
        }
    });

    console.log("Overdue tasks calculated:", overdueTasks);
    return overdueTasks;
}

// Helper function to calculate the number of upcoming deadlines within the next 7 days
function calculateUpcomingDeadlines() {
    console.log("Calculating upcoming deadlines...");
    let today = new Date();
    let upcomingDeadlines = 0;

    let tasks = Array.from(document.getElementById('taskList').children);
    tasks.forEach(task => {
        let deadline = task.querySelector('.dateEditor')?.value;
        console.log("Deadline:", deadline);
        if (deadline) {
            deadline = new Date(deadline);
            let sevenDaysFromNow = new Date(today);
            sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

            if (deadline > today && deadline <= sevenDaysFromNow) {
                upcomingDeadlines++;
            }
        }
    });

    console.log("Upcoming deadlines calculated:", upcomingDeadlines);
    return upcomingDeadlines;
}
