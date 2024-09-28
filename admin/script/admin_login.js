function myMenuFunction() {
  var i = document.getElementById("navMenu");

  if (i.className === "nav-menu") {
      i.className += " responsive";
  } else {
      i.className = "nav-menu";
  }
}


document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("a_login");

  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const Email = document.getElementById("a_email").value;
    const Password = document.getElementById("a_password").value;

    try {
      const response = await fetch("http://localhost:3000/api/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Email: Email, Password: Password }),
        
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('admin', JSON.stringify(data));
        // location.reload();
        window.location.href = "E:/EnviroLink/admin/html/admin_profile.html";
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
