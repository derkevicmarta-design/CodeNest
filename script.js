let projects = JSON.parse(localStorage.getItem("projects")) || [];
let currentUser = localStorage.getItem("currentUser") || "Marta";

localStorage.setItem("currentUser", currentUser);

let currentTab = "all";
let currentSort = "new";
let searchValue = "";
let authMode = "login";

/* DEFAULT REPOSITORIES */

function addDefaultProjects() {
    if (projects.length > 0) return;

    projects = [
        {
            id: 1,
            name: "Calculator",
            desc: "Calculator with + - × ÷ operations",
            category: "JavaScript",
            author: "Marta",
            date: new Date().toLocaleDateString(),
            likes: 12,
            likedUsers: [],
            fav: false,

            html: `
<h1>Calculator</h1>

<input id="a" type="number" placeholder="First number">
<input id="b" type="number" placeholder="Second number">

<div>
    <button onclick="calc('+')">+</button>
    <button onclick="calc('-')">-</button>
    <button onclick="calc('*')">×</button>
    <button onclick="calc('/')">÷</button>
</div>

<h2 id="result">Result: —</h2>
`,

            css: `
body {
    font-family: Arial;
    background: #0d1117;
    color: white;
    text-align: center;
    padding: 40px;
}

input {
    padding: 10px;
    margin: 6px;
    border-radius: 8px;
    border: 1px solid #30363d;
}

button {
    padding: 10px 15px;
    margin: 5px;
    background: #238636;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

h1 {
    color: #58a6ff;
}
`,

            js: `
function calc(operator) {
    let a = Number(document.getElementById("a").value);
    let b = Number(document.getElementById("b").value);
    let result;

    if (operator === "+") result = a + b;
    if (operator === "-") result = a - b;
    if (operator === "*") result = a * b;
    if (operator === "/") result = b === 0 ? "Error" : a / b;

    document.getElementById("result").innerText = "Result: " + result;
}
`
        },

        {
            id: 2,
            name: "To-Do List",
            desc: "Task manager for daily tasks",
            category: "JavaScript",
            author: "Marta",
            date: new Date().toLocaleDateString(),
            likes: 8,
            likedUsers: [],
            fav: false,

            html: `
<h1>To-Do List</h1>

<input id="taskInput" placeholder="Enter task...">
<button onclick="addTask()">Add</button>

<ul id="taskList"></ul>
`,

            css: `
body {
    font-family: Arial;
    background: #0d1117;
    color: white;
    text-align: center;
    padding: 40px;
}

input {
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #30363d;
}

button {
    padding: 10px 14px;
    background: #238636;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
}

li {
    list-style: none;
    background: #161b22;
    margin: 8px auto;
    padding: 10px;
    width: 260px;
    border-radius: 8px;
}
`,

            js: `
function addTask() {
    let input = document.getElementById("taskInput");
    let text = input.value.trim();

    if (text === "") return;

    let li = document.createElement("li");
    li.innerText = text;

    li.onclick = function () {
        li.remove();
    };

    document.getElementById("taskList").appendChild(li);
    input.value = "";
}
`
        },

        {
            id: 3,
            name: "Notes App",
            desc: "Mini app for creating notes",
            category: "JavaScript",
            author: "Marta",
            date: new Date().toLocaleDateString(),
            likes: 5,
            likedUsers: [],
            fav: false,

            html: `
<h1>Notes App</h1>

<textarea id="noteText" placeholder="Write your note..."></textarea>

<br>

<button onclick="addNote()">Add Note</button>

<div id="notes"></div>
`,

            css: `
body {
    font-family: Arial;
    background: #0d1117;
    color: white;
    padding: 40px;
}

textarea {
    width: 300px;
    height: 90px;
    background: #161b22;
    color: white;
    border: 1px solid #30363d;
    border-radius: 10px;
    padding: 10px;
}

button {
    margin-top: 10px;
    padding: 10px 14px;
    background: #238636;
    color: white;
    border: none;
    border-radius: 8px;
}

.note {
    margin-top: 12px;
    padding: 12px;
    background: #161b22;
    border-radius: 10px;
}
`,

            js: `
function addNote() {
    let text = document.getElementById("noteText").value.trim();

    if (text === "") return;

    let div = document.createElement("div");
    div.className = "note";
    div.innerText = text;

    document.getElementById("notes").appendChild(div);
    document.getElementById("noteText").value = "";
}
`
        },

        {
            id: 4,
            name: "Weather Card",
            desc: "Modern weather interface",
            category: "HTML",
            author: "Marta",
            date: new Date().toLocaleDateString(),
            likes: 6,
            likedUsers: [],
            fav: false,

            html: `
<div class="card">
    <h1>Ivano-Frankivsk</h1>
    <h2>18°C</h2>
    <p>Cloudy • Wind 8 km/h</p>
</div>
`,

            css: `
body {
    font-family: Arial;
    background: #0d1117;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.card {
    background: linear-gradient(135deg, #161b22, #1f6feb);
    padding: 30px;
    border-radius: 20px;
    text-align: center;
    width: 300px;
}
`,

            js: `
console.log("Weather card loaded");
`
        },

        {
            id: 5,
            name: "Portfolio Website",
            desc: "Personal portfolio website",
            category: "HTML",
            author: "Marta",
            date: new Date().toLocaleDateString(),
            likes: 7,
            likedUsers: [],
            fav: false,

            html: `
<h1>Marta</h1>
<p>Frontend Developer</p>

<button onclick="contact()">Contact me</button>
`,

            css: `
body {
    background: #0d1117;
    color: white;
    font-family: Arial;
    text-align: center;
    padding: 60px;
}

h1 {
    color: #58a6ff;
}

button {
    padding: 10px 16px;
    background: #238636;
    color: white;
    border: none;
    border-radius: 8px;
}
`,

            js: `
function contact() {
    alert("Contact form will be added soon!");
}
`
        },

        {
            id: 6,
            name: "Quiz App",
            desc: "Simple quiz application",
            category: "JavaScript",
            author: "Marta",
            date: new Date().toLocaleDateString(),
            likes: 9,
            likedUsers: [],
            fav: false,

            html: `
<h1>Quiz</h1>

<p>2 + 2 = ?</p>

<button onclick="check(4)">4</button>
<button onclick="check(5)">5</button>

<h2 id="result"></h2>
`,

            css: `
body {
    font-family: Arial;
    text-align: center;
    padding: 40px;
    background: #0d1117;
    color: white;
}

button {
    padding: 10px 18px;
    margin: 5px;
    background: #238636;
    color: white;
    border: none;
    border-radius: 8px;
}
`,

            js: `
function check(answer) {
    if (answer === 4) {
        document.getElementById("result").innerText = "Correct";
    } else {
        document.getElementById("result").innerText = "Wrong";
    }
}
`
        }
    ];

    localStorage.setItem("projects", JSON.stringify(projects));
}

/* INIT */

window.onload = function () {
    addDefaultProjects();
    loadHeaderProfile();
    renderProjects();
    updateCount();

    let search = document.getElementById("search");

    if (search) {
        search.addEventListener("input", function (e) {
            searchValue = e.target.value.toLowerCase();
            renderProjects();
        });
    }
};

/* ADD PROJECT */

function addProject() {
    let name = document.getElementById("name").value;
    let desc = document.getElementById("desc").value;
    let category = document.getElementById("category")?.value || "";
    let code = document.getElementById("code")?.value || "";

    if (!name || !desc) return;

    projects.push({
        id: Date.now(),
        name: name,
        desc: desc,
        category: category,
        author: currentUser,
        date: new Date().toLocaleDateString(),
        likes: 0,
        likedUsers: [],
        fav: false,
        html: code,
        css: "",
        js: "",
        readme: ""
    });

    save();

    document.getElementById("name").value = "";
    document.getElementById("desc").value = "";

    if (document.getElementById("category")) {
        document.getElementById("category").value = "";
    }

    if (document.getElementById("code")) {
        document.getElementById("code").value = "";
    }

    renderProjects();
}

/* RENDER PROJECTS */

function renderProjects() {
    let container = document.getElementById("projects");

    if (!container) return;

    container.innerHTML = "";

    let list = [...projects];

    if (currentTab === "fav") {
        list = list.filter(p => p.fav);
    }

    if (currentSort === "new") {
        list = list.slice().reverse();
    }

    if (searchValue) {
        list = list.filter(p =>
            p.name.toLowerCase().includes(searchValue) ||
            p.desc.toLowerCase().includes(searchValue) ||
            p.author.toLowerCase().includes(searchValue)
        );
    }

    if (list.length === 0) {
        container.innerHTML = `
            <div class="empty-box">
                Репозиторії не знайдені
            </div>
        `;
        return;
    }

    list.forEach(function (p) {
        let index = projects.indexOf(p);

        container.innerHTML += `
            <div class="project">

                <h3>${p.name}</h3>

                <p>${p.desc}</p>

                <div class="project-actions">

                    <button onclick="openModal(${index})" class="open-btn">
                        Відкрити
                    </button>

                    <button onclick="likeProject(${index})" class="like-btn ${p.likedUsers?.includes(currentUser) ? "liked" : ""}">
                        ${p.likedUsers?.includes(currentUser) ? "Liked" : "Like"}
                    </button>

                    <button onclick="toggleFav(${index})" class="fav-btn ${p.fav ? "active" : ""}">
                        ${p.fav ? "Saved" : "Save"}
                    </button>

                    <button onclick="deleteProject(${index})" class="main-delete-btn">
                        Видалити
                    </button>

                </div>

                <div class="project-meta">
                    <span>👤 ${p.author}</span>
                    <span>📅 ${p.date || "—"}</span>
                    <span>🏷 ${p.category || "—"}</span>
                    <span>❤️ ${p.likes || 0}</span>
                </div>

            </div>
        `;
    });

    updateCount();
}

/* ACTIONS */

function openModal(index) {
    localStorage.setItem("openProject", index);
    window.location.href = "project.html";
}

function deleteProject(index) {
    let agree = confirm("Видалити цей репозиторій?");

    if (!agree) return;

    projects.splice(index, 1);
    save();
    renderProjects();
}

function likeProject(index) {
    let project = projects[index];

    if (!project.likedUsers) {
        project.likedUsers = [];
    }

    if (project.likedUsers.includes(currentUser)) {
        project.likedUsers = project.likedUsers.filter(user => user !== currentUser);
        project.likes = Math.max((project.likes || 1) - 1, 0);
    } else {
        project.likedUsers.push(currentUser);
        project.likes = (project.likes || 0) + 1;
    }

    save();
    renderProjects();
}

function toggleFav(index) {
    projects[index].fav = !projects[index].fav;
    save();
    renderProjects();
}

/* FILTERS */

function setTab(type, btn) {
    currentTab = type;

    document.querySelectorAll(".filter-btn").forEach(function (b) {
        b.classList.remove("active");
    });

    if (btn) {
        btn.classList.add("active");
    }

    renderProjects();
}

function setSort(type) {
    currentSort = type;
    renderProjects();
}

function clearSearch() {
    let search = document.getElementById("search");

    if (search) {
        search.value = "";
    }

    searchValue = "";
    renderProjects();
}

/* SAVE */

function save() {
    localStorage.setItem("projects", JSON.stringify(projects));
}

/* COUNT */

function updateCount() {
    let count = document.getElementById("count");

    if (count) {
        count.textContent = projects.length;
    }
}

/* AUTH */

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}

/* MENU */

function toggleMenu() {
    let menu = document.getElementById("dropdownMenu");

    if (!menu) return;

    menu.style.display =
        menu.style.display === "block" ? "none" : "block";
}

function goProfile() {
    window.location.href = "profile.html";
}

/* HEADER */

function loadHeaderProfile() {
    currentUser = localStorage.getItem("currentUser") || "Marta";

    let avatar = document.getElementById("headerAvatar");
    let username = document.getElementById("menuUsername");

    if (username) {
        username.innerText = currentUser;
    }

    if (avatar) {
        avatar.src = "https://derkevicmarta-design.github.io/CodeNest/images/avatar.jpg";
    }
}