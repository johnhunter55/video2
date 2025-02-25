import PocketBase from 'pocketbase';

const pb = new PocketBase('http://100.118.206.60:3000');

// 🔄 Auto-redirect if not logged in
if (!pb.authStore.isValid) {
    window.location.href = "index.html";
}

// ✅ Logout Function
function logout() {
    pb.authStore.clear();  // Clears the authentication token
    localStorage.removeItem("user");  // Remove saved session
    window.location.href = "index.html";  // Redirect to login
}

// ✅ Load user data
document.addEventListener("DOMContentLoaded", () => {
    const user = pb.authStore.model;
    if (user) {
        document.getElementById("welcomeMessage").innerText = `Welcome, ${user.email}`;
    }
});
