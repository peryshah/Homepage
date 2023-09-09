// <---JavaScript for Clock---> 

// const hourEl = document.querySelector(".hour")
// const minuteEl = document.querySelector(".minute")
// const secondEl = document.querySelector(".second")


// function updateClock() {
//     const currentDate = new Date();
//     // setTimeout(updateClock, 1000)
//     const hour = currentDate.getHours();
//     const minute = currentDate.getMinutes();
//     const second = currentDate.getSeconds();
//     const hourDeg = (hour / 12) * 360;
//     hourEl.style.transform = `rotate(${hourDeg}deg)`
//     const minuteDeg = (minute / 60) * 360;
//     minuteEl.style.transform = `rotate(${minuteDeg}deg)`
//     const secondDeg = (second / 60) * 360;
//     secondEl.style.transform = `rotate(${secondDeg}deg)`
// }

// // updateClock();
// setInterval(updateClock, 1000)
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    let amOrPm = '';

    if (hours >= 12) {
        amOrPm = 'PM';
    } else {
        amOrPm = 'AM';
    }

    // Convert to 12-hour format
    hours = (hours % 12) || 12;

    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const amPmElement = document.getElementById('amPm');

    hoursElement.textContent = String(hours).padStart(2, '0');
    minutesElement.textContent = minutes;
    secondsElement.textContent = seconds;
    amPmElement.textContent = amOrPm;
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initial update on page load
updateClock();


// <---JavaScript for Calender--->
const monthEl = document.querySelector(".date h1");
const fullDateEl = document.querySelector(".date p");
const daysEl = document.querySelector(".days");

const monthInx = new Date().getMonth();
const lastDay = new Date(new Date().getFullYear(), monthInx + 1, 0).getDate();
const firstDay = new Date(new Date().getFullYear(), monthInx, 1).getDay() - 1;

// console.log(firstDay);



const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
monthEl.innerText = months[monthInx];
fullDateEl.innerText = new Date().toDateString();

let days = "";

for (let i = firstDay; i > 0; i--) {
    days += `<div class= "empty"></div>`;
}

for (let i = 1; i <= lastDay; i++) {
    if ((i === new Date().getDate())) {
        days += `<div class="today">${i}</div>`;
    } else {
        days += `<div>${i}</div>`;

    }

}

daysEl.innerHTML = days;



// <---JavaScript for ToDoList--->

const taskList = document.getElementById('taskList');
const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
let tasks = [];

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
    <input type="checkbox" onclick="toggleTask(this)">
    <span>${taskText}</span>
    <button onclick="removeTask(this)">Remove</button>
  `;

    taskList.appendChild(taskItem);
    taskInput.value = '';

    // Save the tasks to local storage
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function toggleTask(checkbox) {
    const taskText = checkbox.nextElementSibling;
    if (checkbox.checked) {
        taskText.style.textDecoration = 'line-through';
    } else {
        taskText.style.textDecoration = 'none';
    }
}

function removeTask(button) {
    const taskItem = button.parentElement;
    taskList.removeChild(taskItem);

    // Update the tasks array and save to local storage
    const taskText = taskItem.querySelector('span').textContent;
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from local storage on page load
function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
        <input type="checkbox" onclick="toggleTask(this)">
        <span>${task}</span>
        <button onclick="removeTask(this)">Remove</button>
      `;
            taskList.appendChild(taskItem);
        });
    }
}

// Handle adding tasks on pressing "Enter" key
taskInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Handle adding tasks on clicking the "Add" button
addButton.addEventListener('click', addTask);

// Load tasks from local storage on page load
loadTasks();




// Javascript for Nifty50

// JS for event calander



