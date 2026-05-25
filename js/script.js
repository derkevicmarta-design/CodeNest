let defaultProjects = [
    {
        name: "Calculator",
        desc: "Simple calculator",
        author: "Marta",
        category: "JavaScript",
        likes: 12,
        html: `
<h1>Calculator</h1>
<input id="a" placeholder="First number">
<input id="b" placeholder="Second number">
<button onclick="sum()">+</button>
<div id="result"></div>
`,
        css: `
body {
    font-family: Arial;
    padding: 30px;
}
`,
        js: `
function sum() {
    let a = Number(document.getElementById("a").value);
    let b = Number(document.getElementById("b").value);
    document.getElementById("result").innerText = a + b;
}
`
    },
    {
        name: "To-Do List",
        desc: "Task manager",
        author: "Marta",
        category: "JavaScript",
        likes: 8,
        html: `
<h1>To-Do List</h1>
<input id="task" placeholder="New task">
<button onclick="addTask()">Add</button>
<ul id="list"></ul>
`,
        css: `
body {
    font-family: Arial;
    padding: 30px;
}
li {
    margin: 8px 0;
}
`,
        js: `
function addTask() {
    let task = document.getElementById("task").value;
    let li = document.createElement("li");
    li.innerText = task;
    document.getElementById("list").appendChild(li);
}
`
    }
];

if (!localStorage.getItem("projects")) {
    localStorage.setItem("projects", JSON.stringify(defaultProjects));
}

let projects =
JSON.parse(
localStorage.getItem("projects")
) || [];

let currentUser =
localStorage.getItem("currentUser")
|| "Marta";


if(projects.length===0){

projects=[

{
name:"Calculator",
desc:"Simple calculator",
author:"Marta",
category:"JavaScript",
likes:12,
fav:false,
html:"",
css:"",
js:""
},

{
name:"To-Do List",
desc:"Task manager",
author:"Marta",
category:"JavaScript",
likes:8,
fav:false,
html:"",
css:"",
js:""
},

{
name:"Notes App",
desc:"Notes application",
author:"Marta",
category:"JavaScript",
likes:5,
fav:false,
html:"",
css:"",
js:""
}

];

save();

}


function save(){

localStorage.setItem(
"projects",
JSON.stringify(projects)
);

}


function renderProjects(){

let container=
document.getElementById(
"projects"
);

if(!container) return;

container.innerHTML="";

projects.forEach((p,index)=>{

container.innerHTML +=`

<div class="project">

<h3>
${p.name}
</h3>

<p>
${p.desc}
</p>

<p>
${p.category}
</p>

<button
onclick=
"openModal(${index})"
>

Open

</button>

<button
onclick=
"likeProject(${index})"
>

❤️ ${p.likes||0}

</button>

</div>

`;

});

}


function addProject(){

let name=
document.getElementById(
"name"
)?.value;

let desc=
document.getElementById(
"desc"
)?.value;

let category=
document.getElementById(
"category"
)?.value;

let code=
document.getElementById(
"code"
)?.value;


if(!name||!desc){

alert(
"Fill all fields"
);

return;

}


projects.push({

name:name,
desc:desc,
category:category,
author:currentUser,
likes:0,

html:code,
css:"",
js:""

});


save();

renderProjects();

}


function openModal(index){

localStorage.setItem(
"openProject",
index
);

window.location.href=
"project.html";

}


function likeProject(index){

projects[index].likes++;

save();

renderProjects();

}


function clearSearch(){

let search=
document.getElementById(
"search"
);

if(!search) return;

search.value="";

renderProjects();

}


function logout(){

localStorage.removeItem(
"currentUser"
);

window.location.href=
"login.html";

}


function loadHeaderProfile(){

let username=
document.getElementById(
"menuUsername"
);

if(username){

username.innerText=
currentUser;

}

}


window.onload=function(){

loadHeaderProfile();

renderProjects();

};