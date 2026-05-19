let targetUser = localStorage.getItem("openUser");
let currentUser = localStorage.getItem("currentUser");

let projects = JSON.parse(localStorage.getItem("projects")) || [];
let profiles = JSON.parse(localStorage.getItem("profiles")) || {};

let profile = profiles[targetUser] || {
    avatar: "",
    bio: "",
    followers: [],
    following: []
};

/* LOAD */
document.getElementById("username").innerText = targetUser;
document.getElementById("avatarImg").src = profile.avatar;
document.getElementById("bioText").innerText = profile.bio;

/* FOLLOW */
function toggleFollow() {

    let me = profiles[currentUser] || {
        followers: [],
        following: []
    };

    let them = profiles[targetUser] || {
        followers: [],
        following: []
    };

    if (!me.following.includes(targetUser)) {
        me.following.push(targetUser);
        them.followers.push(currentUser);
    } else {
        me.following = me.following.filter(u => u !== targetUser);
        them.followers = them.followers.filter(u => u !== currentUser);
    }

    profiles[currentUser] = me;
    profiles[targetUser] = them;

    localStorage.setItem("profiles", JSON.stringify(profiles));

    updateStats();
}

/* STATS */
function updateStats() {

    let me = profiles[targetUser] || {
        followers: [],
        following: []
    };

    document.getElementById("followersCount").innerText = me.followers.length;
    document.getElementById("followingCount").innerText = me.following.length;
}

/* PROJECTS */
let container = document.getElementById("userProjects");

projects
    .filter(p => p.author === targetUser)
    .forEach(p => {

        let div = document.createElement("div");
        div.className = "project";

        div.innerHTML = `
            <h3>${p.name}</h3>
            <p>${p.desc}</p>
        `;

        container.appendChild(div);
    });

updateStats();
