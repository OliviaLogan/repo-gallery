/* Profile Information */
const overview = document.querySelector(".overview");
const username = "OliviaLogan"

const getProfile = async function () {
    const profileRequest = await fetch(`https://api.github.com/users/${username}`);
    const profile = await profileRequest.json();
    console.log(profile);
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
};