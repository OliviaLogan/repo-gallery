/* Profile Information */
const overview = document.querySelector(".overview");
const repoList = document.querySelector(".repo-list");
const username = "OliviaLogan"

const getProfile = async function () {
    const profileRequest = await fetch(`https://api.github.com/users/${username}`);
    const profile = await profileRequest.json();
    displayProfile(profile);
};
getProfile();


const displayProfile = function(profile) {
    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info");
    userInfo.innerHTML = `<figure>
      <img alt="user avatar" src=${profile.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${profile.name}</p>
      <p><strong>Bio:</strong> ${profile.bio}</p>
      <p><strong>Location:</strong> ${profile.location}</p>
      <p><strong>Number of public repos:</strong> ${profile.public_repos}</p>
    </div> `;
    overview.append(userInfo);
    getRepos();
};

const getRepos = async function() {
    const repoRequest = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoInfo = await repoRequest.json();
    displayRepos(repoInfo);
};
getRepos();

const displayRepos = function(repos) {
    for (const repo of repos) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    }
};