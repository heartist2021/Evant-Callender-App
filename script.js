document.addEventListener('DOMContentLoaded', function () {
    const calendarContainer = document.getElementById('daysContainer');
    const monthYearElement = document.getElementById('monthYearDisplay');
    let currentDate = new Date();

    function generateCalendar() {
        const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        const firstDayIndex = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
        const lastMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();

        calendarContainer.innerHTML = '';

        // Add empty cells for the days of the previous month
        for (let i = firstDayIndex; i > 0; i--) {
            const day = document.createElement('div');
            day.classList.add('day', 'inactive');
            day.textContent = lastMonthDays - i + 1;
            calendarContainer.appendChild(day);
        }

        // Add cells for the days of the current month
        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement('div');
            day.classList.add('day');
            day.textContent = i;
            day.addEventListener('click', function () {
                showEvents(i);
            });
            calendarContainer.appendChild(day);
        }

        updateTitle();
    }

    function updateTitle() {
        const options = { month: 'long', year: 'numeric' };
        const monthYearString = currentDate.toLocaleDateString('en-US', options);
        monthYearElement.textContent = monthYearString;
    }

    function showEvents(day) {
        const events = prompt(`Enter events for ${day}/${currentDate.getMonth() + 1}:`);
        if (events) {
            const dayElement = document.querySelector(`.day:nth-child(${day})`);
            const eventDiv = document.createElement('div');
            eventDiv.classList.add('event');
            eventDiv.textContent = events;
            dayElement.appendChild(eventDiv);
        }
    }

    function prevMonth() {
        currentDate.setMonth(currentDate.getMonth() - 1);
        generateCalendar();
        updateTitle();
    }
    
    function nextMonth() {
        currentDate.setMonth(currentDate.getMonth() + 1);
        generateCalendar();
        updateTitle();
    }

    generateCalendar();
});
