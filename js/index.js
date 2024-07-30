document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("github-form");
    const searchInput = document.getElementById("search");
    const userList = document.getElementById("user-list");
    const repoList = document.getElementById("repos-list");
  
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = searchInput.value;
      searchUsers(query);
    });
  
    function searchUsers(query) {
      fetch(`https://api.github.com/search/users?q=${query}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      })
      .then(response => response.json())
      .then(data => {
        displayUsers(data.items);
      });
    }
  
    function displayUsers(users) {
      userList.innerHTML = "";
      repoList.innerHTML = "";
      users.forEach(user => {
        const userCard = document.createElement("li");
        userCard.innerHTML = `
          <img src="${user.avatar_url}" alt="${user.login}" style="width:50px; border-radius:50%;">
          <p><a href="${user.html_url}" target="_blank">${user.login}</a></p>
          <button data-username="${user.login}">Show Repos</button>
        `;
        userCard.querySelector("button").addEventListener("click", () => {
          fetchRepos(user.login);
        });
        userList.appendChild(userCard);
      });
    }
  
    function fetchRepos(username) {
      fetch(`https://api.github.com/users/${username}/repos`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      })
      .then(response => response.json())
      .then(data => {
        displayRepos(data);
      });
    }
  
    function displayRepos(repos) {
      repoList.innerHTML = "";
      repos.forEach(repo => {
        const repoItem = document.createElement("li");
        repoItem.innerHTML = `
          <p><a href="${repo.html_url}" target="_blank">${repo.name}</a></p>
        `;
        repoList.appendChild(repoItem);
      });
    }
  });
  
  