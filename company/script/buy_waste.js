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

document.getElementById('buyWasteForm').addEventListener('submit', async function(event) {
    event.preventDefault();



    const wasteType = document.getElementById('waste-type').value.toLowerCase();
    const quantity = document.getElementById('quantity').value;
    const pricePerKg = wasteData[wasteType]?.price; // Provide default value if not found
    const totalPrice = quantity * pricePerKg;
    const company = JSON.parse(localStorage.getItem('company'));

    console.log('Company:', company);   

    // Check if company details are being retrieved correctly
    if (!company) {
        console.error('No company details found in localStorage');
        return;
    }

    // Populate popup details
    const com = document.getElementById('company-id').textContent = company[0];
    document.getElementById('company-email').textContent = company[2];
    document.getElementById('popup-waste-type').textContent = wasteType.charAt(0).toUpperCase() + wasteType.slice(1); // Capitalize first letter
    document.getElementById('popup-quantity').textContent = quantity;
    document.getElementById('popup-total-price').textContent = totalPrice;

    // Show popup
    document.getElementById('popup').style.display = 'block';

    // Handle "Confirm" button click
document.getElementById('confirm-btn').addEventListener('click', async function() {
    try {
      const response = await fetch('http://localhost:3000/api/buying-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          companyId: com, 
          wasteType: wasteType,
          quantity: quantity,
          price: totalPrice,
          date: document.getElementById('date').value
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
  

    // Handle "Cancel" button click
    document.getElementById('cancel-btn').addEventListener('click', function() {
        document.getElementById('popup').style.display = 'none'; 
    });
 
});
