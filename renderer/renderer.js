document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Use the exposed API from preload
        const users = await window.electronAPI.getNames();
        console.log('Users:', users);
        
        // Process and display your users data here
        displayUsers(users);
    } catch (error) {
        console.error('Error loading users:', error);
    }
});

function displayUsers(users) {
    const container = document.getElementById('users-container');
    if (!container) return;
    
    users.forEach(user => {
        const userElement = document.createElement('div');
        userElement.textContent = user.name; // Adjust based on your user object structure
        container.appendChild(userElement);
    });
}