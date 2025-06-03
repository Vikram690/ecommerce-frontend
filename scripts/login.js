// ================= FORM SWITCHING =================
const container = document.getElementById('container');
const signUpBtn = document.getElementById('signUp');
const signInBtn = document.getElementById('signIn');

signUpBtn.addEventListener('click', () => {
  container.classList.add('right-panel-active');
});

signInBtn.addEventListener('click', () => {
  container.classList.remove('right-panel-active');
});

// ================= PASSWORD TOGGLE =================
document.querySelectorAll('.toggle-password').forEach(icon => {
  icon.addEventListener('click', () => {
    const input = icon.previousElementSibling;
    input.type = input.type === 'password' ? 'text' : 'password';
    icon.textContent = input.type === 'password' ? '👁️' : '🙈';
  });
});

// ================= ON LOGIN/SIGNUP SUCCESS =================
function onLoginSignupSuccess(user) {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("isLoggedIn", "true");

  const redirectURL = localStorage.getItem("redirectAfterLogin") || "index.html";
  localStorage.removeItem("redirectAfterLogin");
  window.location.href = redirectURL;
}

// ================= SIGNUP FORM HANDLER =================
document.getElementById('signupForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const fullname = document.getElementById('signup-fullname').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value.trim();
  const confirmPassword = document.getElementById('signup-confirm-password').value.trim();

  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  if (password.length < 8) {
    alert('Password must be at least 8 characters.');
    return;
  }

  const formData = { name: fullname, email, password };

  try {
    const res = await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await res.json();

    if (res.ok) {
      alert(`Welcome, ${fullname}! You are now signed up.`);
      this.reset();
      onLoginSignupSuccess({ name: fullname, email });
    } else {
      alert(result.error || result.message || "Signup failed.");
    }
  } catch (error) {
    console.error("Signup error:", error);
    alert("Error submitting signup form.");
  }
});

// ================= LOGIN FORM HANDLER =================
document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value.trim();

  if (!email || !password) {
    alert('Please enter both email and password.');
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const result = await res.json();

    if (res.ok) {
      alert(`Welcome back, ${result.user.name}!`);
      onLoginSignupSuccess(result.user);
    } else {
      alert(result.error || result.message || "Login failed.");
    }

  } catch (err) {
    console.error("Login error:", err);
    alert("Error logging in.");
  }
});

// ================= AUTO REDIRECT IF ALREADY LOGGED IN =================
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('isLoggedIn') === 'true') {
    const redirectURL = localStorage.getItem('redirectAfterLogin') || 'index.html';
    localStorage.removeItem('redirectAfterLogin');
    window.location.href = redirectURL;
  }
});
// ================= LOGOUT FUNCTIONALITY =================
document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('user');
  localStorage.setItem('isLoggedIn', 'false');
  alert('You have been logged out.');
  window.location.href = 'index.html';
});