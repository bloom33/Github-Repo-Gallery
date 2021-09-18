//where profile info will appear//
const profile = document.querySelector(".overview");
//username//
const username = "bloom33";
//repo list//
const repoList = document.querySelector(".repo-list");

//async function fetching profile info with API//
const getProfileInfo = async function() {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();

    //console.log(data);

    displayUserInfo(data);
};

//function displaying fetched user info//
const displayUserInfo = function (data){
    const userInfo = document.createElement("div"); 
    userInfo.classList.add("user-info");
    userInfo.innerHTML = ` 
    <figure>
        <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;

    profile.append(userInfo);
    getRepoList();
};

//async function to fetch user repos//
const getRepoList = async function () {
    const repoRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await repoRes.json();

    //console.log(repoData);
    repoInfo(repoData);
};

//function to display info about each repo//
const repoInfo = function (repos) {
    for (let repo of repos ) {
        let li = document.createElement("li");
        li.classList.add("repo"); 
        li.innerHTML = `<h3>${repo.name}</h3>`; 
        repoList.append(li);
    }
}


getProfileInfo(); 
