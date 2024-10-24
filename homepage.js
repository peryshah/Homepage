// Variables
let currentDate = new Date();
let selectedDate = null;
const today = new Date();
const calendarBody = document.getElementById('calendarBody');
const monthYear = document.getElementById('monthYear');
const eventInput = document.getElementById('eventInput');
const addEventButton = document.getElementById('addEventButton');
const eventsList = document.getElementById('eventsList');
let events = JSON.parse(localStorage.getItem('events')) || {};

// Functions
function loadCalendar() {
    calendarBody.innerHTML = '';
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    // Set month-year header
    monthYear.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Fill in the blank days
    for (let i = 0; i < firstDayOfMonth; i++) {
        const emptyCell = document.createElement('div');
        calendarBody.appendChild(emptyCell);
    }

    // Fill in the days
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.classList.add('day');
        dayCell.textContent = day;

        const dateToCheck = new Date(year, month, day);
        const dateKey = dateToCheck.toDateString();

        // Highlight today's date with a purple shadow
        if (today.toDateString() === dateToCheck.toDateString()) {
            dayCell.classList.add('today');
        }

        // Highlight selected date
        if (selectedDate && selectedDate.toDateString() === dateToCheck.toDateString()) {
            dayCell.classList.add('selected');
        }

        // Show event dot if there are events for that date
        if (events[dateKey]) {
            const eventDot = document.createElement('div');
            eventDot.classList.add('event-dot');
            dayCell.appendChild(eventDot);
        }

        // Add click event to select date
        dayCell.onclick = () => selectDate(dateToCheck);

        calendarBody.appendChild(dayCell);
    }
}

function selectDate(date) {
    selectedDate = date; // Set selected date
    loadCalendar(); // Reload calendar to update selected state
    loadEvents(); // Load events for the selected date
}

function loadEvents() {
    eventsList.innerHTML = ''; // Clear existing events
    if (selectedDate) {
        const dateKey = selectedDate.toDateString();
        const dateEvents = events[dateKey] || [];
        dateEvents.forEach((event, index) => {
            const li = document.createElement('li');
            const eventText = document.createElement('span');
            eventText.textContent = event.text;
            eventText.className = event.done ? 'event-text done' : 'event-text'; // Add class based on done status

            const eventButtons = document.createElement('div');
            eventButtons.classList.add('event-buttons');

            const doneButton = document.createElement('button');
            doneButton.textContent = 'Done';
            doneButton.classList.add('done-btn');
            doneButton.onclick = () => markEventAsDone(dateKey, index);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-btn');
            deleteButton.onclick = () => deleteEvent(dateKey, index);

            eventButtons.appendChild(doneButton);
            eventButtons.appendChild(deleteButton);

            li.appendChild(eventText);
            li.appendChild(eventButtons);
            eventsList.appendChild(li);
        });
    }
}

function addEvent() {
    const eventText = eventInput.value.trim();
    if (!eventText || !selectedDate) return;

    const dateKey = selectedDate.toDateString();
    if (!events[dateKey]) events[dateKey] = [];
    events[dateKey].push({ text: eventText, done: false });

    localStorage.setItem('events', JSON.stringify(events));
    eventInput.value = '';
    loadCalendar();
    loadEvents();
}

function markEventAsDone(dateKey, index) {
    events[dateKey][index].done = true;
    localStorage.setItem('events', JSON.stringify(events));
    loadEvents();
}

function deleteEvent(dateKey, index) {
    events[dateKey].splice(index, 1);
    if (events[dateKey].length === 0) delete events[dateKey];
    localStorage.setItem('events', JSON.stringify(events));
    loadCalendar();
    loadEvents();
}

// Digital clock logic
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const amPm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;  // Convert to 12-hour format
    document.getElementById('clockDisplay').textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${amPm}`;
}

setInterval(updateClock, 1000); // Update clock every second

// Event Listeners
addEventButton.addEventListener('click', addEvent);
eventInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') addEvent();
});

document.getElementById('prevMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    loadCalendar();
});

document.getElementById('nextMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    loadCalendar();
});

// Initial Load
loadCalendar();
updateClock();  // Start clock
