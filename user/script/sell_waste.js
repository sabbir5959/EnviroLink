document.addEventListener('DOMContentLoaded', function () {
  const wastePrices = {
    Plastic: 45,
    Paper: 40,
    Metal: 80
  };

  const wasteTypeField = document.getElementById('wasteType');
  const quantityField = document.getElementById('quantity');
  const dateField = document.getElementById('date');
  const confirmBtn = document.getElementById('confirmBtn');
  const popupModal = document.getElementById('popupModal');
  const submitBtn = document.getElementById('submitBtn');
  const closePopupBtn = document.getElementById('closePopupBtn');

  const popupUserName = document.getElementById('popupUserName');
  const popupWasteType = document.getElementById('popupWasteType');
  const popupQuantity = document.getElementById('popupQuantity');
  const popupPrice = document.getElementById('popupPrice');
  const popupDate = document.getElementById('popupDate');

  let calculatedPrice = 0;

  // Event listener for confirm button click
  confirmBtn.addEventListener('click', () => {
    const selectedWasteType = wasteTypeField.value;
    const quantity = parseFloat(quantityField.value);
    const date = dateField.value;

    if (selectedWasteType && quantity && date) {
      const pricePerUnit = wastePrices[selectedWasteType];
      calculatedPrice = pricePerUnit * quantity;

      // Get the user from localStorage
      const user = JSON.parse(localStorage.getItem('user'));
      const userName = user ? user[1] : 'Unknown';

      // Show the confirmation details in the popup
      popupUserName.textContent = userName;
      popupWasteType.textContent = selectedWasteType.charAt(0).toUpperCase() + selectedWasteType.slice(1);
      popupQuantity.textContent = quantity;
      popupPrice.textContent = calculatedPrice.toFixed(2);
      popupDate.textContent = new Date(date).toLocaleDateString();

      // Display the modal
      popupModal.style.display = 'block';
    } else {
      alert('Please fill in all fields.');
    }
  });

  // Close the popup modal
  closePopupBtn.addEventListener('click', () => {
    popupModal.style.display = 'none';
  });


// Event listener for the form submission
submitBtn.addEventListener('click', async () => {
  const wasteType = wasteTypeField.value;
  const quantity = quantityField.value;
  const date = dateField.value;

  console.log('Submitting request:', { wasteType, quantity, date });

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user[0];

  try {
    const response = await fetch('http://localhost:3000/api/selling-requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, price: calculatedPrice, wasteType, quantity, date }),
    });

    if (response.ok) {
      alert('Request submitted successfully');
      popupModal.style.display = 'none'; // Close the modal after successful submission

      // Clear the form fields
      wasteTypeField.value = '';
      quantityField.value = '';
      dateField.value = '';
    } else {
      const errorMessage = await response.text();
      alert(`Failed to submit request: ${errorMessage}`);
      popupModal.style.display = 'none'; // Close the popup modal on error
    }
  } catch (error) {
    console.error('Error submitting request:', error);
    alert('Failed to submit request due to a network or server error.');
    popupModal.style.display = 'none'; // Close the popup modal on network or server error
  }
});

});
