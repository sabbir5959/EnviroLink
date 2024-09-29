
const name = document.getElementById("name");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const area = document.getElementById("area");
const road = document.getElementById("road");
const house = document.getElementById("house");
const password = document.getElementById("password-reg");
const confirmPassword = document.getElementById("confirmPassword");
const submit = document.getElementById("register");

const handleSubmit = async (e) => {
  e.preventDefault();

  if (password.value !== confirmPassword.value) {
    console.log(password.value, confirmPassword.value);
    alert("Passwords do not match");
    return;
  }

  
  const user = {
    name: name.value,
    phone: phone.value,
    email: email.value,
    address: {
      area: area.value,
      road: road.value,
      house: house.value,
    },
    password: password.value,
  };
  

    console.log(user);

  try {
    const response = await fetch("http://localhost:3000/api/users-reg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      alert("Registration successful");
      window.location.href = "E:/EnviroLink/user/html/user_login.html"
      e.target.reset();
    } else {
      const errorData = await response.json();
      alert("Registration failed: " + errorData.message);
    }
  } catch (error) {
    console.error("Error during registration:", error);
    alert("Registration failed: " + error.message);
  }
};

submit.addEventListener("submit", handleSubmit);
