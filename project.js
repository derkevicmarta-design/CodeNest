let currentUser = localStorage.getItem("currentUser");

let index = localStorage.getItem("openProject");
let projects = JSON.parse(localStorage.getItem("projects")) || [];

let p = projects[index];

if (!p) {
    document.body.innerHTML = "<h1>Проєкт не знайдено</h1>";
    throw new Error("Project not found");
}

/* ---------------- SAFE GET ---------------- */
function el(id) {
    return document.getElementById(id);
}

/* ---------------- LOAD DATA ---------------- */
if (el("title")) el("title").innerText = p.name;
if (el("desc")) el("desc").innerText = p.desc;
if (el("author")) el("author").innerText = p.author;
if (el("date")) el("date").innerText = p.date;
if (el("category")) el("category").innerText = p.category || "—";

/* CODE FIELDS */
if (el("html")) el("html").value = p.html || "";
if (el("css")) el("css").value = p.css || "";
if (el("js")) el("js").value = p.js || "";
if (el("readme")) {
    el("readme").value = p.readme || "";
}


/* ---------------- SAVE ---------------- */
function autoSave() {
    let projects = JSON.parse(localStorage.getItem("projects")) || [];

    if (!projects[index]) return;

    projects[index].html = el("html")?.value || "";
    projects[index].css = el("css")?.value || "";
    projects[index].js = el("js")?.value || "";
    projects[index].readme =
    el("readme")?.value || "";


    localStorage.setItem("projects", JSON.stringify(projects));
}

/* ---------------- EDITOR EVENTS ---------------- */
function bindEditors() {
    ["html", "css", "js"].forEach(id => {
        if (el(id)) {
            el(id).addEventListener("input", () => {
                autoSave();
                updatePreview();
            });
        }
    });
}

bindEditors();

/* ---------------- LIVE PREVIEW ---------------- */
function updatePreview() {
    let html = el("html")?.value || "";
    let css = el("css")?.value || "";
    let js = el("js")?.value || "";

    let iframe = el("preview");
    if (!iframe) return;

    iframe.srcdoc = `
        <html>
        <head>
            <style>${css}</style>
        </head>
        <body>
            ${html}
            <script>${js}<\/script>
        </body>
        </html>
    `;
}

updatePreview();

/* ---------------- BACK ---------------- */
function goBack() {
    window.location.href = "index.html";
}

/* ---------------- SAVE BUTTON ---------------- */
function saveProject() {
    let projects = JSON.parse(localStorage.getItem("projects")) || [];

    if (!projects[index]) return;

    projects[index].html = el("html")?.value || "";
    projects[index].css = el("css")?.value || "";
    projects[index].js = el("js")?.value || "";
    projects[index].readme = el("readme")?.value || "";

    localStorage.setItem("projects", JSON.stringify(projects));

    alert("Збережено!");
}

/* ---------------- COMMENTS ---------------- */
function addComment() {
    let text = el("commentText")?.value;
    if (!text) return;

    if (!p.comments) p.comments = [];

    p.comments.push({
        user: currentUser || "Guest",
        text: text,
        date: new Date().toLocaleDateString()
    });

    localStorage.setItem("projects", JSON.stringify(projects));

    if (el("commentText")) el("commentText").value = "";

    renderComments();
}

function renderComments() {
    let list = el("commentsList");
    if (!list) return;

    list.innerHTML = "";

    let comments = p.comments || [];

    [...comments].reverse().forEach(c => {
        let div = document.createElement("div");
        div.className = "project";

        div.innerHTML = `
            <h4>${c.user}</h4>
            <p>${c.text}</p>
            <small>${c.date}</small>
        `;

        list.appendChild(div);
    });
}

renderComments();

/* ---------------- FILE SWITCH (TERMINAL STYLE) ---------------- */
let currentFile = "html";

function switchFile(file) {
    currentFile = file;

    document.querySelectorAll(".code").forEach(el => {
        el.style.display = "none";
    });

    let active = document.getElementById(file);
    if (active) active.style.display = "block";

    document.querySelectorAll(".file-tab").forEach(btn => {
        btn.classList.remove("active");
    });

    if (event?.target) {
        event.target.classList.add("active");
    }
}

/* INIT */
switchFile("html");

function togglePreview() {

    let preview =
        document.getElementById("preview");

    if (
        preview.style.display === "none" ||
        preview.style.display === ""
    ) {

        preview.style.display = "block";

        runCode();

    } else {

        preview.style.display = "none";
    }
}