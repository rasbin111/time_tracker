document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Use the exposed API from preload
        const users = await window.electronAPI.getTimeTracker();

        // Process and display your users data here
        displayUsers(users);
    } catch (error) {
        console.error('Error loading users:', error);
    }
    let start = false;

    const button = document.getElementById('time-tracker-button');
    button.addEventListener('click', () => {
        start = !start;
        button.textContent = start ? 'Stop' : 'Start';
        if (start) {
            // Start the timer
            let seconds = 0;
            let minutes = 0;
            let hours = 0;
            let days = 0;

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
                document.getElementById('timer').textContent = `Time: ${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')}: ${String(seconds).padStart(2, '0')}`;
            }, 1000);
        } else {
            // Stop the timer
            clearInterval(button.timerInterval);
        }
        handleTimeTracker()
    });

});

function displayUsers(users) {
    const container = document.getElementById('users-container');
    if (!container) return;

    users.forEach(user => {
        const userElement = document.createElement('div');
        userElement.textContent = user.total_time_tracked; // Adjust based on your user object structure
        container.appendChild(userElement);
    });
}


async function handleTimeTracker() {

}
