document.addEventListener("DOMContentLoaded", function () {
    const companyData = JSON.parse(localStorage.getItem('companyInfo'));
    const companyIds = companyData.map(company => company[0]);  // Assuming company ID is the first element

    console.log('Companies:', companyData);

    fetchNotifications(companyIds);
});

async function fetchNotifications(companyIds) {
    try {
        const response = await fetch(`http://localhost:3000/api/CompanyNotifications?companies=${encodeURIComponent(JSON.stringify(companyIds))}`);
        const notifications = await response.json();

        console.log('Server Response:', notifications);  // Log the server response

        if (Array.isArray(notifications)) {
            const notificationTable = document.getElementById('notificationTable');
            notificationTable.innerHTML = ''; // Clear the table before adding new data

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
