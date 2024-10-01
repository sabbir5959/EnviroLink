let wasteData = {}; // Define outside the function to access globally

document.addEventListener('DOMContentLoaded', async () => {
    const company = JSON.parse(localStorage.getItem('company'));

    try {
        const response = await fetch('http://localhost:3000/api/waste-details');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const wasteDetails = await response.json();
        console.log('wasteDetails', wasteDetails);

        // Map waste details for easier access
        wasteDetails.forEach(item => {
            if (item[1] && item[2] && item[3]) {
                wasteData[item[1].toLowerCase()] = {
                    quantity: item[2],
                    price: item[3],
                };
            }
        });

        console.log('wasteData', wasteData); // Check if wasteData is populated correctly

        // Update the UI with fetched data
        const updateWasteUI = (type, data) => {
            const quantityElement = document.getElementById(`${type}-quantity`);

            if (quantityElement) {
                quantityElement.textContent = data.quantity;
            } else {
                console.warn(`Quantity element for type ${type} not found`);
            }
        };

        for (const type in wasteData) {
            updateWasteUI(type, wasteData[type]);
        }
    } catch (error) {
        console.error('Error fetching waste details:', error);
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    const company = JSON.parse(localStorage.getItem('company'));
    console.log('Company from localStorage:', company);
});

// Attach the confirm event listener once
document.getElementById('confirm-btn').addEventListener('click', async function() {
    try {
        const wasteType = document.getElementById('popup-waste-type').textContent.toLowerCase();
        const quantity = document.getElementById('popup-quantity').textContent;
        const totalPrice = document.getElementById('popup-total-price').textContent;
        const company = JSON.parse(localStorage.getItem('company'));

        if (!company) {
            console.error('No company details found in localStorage');
            return;
        }

        const date = document.getElementById('date').value;
        const companyId = company[0];

        const response = await fetch('http://localhost:3000/api/buying-request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                companyId,
                wasteType,
                quantity,
                price: totalPrice,
                date
            })
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            alert(errorMessage);
            document.getElementById('popup').style.display = 'none';
            return;
        }

        const result = await response.text();
        console.log('Response:', result);
        alert('Order request sent successfully!');
        document.getElementById('popup').style.display = 'none';
        // Clear form fields
        document.getElementById('waste-type').value = '';
        document.getElementById('quantity').value = '';
        document.getElementById('date').value = '';
    } catch (error) {
        console.error('Error submitting buying request:', error);
    }
});



const WasteData = {
    paper: { price: 55 },
    plastic: { price: 90 },
    metal: { price: 100 } // You can set the price for other waste types as well
};

// Handle form submission
document.getElementById('buyWasteForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const wasteType = document.getElementById('waste-type').value.toLowerCase();
    const quantity = document.getElementById('quantity').value;
    
    // Get the price for the selected waste type, default to 0 if not found
    const pricePerKg = WasteData[wasteType]?.price || 0;

    console.log('quantity:', quantity, 'pricePerKg:', pricePerKg);

    const totalPrice = quantity * pricePerKg;
    const company = JSON.parse(localStorage.getItem('company'));

    if (!company) {
        console.error('No company details found in localStorage');
        return;
    }

    // Populate popup details
    document.getElementById('company-id').textContent = company[0];
    document.getElementById('company-email').textContent = company[2];
    document.getElementById('popup-waste-type').textContent = wasteType.charAt(0).toUpperCase() + wasteType.slice(1); // Capitalize first letter
    document.getElementById('popup-quantity').textContent = quantity;
    document.getElementById('popup-total-price').textContent = totalPrice;

    // Show popup
    document.getElementById('popup').style.display = 'block';
});

// Handle "Cancel" button click
document.getElementById('cancel-btn').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none';
});
