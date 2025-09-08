document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Use the exposed API from preload
    const users = await window.electronAPI.getTimeTracker();

    // Process and display your users data here
    displayUsers(users);
  } catch (error) {
    console.error("Error loading users:", error);
  }
  let start = false;
  let pause = false;
  let seconds = 0;
  let minutes = 0;
  let hours = 0;
  let days = 0;
  const timer = document.getElementById("timer");

  const button = document.getElementById("time-tracker-button");
  const pauseButton = document.getElementById("time-tracker-pause-button");

  button.addEventListener("click", () => {
    start = !start;
    button.textContent = start ? "Stop" : "Start";
    seconds = 0;
    minutes = 0;
    hours = 0;
    days = 0;
    if (start) {
      pauseButton.className = "active";
      button.timerInterval = setInterval(() => {
        seconds++;
        if (seconds === 60) {
          seconds = 0;
          minutes++;
        }
        if (minutes === 60) {
          minutes = 0;
          hours++;
        }
        if (hours === 24) {
          hours = 0;
          days++;
        }
        timer.textContent = `Time: ${String(hours).padStart(2, "0")} : ${String(
          minutes
        ).padStart(2, "0")}: ${String(seconds).padStart(2, "0")}`;
      }, 1000);
    } else {
      // Stop the timer
      clearInterval(button.timerInterval);
      timer.textContent = `Time: ${String(hours).padStart(2, "0")} : ${String(
        minutes
      ).padStart(2, "0")}: ${String(seconds).padStart(2, "0")}`;
    }
    handleTimeTracker();
  });

  pauseButton.addEventListener("click", () => {
    pause = !pause;
    pauseButton.textContent = pause ? "Resume" : "Pause";
    if (pause) {
      clearInterval(button.timerInterval);
      timer.className = "paused";
      return;
    }
    button.timerInterval = setInterval(() => {
      seconds++;
      if (seconds === 60) {
        seconds = 0;
        minutes++;
      }
      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
      if (hours === 24) {
        hours = 0;
        days++;
      }
      timer.textContent = `Time: ${String(hours).padStart(2, "0")} : ${String(
        minutes
      ).padStart(2, "0")}: ${String(seconds).padStart(2, "0")}`;
    }, 1000);
  });
});

function displayUsers(users) {
  const container = document.getElementById("users-container");
  if (!container) return;

  users.forEach((user) => {
    const userElement = document.createElement("div");
    userElement.textContent = user.total_time_tracked; // Adjust based on your user object structure
    container.appendChild(userElement);
  });
}

document.getElementById("submit-button").addEventListener("click", async () => {
  const nameInput = document.getElementById("name-input");
  const name = nameInput.value.trim();
  const password = document.getElementById("password-input").value.trim();

  if (name && password) {
    // const result = await window.electronAPI.login(name, password);
    window.electronAPI.openDashboardWindow();
    if (result.success) {
    } else {
      // Handle login error
    }
  }
});

async function handleTimeTracker() {}
