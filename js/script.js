const DEFAULT_VERSION = "3";

let currentUser = localStorage.getItem("currentUser") || "Marta";
localStorage.setItem("currentUser", currentUser);

let defaultProjects = [
    {
        name: "Calculator",
        desc: "Simple calculator",
        author: "Marta",
        category: "JavaScript",
        likes: 12,
        fav: false,
        html: `<h1>Calculator</h1>
<input id="a" placeholder="First number">
<input id="b" placeholder="Second number">
<button onclick="sum()">+</button>
<h2 id="result"></h2>`,
        css: `body{font-family:Arial;text-align:center;padding:40px;background:#0d1117;color:white;}
input{padding:10px;margin:5px;border-radius:8px;}
button{padding:10px 15px;background:#238636;color:white;border:none;border-radius:8px;}`,
        js: `function sum(){
let a=Number(document.getElementById("a").value);
let b=Number(document.getElementById("b").value);
document.getElementById("result").innerText=a+b;
}`
    },
    {
        name: "To-Do List",
        desc: "Task manager",
        author: "Marta",
        category: "JavaScript",
        likes: 8,
        fav: false,
        html: `<h1>To-Do List</h1>
<input id="task" placeholder="New task">
<button onclick="addTask()">Add</button>
<ul id="list"></ul>`,
        css: `body{font-family:Arial;padding:40px;background:#0d1117;color:white;}
li{background:#161b22;padding:10px;margin:8px;border-radius:8px;}`,
        js: `function addTask(){
let task=document.getElementById("task").value;
if(!task)return;
let li=document.createElement("li");
li.innerText=task;
document.getElementById("list").appendChild(li);
document.getElementById("task").value="";
}`
    },
    {
        name: "Notes App",
        desc: "Mini app for notes",
        author: "Marta",
        category: "JavaScript",
        likes: 5,
        fav: false,
        html: `<h1>Notes App</h1>
<textarea id="note"></textarea>
<br>
<button onclick="addNote()">Add note</button>
<div id="notes"></div>`,
        css: `body{font-family:Arial;padding:40px;background:#0d1117;color:white;}
textarea{width:300px;height:100px;background:#161b22;color:white;border-radius:10px;padding:10px;}
.note{background:#161b22;margin-top:10px;padding:10px;border-radius:8px;}`,
        js: `function addNote(){
let text=document.getElementById("note").value;
if(!text)return;
let div=document.createElement("div");
div.className="note";
div.innerText=text;
document.getElementById("notes").appendChild(div);
document.getElementById("note").value="";
}`
    }
];

if (localStorage.getItem("projectsVersion") !== DEFAULT_VERSION) {
    localStorage.setItem("projects", JSON.stringify(defaultProjects));
    localStorage.setItem("projectsVersion", DEFAULT_VERSION);
}

let projects = JSON.parse(localStorage.getItem("projects")) || defaultProjects;
let searchValue = "";

function save() {
    localStorage.setItem("projects", JSON.stringify(projects));
}

function renderProjects() {
    let container = document.getElementById("projects");
    if (!container) return;

    container.innerHTML = "";

    let list = [...projects];

    if (searchValue) {
        list = list.filter(p =>
            p.name.toLowerCase().includes(searchValue) ||
            p.desc.toLowerCase().includes(searchValue) ||
            p.category.toLowerCase().includes(searchValue)
        );
    }

    list.forEach((p, index) => {
        container.innerHTML += `
            <div class="project">
                <h3>${p.name}</h3>
                <p>${p.desc}</p>
                <p>${p.category}</p>

                <div class="project-actions">
                    <button class="open-btn" onclick="openModal(${index})">Open</button>
                    <button class="like-btn" onclick="likeProject(${index})">❤️ ${p.likes || 0}</button>
                    <button class="main-delete-btn" onclick="deleteProject(${index})">Delete</button>
                </div>
            </div>
        `;
    });

    updateStats();
}

function addProject() {
    let name = document.getElementById("name")?.value;
    let desc = document.getElementById("desc")?.value;
    let category = document.getElementById("category")?.value || "JavaScript";
    let code = document.getElementById("code")?.value || "";

    if (!name || !desc) {
        alert("Fill all fields");
        return;
    }

    projects.push({
        name,
        desc,
        category,
        author: currentUser,
        likes: 0,
        fav: false,
        html: code,
        css: "",
        js: ""
    });

    save();
    renderProjects();

    document.getElementById("name").value = "";
    document.getElementById("desc").value = "";
    if (document.getElementById("category")) document.getElementById("category").value = "";
    if (document.getElementById("code")) document.getElementById("code").value = "";
}

function openModal(index) {
    localStorage.setItem("openProject", index);
    window.location.href = "project.html";
}

function likeProject(index) {
    projects[index].likes = (projects[index].likes || 0) + 1;
    save();
    renderProjects();
}

function deleteProject(index) {
    if (!confirm("Delete repository?")) return;
    projects.splice(index, 1);
    save();
    renderProjects();
}

function clearSearch() {
    let search = document.getElementById("search");
    if (search) search.value = "";
    searchValue = "";
    renderProjects();
}

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "login.html";
}

function toggleMenu() {
    let menu = document.getElementById("dropdownMenu");
    if (!menu) return;
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function goProfile() {
    window.location.href = "profile.html";
}

function loadHeaderProfile() {
    let username = document.getElementById("menuUsername");
    if (username) username.innerText = currentUser;

    let avatar = document.getElementById("headerAvatar");
    if (avatar) {
        avatar.src = "https://derkevicmarta-design.github.io/CodeNest/images/avatar.jpg";
    }
}

function updateStats() {
    let totalProjects = document.getElementById("totalProjects");
    let totalLikes = document.getElementById("totalLikes");
    let activeUser = document.getElementById("activeUser");

    if (totalProjects) totalProjects.innerText = projects.length;

    if (totalLikes) {
        totalLikes.innerText = projects.reduce((sum, p) => sum + (p.likes || 0), 0);
    }

    if (activeUser) activeUser.innerText = currentUser;
}

window.onload = function () {
    loadHeaderProfile();
    renderProjects();

    let search = document.getElementById("search");

    if (search) {
        search.addEventListener("input", function () {
            searchValue = search.value.toLowerCase();
            renderProjects();
        });
    }
};