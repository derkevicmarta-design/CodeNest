let index = localStorage.getItem("openProject");
let projects = JSON.parse(localStorage.getItem("projects")) || [];

let p = projects[index];

function el(id){
return document.getElementById(id);
}

if(!p){
document.body.innerHTML="<h1>Project not found</h1>";
throw new Error();
}

el("title").innerText=p.name;
el("desc").innerText=p.desc;

el("html").value=p.html || "";
el("css").value=p.css || "";
el("js").value=p.js || "";

function switchFile(file,btn){

document.querySelectorAll(".code")
.forEach(x=>{
x.style.display="none";
});

el(file).style.display="block";

document.querySelectorAll(".file-tab")
.forEach(x=>{
x.classList.remove("active");
});

btn.classList.add("active");

}

function updatePreview(){

let html=el("html").value;
let css=el("css").value;
let js=el("js").value;

let iframe=el("preview");

iframe.srcdoc=`
<!DOCTYPE html>
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

function saveProject(){

projects[index].html=
el("html").value;

projects[index].css=
el("css").value;

projects[index].js=
el("js").value;

localStorage.setItem(
"projects",
JSON.stringify(projects)
);

alert("Saved");

}

function goBack(){

window.location.href=
"index.html";

}

switchFile(
"html",
document.querySelector(".file-tab")
);

updatePreview();

let runBtn = document.getElementById("runBtn");

if (runBtn) {
    runBtn.addEventListener("click", updatePreview);
}