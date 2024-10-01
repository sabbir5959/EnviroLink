document.addEventListener("DOMContentLoaded", function () {
    const admin = JSON.parse(localStorage.getItem('admin'));  
    document.getElementById('name').innerText = admin[1];
    
    const currentPage = localStorage.getItem('currentPage');
    if (currentPage) {
        loadContent(currentPage);
    } else {
        loadContent('profile');
    }
});

let sellingRequests = [];

// Fetching driver data from the server
async function fetchDrivers() {
    try {
        let response = await fetch('http://localhost:3000/api/drivers-name'); 
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let drivers = await response.json();

        console.log('Fetched drivers:', drivers);

        let driverSelect = document.getElementById('driverName');

        driverSelect.innerHTML = ''; 

        if (drivers.length === 0) {
            driverSelect.innerHTML = '<option>No drivers available</option>';
            return;
        }

        drivers.forEach(driver => {
            let option = document.createElement('option');
            option.textContent = driver.d_name; 
            option.value = driver.d_name; 

            console.log('Driver:', driver.d_name);

            driverSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching drivers:', error);
        alert('Failed to load drivers');
    }
}

// Initialize fetching drivers when the document is ready
document.addEventListener('DOMContentLoaded', function() {
    
    fetchDrivers();
});

// Fetching user data from the server
async function fetchUsers() {
    try {
        const response = await fetch('http://localhost:3000/api/users-info');
        const users = await response.json();
        storeUsersInLocalStorage(users);
        displayUsers(users);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

// Storing user data in localStorage
const storeUsersInLocalStorage = (users) => {
    localStorage.setItem('users', JSON.stringify(users));
};

// Retrieving user data from localStorage
const getUsersFromLocalStorage = () => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
    
};


async function fetchDriversInfo() {
    try {
        const response = await fetch('http://localhost:3000/api/drivers-info');
        console.log(response);
        const drivers = await response.json();
        console.log(drivers);
        storeDriversInLocalStorage(drivers);
        displayDrivers(drivers);
    } catch (error) {
        console.error('Error fetching drivers:', error);
    }
}

// Storing driver data in localStorage
const storeDriversInLocalStorage = (drivers) => {
    localStorage.setItem('drivers', JSON.stringify(drivers));
};

// Retrieving driver data from localStorage
const getDriversFromLocalStorage = () => {
    const drivers = localStorage.getItem('drivers');
    return drivers ? JSON.parse(drivers) : [];
};

// Displaying drivers
function displayDrivers(drivers) {
    const driverResults = document.getElementById('DriverResults');
    driverResults.innerHTML = '';  // Clear existing results

    if (drivers.length === 0) {
        driverResults.innerHTML = '<p>No drivers found</p>';
        return;
    }

    drivers.forEach(driver => {
        driverResults.innerHTML += `
            <div class="driver">
                <p><strong>ID:</strong> ${driver[0]}</p>
                <p><strong>Name:</strong> ${driver[1]}</p>
                <p><strong>Phone:</strong> ${driver[4]}</p>
                <p><strong>Truck No:</strong> ${driver[2]}</p>
                <p><strong>Licence No:</strong> ${driver[3]}</p>
            </div>`;
    }
    );
}

// Searching drivers
function searchDriver() {
    const query = document.getElementById('searchDriver').value.toLowerCase();
    const drivers = getDriversFromLocalStorage();

    const filteredDrivers = drivers.filter(driver => {
        return (driver[0].toString().toLowerCase().startsWith(query)) ||
                (typeof driver[1] === 'string' && driver[1].toLowerCase().startsWith(query)) ||
                (driver[2].toString().toLowerCase().startsWith(query)) ||
                (typeof driver[3] === 'string' && driver[3].toLowerCase().startsWith(query)) ||
                (typeof driver[4] === 'string' && driver[4].toLowerCase().startsWith(query));
    });

    displayDrivers(filteredDrivers);
}

// Fetching company data from the server
async function fetchCompanies() {
    try {
        const response = await fetch('http://localhost:3000/api/companies-info');
        const companies = await response.json();

        console.log('Fetched companies:', companies);

        storeCompaniesInLocalStorage(companies);
        displayCompanies(companies);
    } catch (error) {
        console.error('Error fetching companies:', error);
    }
}

// Storing company data in localStorage
function storeCompaniesInLocalStorage(companies) {
    localStorage.setItem('companies', JSON.stringify(companies));
}

function getCompaniesFromLocalStorage() {
    const companies = localStorage.getItem('companies');
    return companies ? JSON.parse(companies) : [];
}

// Displaying companies

function displayCompanies(companies) {
    const companyResults = document.getElementById('companyResults');
    companyResults.innerHTML = '';  // Clear existing results

    if (companies.length === 0) {
        companyResults.innerHTML = '<p>No companies found</p>';
        return;
    }

    companies.forEach(company => {
        companyResults.innerHTML += `
            <div class="company">
                <p><strong>ID:</strong> ${company[0]}</p>
                <p><strong>Email:</strong> ${company[2]}</p>
                <p><strong>Phone:</strong> ${company[3]}</p>
                <p><strong>Address:</strong> ${company[4]}</p>
            </div>`;
    });
}

// Searching companies

function searchCompany() {
    const query = document.getElementById('searchCompany').value.toLowerCase();
    const companies = getCompaniesFromLocalStorage();

    const filteredCompanies = companies.filter(company => {
        return (company[0].toString().toLowerCase().startsWith(query)) ||
               (typeof company[1] === 'string' && company[1].toLowerCase().startsWith(query)) ||
               (company[2].toString().toLowerCase().startsWith(query)) ||
               (company[3].toString().toLowerCase().startsWith(query)) ||
               (company[4].toString().toLowerCase().startsWith(query));
    });

    displayCompanies(filteredCompanies);
}

// Loading content based on the selected page
function loadContent(page) {
    localStorage.setItem('currentPage', page);  // Store the current page in localStorage

    const content = document.getElementById('content');
    const sections = {
        profile: '<p>This is the home page content.</p>',
        users: `
            <h2>User Management</h2>
            <input type="text" id="searchUser" placeholder="Search user..." oninput="searchUser()">
            <div id="userResults"></div>`,
        drivers: `
            <h2>Drivers Management</h2>
            <input type="text" id="searchDriver" placeholder="Search driver..." oninput="searchDriver()">
            <div id="DriverResults"></div>`,
        company: `
            <h2>Company Management</h2>
            <input type="text" id="searchCompany" placeholder="Search company..." oninput="searchCompany()">
            <div id="companyResults"></div>`,
        buyingRequests: `
            <h2>Buying Requests</h2>
            <div id="scrollableTableBody">
                <table id="buyingRequestsTable">
                    <thead>
                        <tr>
                            <th>Request ID</th>
                            <th>Company ID</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Buying requests will be dynamically inserted here -->
                    </tbody>
                </table>
            </div>
            <div id="buyingDetailsSection" style="display: none;">
                <h2>Buying Request Details</h2>
                <div id="detailsContainer">
                    <div id="detailsContent">
                    
                    
                        <p><strong>Date:</strong> <span id="date"></span></p><br>
                        <p><strong>Company ID:</strong> <span id="companyId"></span></p>
                        <p><strong>Waste ID:</strong> <span id="wasteId"></span></p>
                        <p><strong>Quantity:</strong> <span id="quantity"></span></p><br><br>
                        <p><strong>Price:</strong> <span id="amount"></span></p>
                        <p><strong>Status:</strong> <span id="status"></span></p>
                    </div>

                    <img id="wasteImage" src="" alt="Waste Image" style="width: 200px; height: 200px;">

                </div>

                <form id="feedbackForm" onsubmit="submitBuyingRequestFeedback(event)">
                    <h2>Give Feedback for company's request</h2>
                    <label for="feedbackDate">Date:</label>
                    <input type="date" id="feedbackDate" name="date" required>
                    <label for="driverName">Driver Name:</label>
                    <select id="driverName" name="driverName" required>
                        <option value="None">Select driver...</option>
                    </select>
                    <label for="description">Description:</label>
                    <textarea id="description" name="description" required></textarea>
                    <input type="hidden" id="acceptRequestId" name="BuyrequestId">
                    <button type="submit">Submit</button>
                </form>
            </div>`,
        sellingRequests: `
            <h2>Selling Requests</h2>
            <div id="scrollableTableBody">
                <table id="sellingRequestsTable">
                    <thead>
                        <tr>
                            <th>Request ID</th>
                            <th>User ID</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Selling requests will be dynamically inserted here -->
                    </tbody>
                </table>
            </div>
            <div id="detailsSection" style="display: none;">
                <h2>Selling Request Details</h2>
                <div id="detailsContainer">
                    <div id="detailsContent">
                        <p><strong>Date:</strong> <span id="date"></span></p><br>
                        <p><strong>User ID:</strong> <span id="userId"></span></p>
                        <p><strong>Waste type:</strong> <span id="weight"></span></p>
                        <p><strong>Quantity:</strong> <span id="reqType"></span></p>
                        <p><strong>Price:</strong> <span id="amount"></span></p><br><br>
                        <p><strong>Status:</strong> <span id="status"></span></p>
                    </div>
                    
                    <img id="wasteImage" src="" alt="Waste Image" style="width: 200px; height: 200px;">
                    
                </div>
                <form id="feedbackForm" onsubmit="submitFeedback(event)">
                    <h2>Give Feedback for user's request</h2>
                    <label for="feedbackDate">Date:</label>
                    <input type="date" id="feedbackDate" name="date" required>
                    <label for="driverName">Driver Name:</label>
                    <select id="driverName" name="driverName" required>
                        <option value="None">Select driver...</option>
                    </select>
                    <label for="description">Description:</label>
                    <textarea id="description" name="description" required></textarea>
                    <input type="hidden" id="acceptRequestId" name="requestId">
                    <button type="submit">Submit</button>
                </form>
            </div>`,
        history: `
            <h2>History</h2>    
            <div id="history-section">
                <label for="historyType">Select History Type:</label>
                <select id="historyType">
                    <option value="buy">Buying Requests</option>
                    <option value="sell">Selling Requests</option>
                </select>
                <button id="showHistoryBtn">Show History</button>
            </div>
            
            <!-- Table to display history -->
            <div id="historyResult" style="display:none;">
                <table id="historyTable">
                    
                    <tbody id="historyTableBody">
                        <!-- History details will be dynamically inserted here -->
                    </tbody>
                </table>
            </div>
            </div>`,
        dynamicSearch: `
            <div id="dynamicSearchSection" style="display: none;">
                <h2>Search</h2>
                
                <div id="searchSection">
                 
                 <!-- Date input -->
                    <div class="filter-item">
                     <label for="addDate">Date:</label>
                     <input type="date" id="addDate" placeholder="mm/dd/yyyy">
                    </div>
                    
                    <!-- Category dropdown -->
                    <div class="filter-item">
                        <label for="categories">Categories:</label>
                        <select id="categories">
                            <option value="Cdefault">Default</option>
                            <option value="sell">Selling Waste</option>
                            <option value="buy">Buying Waste</option>
                        </select>
                    </div>
                    
                    <!-- Price sorting dropdown -->
                    <div class="filter-item">
                        <label for="price">Sort By:</label>
                        <select id="price">
                            <option value="Pdefault">Default</option>
                            <option value="low">Price low to high</option>
                            <option value="high">Price high to low</option>
                            <option value="average+">Price average (+)</option>
                            <option value="average-">Price average (-)</option>
                        </select>
                    </div>
                    
                    <!-- Waste Type dropdown -->
                    <div class="filter-item">
                        <label for="wasteType">Waste Type:</label>
                        <select id="wasteType">
                            <option value="Wdefault">Default</option>
                            <option value="Paper">Paper</option>
                            <option value="Metal">Metal</option>
                            <option value="Plastic">Plastic</option>
                        </select>
                    </div>
                    <!-- price input -->
                    <div class="filter-item">
                        <label for="searchPrice">Price:</label>
                        <input type="number" id="searchPrice" placeholder="Enter price">
                    </div>
                    
                    <!-- Search button -->
                    <div class="filter-item">
                        <label>&nbsp;</label> <!-- Empty label to align button properly -->
                        <button id="searchButton" onclick="performSearch()">Search</button>
                    </div>

                </div>

            <!-- Search results container -->
                <div id="searchResults"></div>  
                  
            </div>`
    };

    content.innerHTML = sections[page] || '<p>This is the default page content.</p>';

    document.getElementById('dynamicSearchSection').style.display = 'none';
    

    if (page === 'users') {
        const users = getUsersFromLocalStorage();
        displayUsers(users);
    } else if (page === 'sellingRequests') {
        fetchSellingRequests();
    } else if (page === 'buyingRequests') {
        fetchBuyingRequests(); 
    } else if (page === 'company') {
        fetchCompanies();
    } else if (page === 'drivers') {
        fetchDriversInfo(); 
    } else if (page === 'history') {
        initializeHistory();
    } else if (page === 'dynamicSearch') {
        document.getElementById('dynamicSearchSection').style.display = 'block';
    }
}

function initializeHistory() {
    const showHistoryBtn = document.getElementById('showHistoryBtn');
    
   
    showHistoryBtn.addEventListener('click', function() {
        const historyType = document.getElementById('historyType').value;
        loadHistory(historyType);
    });
}



async function loadHistory(historyType) {
    
    const historyResult = document.getElementById('historyResult');

   
    const table = document.createElement('table');
    table.classList.add('historyTable'); 

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

  
    if (historyType === 'sell') {
        headerRow.innerHTML = `
            <th>Date</th>
            <th>User Name</th>
            <th>Driver Name</th>
            <th>Waste Type</th>
            <th>Quantity</th>
            <th>Status</th>
        `;
    } else if (historyType === 'buy') {
        headerRow.innerHTML = `
            <th>Date</th>
            <th>Company Email</th>
            <th>Driver Name</th>
            <th>Waste Type</th>
            <th>Quantity</th>
            <th>Status</th>
        `;
    }
    
    thead.appendChild(headerRow);
    table.appendChild(thead);

    
    historyResult.innerHTML = ''; 
    historyResult.appendChild(table);

    const endpoints = {
        buy: 'http://localhost:3000/api/admin/buying-requests/history',
        sell: 'http://localhost:3000/api/admin/selling-requests/history'
    };
    
    const endpoint = endpoints[historyType];
    
    if (!endpoint) {
        console.error('Invalid history type selected');
        return;
    }

    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched history:', data);

        if (Array.isArray(data) && data.length > 0) {
            const tbody = document.createElement('tbody');
            data.forEach(request => {
                
                const row = document.createElement('tr');
                const date = new Date(request[2]);
                const formattedDate = date.toISOString().split('T')[0]; 
                row.innerHTML = historyType === 'sell' ? `
                    <td>${formattedDate}</td>
                    <td>${request[0]}</td>
                    <td>${request[4]}</td>
                    <td>${request[5]}</td>
                    <td>${request[6]}</td>
                    <td>${request[1]}</td>
                ` : `
                    <td>${formattedDate}</td>
                    <td>${request[0]}</td>
                    <td>${request[4]}</td>
                    <td>${request[5]}</td>
                    <td>${request[6]}</td>
                    <td>${request[1]}</td>
                `;
                tbody.appendChild(row);
            });
            table.appendChild(tbody);
        } else {
            const tbody = document.createElement('tbody');
            tbody.innerHTML = '<tr><td colspan="6">No history available.</td></tr>';
            table.appendChild(tbody);
        }

        // Make history results visible
        historyResult.style.display = 'block';
    } catch (error) {
        console.error('Error fetching history:', error);
        const tbody = document.createElement('tbody');
        tbody.innerHTML = '<tr><td colspan="6">Error fetching history. Please try again later.</td></tr>';
        table.appendChild(tbody);
    }
}


async function fetchBuyingRequests() {
    try {
        const response = await fetch('http://localhost:3000/api/admin/buying-requests/pending');
        buyingRequests = await response.json();

        console.log('Fetched buying requests:', buyingRequests);
        
        

        displayBuyingRequests(buyingRequests);
    } catch (error) {
        console.error('Error fetching buying requests:', error);
        document.querySelector('#buyingRequestsTable tbody').innerHTML = '<tr><td colspan="4">Error loading requests.</td></tr>';
    }
}


function displayBuyingRequests(buyingRequests) {
    const tableBody = document.querySelector('#buyingRequestsTable tbody');
    tableBody.innerHTML = '';

    if (buyingRequests.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="4">No buying requests found.</td></tr>';
        return;
    }

    buyingRequests.forEach(request => {
        const row = document.createElement('tr');

       
        let statusColor = 'black'; 
        let fontWeight = 'normal'; 
        if (request[6] === 'on going process') {
            statusColor = '#DAA520'; 
            fontWeight = 'bold';
        } else if (request[6] === 'pending') {
            statusColor = 'red';
            fontWeight = 'bold';
        }
        else if (request[6] === 'completed') {
            statusColor = 'green';
            fontWeight = 'bold';
        }

        console.log('Request:', request);

        row.innerHTML = `
            <td>${request[0]}</td>
            <td>${request[2]}</td>
            <td style="color: ${statusColor}; font-weight: ${fontWeight};">${request[6]}</td>
            <td>
            <button onclick="showBuyingDetails('${request[0]}')">Details</button>
            ${request[6] === 'pending' ? 
                `<button onclick="AcceptRequest('${request[0]}')">Accept</button>
                 <button onclick="RejectRequest('${request[0]}', '${request[2]}')">Reject</button>` : ''}
            </td>
        `;

        tableBody.appendChild(row);
    });
}

function showBuyingDetails(BuyrequestId) {
    const request = buyingRequests.find(req => req[0] === BuyrequestId);

    if (!request) {
        alert('Request not found');
        return;
    }

    const elements = {
        companyId: document.getElementById('companyId'),
        quantity: document.getElementById('quantity'),
        wasteId: document.getElementById('wasteId'),
        amount: document.getElementById('amount'),
        date: document.getElementById('date'),
        status: document.getElementById('status'),
        acceptRequestId: document.getElementById('acceptRequestId'),
        wasteImage: document.getElementById('wasteImage')
    };

    
    const formattedDate = new Date(request[5]).toISOString().split('T')[0];

    elements.companyId.innerText = request[2];
    elements.quantity.innerText = request[1];
    elements.wasteId.innerText = request[3];
    elements.amount.innerText = request[4];
    elements.date.innerText = formattedDate;
    elements.status.innerText = request[6];
    elements.acceptRequestId.value = BuyrequestId; 


    elements.status.style.fontWeight = 'bold'; 
    if (request[6].toLowerCase() === 'pending') {
        elements.status.style.color = 'red';
    } else if (request[6].toLowerCase() === 'on going process') {
        elements.status.style.color = '#DAA520';
    } else if (request[6].toLowerCase() === 'completed') {
        elements.status.style.color = 'green';
    }

  
    const wasteImageURL = getWasteImageURL(request[3]); 
    elements.wasteImage.src = wasteImageURL;
    
    document.getElementById('buyingDetailsSection').style.display = 'block';

  
    const feedbackForm = document.getElementById('feedbackForm');
    if (request[6] === 'pending' || request[6] === 'completed') {
        feedbackForm.style.display = 'none';
    } else {
        feedbackForm.style.display = 'block';

        const descriptionBox = document.getElementById('description');
        descriptionBox.value = 'Your request has been accepted and you will get your delivery on ';
    }
}


function getWasteImageURL(wasteId) {
    const imageMap = {
        '202024': 'E:/EnviroLink/global/images/plastic.jpg',
        '202125': 'E:/EnviroLink/global/images/paper.jpg',
        '202226': 'E:/EnviroLink/global/images/metal.jpg',

    };

    return imageMap[wasteId];
}


async function submitBuyingRequestFeedback(event) {
    event.preventDefault();
    const requestId = document.getElementById('acceptRequestId').value;
    const date = document.getElementById('feedbackDate').value;
    const driverName = document.getElementById('driverName').value;
    const description = document.getElementById('description').value;

    try {
        const response = await fetch(`http://localhost:3000/api/admin/buying-requests/${requestId}/feedback`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ date, driverName, description })
        });

        if (response.ok) {
            alert('Feedback submitted successfully');
            loadContent('buyingRequests');
        } else {
            alert('Failed to submit feedback');
        }
    } catch (error) {
        console.error('Error submitting feedback:', error);
        alert('Failed to submit feedback');
    }
}

async function AcceptRequest(BuyrequestId) {
    try {
        const response = await fetch(`http://localhost:3000/api/admin/buying-requests/${BuyrequestId}/accept`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            alert('Request accepted successfully');
            fetchBuyingRequests(); 
        } else {
            alert('Failed to accept the request');
        }
    } catch (error) {
        console.error('Error accepting request:', error);
        alert('Failed to accept the request');
    }
    window.location.reload();
}

async function RejectRequest(BuyrequestId, companyId) {
    try {
        const response = await fetch(`http://localhost:3000/api/admin/buying-requests/${BuyrequestId}/reject`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            alert('Request rejected successfully');
            fetchBuyingRequests(); 
        } else {
            alert('Failed to reject the request');
        }
    } catch (error) {
        console.error('Error rejecting request:', error);
        alert('Failed to reject the request');
    }

    const CompanyrejectMessage = `Your request has been rejected. Please try letter.`;

    localStorage.setItem('CompanyrejectMessage', CompanyrejectMessage);
    
    alert(`Company ID: ${companyId} request has been rejected.`);

    window.location.reload();
}



//-----------------------------------------------------USER--------------------------------------------------------------

// Displaying users
function displayUsers(users) {
    const userResults = document.getElementById('userResults');
    userResults.innerHTML = '';  // Clear existing results

    if (users.length === 0) {
        userResults.innerHTML = '<p>No users found</p>';
        return;
    }

    users.forEach(user => {
        userResults.innerHTML += `
            <div class="user">
                <p><strong>ID:</strong> ${user[0]}</p>
                <p><strong>Name:</strong> ${user[1]}</p>
                <p><strong>Phone:</strong> ${user[3]}</p>
                <p><strong>Email:</strong> ${user[4]}</p>
                <p><strong>Address:</strong> Road: ${user[6]}, House:</strong> ${user[7]}, </strong> ${user[5]}</p>
            </div>`;
    });
}

// Searching users
function searchUser() {
    const query = document.getElementById('searchUser').value.toLowerCase();
    const users = getUsersFromLocalStorage();

    const filteredUsers = users.filter(user => {
        return (user[0].toString().toLowerCase().startsWith(query)) ||
               (typeof user[1] === 'string' && user[1].toLowerCase().startsWith(query)) ||
               (user[3].toString().toLowerCase().startsWith(query)) ||
               (typeof user[4] === 'string' && user[4].toLowerCase().startsWith(query)) ||
               (typeof user[5] === 'string' && user[5].toLowerCase().startsWith(query)) ||
               (typeof user[6] === 'string' && user[6].toLowerCase().startsWith(query)) ||
               (typeof user[7] === 'string' && user[7].toLowerCase().startsWith(query));
    });

    displayUsers(filteredUsers);
}



async function fetchSellingRequests() {
    try {
        const response = await fetch('http://localhost:3000/api/admin/selling-requests/pending');
        sellingRequests = await response.json();

        console.log('Fetched selling requests:', sellingRequests);

        sellingRequests.forEach(request => {
            request.SELL_REQ_DATE = new Date(request[6]).toISOString().slice(0, 10);
        });
        displaySellingRequests(sellingRequests);
    } catch (error) {
        console.error('Error fetching selling requests:', error);
    }
}


function displaySellingRequests(sellingRequests) {
    const tableBody = document.querySelector('#sellingRequestsTable tbody');
    tableBody.innerHTML = ''; // Clear previous rows

    sellingRequests.forEach(request => {
        const row = document.createElement('tr');

        // Determine the color based on the status
        let statusColor = 'black'; // Default color
        let fontWeight = 'normal'; // Default font weight
        if (request[5] === 'on going process') {
            statusColor = '#DAA520'; // Darker yellow (Goldenrod)
            fontWeight = 'bold';
        } else if (request[5] === 'pending') {
            statusColor = 'red';
            fontWeight = 'bold';
        } else if (request[5] === 'completed') {
            statusColor = 'green';
            fontWeight = 'bold';
        }

        row.innerHTML = `
            <td>${request[0]}</td>
            <td>${request[1]}</td>
            <td style="color: ${statusColor}; font-weight: ${fontWeight};">${request[5]}</td>
            <td>
                <button onclick="showDetails('${request[0]}')">Details</button>
                    ${request[5] === 'pending' ? 
                    `<button onclick="acceptRequest('${request[0]}')">Accept</button>
                     <button onclick="rejectRequest('${request[0]}', '${request[1]}')">Reject</button>` : ''}
            </td>
        `;
        tableBody.appendChild(row);
    });
}

const wasteImages = {
    'Plastic': 'E:/EnviroLink/global/images/plastic.jpg',
    'Paper': 'E:/EnviroLink/global/images/paper.jpg',
    'Metal': 'E:/EnviroLink/global/images/metal.jpg',
};

// Showing request details
function showDetails(requestId) {
    const request = sellingRequests.find(req => req[0] === requestId);

    if (!request) {
        alert('Request not found');
        return;
    }

    // Set request details
 
    document.getElementById('userId').innerText = request[1];
    document.getElementById('amount').innerText = request[2];
    document.getElementById('weight').innerText = request[7];
    document.getElementById('reqType').innerText = request[4];
    document.getElementById('date').innerText = request.SELL_REQ_DATE;
    document.getElementById('acceptRequestId').value = requestId;

    console.log('Request Id:', requestId, 'User Id', request[1]);

    const statusElement = document.getElementById('status');
    statusElement.innerText = request[5];
    statusElement.style.fontWeight = 'bold'; 
    
    if (request[5] === 'on going process') {
        statusElement.style.color = '#DAA520'; 
    } else if (request[5] === 'pending') {
        statusElement.style.color = 'red'; 
    } else if (request[5] === 'completed') {
        statusElement.style.color = 'green'; 
    }

    const wasteImage = document.getElementById('wasteImage');
    // console.log('Waste Image Element:', wasteImage); 
    
    if (wasteImage) {
        const wasteType = request[7]; 
        wasteImage.src = wasteImages[wasteType];
    } else {
        console.error('Waste image element not found in the DOM.');
    }
    

    document.getElementById('detailsSection').style.display = 'block';

    const feedbackForm = document.getElementById('feedbackForm');
    if (request[5] === 'pending' || request[5] === 'completed') {
        feedbackForm.style.display = 'none';
    } else {
        feedbackForm.style.display = 'block';
        const descriptionBox = document.getElementById('description');
        descriptionBox.value = 'Your request has been accepted and we will collect the items on';
    }
}

async function submitFeedback(event) {
    event.preventDefault();
    const requestId = document.getElementById('acceptRequestId').value;
    const date = document.getElementById('feedbackDate').value;
    const driverName = document.getElementById('driverName').value;
    const description = document.getElementById('description').value;

    try {
        const response = await fetch(`http://localhost:3000/api/admin/selling-requests/${requestId}/feedback`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ date, driverName, description })
        });

        if (response.ok) {
            alert('Feedback submitted successfully');
            loadContent('sellingRequests');
        } else {
            alert('Failed to submit feedback');
        }
    } catch (error) {
        console.error('Error submitting feedback:', error);
        alert('Failed to submit feedback');
    }
}

// Accepting a selling request
async function acceptRequest(requestId) {
    try {
        const response = await fetch(`http://localhost:3000/api/admin/selling-requests/${requestId}/accept`, {
            method: 'PUT',
        });

        if (response.ok) {
            alert('Request accepted');
            loadContent('sellingRequests');
        } else {
            alert('Failed to accept request');
        }
    } catch (error) {
        console.error('Error accepting request:', error);
        alert('Failed to accept request');
    }
    window.location.reload();
}

// Rejecting a selling request
async function rejectRequest(requestId, userId) {
    try {
        const response = await fetch(`http://localhost:3000/api/admin/selling-requests/${requestId}/reject`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Request rejected successfully');
            loadContent('sellingRequests');
        } else {
            const errorMessage = await response.text();
            alert(`Failed to reject request: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error rejecting request:', error);
        alert('Failed to reject request');
    }
    console.log('User ID:', userId);

    const rejectMessage = `Your request has been rejected. Please try letter.`;

    localStorage.setItem('rejectMessage', rejectMessage);
    
    alert(`User ID: ${userId} request has been rejected.`);
    window.location.reload();
}



function performSearch() {
    // Get the values from the form fields
    const searchPrice = document.getElementById('searchPrice').value;
    const addDate = document.getElementById('addDate').value;
    const categories = document.getElementById('categories').value;
    const price = document.getElementById('price').value;
    const wasteType = document.getElementById('wasteType').value;

    // Create a data object to send to the backend
    const searchData = {
        searchPrice: searchPrice || null,  
        date: addDate || null,               
        category: categories,        
        sortBy: price || null,               
        wasteType: wasteType || null         
    };

    console.log('Search data:', searchData);

    // Determine the endpoint based on the category
    let endpoint;
    if (categories === 'sell') {
        endpoint = 'http://localhost:3000/api/selling-dynamic-search';
    } else if (categories === 'buy') {
        endpoint = 'http://localhost:3000/api/buying-dynamic-search';
    } else {
        console.error('Invalid category');
        return;
    }

    // Display loading or clear previous results
    document.getElementById('searchResults').innerHTML = 'Searching...';

    // Make an AJAX call to your backend
    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(searchData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Search results:', data);
        displayResults(data, categories); // Pass category to displayResults
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}

function displayResults(data, category) {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = ''; // Clear previous results

    if (data.length === 0) {
        resultsContainer.innerHTML = '<p>No results found</p>';
        return;
    }

    const table = document.createElement('table');
    table.classList.add('results-table');

    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    if (category === 'sell') {
        headerRow.innerHTML = `
            <th>Date</th>
            <th>User Name</th>
            <th>Waste Type</th>
            <th>Quantity</th>
            <th>Price</th>
        `;
    } else if (category === 'buy') {
        headerRow.innerHTML = `
            <th>Date</th>
            <th>Company Email</th>
            <th>Waste Type</th>
            <th>Quantity</th>
            <th>Price</th>
        `;
    }

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');

    data.forEach(result => {
        const row = document.createElement('tr');

        // Manually parse the date string (assuming the date is at index 0)
        const dateString = result[0]; // Example: "2024-09-12T00:00:00Z"
        const [year, month, day] = dateString.split('T')[0].split('-');
        const formattedDate = `${day}-${month}-${year}`;

        if (category === 'sell') {
            row.innerHTML = `
                <td>${formattedDate}</td>
                <td>${result[1]}</td>
                <td>${result[2]}</td>
                <td>${result[3]}</td>
                <td>${result[4]}</td>
            `;
        } else if (category === 'buy') {
            row.innerHTML = `
                <td>${formattedDate}</td>
                <td>${result[2]}</td>
                <td>${result[3]}</td>
                <td>${result[4]}</td>
                <td>${result[5]}</td>
            `;
        }

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    resultsContainer.appendChild(table);
}