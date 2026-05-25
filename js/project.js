let index = localStorage.getItem("openProject");
let projects = JSON.parse(localStorage.getItem("projects")) || [];

let project = projects[index];

if (!project) {
    document.body.innerHTML = "<h1>Проєкт не знайдено</h1>";
}

function el(id) {
    return document.getElementById(id);
}

if (project) {

    el("title").innerText = project.name;
    el("desc").innerText = project.desc;

    el("html").value = project.html || "";
    el("css").value = project.css || "";
    el("js").value = project.js || "";
}

function switchFile(file, btn) {

    document.querySelectorAll(".code")
    .forEach(area => {
        area.style.display = "none";
    });

    el(file).style.display = "block";

    document.querySelectorAll(".file-tab")
    .forEach(tab => {
        tab.classList.remove("active");
    });

    btn.classList.add("active");
}

function updatePreview() {

    let html = el("html").value;
    let css = el("css").value;
    let js = el("js").value;

    el("preview").srcdoc = `

<html>

<head>

<style>

${css}

</style>

</head>

<body>

${html}

<script>

${js}

<\/script>

</body>

</html>

`;
}

function saveProject() {

    projects[index].html =
    el("html").value;

    projects[index].css =
    el("css").value;

    projects[index].js =
    el("js").value;

    localStorage.setItem(
        "projects",
        JSON.stringify(projects)
    );

    alert("Saved");
}

function autoSave(){

saveProject();

}

el("html").addEventListener(
"input",
autoSave
);

el("css").addEventListener(
"input",
autoSave
);

el("js").addEventListener(
"input",
autoSave
);

function goBack(){

window.location.href=
"index.html";

}

updatePreview();