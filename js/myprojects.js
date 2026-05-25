let currentUser = localStorage.getItem("currentUser");
let projects = JSON.parse(localStorage.getItem("projects")) || [];

let container = document.getElementById("myProjects");

function renderMyProjects() {

    container.innerHTML = "";

    let my = projects.filter(p => p.author === currentUser);

    if (my.length === 0) {
        container.innerHTML = "<h3>Немає проєктів</h3>";
        return;
    }

    my.forEach((p, index) => {

        let div = document.createElement("div");
        div.className = "project";

        div.innerHTML = `
            <h3>${p.name}</h3>
            <p>${p.desc}</p>
            <p><b>Категорія:</b> ${p.category || "—"}</p>
            <p><b>Дата:</b> ${p.date}</p>

            <button onclick="openProject(${projects.indexOf(p)})">Відкрити</button>
        `;

        container.appendChild(div);
    });
}

function openProject(index) {
    localStorage.setItem("openProject", index);
    window.location.href = "project.html";
}

renderMyProjects();
