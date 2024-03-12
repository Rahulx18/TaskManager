const tasksData = [
    { year: 2023, month: 0, markedDays: [15,5,27], tasks: ['Task 15', 'Task 5', 'Task 27'] }, // January, 2023
    { year: 2024, month: 2, markedDays: [1, 5, 15], tasks: ['Task 1', 'Task 5', 'Task 15'] }, // March, 2024
    { year: 2024, month: 0, markedDays: [10, 20], tasks: ['Task 10', 'Task 20'] }, // January, 2024
    { year: 2024, month: 5, markedDays: [7,19,25], tasks: ['Task 7', 'Task 19', "Task 25"] }, // June, 2024
];

function renderWeekdaysRow() {
    const weekDaysRow = document.createElement('div');
    weekDaysRow.classList.add('week-days');

    const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    daysOfWeek.forEach(dayName => {
        const dayElement = document.createElement('span');
        dayElement.classList.add('day');
        dayElement.textContent = dayName;
        weekDaysRow.appendChild(dayElement);
    });

    return weekDaysRow;
}

function renderCalendar(year, month, markedDays, tasks) {
    const calendarSection = document.getElementById('calendarSection');
    const calendarContent = document.createElement('div');
    calendarContent.classList.add('calendar-container');

    const header = document.createElement('div');
    const daysGrid = document.createElement('div');

    header.classList.add('month');
    header.textContent = `${new Date(year, month - 1, 1).toLocaleString('default', { month: 'short' })} ${year}`;

    daysGrid.classList.add('days-grid');

    const daysOfWeek = renderWeekdaysRow();
    const firstDay = new Date(year, month - 1, 1).getDay();
    const totalDays = new Date(year, month, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('button');
        emptyDay.classList.add('day', 'empty');
        daysGrid.appendChild(emptyDay);
    }

    for (let day = 1; day <= totalDays; day++) {
        const dayElement = document.createElement('button');
        dayElement.classList.add('day');
        dayElement.textContent = day;
        daysGrid.appendChild(dayElement);
    }

    calendarContent.appendChild(header);
    calendarContent.appendChild(daysOfWeek);
    calendarContent.appendChild(daysGrid);

    calendarSection.appendChild(calendarContent);

    const markedTasksElements=marker(markedDays,tasks);
    markedTasksElements.forEach(markedTasks => {
        calendarContent.appendChild(markedTasks);
    });

    // Return an array of day elements
    return document.querySelectorAll('.day');
}

function marker(markedDays, tasks) {
    const calendarContainer = document.querySelector(`.calendar-container:nth-child(${document.querySelectorAll('.calendar-container').length}) .days-grid`);

    const nonEmptyDays = calendarContainer.querySelectorAll('.day:not(.empty)');
    const markedTasksElements = [];
    markedDays.forEach(day => {
        if (day <= nonEmptyDays.length) {
            const targetDay = nonEmptyDays[day - 1];
            const index = markedDays.indexOf(day);
            if (targetDay) {
                targetDay.classList.add('highlight');
                
                // Create a div for the task name
                const markedTasks = document.createElement('div');
                markedTasks.classList.add('task-name-overlay');
                markedTasks.textContent = tasks[index]; 
                markedTasksElements.push(markedTasks);

                //Event listeners
                targetDay.addEventListener('mouseover', ()=>{
                    markedTasks.style.display='block';
                });
                targetDay.addEventListener('mouseout',()=>{
                    markedTasks.style.display='none';
                });

            }

        }
    });
    return markedTasksElements;
}

function renderCalendarsForTasks(tasks) {
    tasks.forEach(taskMonth => {
        const { year, month, markedDays,tasks } = taskMonth;
        renderCalendar(year, month + 1, markedDays,tasks);
    });
}

function sortTasksByDate(tasks) {
    return tasks.sort((a, b) => {
        const dateA = new Date(a.year, a.month); 
        const dateB = new Date(b.year, b.month);

        return dateA - dateB;
    });
}

const sortedTasksData = sortTasksByDate(tasksData);

renderCalendarsForTasks(sortedTasksData);