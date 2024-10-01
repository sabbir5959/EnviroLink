document.addEventListener("DOMContentLoaded", function () {
    const user = JSON.parse(localStorage.getItem('user'));
    
    console.log('User:', user);

    fetchNotifications(user);
});

async function fetchNotifications(user) {
    try {
        const response = await fetch(`http://localhost:3000/api/notifications?user=${encodeURIComponent(JSON.stringify(user))}`);
        const notifications = await response.json();

        console.log('Server Response:', notifications);  

        const notificationTable = document.getElementById('notificationTable');
        notificationTable.innerHTML = ''; 

        localStorage.getItem('rejectMessage');

    
        const rejectMessage = localStorage.getItem('rejectMessage');
        if (rejectMessage) {
            const row = document.createElement('tr');

            const serialCell = document.createElement('td');
            serialCell.textContent = '1'; 
            row.appendChild(serialCell);

            const dateCell = document.createElement('td');
            const currentDate = new Date();
            const formattedDate = `${String(currentDate.getDate()).padStart(2, '0')}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${currentDate.getFullYear()}`;
            dateCell.textContent = formattedDate;
            row.appendChild(dateCell);

            const messageCell = document.createElement('td');
            messageCell.innerHTML = rejectMessage;  
            row.appendChild(messageCell);

            notificationTable.appendChild(row);
          
        }

        if (Array.isArray(notifications)) {
            notifications.forEach((notification, index) => {
                const row = document.createElement('tr');

                const serialCell = document.createElement('td');
                serialCell.textContent = rejectMessage ? index + 2 : index + 1; // Adjust serial number if rejectMessage exists
                row.appendChild(serialCell);

                const dateCell = document.createElement('td');
                dateCell.textContent = notification.date;
                row.appendChild(dateCell);

                const messageCell = document.createElement('td');
                messageCell.innerHTML = notification.message;  // Use innerHTML instead of textContent
                row.appendChild(messageCell);

                notificationTable.appendChild(row);
            });
        } else {
            console.error("Unexpected response format:", notifications);
        }
    } catch (error) {
        console.error("Error fetching notifications:", error);
    }
}