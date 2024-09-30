/* Profile Information */
const overview = document.querySelector(".overview");
const repoList = document.querySelector(".repo-list");
const allRepos = document.querySelector(".repos");
const showRepoInfo = document.querySelector(".repo-data");
const button = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");
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
        const repoTitle = document.createElement("li");
        repoTitle.classList.add("repo");
        repoTitle.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoTitle);
        filterInput.classList.remove("hide");
    }
};

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        specificRepoInfo(repoName);
    }
});

const specificRepoInfo = async function (repoName) {
    const specificRepoRequest = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const specificRepoInfo = await specificRepoRequest.json();
    console.log(specificRepoInfo);
    const fetchLanguages = await fetch(`https://api.github.com/repos/${username}/${repoName}/languages`);
    const languageInfo = await fetchLanguages.json();
    console.log(languageInfo);
    let languages = [];
    for (const key in languageInfo) {
        languages.push(key);
    };
    console.log(languages);
    displayRepoInfo(specificRepoInfo, languages);
};

const displayRepoInfo = function(specificRepoInfo, languages) {
    showRepoInfo.innerHTML = "";
    const repoInfoDiv = document.createElement("div");
    repoInfoDiv.innerHTML = `<h3>Name: ${specificRepoInfo.name}</h3>
    <p>Description: ${specificRepoInfo.description}</p>
    <p>Default Branch: ${specificRepoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${specificRepoInfo.svn_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    showRepoInfo.append(repoInfoDiv);
    showRepoInfo.classList.remove("hide");
    allRepos.classList.add("hide");
    button.classList.remove("hide");
};

button.addEventListener("click", function() {
    allRepos.classList.remove("hide");
    showRepoInfo.classList.add("hide");
    button.classList.add("hide");
});

filterInput.addEventListener("input", function (e) {
    const inputValue = e.target.value;
    const searchText = inputValue.toLowerCase();
    const repos = document.querySelectorAll(".repo");
    for (const repo of repos) {
        const repoValue = repo.innerText.toLowerCase();
        if (repoValue.includes(searchText)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }; 
}); 

