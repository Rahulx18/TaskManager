const tasksData = [
    { date: '2023-01-15', taskCount: 5, tasks: [{ name: 'Task 1', status: 'overdue' }, ] },
    { date: '2023-02-20', taskCount: 8, tasks: [{ name: 'Task 2', status: 'upcoming' },{name:'Task 3', status:'overdue'},] },
    {date: '2024-1-18', taskCount: 1, tasks: [{name:'Task Year change'}]}
    
];

function createTaskDetails(task) {
    const taskDetails = document.createElement('p');
    taskDetails.className = 'task-details';
    taskDetails.textContent = `${task.name} - Status: ${task.status}`;
    return taskDetails;
}


function createMonthDiv(taskData) {
    const date = new Date(taskData.date);
    const monthName = date.toLocaleString('default', { month: 'long' });
    const yearAndMonth = `${monthName} ${date.getFullYear()}`;

    const monthDiv = document.createElement('div');
    monthDiv.className = 'month';

    const monthTitle = document.createElement('h3');
    monthTitle.textContent = `${yearAndMonth} : ${taskData.taskCount} Tasks`;

    const monthDetails = document.createElement('div');
    monthDetails.className = 'month-details';

    taskData.tasks.forEach(task => {
        const taskDetails = createTaskDetails(task);
        monthDetails.appendChild(taskDetails);
    });

    monthDiv.appendChild(monthTitle);
    monthDiv.appendChild(monthDetails);

    monthDiv.addEventListener('click', () => {
        if (monthDetails.style.display === 'none' || monthDetails.style.display === '') {
            monthDetails.style.display = 'block';
        } else {
            monthDetails.style.display = 'none';
        }
    });

    return monthDiv;
}



function renderCalendar() {
    const calendarContainer = document.getElementById('calendar');

    tasksData.forEach(taskData => {
        const monthDiv = createMonthDiv(taskData);
        calendarContainer.appendChild(monthDiv);
    });
}

// Call the function to render the calendar
renderCalendar();
