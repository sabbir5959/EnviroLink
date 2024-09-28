document.addEventListener("DOMContentLoaded", async function () {
    
    const tableBody = document.querySelector('#waste-info-table tbody');

    try {
        const response = await fetch('http://localhost:3000/api/waste-info');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const wasteInfo = await response.json();

        console.log(wasteInfo); // Debugging line to check the response

        wasteInfo.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item[0]}</td>
                <td>${item[1]}</td>
                <td>${item[2]}</td>
                <td>${item[3]}</td>
            `;
            tableBody.appendChild(row);
        });

    } catch (error) {
        console.error('Error fetching waste information:', error);
    }
});
