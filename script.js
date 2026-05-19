let projects = JSON.parse(localStorage.getItem("projects")) || [];

/* ================= USER ================= */

let currentUser = localStorage.getItem("currentUser");

/* ================= STATE ================= */

let currentTab = "all";
let currentSort = "new";
let searchValue = "";
let authMode = "login";

/* ================= INIT ================= */

window.onload = function () {

    loadHeaderProfile();

    renderProjects();

    updateCount();

    updateHomeStats();

    let search = document.getElementById("search");

    if (search) {

        search.addEventListener("input", function (e) {

            searchValue = e.target.value.toLowerCase();

            renderProjects();
        });
    }
};

/* ================= ADD PROJECT ================= */

function addProject() {

    if (!currentUser) {

        alert("Login first");

        openAuth("login");

        return;
    }

    let name = document.getElementById("name").value;

    let desc = document.getElementById("desc").value;

    let code = document.getElementById("code")?.value || "";

    let category =
        document.getElementById("category")?.value || "";

    if (!name || !desc) return;

    projects.push({

        id: Date.now(),

        name: name,

        desc: desc,

        code: code,

        author: currentUser,

        category: category,

        date: new Date().toLocaleDateString(),

        fav: false,

        likes: 0,

        likedUsers: [],

        html: "",

        css: "",

        js: ""
    });

    save();

    document.getElementById("name").value = "";

    document.getElementById("desc").value = "";

    if (document.getElementById("code")) {

        document.getElementById("code").value = "";
    }

    if (document.getElementById("category")) {

        document.getElementById("category").value = "";
    }

    renderProjects();
}

/* ================= RENDER PROJECTS ================= */

function renderProjects() {

    let container = document.getElementById("projects");

    if (!container) return;

    container.innerHTML = "";

    let list = [...projects];

    if (currentSort === "new") {
        list = list.slice().reverse();
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

<button onclick="editProject(${index})" class="edit-repo-btn">
    Edit
</button>

    <button onclick="deleteProject(${index})" class="main-delete-btn">
        Видалити
    </button>

</div>

                <div class="project-meta">
                    <span>👤 ${p.author}</span>
                    <span>📅 ${p.date}</span>
                    <span>🏷 ${p.category || "—"}</span>
                    ❤️ ${p.likes || 0}

                    <button onclick="likeProject(${index})" class="like-btn">
                    ❤️ Like
                    </button>
                </div>

            </div>
        `;
    });

    updateCount();
}dateCount();


/* ================= DELETE PROJECT ================= */

function deleteProject(index) {

    let agree = confirm("Видалити цей репозиторій?");

    if (!agree) return;

    projects.splice(index, 1);

    localStorage.setItem("projects", JSON.stringify(projects));

    renderProjects();

    updateCount();
}

/* ================= FILTERS ================= */

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

/* ================= SAVE ================= */

function save() {

    localStorage.setItem("projects", JSON.stringify(projects));
}

/* ================= COUNT ================= */

function updateCount() {

    let count = document.getElementById("count");

    if (count) {

        count.textContent = projects.length;
    }
}

/* ================= OPEN PROJECT ================= */

function openModal(index) {

    localStorage.setItem("openProject", index);

    window.open("project.html", "_blank");
}

/* ================= AUTH ================= */

function openAuth(type) {

    authMode = type;

    let modal = document.getElementById("authModal");

    if (modal) {

        modal.style.display = "flex";
    }

    let title = document.getElementById("authTitle");

    if (title) {

        title.innerText =
            type === "login"
            ? "Login"
            : "Register";
    }
}

function closeAuth() {

    let modal = document.getElementById("authModal");

    if (modal) {

        modal.style.display = "none";
    }
}

function submitAuth() {

    let username =
        document.getElementById("authUser").value;

    let password =
        document.getElementById("authPass").value;

    if (!username || !password) {

        alert("Fill all fields");

        return;
    }

    let users =
        JSON.parse(localStorage.getItem("users")) || [];

    if (authMode === "register") {

        let exists = users.find(function (u) {

            return u.username === username;
        });

        if (exists) {

            alert("User already exists");

            return;
        }

        users.push({

            username: username,

            password: password
        });

        localStorage.setItem("users", JSON.stringify(users));

        localStorage.setItem("currentUser", username);

        alert("Account created");

        location.reload();
    }

    if (authMode === "login") {

        let user = users.find(function (u) {

            return (
                u.username === username &&
                u.password === password
            );
        });

        if (!user) {

            alert("Wrong login");

            return;
        }

        localStorage.setItem("currentUser", username);

        alert("Logged in");

        location.reload();
    }

    closeAuth();
}

/* ================= LOGOUT ================= */

function logout() {

    localStorage.removeItem("currentUser");

    window.location.href = "login.html";
}

/* ================= MENU ================= */

function toggleMenu() {

    let menu =
        document.getElementById("dropdownMenu");

    if (!menu) return;

    if (menu.style.display === "block") {

        menu.style.display = "none";

    } else {

        menu.style.display = "block";
    }
}

/* ================= CLOSE MENU ================= */

window.addEventListener("click", function (e) {

    let menu =
        document.getElementById("dropdownMenu");

    let avatar =
        document.getElementById("headerAvatar");

    if (
        menu &&
        avatar &&
        !menu.contains(e.target) &&
        e.target !== avatar
    ) {

        menu.style.display = "none";
    }
});

/* ================= PROFILE ================= */

function goProfile() {

    if (!currentUser) {

        alert("Login first");

        return;
    }

    window.location.href = "profile.html";
}

/* ================= LOAD HEADER PROFILE ================= */

function loadHeaderProfile() {

    currentUser = localStorage.getItem("currentUser");

    let profiles =
        JSON.parse(localStorage.getItem("profiles")) || {};

    let avatar =
        document.getElementById("headerAvatar");

    let username =
        document.getElementById("menuUsername");

    let profileBtn =
        document.getElementById("profileBtn");

    let loginBtn =
        document.getElementById("loginBtn");

    let registerBtn =
        document.getElementById("registerBtn");

    let logoutBtn =
        document.getElementById("logoutBtn");

    if (!avatar || !username) return;

    if (!currentUser) {

        username.innerText = "Guest";

        if (profileBtn) profileBtn.style.display = "none";

        if (logoutBtn) logoutBtn.style.display = "none";

        if (loginBtn) loginBtn.style.display = "block";

        if (registerBtn) registerBtn.style.display = "block";

       avatar.src = "https://derkevicmarta-design.github.io/CodeNest/images/avatar.jpg";

        return;
    }

    username.innerText = currentUser;

    if (profileBtn) profileBtn.style.display = "block";

    if (logoutBtn) logoutBtn.style.display = "block";

    if (loginBtn) loginBtn.style.display = "none";

    if (registerBtn) registerBtn.style.display = "none";

    let profile = profiles[currentUser];

    if (profile && profile.avatar) {

        avatar.src = profile.avatar;

    } else {

        avatar.src = "https://derkevicmarta-design.github.io/CodeNest/images/avatar.jpg";
    }
}

function likeProject(index) {

    if (!currentUser) {

        alert("Login first");

        return;
    }

    let project = projects[index];

    if (!project.likedUsers) {
        project.likedUsers = [];
    }

    if (project.likedUsers.includes(currentUser)) {

        project.likedUsers =
            project.likedUsers.filter(
                user => user !== currentUser
            );

        project.likes =
            Math.max((project.likes || 1) - 1, 0);

    } else {

        project.likedUsers.push(currentUser);

        project.likes =
            (project.likes || 0) + 1;
    }

    localStorage.setItem(
        "projects",
        JSON.stringify(projects)
    );

    renderProjects();
}

function toggleFav(index) {

    projects[index].fav = !projects[index].fav;

    localStorage.setItem("projects", JSON.stringify(projects));

    renderProjects();
}

function editProject(index) {

    let project = projects[index];

    let newName = prompt("Нова назва:", project.name);

    if (newName === null) return;

    let newDesc = prompt("Новий опис:", project.desc);

    if (newDesc === null) return;

    project.name = newName;
    project.desc = newDesc;

    localStorage.setItem("projects", JSON.stringify(projects));

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

function updateHomeStats() {

    let totalRepos = document.getElementById("totalRepos");
    let totalLikes = document.getElementById("totalLikes");
    let activeUser = document.getElementById("activeUser");

    if (totalRepos) {
        totalRepos.textContent = projects.length;
    }

    if (totalLikes) {
        totalLikes.textContent = projects.reduce((sum, p) => {
            return sum + (p.likes || 0);
        }, 0);
    }

    if (activeUser) {
        activeUser.textContent = currentUser || "Guest";
    }
}

let avatar = document.getElementById("headerAvatar");

if (avatar) {
    avatar.src = "https://derkevicmarta-design.github.io/CodeNest/images/avatar.jpg";
}