/* ================= AUTH.JS ================= */

/* ================= LOGIN ================= */

function login() {

    let username =
        document.getElementById("loginUser").value.trim();

    let password =
        document.getElementById("loginPass").value;

    if (!username || !password) {
        alert("Заповни всі поля");
        return;
    }

    let users =
        JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(u =>
        u.username === username &&
        u.password === password
    );

    if (!user) {
        alert("Невірний логін або пароль");
        return;
    }

    localStorage.setItem("currentUser", username);
    window.location.href = "index.html";
}

/* ================= REGISTER ================= */

function register() {

    let username =
        document.getElementById("registerUser").value.trim();

    let password =
        document.getElementById("registerPass").value;

    if (!username || !password) {
        alert("Заповни всі поля");
        return;
    }

    if (username.length < 3) {
        alert("Логін мінімум 3 символи");
        return;
    }

    if (password.length < 4) {
        alert("Пароль мінімум 4 символи");
        return;
    }

    let users =
        JSON.parse(localStorage.getItem("users")) || [];

    let exists = users.find(u => u.username === username);

    if (exists) {
        alert("Такий користувач вже існує");
        return;
    }

    users.push({ username, password });

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", username);

    let profiles =
        JSON.parse(localStorage.getItem("profiles")) || {};

    if (!profiles[username]) {
        profiles[username] = {
            avatar: "",
            bio: "",
            banner: "",
            skills: [],
            followers: [],
            following: [],
            views: 0
        };
        localStorage.setItem("profiles", JSON.stringify(profiles));
    }

    window.location.href = "index.html";
}

/* ================= LOGOUT ================= */

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}

/* ================= CHECK AUTH ================= */

function checkAuth() {
    let user = localStorage.getItem("currentUser");
    if (!user) {
        window.location.href = "login.html";
    }
}