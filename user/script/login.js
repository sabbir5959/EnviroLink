document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login");

  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const Email = document.getElementById("Email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Email: Email, password: password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('user', JSON.stringify(data));
        // location.reload();
        window.location.href = "E:/EnviroLink/user/html/user_profile.html";
        console.log("Login successful:", data);
      } else {
        console.error("Login failed");
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login request:", error);
      alert("An error occurred. Please try again later.");
    }
  });
});
