function myMenuFunction() {
    var i = document.getElementById("navMenu");

    if (i.className === "nav-menu") {
        i.className += " responsive";
    } else {
        i.className = "nav-menu";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    console.log("Script loaded"); // Debugging line

    const loginForm = document.getElementById("companyLoginForm");

    // Check if the login form is found
    if (!loginForm) {
        console.error("Login form not found.");
        return; // Stop execution if form is not found
    }

    loginForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const Email = document.getElementById("c_email").value;
        const Password = document.getElementById("c_password").value;

        try {
            const response = await fetch("http://localhost:3000/api/company-login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ Email, Password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('company', JSON.stringify(data));
                window.location.href = "E:/EnviroLink/company/html/company_profile.html";
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

