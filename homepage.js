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
// End of Javascript for digital clock---------------------------------------------------------------

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

// JS for weather app starts---------------------------------------------------------------------

const apiKey = "9a16fa92031c2bed3ddb56899fd6ae8e";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";


const searchBox = document.querySelector(".weather input")
const searchBtn = document.querySelector(".weather button")


async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();
    // console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + " ℃";
    document.querySelector(".wind").innerHTML = "Wind Speed " + data.wind.speed + " Km/h";
    document.querySelector(".sunrise").innerHTML = Math.time(data.sys.sunrise);

}



searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})

checkWeather();

// JS for Games///////////////////////////////////////////////////////////////////////////////
// Js for Tic Tac Toe........................................................................
// Function called whenever user tab on any box
function myfunc() {

	// Setting DOM to all boxes or input field
	var b1, b2, b3, b4, b5, b6, b7, b8, b9;
	b1 = document.getElementById("b1").value;
	b2 = document.getElementById("b2").value;
	b3 = document.getElementById("b3").value;
	b4 = document.getElementById("b4").value;
	b5 = document.getElementById("b5").value;
	b6 = document.getElementById("b6").value;
	b7 = document.getElementById("b7").value;
	b8 = document.getElementById("b8").value;
	b9 = document.getElementById("b9").value;

	var b1btn, b2btn, b3btn, b4btn, b5btn,
		b6btn, b7btn, b8btn, b9btn;
		
	b1btn = document.getElementById("b1");
	b2btn = document.getElementById("b2");
	b3btn = document.getElementById("b3");
	b4btn = document.getElementById("b4");
	b5btn = document.getElementById("b5");
	b6btn = document.getElementById("b6");
	b7btn = document.getElementById("b7");
	b8btn = document.getElementById("b8");
	b9btn = document.getElementById("b9");

	// Checking if Player X won or not and after
	// that disabled all the other fields
	if ((b1 == 'x' || b1 == 'X') && (b2 == 'x' ||
		b2 == 'X') && (b3 == 'x' || b3 == 'X')) {
		document.getElementById('print')
			.innerHTML = "Player X won";
		b4btn.disabled = true;
		b5btn.disabled = true;
		b6btn.disabled = true;
		b7btn.disabled = true;
		b8btn.disabled = true;
		b9btn.disabled = true;

		b1btn.style.color = "red";
		b2btn.style.color = "red";
		b3btn.style.color = "red";
	}
	else if ((b1 == 'x' || b1 == 'X') && (b4 == 'x' ||
		b4 == 'X') && (b7 == 'x' || b7 == 'X')) {
		document.getElementById('print')
			.innerHTML = "Player X won";
		b2btn.disabled = true;
		b3btn.disabled = true;
		b5btn.disabled = true;
		b6btn.disabled = true;
		b8btn.disabled = true;
		b9btn.disabled = true;

		b1btn.style.color = "red";
		b4btn.style.color = "red";
		b7btn.style.color = "red";
	}
	else if ((b7 == 'x' || b7 == 'X') && (b8 == 'x' ||
		b8 == 'X') && (b9 == 'x' || b9 == 'X')) {
		document.getElementById('print')
			.innerHTML = "Player X won";

		b1btn.disabled = true;
		b2btn.disabled = true;
		b3btn.disabled = true;
		b4btn.disabled = true;
		b5btn.disabled = true;
		b6btn.disabled = true;

		b7btn.style.color = "red";
		b8btn.style.color = "red";
		b9btn.style.color = "red";
	}
	else if ((b3 == 'x' || b3 == 'X') && (b6 == 'x' ||
		b6 == 'X') && (b9 == 'x' || b9 == 'X')) {
		document.getElementById('print')
			.innerHTML = "Player X won";

		b1btn.disabled = true;
		b2btn.disabled = true;
		b4btn.disabled = true;
		b5btn.disabled = true;
		b7btn.disabled = true;
		b8btn.disabled = true;

		b3btn.style.color = "red";
		b6btn.style.color = "red";
		b9btn.style.color = "red";
	}
	else if ((b1 == 'x' || b1 == 'X') && (b5 == 'x' ||
		b5 == 'X') && (b9 == 'x' || b9 == 'X')) {
		document.getElementById('print')
			.innerHTML = "Player X won";
		b2btn.disabled = true;
		b3btn.disabled = true;
		b4btn.disabled = true;
		b6btn.disabled = true;
		b7btn.disabled = true;
		b8btn.disabled = true;

		b1btn.style.color = "red";
		b5btn.style.color = "red";
		b9btn.style.color = "red";
	}
	else if ((b3 == 'x' || b3 == 'X') && (b5 == 'x' ||
		b5 == 'X') && (b7 == 'x' || b7 == 'X')) {
		document.getElementById('print')
			.innerHTML = "Player X won";
		b1btn.disabled = true;
		b2btn.disabled = true;
		b4btn.disabled = true;
		b6btn.disabled = true;
		b8btn.disabled = true;
		b9btn.disabled = true;

		b3btn.style.color = "red";
		b5btn.style.color = "red";
		b7btn.style.color = "red";
	}
	else if ((b2 == 'x' || b2 == 'X') && (b5 == 'x' ||
		b5 == 'X') && (b8 == 'x' || b8 == 'X')) {
		document.getElementById('print')
			.innerHTML = "Player X won";
		b1btn.disabled = true;
		b2btn.disabled = true;
		b4btn.disabled = true;
		b6btn.disabled = true;
		b7btn.disabled = true;
		b9btn.disabled = true;

		b2btn.style.color = "red";
		b5btn.style.color = "red";
		b8btn.style.color = "red";
	}
	else if ((b4 == 'x' || b4 == 'X') && (b5 == 'x' ||
		b5 == 'X') && (b6 == 'x' || b6 == 'X')) {
		document.getElementById('print')
			.innerHTML = "Player X won";
		b1btn.disabled = true;
		b2btn.disabled = true;
		b3btn.disabled = true;
		b7btn.disabled = true;
		b8btn.disabled = true;
		b9btn.disabled = true;

		b4btn.style.color = "red";
		b5btn.style.color = "red";
		b6btn.style.color = "red";
	}

	// Checking of Player X finish
	// Checking for Player 0 starts, Is player 0 won or
	// not and after that disabled all the other fields
	else if ((b1 == '0' || b1 == '0') && (b2 == '0' ||
		b2 == '0') && (b3 == '0' || b3 == '0')) {
		document.getElementById('print')
			.innerHTML = "Player 0 won";
		b4btn.disabled = true;
		b5btn.disabled = true;
		b6btn.disabled = true;
		b7btn.disabled = true;
		b8btn.disabled = true;
		b9btn.disabled = true;

		b1btn.style.color = "red";
		b2btn.style.color = "red";
		b3btn.style.color = "red";
	}
	else if ((b1 == '0' || b1 == '0') && (b4 == '0' ||
		b4 == '0') && (b7 == '0' || b7 == '0')) {
		document.getElementById('print')
			.innerHTML = "Player 0 won";
		b2btn.disabled = true;
		b3btn.disabled = true;
		b5btn.disabled = true;
		b6btn.disabled = true;
		b8btn.disabled = true;
		b9btn.disabled = true;

		b1btn.style.color = "red";
		b4btn.style.color = "red";
		b7btn.style.color = "red";
	}
	else if ((b7 == '0' || b7 == '0') && (b8 == '0' ||
		b8 == '0') && (b9 == '0' || b9 == '0')) {
		document.getElementById('print')
			.innerHTML = "Player 0 won";
		b1btn.disabled = true;
		b2btn.disabled = true;
		b3btn.disabled = true;
		b4btn.disabled = true;
		b5btn.disabled = true;
		b6btn.disabled = true;

		b7btn.style.color = "red";
		b8btn.style.color = "red";
		b9btn.style.color = "red";
	}
	else if ((b3 == '0' || b3 == '0') && (b6 == '0' ||
		b6 == '0') && (b9 == '0' || b9 == '0')) {
		document.getElementById('print')
			.innerHTML = "Player 0 won";
		b1btn.disabled = true;
		b2btn.disabled = true;
		b4btn.disabled = true;
		b5btn.disabled = true;
		b7btn.disabled = true;
		b8btn.disabled = true;
		b3btn.style.color = "red";
		b6btn.style.color = "red";
		b9btn.style.color = "red";
	}
	else if ((b1 == '0' || b1 == '0') && (b5 == '0' ||
		b5 == '0') && (b9 == '0' || b9 == '0')) {
		document.getElementById('print')
			.innerHTML = "Player 0 won";
		b2btn.disabled = true;
		b3btn.disabled = true;
		b4btn.disabled = true;
		b6btn.disabled = true;
		b7btn.disabled = true;
		b8btn.disabled = true;

		b1btn.style.color = "red";
		b5btn.style.color = "red";
		b9btn.style.color = "red";
	}
	else if ((b3 == '0' || b3 == '0') && (b5 == '0' ||
		b5 == '0') && (b7 == '0' || b7 == '0')) {
		document.getElementById('print')
			.innerHTML = "Player 0 won";
		b1btn.disabled = true;
		b2btn.disabled = true;
		b4btn.disabled = true;
		b6btn.disabled = true;
		b8btn.disabled = true;
		b9btn.disabled = true;

		b3btn.style.color = "red";
		b5btn.style.color = "red";
		b7btn.style.color = "red";
	}
	else if ((b2 == '0' || b2 == '0') && (b5 == '0' ||
		b5 == '0') && (b8 == '0' || b8 == '0')) {
		document.getElementById('print')
			.innerHTML = "Player 0 won";
		b1btn.disabled = true;
		b3btn.disabled = true;
		b4btn.disabled = true;
		b6btn.disabled = true;
		b7btn.disabled = true;
		b9btn.disabled = true;

		b2btn.style.color = "red";
		b5btn.style.color = "red";
		b8btn.style.color = "red";
	}
	else if ((b4 == '0' || b4 == '0') && (b5 == '0' ||
		b5 == '0') && (b6 == '0' || b6 == '0')) {
		document.getElementById('print')
			.innerHTML = "Player 0 won";
		b1btn.disabled = true;
		b2btn.disabled = true;
		b3btn.disabled = true;
		b7btn.disabled = true;
		b8btn.disabled = true;
		b9btn.disabled = true;

		b4btn.style.color = "red";
		b5btn.style.color = "red";
		b6btn.style.color = "red";
	}

	// Checking of Player 0 finish
	// Here, Checking about Tie
	else if ((b1 == 'X' || b1 == '0') && (b2 == 'X'
		|| b2 == '0') && (b3 == 'X' || b3 == '0') &&
		(b4 == 'X' || b4 == '0') && (b5 == 'X' ||
			b5 == '0') && (b6 == 'X' || b6 == '0') &&
		(b7 == 'X' || b7 == '0') && (b8 == 'X' ||
			b8 == '0') && (b9 == 'X' || b9 == '0')) {
		document.getElementById('print')
			.innerHTML = "Match Tie";
	}
	else {

		// Here, Printing Result
		if (flag == 1) {
			document.getElementById('print')
				.innerHTML = "Player X Turn";
		}
		else {
			document.getElementById('print')
				.innerHTML = "Player 0 Turn";
		}
	}
}

// Function to reset game
function myfunc_2() {
	location.reload();
	b1 = b2 = b3 = b4 = b5 = b6 = b7 = b8 = b9 = '';
}

// Here onwards, functions check turn of the player
// and put accordingly value X or 0
flag = 1;
function myfunc_3() {
	if (flag == 1) {
		document.getElementById("b1").value = "X";
		document.getElementById("b1").disabled = true;
		flag = 0;
	}
	else {
		document.getElementById("b1").value = "0";
		document.getElementById("b1").disabled = true;
		flag = 1;
	}
}

function myfunc_4() {
	if (flag == 1) {
		document.getElementById("b2").value = "X";
		document.getElementById("b2").disabled = true;
		flag = 0;
	}
	else {
		document.getElementById("b2").value = "0";
		document.getElementById("b2").disabled = true;
		flag = 1;
	}
}

function myfunc_5() {
	if (flag == 1) {
		document.getElementById("b3").value = "X";
		document.getElementById("b3").disabled = true;
		flag = 0;
	}
	else {
		document.getElementById("b3").value = "0";
		document.getElementById("b3").disabled = true;
		flag = 1;
	}
}

function myfunc_6() {
	if (flag == 1) {
		document.getElementById("b4").value = "X";
		document.getElementById("b4").disabled = true;
		flag = 0;
	}
	else {
		document.getElementById("b4").value = "0";
		document.getElementById("b4").disabled = true;
		flag = 1;
	}
}

function myfunc_7() {
	if (flag == 1) {
		document.getElementById("b5").value = "X";
		document.getElementById("b5").disabled = true;
		flag = 0;
	}
	else {
		document.getElementById("b5").value = "0";
		document.getElementById("b5").disabled = true;
		flag = 1;
	}
}

function myfunc_8() {
	if (flag == 1) {
		document.getElementById("b6").value = "X";
		document.getElementById("b6").disabled = true;
		flag = 0;
	}
	else {
		document.getElementById("b6").value = "0";
		document.getElementById("b6").disabled = true;
		flag = 1;
	}
}

function myfunc_9() {
	if (flag == 1) {
		document.getElementById("b7").value = "X";
		document.getElementById("b7").disabled = true;
		flag = 0;
	}
	else {
		document.getElementById("b7").value = "0";
		document.getElementById("b7").disabled = true;
		flag = 1;
	}
}

function myfunc_10() {
	if (flag == 1) {
		document.getElementById("b8").value = "X";
		document.getElementById("b8").disabled = true;
		flag = 0;
	}
	else {
		document.getElementById("b8").value = "0";
		document.getElementById("b8").disabled = true;
		flag = 1;
	}
}

function myfunc_11() {
	if (flag == 1) {
		document.getElementById("b9").value = "X";
		document.getElementById("b9").disabled = true;
		flag = 0;
	}
	else {
		document.getElementById("b9").value = "0";
		document.getElementById("b9").disabled = true;
		flag = 1;
	}
}
