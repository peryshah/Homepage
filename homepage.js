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



// JS for Youtube downloader Starts /////////////////////////////////////////////////////////



const express = require('express');
const app = express();
const { exec } = require('child_process');

// Handle GET request to initiate video download
app.get('/api/download', (req, res) => {
    const videoUrl = req.query.url;
    if (!videoUrl) {
        return res.status(400).json({ success: false, error: 'Invalid video URL' });
    }

    // Use youtube-dl to download the video
    const command = `youtube-dl -f bestvideo+bestaudio --merge-output-format mp4 ${videoUrl}`;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error('Error:', error);
            return res.status(500).json({ success: false, error: 'Failed to download video' });
        }

        console.log('Video downloaded:', stdout);
        res.json({ success: true });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


function downloadVideo() {
	const videoUrl = document.getElementById('videoUrlInput').value;
	if (videoUrl.trim() === '') {
		alert('Please enter a valid YouTube video URL.');
		return;
	}

	// Call a backend API to initiate the video download
	fetch(`/api/download?url=${encodeURIComponent(videoUrl)}`)
		.then(response => response.json())
		.then(data => {
			if (data.success) {
				alert('Video download initiated successfully.');
			} else {
				alert('Failed to initiate video download. Please try again.');
			}
		})
		.catch(error => {
			console.error('Error:', error);
			alert('An error occurred. Please try again.');
		});
}
// JS for Youtube downloader ends /////////////////////////////////////////////////////////



// JS for SUKUDU Starts ///////////////////////////////////////////////////////////////////////////




// JS for SUDUKU Ends/////////////////////////////////////////////////////////////////////////////