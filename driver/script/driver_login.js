function myMenuFunction() {
    var i = document.getElementById("navMenu");

    if(i.className === "nav-menu") {
        i.className += " responsive";
    } else {
        i.className = "nav-menu";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login");

    loginForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        const id = document.getElementById("id").value;
        const phone = document.getElementById("phone").value; // Keep this as string

        console.log("Login attempt with ID:", id, "and Phone:", phone); // Debugging log

        try {
            const response = await fetch("http://localhost:3000/api/drivers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: id, phone: phone }), // Ensure phone is a string
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('driver', JSON.stringify(data));
                window.location.href = "E:/EnviroLink/driver/html/driver_profile.html";
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
