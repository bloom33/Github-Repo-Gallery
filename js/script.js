//where profile info will appear//
const profile = document.querySelector(".overview");
//username//
const username = "bloom33";
//repo list//
const repoList = document.querySelector(".repo-list");
//where repo info will appear//
const showRepo = document.querySelector(".repos");
//displays details of individual repo//
const repoDetails = document.querySelector(".repo-data");

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

//event listener//
repoList.addEventListener("click", function(e) {
    if (e.target.matches("h3")) {
        let repoName = e.target.innerText;

       getRepoInfo(repoName);
    }
}); 

//async function which fetches specific repo info// 
const getRepoInfo = async function (repoName) {
    const fetchRepo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const gitRepoInfo = await fetchRepo.json();
    console.log(gitRepoInfo);

    //fetch repo languages//
    const fetchLanguages = await fetch(gitRepoInfo.languages_url);
    const languageData = await fetchLanguages.json();

    //list repo languages//
    const languages = [];
    for (const key in languageData) {
        languages.push(key)
    };

    displayRepoInfo(gitRepoInfo, languages);
}; 

//display specific repo info//
const displayRepoInfo = function (gitRepoInfo, languages) {
    repoDetails.innerHTML = "";
    
    const repoDecription = document.createElement("div");
    repoDecription.innerHTML = `
    <h3>Name: ${gitRepoInfo.name}</h3>
    <p>Description: ${gitRepoInfo.description}</p>
    <p>Default Branch: ${gitRepoInfo.branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${gitRepoInfo.html_url}" target="_blank" rel="noreferrer noopener">
    View Repo on GitHub!</a>`; 

    repoDetails.append(repoDecription);

    repoDetails.classList.remove("hide");
    repoList.classList.add("hide");
}


getProfileInfo(); 
