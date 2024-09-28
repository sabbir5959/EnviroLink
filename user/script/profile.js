document.addEventListener("DOMContentLoaded", function () {
    const user = JSON.parse(localStorage.getItem('user'));
    // const profileName = document.getElementById('profileName');
    
    if (user) {
        document.getElementById('profileName').innerText = user[1];

    } else {
        alert('No user information found. Please log in.');
        window.location.href = 'E:/EnviroLink/user/html/user_login.html';
    }
});

function openSettings() {
    window.location.href = 'settings.html'; 
}

function viewHistory() {
    window.location.href = 'E:/EnviroLink/user/html/history.html'; 
}

function viewAbout() {
    window.location.href = 'about.html'; 
}

function logout() {
    localStorage.removeItem('user');
    window.location.href = 'E:/EnviroLink/user/html/user_login.html'; 
}

function sellWaste() {
    window.location.href = 'E:/EnviroLink/user/html/sell_waste.html'; 
}

function viewNotifications() {
    window.location.href = 'E:/EnviroLink/user/html/notification.html';
}