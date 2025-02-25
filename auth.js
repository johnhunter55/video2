import PocketBase from 'pocketbase';

const pb = new PocketBase('http://100.118.206.60:3000');


// 🔄 Auto-login if "Remember Me" was selected
const savedUser = localStorage.getItem("user");
if (savedUser) {
    pb.authStore.loadFromCookie(savedUser);
    if (pb.authStore.isValid) {
        window.location.href = "dashboard.html";  // Redirect if already logged in
    }
}

// ✅ Login Function
async function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const rememberMe = document.getElementById("rememberMe").checked;  // Check if Remember Me is selected

    try {
        const authData = await pb.collection("users").authWithPassword(email, password);

        if (rememberMe) {
            // Store session in localStorage
            localStorage.setItem("user", pb.authStore.exportToCookie());
        } else {
            // Store session only in memory (expires on page refresh)
            sessionStorage.setItem("user", pb.authStore.exportToCookie());
        }

        alert("Logged in!");
        window.location.href = "dashboard.html";  // Redirect to dashboard
    } catch (err) {
        alert("Login failed!");
        console.error(err);
    }
}

// ✅ Signup Function
async function signup() {
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    try {
        await pb.collection("users").create({ email, password });
        alert("Account created! You can now log in.");
    } catch (err) {
        alert("Signup failed!");
        console.error(err);
    }
}

// ✅ Logout Function (Clear Session)
function logout() {
    pb.authStore.clear();
    localStorage.removeItem("user");  // Clear stored session
    sessionStorage.removeItem("user");
    window.location.href = "index.html";  // Redirect to login page
}
