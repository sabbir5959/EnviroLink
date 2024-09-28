document.addEventListener('DOMContentLoaded', async function () {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        alert('No user information found. Please log in.');
        window.location.href = 'user_login.html';
        return;
    }

    const userEmail = user[4]; // Ensure this is the correct index for the user's email

    try {
        const response = await fetch(`http://localhost:3000/api/user-history?email=${encodeURIComponent(userEmail)}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const historyDiv = document.getElementById('history');

        if (data.length === 0) {
            historyDiv.innerHTML = '<p>No history found.</p>';
            return;
        }

        data.forEach(item => {
            const historyItemDiv = document.createElement('div');
            historyItemDiv.classList.add('request');

            const dateObj = new Date(item[1]);
            const day = String(dateObj.getDate()).padStart(2, '0');
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const year = dateObj.getFullYear();
            const formattedDate = `${day}-${month}-${year}`;
            const formattedTime = dateObj.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Dhaka' });

            historyItemDiv.innerHTML = `
                <div class="customer-details">
                    <h3>Customer Details</h3>
                    <p><strong>Order Date:</strong> ${formattedDate} ${formattedTime}</p>
                    <p><strong>User Name:</strong> ${item[3]}</p>
                    <p><strong>Email:</strong> ${userEmail}</p>
                    <p><strong>Address:</strong> ${item[4]}</p>
                </div>
                <div class="product-details">
                    <h3>Products</h3>
                    <div class="product-info">
                        <img src="${getProductImage(item[5])}" alt="${item[5]}" class="product-image">
                        <div class="product-text">
                            <p><strong>Product Name:</strong> ${item[5]}</p>
                            <p><strong>Quantity:</strong> ${item[6]}</p>
                            <p><strong>Price:</strong> ${item[7]} BDT</p>
                        </div>
                    </div>
                    <p class="status"><strong>Status:</strong> ${item[0]}</p> <!-- Status field added here -->
                </div>
            `;

            historyDiv.appendChild(historyItemDiv);
        });
    } catch (error) {
        const historyDiv = document.getElementById('history');
        historyDiv.innerHTML = '<p>Error fetching history. Please try again later.</p>';
    }

    

    
});

function getProductImage(productName) {
    const productImages = {
        'Plastic': 'https://images.unsplash.com/flagged/photo-1572213426852-0e4ed8f41ff6?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'Paper': 'https://images.unsplash.com/photo-1585351737354-204ffbbe584f?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'Metal': 'https://images.unsplash.com/photo-1536842409491-b3bbde0e3b66?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dg'
    };
    return productImages[productName] || 'path/to/default-image.jpg';
}

function backButton() {
    window.location.href = 'E:/EnviroLink/user/html/user_profile.html';
}