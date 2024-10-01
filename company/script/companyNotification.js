document.addEventListener("DOMContentLoaded", function () {
    const companyData = JSON.parse(localStorage.getItem('company'));

    const companyId = companyData[0];

    console.log('Companies:', companyId);

    fetchNotifications(companyId);
});

async function fetchNotifications(companyId) {
    try {
        const response = await fetch(`http://localhost:3000/api/CompanyNotifications?company=${encodeURIComponent(JSON.stringify(companyId))}`);
        const notifications = await response.json();

        console.log('Server Response:', notifications);  // Log the server response

        const notificationTable = document.getElementById('notificationTable');
        notificationTable.innerHTML = ''; 

        localStorage.getItem('CompanyrejectMessage');

    
        const CompanyrejectMessage = localStorage.getItem('CompanyrejectMessage');
        if (CompanyrejectMessage) {
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
            messageCell.innerHTML = CompanyrejectMessage;  
            row.appendChild(messageCell);

            notificationTable.appendChild(row);
          
        }

        if (Array.isArray(notifications)) {

            notifications.forEach((notification, index) => {
                const row = document.createElement('tr');

                const serialCell = document.createElement('td');
                serialCell.textContent = index + 1;
                row.appendChild(serialCell);

                const dateCell = document.createElement('td');
                dateCell.textContent = notification.date;
                row.appendChild(dateCell);

                const messageCell = document.createElement('td');
                messageCell.innerHTML = notification.message;  // Use innerHTML to include formatted content
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
