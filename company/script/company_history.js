document.addEventListener('DOMContentLoaded', async function() {
    await fetch('http://localhost:3000/api/company-history')
        .then(response => response.json())
        .then(data => {
            const historyDiv = document.getElementById('history');

            console.log('data:', data);  

            if (Array.isArray(data)) {  
                data.forEach(item => {
                    const historyItemDiv = document.createElement('div');
                    historyItemDiv.classList.add('request');

                    // Select the appropriate image based on the waste name
                    let wasteImage;
                    const wasteName = item[6];  // Assuming waste name is in item[6]

                    if (wasteName === 'Plastic') {
                        wasteImage = 'https://images.unsplash.com/flagged/photo-1572213426852-0e4ed8f41ff6?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';  // Path to plastic waste image
                    } else if (wasteName === 'Metal') {
                        wasteImage = 'https://images.unsplash.com/photo-1536842409491-b3bbde0e3b66?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dg';  // Path to metal waste image
                    } else if (wasteName === 'Paper') {
                        wasteImage = 'https://images.unsplash.com/photo-1585351737354-204ffbbe584f?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';  // Path to paper waste image
                    } 

                    historyItemDiv.innerHTML = `
                        <div class="customer-details">
                            <h3>Company Details</h3>
                            <p><strong>Status:</strong> <span class="status-completed">${item[0]}</span></p>
                            <p><strong>Order Date:</strong> ${item[1]}</p>
                            <p><strong>Company ID:</strong> ${item[2]}</p>
                            <p><strong>Company Email:</strong> ${item[4]}</p>
                            <p><strong>Address:</strong> ${item[5]}</p>
                        </div>
                        <div class="product-details">
                            <h3>Waste Details</h3>
                            <div class="product-info">
                                <img src="${wasteImage}" alt="${wasteName}" class="waste-image" style="width:150px; height:150px;">
                                <p><strong>Waste Name:</strong> ${wasteName}</p>
                                <p><strong>Quantity:</strong> ${item[7]} Kg</p>
                                <p><strong>Price:</strong> ${item[8]} BDT</p>
                            </div>
                        </div>
                    `;
                    historyDiv.appendChild(historyItemDiv);
                });
            } else {
                console.error('Unexpected response format:', data);
                historyDiv.innerHTML = '<p>No history available or an error occurred.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching company history:', error);
            const historyDiv = document.getElementById('history');
            historyDiv.innerHTML = '<p>Error fetching history. Please try again later.</p>';
        });

    document.getElementById('backButton').addEventListener('click', () => {
        window.location.href = 'company_profile.html';
    });
});
