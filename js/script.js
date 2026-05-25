const DEFAULT_VERSION = "3";

let currentUser = localStorage.getItem("currentUser") || "Marta";
localStorage.setItem("currentUser", currentUser);

let defaultProjects = [

{
name:"Weather App",

desc:"Weather application UI",

author:"Marta",

category:"JavaScript",

likes:9,

fav:false,

html:`
<h1>Weather App</h1>

<input id="city"
placeholder="Enter city">

<button onclick="showWeather()">
Search
</button>

<div id="weather"></div>
`,

css:`
body{
background:#0d1117;
color:white;
font-family:Arial;
text-align:center;
padding:40px;
}

input{
padding:12px;
border-radius:10px;
border:1px solid #30363d;
background:#161b22;
color:white;
}

button{
padding:12px 18px;
background:#238636;
color:white;
border:none;
border-radius:10px;
margin-left:10px;
}

#weather{
margin-top:30px;
font-size:24px;
color:#58a6ff;
}
`,

js:`
function showWeather(){

let city=
document.getElementById(
"city"
).value;

document.getElementById(
"weather"
).innerText=

"City: " + city +
" | Temperature: 22°C";

}
`
},

{
name:"Calculator Pro",

desc:"Calculator with operations",

author:"Marta",

category:"JavaScript",

likes:15,

fav:false,

html:`
<h1>Calculator</h1>

<input id="a" placeholder="First number">

<input id="b" placeholder="Second number">

<br><br>

<button onclick="sum()">+</button>
<button onclick="minus()">-</button>
<button onclick="multiply()">×</button>
<button onclick="divide()">÷</button>

<h2 id="result"></h2>
`,

css:`
body{
font-family:Arial;
padding:30px;
text-align:center;
background:#0d1117;
color:white;
}

input{
padding:10px;
margin:5px;
border-radius:8px;
}

button{
padding:10px;
margin:5px;
border:none;
border-radius:8px;
background:#238636;
color:white;
}
`,

js:`
function sum(){

let a=Number(
document.getElementById("a").value
);

let b=Number(
document.getElementById("b").value
);

document.getElementById(
"result"
).innerText=a+b;

}

function minus(){

let a=Number(
document.getElementById("a").value
);

let b=Number(
document.getElementById("b").value
);

document.getElementById(
"result"
).innerText=a-b;

}

function multiply(){

let a=Number(
document.getElementById("a").value
);

let b=Number(
document.getElementById("b").value
);

document.getElementById(
"result"
).innerText=a*b;

}

function divide(){

let a=Number(
document.getElementById("a").value
);

let b=Number(
document.getElementById("b").value
);

if(b===0){

document.getElementById(
"result"
).innerText="Error";

return;

}

document.getElementById(
"result"
).innerText=a/b;

}
`
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
        html: "",
        css: "",
        js: ""
    });

    save();
    renderProjects();

    document.getElementById("name").value = "";
    document.getElementById("desc").value = "";
    if (document.getElementById("category")) document.getElementById("category").value = "";
    
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

document.addEventListener("DOMContentLoaded", () => {

    loadHeaderProfile();

    renderProjects();

});

    let search = document.getElementById("search");

    if (search) {
        search.addEventListener("input", function () {
            searchValue = search.value.toLowerCase();
            renderProjects();
        });
    }