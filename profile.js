let currentUser = localStorage.getItem("currentUser");

if (!currentUser) {
    currentUser = "Marta";
    localStorage.setItem("currentUser", "Marta");
}

let projects = JSON.parse(localStorage.getItem("projects")) || [];
let profiles = JSON.parse(localStorage.getItem("profiles")) || {};

/* ---------------- PROFILE ---------------- */
let profile = profiles[currentUser] || {
    avatar: "",
    bio: ""
};

/* ---------------- INIT UI ---------------- */
document.getElementById("usernameDisplay").innerText = currentUser || "Marta";

document.getElementById("avatarImg").src =
    profile.avatar || "https://via.placeholder.com/240";
    let headerAvatar = document.getElementById("headerAvatar");

if (headerAvatar && profile.avatar) {
    headerAvatar.src = profile.avatar;
}

document.getElementById("bioText").innerText =
    profile.bio || "No bio yet";

/* ---------------- EDIT PROFILE ---------------- */
function toggleEdit() {
    let box = document.getElementById("editBox");
    if (!box) return;

    box.style.display = box.style.display === "none" ? "block" : "none";

    document.getElementById("avatarInput").value = profile.avatar || "";
    document.getElementById("bioInput").value = profile.bio || "";
}

function saveProfile() {

    let file =
        document.getElementById("avatarInput").files[0];

    let bio =
        document.getElementById("bioInput").value;

    let headerAvatar =
        document.getElementById("headerAvatar");

    if (file) {

        let reader = new FileReader();

        reader.onload = function(e) {

            profiles[currentUser] = {
                avatar: e.target.result,
                bio: bio
            };

            localStorage.setItem(
                "profiles",
                JSON.stringify(profiles)
            );

            if (headerAvatar) {
                headerAvatar.src = e.target.result;
            }

            location.reload();
        };

        reader.readAsDataURL(file);

    } else {

        profiles[currentUser] = {
            avatar: profile.avatar || "",
            bio: bio
        };

        localStorage.setItem(
            "profiles",
            JSON.stringify(profiles)
        );

        if (headerAvatar && profile.avatar) {
            headerAvatar.src = profile.avatar;
        }

        location.reload();
    }
}

/* ---------------- PROFILE TABS ---------------- */
let profileTab = "repos";


function setProfileTab(type, btn) {

    profileTab = type;

    document.querySelectorAll(".tab").forEach(button => {
        button.classList.remove("active");
    });

    btn.classList.add("active");

    let bioText =
    document.getElementById("bioText");

if (bioText) {
    bioText.innerText = profile.bio;
}

    renderProfile();
}
/* ---------------- RENDER PROFILE ---------------- */
 function renderProfile()
{
   
    let container = document.getElementById("myProjects");
    if (!container) return;

    container.innerHTML = "";

    let my = projects.filter(p => p.author === currentUser);

    if (profileTab === "repos") {

        if (my.length === 0) {
            container.innerHTML = '<div class="empty-box">Ще немає репозиторіїв</div>';
            return;
        }

        my.forEach(p => {
            let div = document.createElement("div");
            div.className = "project";
            div.innerHTML = `
                <h3>${p.name}</h3>
                <p>${p.desc}</p>

               <button class="code-btn" onclick="openPreview('${p.name}')">
    Run Project
</button>

                <small>🏷 ${p.category || "—"} &nbsp; ❤️ ${p.likes || 0} &nbsp; 📅 ${p.date}</small>
            `;
            container.appendChild(div);
        });
    }

    if (profileTab === "stars") {

        let liked = projects.filter(p =>
            p.likedUsers?.includes(currentUser)
        );

        if (liked.length === 0) {
            container.innerHTML = '<div class="empty-box">Ще немає зірочок</div>';
            return;
        }

        liked.forEach(p => {
            let div = document.createElement("div");
            div.className = "project";
           div.innerHTML = `
           <h3>${p.name}</h3>
           <p>${p.desc}</p>

           <button class="code-btn" onclick="openPreview('${p.name}')">
           Run Project
           </button>

           <button class="delete-btn" onclick="deleteProject(${p.id})">
           Delete
           </button>
                <small>⭐ ${p.likes || 0}</small>
            `;
            container.appendChild(div);
        });
    }

  if (profileTab === "activity") {

    container.innerHTML = `

    <div class="activity-feed">

        <div class="activity-card">

            <div class="activity-icon">
                🚀
            </div>

            <div class="activity-content">

                <div class="activity-title">
                    Created new repository
                </div>

                <div class="activity-text">
                    Published project <b>CodeNest</b>
                </div>

                <div class="activity-time">
                    2 hours ago
                </div>

            </div>

        </div>

        <div class="activity-card">

            <div class="activity-icon">
                ⭐
            </div>

            <div class="activity-content">

                <div class="activity-title">
                    Received new like
                </div>

                <div class="activity-text">
                    Someone liked your repository
                </div>

                <div class="activity-time">
                    Yesterday
                </div>

            </div>

        </div>

        <div class="activity-card">

            <div class="activity-icon">
                💻
            </div>

            <div class="activity-content">

                <div class="activity-title">
                    Updated profile
                </div>

                <div class="activity-text">
                    Added new skills and updated bio
                </div>

                <div class="activity-time">
                    3 days ago
                </div>

            </div>

        </div>

    </div>

    `;

    return;
}

    
      if (profileTab === "about") {

    container.innerHTML = `

    <div class="about-card">

        <div class="about-grid">

            <div class="about-item">
                <div class="about-label">
                    Username
                </div>

                <div class="about-value">
                    ${currentUser}
                </div>
            </div>

            <div class="about-item">
                <div class="about-label">
                    Bio
                </div>

                <div class="about-value">
                    ${profile.bio || "No bio yet"}
                </div>
            </div>

            <div class="about-item">
                <div class="about-label">
                    Rank
                </div>

                <div class="about-value">
                    Beginner Developer
                </div>
            </div>

            <div class="about-item">
                <div class="about-label">
                    Favorite Stack
                </div>

                <div class="about-value">
                    HTML • CSS • JavaScript
                </div>
            </div>

            <div class="about-item">
                <div class="about-label">
                    Status
                </div>

                <div class="about-value">
                    Active
                </div>
            </div>

            <div class="about-item">
                <div class="about-label">
                    Projects
                </div>

                <div class="about-value">
                    ${my.length}
                </div>
            </div>

        </div>

    </div>

    `;
}
}

/* ---------------- ACTIVITY ---------------- */
function renderActivity() {

    let grid = document.getElementById("activityGrid");

    if (!grid) return;

    grid.innerHTML = "";

    let myProjects =
        projects.filter(
            p => p.author === currentUser
        );

    for (let i = 0; i < 140; i++) {

        let cell =
            document.createElement("div");

        cell.className = "activity-cell";

        if (i < myProjects.length * 8) {
            cell.classList.add("active");
        }

        grid.appendChild(cell);
    }
}


/* ---------------- INIT ---------------- */
renderProfile();
renderActivity();
loadStats();


renderPinned();

/* ================= RANK ================= */

function updateRank() {

    let myProjects =
        projects.filter(p => p.author === currentUser);

    let rank = "Beginner";

    if (myProjects.length >= 3) {
        rank = "Junior Dev";
    }

    if (myProjects.length >= 10) {
        rank = "Pro Coder";
    }

    if (myProjects.length >= 20) {
        rank = "Fullstack Wizard";
    }

    document.getElementById("rankText").innerText = rank;
}

updateRank();

/* ================= CONTRIBUTIONS ================= */

function updateContributions() {

    let myProjects =
        projects.filter(p => p.author === currentUser);

    document.getElementById("contribCount")
        .innerText = myProjects.length * 4;
}

updateContributions();

/* ================= PINNED ================= */

function renderPinned() {

    let container =
        document.getElementById("pinnedProjects");

    if (!container) return;

    container.innerHTML = "";

    let myProjects = projects
        .filter(p => p.author === currentUser)
        .slice(0, 4);

    myProjects.forEach(p => {

        let div = document.createElement("div");

        div.className = "project";

        div.innerHTML = `
            <h3>${p.name}</h3>
            <p>${p.desc}</p>
        `;

        container.appendChild(div);
    });
}

renderPinned();

/* ================= BANNER ================= */

function loadBanner() {

    let profiles =
        JSON.parse(localStorage.getItem("profiles")) || {};

    let profile = profiles[currentUser];

    if (profile?.banner) {

        document.getElementById("profileBanner")
            .style.backgroundImage =
            `url(${profile.banner})`;

        document.getElementById("profileBanner")
            .style.backgroundSize = "cover";

        document.getElementById("profileBanner")
            .style.backgroundPosition = "center";
    }
}

loadBanner();

function changeBanner() {

    let url = prompt("Banner image URL");

    if (!url) return;

    let profiles =
        JSON.parse(localStorage.getItem("profiles")) || {};

    if (!profiles[currentUser]) {

        profiles[currentUser] = {};
    }

    profiles[currentUser].banner = url;

    localStorage.setItem(
        "profiles",
        JSON.stringify(profiles)
    );

    loadBanner();
}

/* ================= SKILLS ================= */
function loadSkills() {
    let list = document.getElementById("skillsList");

    if (!list) return;

    let skills = JSON.parse(localStorage.getItem("skills")) || [];

    list.innerHTML = "";

    skills.forEach(skill => {
        let span = document.createElement("span");
        span.innerText = skill;
        list.appendChild(span);
    });
}

loadSkills();

function addSkill() {
    let input = document.getElementById("skillInput");
    let list = document.getElementById("skillsList");

    if (!input || !list) return;

    let skill = input.value.trim();

    if (skill === "") return;

    let skills = JSON.parse(localStorage.getItem("skills")) || [];

    skills.push(skill);

    localStorage.setItem("skills", JSON.stringify(skills));

    input.value = "";

    loadSkills();
}

/* ================= STATS ================= */

function loadStats() {

    let myProjects =
        projects.filter(p => p.author === currentUser);

    /* TOTAL PROJECTS */

    document.getElementById(
        "totalProjectsStat"
    ).innerText = myProjects.length;

    /* TOTAL LIKES */

    let likes = 0;

    myProjects.forEach(p => {
        likes += p.likes || 0;
    });

    document.getElementById(
        "totalLikesStat"
    ).innerText = likes;

    /* TOP LANGUAGE */

    let langs = {
        HTML: 0,
        CSS: 0,
        JS: 0
    };

    myProjects.forEach(p => {

        if (langs[p.category] !== undefined) {
            langs[p.category]++;
        }
    });

    let top = "HTML";

    let max = 0;

    for (let key in langs) {

        if (langs[key] > max) {

            max = langs[key];

            top = key;
        }
    }

    document.getElementById(
        "topLangStat"
    ).innerText = top;

    /* PROFILE VIEWS */

    let profiles =
        JSON.parse(localStorage.getItem("profiles")) || {};

    if (!profiles[currentUser]) {

        profiles[currentUser] = {};
    }

    if (!profiles[currentUser].views) {

        profiles[currentUser].views = 0;
    }

    profiles[currentUser].views++;

    localStorage.setItem(
        "profiles",
        JSON.stringify(profiles)
    );

    document.getElementById(
        "viewsStat"
    ).innerText =
        profiles[currentUser].views;
}

loadStats();

/* ================= RECENT ACTIVITY ================= */

function loadRecentActivity() {

    let container =
        document.getElementById("activityList");

    if (!container) return;

    container.innerHTML = "";

    let myProjects =
        projects
        .filter(p => p.author === currentUser)
        .slice()
        .reverse()
        .slice(0, 5);

    if (myProjects.length === 0) {

        container.innerHTML = `

            <div class="empty-box">

                No activity yet

            </div>
        `;

        return;
    }

    myProjects.forEach(p => {

        let div =
            document.createElement("div");

        div.className = "activity-item";

        div.innerHTML = `

            <div class="activity-dot"></div>

            <div>

                <strong>${p.name}</strong>

                <p>
                    Created new repository
                </p>

            </div>
        `;

        container.appendChild(div);
    });
}

loadRecentActivity();

// ===== PINNED REPOSITORIES =====

const pinnedProjects = [
    {
        name: "CodeNest",
        desc: "Платформа для репозиторію проєктів",
        lang: "JavaScript",
        likes: 12
    },
    {
        name: "Profile System",
        desc: "Особистий кабінет користувача",
        lang: "HTML",
        likes: 8
    },
    {
        name: "Auth System",
        desc: "Реєстрація та вхід",
        lang: "CSS",
        likes: 6
    }
];

function renderPinnedProjects() {

    const container =
        document.getElementById("pinnedProjects");

    if (!container) return;

    container.innerHTML = "";

    pinnedProjects.forEach(repo => {

        container.innerHTML += `
        
        <div class="repo-card">

            <div class="repo-top">
                <div class="repo-name">
                    📁 ${repo.name}
                </div>

                <div class="repo-public">
                    Public
                </div>
            </div>

            <div class="repo-desc">
                ${repo.desc}
            </div>

            <div class="repo-bottom">

                <div style="display:flex;align-items:center;gap:6px;">
                    <div class="lang-dot"></div>
                    ${repo.lang}
                </div>

                <div>
                    ⭐ ${repo.likes}
                </div>

            </div>

        </div>

        `;
    });
}

renderPinnedProjects();

function openCode(projectName) {

    let project = projects.find(p => p.name === projectName);

    if (!project) {
        alert("Project not found");
        return;
    }

    let previewWindow = window.open("", "_blank");

    if (!previewWindow) {
        alert("Браузер заблокував нове вікно. Дозволь pop-ups для цього сайту.");
        return;
    }

    previewWindow.document.write(project.code || "<h1>No code yet</h1>");
    previewWindow.document.close();
}

function openPreview(projectName) {

    let project = projects.find(p => p.name === projectName);

    if (!project) {
        alert("Project not found");
        return;
    }

    let modal = document.getElementById("previewModal");
    let frame = document.getElementById("previewFrame");

    modal.style.display = "flex";

    frame.srcdoc = project.code || "<h1>No code yet</h1>";
}

function closePreview() {

    let modal = document.getElementById("previewModal");
    let frame = document.getElementById("previewFrame");

    modal.style.display = "none";
    frame.srcdoc = "";
}

function loadHeaderAvatar() {

    let profiles =
        JSON.parse(localStorage.getItem("profiles")) || {};

    let currentUser =
        localStorage.getItem("currentUser");



    if (!headerAvatar) return;

    if (
        currentUser &&
        profiles[currentUser] &&
        profiles[currentUser].avatar
    ) {
        headerAvatar.src = profiles[currentUser].avatar;
    }
}

loadHeaderAvatar();

let headerAvatar = document.getElementById("headerAvatar");
let avatarMenu = document.getElementById("avatarMenu");
let avatarMenuName = document.getElementById("avatarMenuName");

if (headerAvatar) {
    let profiles = JSON.parse(localStorage.getItem("profiles")) || {};
    

    if (avatarMenuName) {
        avatarMenuName.innerText = currentUser || "Guest";
    }

    if (currentUser && profiles[currentUser]?.avatar) {
        headerAvatar.src = profiles[currentUser].avatar;
    }

    headerAvatar.onclick = function (event) {
        event.stopPropagation();

        avatarMenu.style.display =
            avatarMenu.style.display === "block"
            ? "none"
            : "block";
    };
}

document.addEventListener("click", function () {
    if (avatarMenu) {
        avatarMenu.style.display = "none";
    }
});

function toggleAvatarMenu(event) {

    event.stopPropagation();

    let menu = document.getElementById("avatarMenu");

    if (!menu) return;

    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}

document.addEventListener("click", function () {

    let menu = document.getElementById("avatarMenu");

    if (menu) {
        menu.style.display = "none";
    }
});

function toggleAvatarMenu(event) {

    event.stopPropagation();

    let menu = document.getElementById("avatarMenu");

    if (!menu) return;

    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}

let avatarImg = document.getElementById("avatarImg");

if (avatarImg && (!avatarImg.src || avatarImg.src.includes("placeholder"))) {
    avatarImg.src = "https://i.imgur.com/8Km9tLL.jpeg";
}

let savedProfiles =
    JSON.parse(localStorage.getItem("profiles")) || {};

let savedUser =
    localStorage.getItem("currentUser");

let profileAvatar =
    document.getElementById("avatarImg");

if (
    profileAvatar &&
    savedUser &&
    savedProfiles[savedUser] &&
    savedProfiles[savedUser].avatar
) {
    profileAvatar.src = savedProfiles[savedUser].avatar;
}

window.addEventListener("load", function () {

    let profiles =
        JSON.parse(localStorage.getItem("profiles")) || {};

    let currentUser =
        localStorage.getItem("currentUser");

    let avatarImg =
        document.getElementById("avatarImg");

    let usernameDisplay =
        document.getElementById("usernameDisplay");

    let bioText =
        document.getElementById("bioText");

    if (!currentUser) return;

    let profile = profiles[currentUser];

    if (usernameDisplay) {
        usernameDisplay.innerText = currentUser;
    }

    if (bioText && profile && profile.bio) {
        bioText.innerText = profile.bio;
    }

    if (avatarImg && profile && profile.avatar) {
        avatarImg.src = profile.avatar;
    }
});

let currentUser = localStorage.getItem("currentUser");

if (!currentUser) {
    currentUser = "Marta";
    localStorage.setItem("currentUser", "Marta");
}
let avatarImg = document.getElementById("avatarImg");

let profilesData =
    JSON.parse(localStorage.getItem("profiles")) || {};

if (
    avatarImg &&
    profilesData["Marta"] &&
    profilesData["Marta"].avatar
) {
    avatarImg.src = profilesData["Marta"].avatar;
}

renderActivity();

document.addEventListener("DOMContentLoaded", function () {

    let grid =
        document.getElementById("activityGrid");

    if (!grid) return;

    grid.innerHTML = "";

    for (let i = 0; i < 140; i++) {

        let cell =
            document.createElement("div");

        cell.className = "activity-cell";

        if (i < 28) {
            cell.classList.add("active");
        }

        grid.appendChild(cell);
    }
});

function forceActivityGrid() {

    let grid = document.getElementById("activityGrid");

    if (!grid) return;

    grid.innerHTML = "";

    for (let i = 0; i < 84; i++) {

        let cell = document.createElement("div");

        cell.className = "activity-cell";

        if (i < 18) {
            cell.classList.add("active");
        }

        grid.appendChild(cell);
    }
}

forceActivityGrid();

setTimeout(forceActivityGrid, 300);

function openEditProfile() {

    let newBio = prompt(
        "Enter your new bio:",
        profile.bio || ""
    );

    if (newBio !== null) {

        profile.bio = newBio;

        profiles[currentUser] = profile;

        localStorage.setItem(
            "profiles",
            JSON.stringify(profiles)
        );

        renderProfile();
    }
}