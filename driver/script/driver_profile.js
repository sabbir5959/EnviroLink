let Driver;

function myMenuFunction() {
    var i = document.getElementById("navMenu");
    if (i.className === "nav-menu") {
        i.className += " responsive";
    } else {
        i.className = "nav-menu";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    Driver = JSON.parse(localStorage.getItem('driver'));
    if (!Driver) {
        console.error('No driver found in localStorage.');
        return;
    }

    console.log('Driver:', Driver);
    loadPage(); 
});


function loadPage(page = 'profile', data = {}) {
    console.log('data:', data);
    const content = document.getElementById("content");

    switch (page) {
        case 'profile':
            content.innerHTML = `
                <h2>Driver Profile</h2>
                <!-- Add more profile details here -->
            `;
            break;

        case 'wasteDeliveryRequest':
            loadWasteDeliveryRequests(Driver);
            break;

        case 'wasteCollectRequest':
            loadWasteCollectRequests(Driver);
            break;

            case 'reportToAdmin':
                content.innerHTML = `
                <h2>User's Selling Details</h2>
                <form id="reportForm">
                    <div class="form-container">
                        <div class="form-column">
                            <label for="userId">User ID:</label>
                            <input type="text" id="userId" name="userId" value="${data.userId}" required>
            
                            <label for="wasteType">Waste Type:</label>
                            <input type="text" id="wasteType" name="wasteType" required>
            
                            <label for="quantity">Waste Quantity:</label>
                            <input type="number" id="quantity" name="quantity" required>
                        </div>
                        <div class="form-column">
                            <label for="Price">Price:</label>
                            <input type="number" id="Price" name="Price" required>
            
                            <label for="date">Date:</label>
                            <input type="date" id="date" name="date" required>
                        </div>
                    </div>
                    <button type="submit" id="confirmButton">Confirm</button>
                </form>
            `;

            document.getElementById('reportForm').addEventListener('submit', async function(event) {
                event.preventDefault();
            
                const userId = document.getElementById('userId').value;
                const wasteType = document.getElementById('wasteType').value;
                const quantity = document.getElementById('quantity').value;
                const price = document.getElementById('Price').value;
                const date = document.getElementById('date').value;
            
                try {
                    await fetch('http://localhost:3000/api/reportToAdmin', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            driverId: data.driverId,
                            userId: userId,
                            wasteType: wasteType,
                            quantity: quantity,
                            price: price,
                            ndate: date
                        })
                    });

                    console.log('body:', JSON.stringify({ driverId: data.driverId, userId: userId, wasteType: wasteType, quantity: quantity, price: price, ndate: date }));
            
                    alert(`Waste collection for User ID: ${userId} completed successfully.`);
            
                    // Update status
                    await fetch('http://localhost:3000/api/updateStatus', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ userId: data.userId, status: 'completed' })
                    });
            
                    loadPage('wasteCollectRequest', { driverId: data.driverId });

                    
                } catch (error) {
                    console.error('Error submitting report:', error.message);
                    alert('There was an error submitting the report.');
                }
            });
            
    break;

            
    case 'reportForCompany':
        content.innerHTML = `
    <h2>Company Buying Details</h2>
    <form id="ReportForCompany">
        <div class="form-container">
            <div class="form-column">
                <label for="companyId">Company ID:</label>
                <input type="text" id="companyId" name="companyId" value="${data.companyId}" required>

                <label for="wasteType">Waste Type:</label>
                <input type="text" id="wasteType" name="wasteType" required>

                <label for="quantity">Waste Quantity:</label>
                <input type="number" id="quantity" name="quantity" required>
            </div>
            <div class="form-column">
                <label for="Price">Price:</label>
                <input type="number" id="Price" name="Price" required>

                <label for="date">Date:</label>
                <input type="date" id="date" name="date" required>
            </div>
        </div>
        <button type="submit">Confirm</button>
        
    </form>
`;

    
        document.getElementById('ReportForCompany').addEventListener('submit', async function(event) {
            event.preventDefault();
    
            const companyId = document.getElementById('companyId').value;
            const wasteType = document.getElementById('wasteType').value;
            const quantity = document.getElementById('quantity').value;
            const price = document.getElementById('Price').value;
            const date = document.getElementById('date').value;
    
            await fetch('http://localhost:3000/api/reportForCompany', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    driverId: data.driverId,
                    companyId: companyId,
                    wasteType: wasteType,
                    quantity: quantity,
                    price: price,
                    ndate: date
                })
            })

            .then(async response => {
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Error: ${response.status} - ${errorData.message}`);
                }
                return response.json();
            })
            .then(() => {
                
                alert(`Waste delivery for Company ID: '${companyId}' completed successfully.`);

                return fetch('http://localhost:3000/api/updateStatus', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        companyId: data.companyId,
                        status: 'completed'
                    })
                });
            })
            .then(() => {
                loadPage('wasteDeliveryRequest', { driverId: data.driverId });
            })
            .catch(error => {
                console.error('Error submitting report:', error.message);
                alert('There was an error submitting the report.');
            });
        });
        break;
                
            

        default:
            content.innerHTML = `
                <h2>Driver Profile</h2>
                <!-- Add more profile details here -->
            `;
    }
}

function loadWasteDeliveryRequests(Driver) {
    if (!Driver || !Driver[0]) {
        console.error('Driver ID is missing. Cannot load waste delivery requests.');
        content.innerHTML = `<p>Error loading waste delivery requests. Please try again later.</p>`;
        return;
    }

    fetch('http://localhost:3000/api/driver/notificationsForCompany', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ driver_id: Driver[0] })
    })
    .then(response => response.json())
    .then(notifications => {
        if (!Array.isArray(notifications)) {
            throw new Error('Expected an array of notifications');
        }
        console.log(notifications);
        if (notifications.length === 0) {
            content.innerHTML = `<p>No waste delivery requests at the moment.</p>`;
        } else {
            let notificationHtml = '<h2>Waste Delivery Request</h2><ul>';

            notifications.forEach(notification => {
                notificationHtml += `
                    <li style="border: 1px solid #ccc; padding: 10px; margin-bottom: 20px; border-radius: 5px; display: flex; justify-content: space-between;">
                        <div class="user-details">
                            <strong>${new Date(notification[1]).toLocaleDateString()}</strong><br>
                            <p><strong>Company ID:</strong> ${notification[0]}</p>
                            <p><strong>Phone:</strong> ${notification[2]}</p>
                            <p><strong>Area:</strong> ${notification[4]}</p>
                            <p><strong>House:</strong> ${notification[6]}, <strong>Road:</strong> ${notification[5]}</p>
                            
                        </div>
                        <div class="waste-details" style="text-align: right;">
                            <p><strong>Waste Type:</strong> ${notification[8]}</p>
                            <p><strong>Quantity:</strong> ${notification[9]}</p>
                            <p><strong>Price:</strong> ${notification[10]}</p>
                            <button class="start-process-btn" onclick="acceptRequest('${notification[0]}', this, true)">Start Process</button>
                        </div>
                    </li>
                `;
            });

            notificationHtml += '</ul>';
            content.innerHTML = notificationHtml;
        }
    })
    .catch(error => {
        console.error('Error fetching notifications:', error);
        content.innerHTML = `<p>Error loading waste delivery requests.</p>`;
    });
}



function loadWasteCollectRequests(Driver) {
    if (!Driver || !Driver[0]) {
        console.error('Driver ID is missing. Cannot load waste collect requests.');
        content.innerHTML = `<p>Error loading waste collect requests. Please try again later.</p>`;
        return;
    }

    fetch('http://localhost:3000/api/driver/notifications', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ driver_id: Driver[0] })
    })
    .then(response => response.json())
    .then(notifications => {
        if (!Array.isArray(notifications)) {
            throw new Error('Expected an array of notifications');
        }
        console.log(notifications);
        if (notifications.length === 0) {
            content.innerHTML = `<p>No waste collect requests at the moment.</p>`;
        } else {
            let notificationHtml = '<h2>Waste Collection Request</h2><ul>';

            notifications.forEach(notification => {
                notificationHtml += `
                    <li style="border: 1px solid #ccc; padding: 10px; margin-bottom: 20px; border-radius: 5px; display: flex; justify-content: space-between;">
                        <div class="user-details">
                            <strong>${new Date(notification[1]).toLocaleDateString()}</strong><br>
                            <p><strong>User Name:</strong> ${notification[2]}</p>
                            <p><strong>Phone:</strong> ${notification[3]}</p>
                            <p><strong>Area:</strong> ${notification[5].AREA}</p>
                            <p><strong>House:</strong> ${notification[5].HOUSE}, <strong>Road:</strong> ${notification[5].ROAD}</p>
                        </div>
                        <div class="waste-details" style="text-align: right;">
                            <p><strong>Waste Type:</strong> ${notification[7]}</p>
                            <p><strong>Quantity:</strong> ${notification[8]}</p>
                            <p><strong>Price:</strong> ${notification[9]}</p>
                            <button class="start-process-btn" onclick="acceptRequest('${notification[0]}', this)">Start Process</button>
                        </div>
                    </li>
                `;
            });

            notificationHtml += '</ul>';
            content.innerHTML = notificationHtml;
        }
    })
    .catch(error => {
        console.error('Error fetching notifications:', error);
        content.innerHTML = `<p>Error loading waste collect requests.</p>`;
    });
}



async function acceptRequest(id, button, isCompany = false) {
    button.innerHTML = "Processing...";
    button.disabled = true;

    try {
        if (isCompany) {
            loadPage('reportForCompany', { companyId: id, driverId: Driver[0] });
        } else {
            loadPage('reportToAdmin', { userId: id, driverId: Driver[0] });
        }
    } catch (error) {
        button.innerHTML = "Start Process";
        button.disabled = false;
        console.error('Error loading page:', error);
    }
}



function logout() {
    localStorage.removeItem('driver');
    window.location.href = "driver_login.html";
}

