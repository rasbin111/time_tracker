// Basic interval
let counter = 0;
const intervalId = setInterval(() => {
    counter++;
    console.log(`Interval executed ${counter} times`);

    // Stop after 5 executions
    if (counter >= 5) {
        clearInterval(intervalId);
        console.log('Interval stopped');
    }
}, 1000);

// Interval with arguments
const nameInterval = setInterval((name) => {
    console.log(`Hello, ${name}!`);
}, 2000, 'Node.js');

// Stop the name interval after 6 seconds
setTimeout(() => {
    clearInterval(nameInterval);
    console.log('Name interval stopped');
}, 6000);
